import type { ComponentEntry, StellarConfig } from '../types'
import fs from 'node:fs'
import path from 'node:path'
import { COMPOSABLE_TEMPLATES } from '../templates/composables'
import { readConfig, readLockFile } from '../utils/config'
import { header, newLine, styles } from '../utils/prompts'
import { getComponent } from '../utils/registry'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DoctorOptions {
  cwd?: string
  fix?: boolean
  verbose?: boolean
  json?: boolean
}

type CheckStatus = 'ok' | 'warn' | 'error'

interface CheckIssue {
  message: string
  status: 'warn' | 'error'
  fixable: boolean
  detail?: string
}

interface CheckResult {
  name: string
  status: CheckStatus
  issues: CheckIssue[]
  /** Number of sub-items checked (e.g. component count) */
  itemCount?: number
  subItems?: Array<{ name: string, status: CheckStatus, message?: string }>
}

interface DoctorReport {
  checks: CheckResult[]
  passed: number
  issues: number
  fixable: number
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readPackageJson(cwd: string): Record<string, unknown> | null {
  const pkgPath = path.join(cwd, 'package.json')
  if (!fs.existsSync(pkgPath))
    return null
  try {
    return JSON.parse(fs.readFileSync(pkgPath, 'utf-8')) as Record<string, unknown>
  }
  catch {
    return null
  }
}

/** Pad text to width with dots. */
function dotPad(label: string, width: number): string {
  const dots = Math.max(2, width - label.length)
  return `${label} ${'.'.repeat(dots)}`
}

const COL_WIDTH = 26

// ---------------------------------------------------------------------------
// Individual check functions
// ---------------------------------------------------------------------------

/**
 * Check 1: Config integrity
 * - .stellar-ui.json exists
 * - All required keys are present
 * - Directories referenced in config exist on disk
 */
async function checkConfig(
  cwd: string,
  config: StellarConfig | null,
  _verbose: boolean,
): Promise<CheckResult> {
  const result: CheckResult = { name: 'Config', status: 'ok', issues: [] }

  if (!config) {
    result.status = 'error'
    result.issues.push({
      message: 'Config file not found. Run `stellar-ui init` first.',
      status: 'error',
      fixable: false,
    })
    return result
  }

  // Required keys
  const requiredKeys: Array<keyof StellarConfig> = [
    'componentsDir',
    'composablesDir',
    'utilsDir',
    'cssVariables',
    'framework',
  ]

  for (const key of requiredKeys) {
    if (!(key in config) || config[key] === undefined || config[key] === '') {
      result.status = 'error'
      result.issues.push({
        message: `Missing required config key: "${key}"`,
        status: 'error',
        fixable: false,
      })
    }
  }

  // Check that directories exist
  const dirs: Array<{ key: string, dir: string }> = [
    { key: 'componentsDir', dir: config.componentsDir },
    { key: 'composablesDir', dir: config.composablesDir },
    { key: 'utilsDir', dir: config.utilsDir },
  ]

  for (const { key, dir } of dirs) {
    const absDir = path.resolve(cwd, dir)
    if (!fs.existsSync(absDir)) {
      result.status = result.status === 'error' ? 'error' : 'warn'
      result.issues.push({
        message: `Directory "${dir}" (${key}) does not exist`,
        status: 'warn',
        fixable: true,
        detail: `mkdir -p ${dir}`,
      })
    }
  }

  return result
}

/**
 * Check 2: CSS wiring
 * - config.cssVariables file exists
 * - Contains @theme block
 * - No @theme inside .dark selector (Tailwind v4 bug)
 */
function checkCssWiring(cwd: string, config: StellarConfig, _verbose: boolean): CheckResult {
  const result: CheckResult = { name: 'CSS Variables', status: 'ok', issues: [] }

  const cssPath = path.resolve(cwd, config.cssVariables)
  if (!fs.existsSync(cssPath)) {
    result.status = 'error'
    result.issues.push({
      message: `CSS variables file not found: ${config.cssVariables}`,
      status: 'error',
      fixable: false,
    })
    return result
  }

  const content = fs.readFileSync(cssPath, 'utf-8')

  // Check for @theme block at top level
  if (!/@theme\s*\{/.test(content)) {
    result.status = 'warn'
    result.issues.push({
      message: 'CSS file does not contain a top-level @theme block',
      status: 'warn',
      fixable: false,
    })
  }

  // Check for @theme inside .dark (Tailwind v4 silently strips this)
  if (hasDarkThemeBlock(content)) {
    result.status = 'error'
    result.issues.push({
      message: '@theme block found inside .dark selector (silently stripped by Tailwind v4)',
      status: 'error',
      fixable: true,
      detail: 'Convert @theme inside .dark to plain CSS custom properties',
    })
  }

  return result
}

/** Detect @theme { ... } inside .dark { ... } or [data-theme] { ... } selectors. */
function hasDarkThemeBlock(css: string): boolean {
  // Simple heuristic: look for .dark or [data-theme followed by content containing @theme
  // We track brace depth to detect nesting
  const darkSelectorPattern = /(?:\.dark|\[data-theme[^\]]*\])\s*\{/g
  let match = darkSelectorPattern.exec(css)

  while (match !== null) {
    // Walk from the opening brace to find nested @theme
    let depth = 1
    let i = match.index + match[0].length
    const start = i

    while (i < css.length && depth > 0) {
      if (css[i] === '{')
        depth++
      if (css[i] === '}')
        depth--
      i++
    }

    const block = css.slice(start, i - 1)
    if (/@theme\s*\{/.test(block)) {
      return true
    }

    match = darkSelectorPattern.exec(css)
  }

  return false
}

/**
 * Check 3: Tailwind integration
 * - Vue: @tailwindcss/vite in vite.config
 * - Nuxt: @nuxtjs/tailwindcss in nuxt.config
 */
function checkTailwindIntegration(
  cwd: string,
  config: StellarConfig,
  _verbose: boolean,
): CheckResult {
  const result: CheckResult = { name: 'Tailwind Plugin', status: 'ok', issues: [] }

  if (config.framework === 'nuxt') {
    // Check nuxt.config.ts or nuxt.config.js
    const nuxtConfigPaths = ['nuxt.config.ts', 'nuxt.config.js', 'nuxt.config.mjs']
    let found = false
    for (const configFile of nuxtConfigPaths) {
      const configPath = path.resolve(cwd, configFile)
      if (fs.existsSync(configPath)) {
        const content = fs.readFileSync(configPath, 'utf-8')
        if (content.includes('@nuxtjs/tailwindcss') || content.includes('@tailwindcss/nuxt')) {
          found = true
        }
        break
      }
    }
    if (!found) {
      result.status = 'warn'
      result.issues.push({
        message: 'Nuxt Tailwind module not found in nuxt.config',
        status: 'warn',
        fixable: false,
        detail: 'Install @nuxtjs/tailwindcss or @tailwindcss/nuxt and add to modules',
      })
    }
  }
  else {
    // Vue: check vite.config for @tailwindcss/vite
    const viteConfigPaths = [
      'vite.config.ts',
      'vite.config.js',
      'vite.config.mts',
      'vite.config.mjs',
    ]
    let found = false
    for (const configFile of viteConfigPaths) {
      const configPath = path.resolve(cwd, configFile)
      if (fs.existsSync(configPath)) {
        const content = fs.readFileSync(configPath, 'utf-8')
        if (content.includes('@tailwindcss/vite')) {
          found = true
        }
        break
      }
    }
    if (!found) {
      result.status = 'warn'
      result.issues.push({
        message: '@tailwindcss/vite plugin not found in vite.config',
        status: 'warn',
        fixable: false,
        detail: 'Install @tailwindcss/vite and add to Vite plugins array',
      })
    }
  }

  return result
}

/**
 * Check 4: CSS entrypoint
 * - main.ts (or main.js) imports a CSS file
 * - That CSS file imports both `tailwindcss` and the variables file
 */
function checkCssEntrypoint(cwd: string, config: StellarConfig, _verbose: boolean): CheckResult {
  const result: CheckResult = { name: 'CSS Imports', status: 'ok', issues: [] }

  // For Nuxt, CSS entrypoint is handled differently (nuxt.config css array)
  if (config.framework === 'nuxt') {
    const nuxtConfigPaths = ['nuxt.config.ts', 'nuxt.config.js', 'nuxt.config.mjs']
    for (const configFile of nuxtConfigPaths) {
      const configPath = path.resolve(cwd, configFile)
      if (fs.existsSync(configPath)) {
        const content = fs.readFileSync(configPath, 'utf-8')
        if (!content.includes('.css')) {
          result.status = 'warn'
          result.issues.push({
            message: 'No CSS imports found in nuxt.config css array',
            status: 'warn',
            fixable: false,
          })
        }
        break
      }
    }
    return result
  }

  // Vue: find main.ts or main.js
  const mainPaths = ['src/main.ts', 'src/main.js', 'src/main.tsx', 'main.ts', 'main.js']

  let mainContent: string | null = null
  let mainFile: string | null = null

  for (const mainPath of mainPaths) {
    const absPath = path.resolve(cwd, mainPath)
    if (fs.existsSync(absPath)) {
      mainContent = fs.readFileSync(absPath, 'utf-8')
      mainFile = mainPath
      break
    }
  }

  if (!mainContent || !mainFile) {
    result.status = 'warn'
    result.issues.push({
      message: 'No main.ts/main.js entry file found',
      status: 'warn',
      fixable: false,
    })
    return result
  }

  // Look for CSS import in main file
  const cssImportPattern = /import\s+['"]([^'"]+\.css)['"]/g
  const cssImports: string[] = []
  let importMatch = cssImportPattern.exec(mainContent)

  while (importMatch !== null) {
    cssImports.push(importMatch[1]!)
    importMatch = cssImportPattern.exec(mainContent)
  }

  if (cssImports.length === 0) {
    result.status = 'warn'
    result.issues.push({
      message: `No CSS imports found in ${mainFile}`,
      status: 'warn',
      fixable: false,
    })
    return result
  }

  // Check each imported CSS file for tailwindcss and variables imports
  let hasTailwind = false
  let hasVariables = false

  for (const cssImport of cssImports) {
    const cssDir = path.dirname(path.resolve(cwd, mainFile))
    const cssAbsPath = path.resolve(cssDir, cssImport)

    if (!fs.existsSync(cssAbsPath))
      continue

    const cssContent = fs.readFileSync(cssAbsPath, 'utf-8')
    if (cssContent.includes('tailwindcss') || cssContent.includes('@tailwind'))
      hasTailwind = true
    if (cssContent.includes('variables') || cssContent.includes(path.basename(config.cssVariables)))
      hasVariables = true
  }

  if (!hasTailwind) {
    result.status = 'warn'
    result.issues.push({
      message: 'CSS entrypoint does not import tailwindcss',
      status: 'warn',
      fixable: false,
      detail: 'Add @import "tailwindcss"; to your main CSS file',
    })
  }

  if (!hasVariables) {
    result.status = 'warn'
    result.issues.push({
      message: `CSS entrypoint does not import the variables file (${path.basename(config.cssVariables)})`,
      status: 'warn',
      fixable: false,
      detail: `Add @import "./${path.basename(config.cssVariables)}"; to your main CSS file`,
    })
  }

  return result
}

/**
 * Check 5: Component files
 * - For each component in lock file, all declared files exist on disk
 */
function checkComponentFiles(
  cwd: string,
  _config: StellarConfig,
  lock: Record<string, ComponentEntry>,
  verbose: boolean,
): CheckResult {
  const componentNames = Object.keys(lock)
  const result: CheckResult = {
    name: `Components (${componentNames.length})`,
    status: 'ok',
    issues: [],
    itemCount: componentNames.length,
    subItems: [],
  }

  if (componentNames.length === 0) {
    result.name = 'Components'
    return result
  }

  for (const name of componentNames) {
    const entry = lock[name]!
    const missing: string[] = []

    for (const file of entry.files) {
      const absFile = path.resolve(cwd, file)
      if (!fs.existsSync(absFile)) {
        missing.push(path.basename(file))
      }
    }

    if (missing.length > 0) {
      result.status = result.status === 'error' ? 'error' : 'warn'
      const msg = `missing file${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`
      result.issues.push({
        message: `${name}: ${msg}`,
        status: 'warn',
        fixable: false,
      })
      result.subItems!.push({ name, status: 'warn', message: `WARN: ${msg}` })
    }
    else if (verbose) {
      result.subItems!.push({ name, status: 'ok' })
    }
  }

  // In non-verbose mode, only keep sub-items with issues
  if (!verbose) {
    result.subItems = result.subItems!.filter(s => s.status !== 'ok')
  }

  return result
}

/**
 * Check 6: Peer dependencies
 * - For each installed component, all peerDependencies (other stellar components) are also installed
 */
function checkPeerDependencies(
  lock: Record<string, ComponentEntry>,
  _verbose: boolean,
): CheckResult {
  const result: CheckResult = { name: 'Peer Dependencies', status: 'ok', issues: [] }
  const installed = new Set(Object.keys(lock))

  for (const name of installed) {
    const registryEntry = getComponent(name)
    if (!registryEntry)
      continue

    const missingPeers: string[] = []
    for (const peer of registryEntry.peerDependencies) {
      if (!installed.has(peer)) {
        missingPeers.push(peer)
      }
    }

    if (missingPeers.length > 0) {
      result.status = result.status === 'error' ? 'error' : 'warn'
      result.issues.push({
        message: `${name}: missing peer${missingPeers.length > 1 ? 's' : ''}: ${missingPeers.join(', ')}`,
        status: 'warn',
        fixable: true,
        detail: `Run: stellar-ui add ${missingPeers.join(' ')}`,
      })
    }
  }

  return result
}

/**
 * Check 7: Composable files
 * - For each installed component with composableDependencies, the composable file exists
 */
function checkComposableFiles(
  cwd: string,
  config: StellarConfig,
  lock: Record<string, ComponentEntry>,
  _verbose: boolean,
): CheckResult {
  const result: CheckResult = {
    name: 'Composables',
    status: 'ok',
    issues: [],
    subItems: [],
  }

  const installed = Object.keys(lock)
  const checkedComposables = new Map<string, string[]>() // composable -> required by

  for (const name of installed) {
    const registryEntry = getComponent(name)
    if (!registryEntry?.composableDependencies)
      continue

    for (const composable of registryEntry.composableDependencies) {
      if (!checkedComposables.has(composable)) {
        checkedComposables.set(composable, [])
      }
      checkedComposables.get(composable)!.push(name)
    }
  }

  for (const [composable, requiredBy] of checkedComposables) {
    const composablePath = path.resolve(cwd, config.composablesDir, composable)
    if (!fs.existsSync(composablePath)) {
      result.status = result.status === 'error' ? 'error' : 'warn'
      const msg = `MISSING (required by: ${requiredBy.join(', ')})`
      result.issues.push({
        message: `${composable}: ${msg}`,
        status: 'warn',
        fixable: true,
        detail: `Re-copy ${composable} from templates`,
      })
      result.subItems!.push({ name: composable, status: 'warn', message: msg })
    }
  }

  return result
}

/**
 * Check 8: Import paths
 * - Scan installed .vue/.ts files for imports from utils/composables dirs
 * - Verify paths resolve
 */
function checkImportPaths(
  cwd: string,
  _config: StellarConfig,
  lock: Record<string, ComponentEntry>,
  _verbose: boolean,
): CheckResult {
  const result: CheckResult = { name: 'Import Paths', status: 'ok', issues: [] }
  const installed = Object.keys(lock)

  for (const name of installed) {
    const entry = lock[name]!
    for (const file of entry.files) {
      const absFile = path.resolve(cwd, file)
      if (!fs.existsSync(absFile))
        continue

      // Only check .vue and .ts files
      if (!file.endsWith('.vue') && !file.endsWith('.ts'))
        continue

      const content = fs.readFileSync(absFile, 'utf-8')
      const importPattern = /from\s+['"](\.[^'"]+)['"]/g
      let importMatch = importPattern.exec(content)

      while (importMatch !== null) {
        const importPath = importMatch[1]!
        const fileDir = path.dirname(absFile)
        const resolved = path.resolve(fileDir, importPath)

        // Try to resolve with common extensions
        const extensions = ['', '.ts', '.js', '.vue', '/index.ts', '/index.js']
        let found = false

        for (const ext of extensions) {
          if (fs.existsSync(resolved + ext)) {
            found = true
            break
          }
        }

        if (!found) {
          result.status = result.status === 'error' ? 'error' : 'warn'
          result.issues.push({
            message: `${path.basename(file)}: unresolved import "${importPath}"`,
            status: 'warn',
            fixable: false,
            detail: `In ${file}`,
          })
          // Only report the first broken import per file to avoid noise
          break
        }

        importMatch = importPattern.exec(content)
      }
    }
  }

  return result
}

/**
 * Check 9: NPM dependencies
 * - For each installed component, required npm packages are in package.json
 */
function checkNpmDependencies(
  cwd: string,
  lock: Record<string, ComponentEntry>,
  _verbose: boolean,
): CheckResult {
  const result: CheckResult = { name: 'NPM Dependencies', status: 'ok', issues: [] }

  const pkgJson = readPackageJson(cwd)
  if (!pkgJson) {
    result.status = 'warn'
    result.issues.push({
      message: 'package.json not found',
      status: 'warn',
      fixable: false,
    })
    return result
  }

  const projectDeps: Record<string, string> = {
    ...((pkgJson.dependencies as Record<string, string>) ?? {}),
    ...((pkgJson.devDependencies as Record<string, string>) ?? {}),
  }

  const missingDeps = new Map<string, string[]>() // dep -> required by components

  for (const name of Object.keys(lock)) {
    const registryEntry = getComponent(name)
    if (!registryEntry)
      continue

    for (const dep of Object.keys(registryEntry.dependencies)) {
      if (!(dep in projectDeps)) {
        if (!missingDeps.has(dep)) {
          missingDeps.set(dep, [])
        }
        missingDeps.get(dep)!.push(name)
      }
    }
  }

  if (missingDeps.size > 0) {
    result.status = 'warn'
    for (const [dep, components] of missingDeps) {
      result.issues.push({
        message: `"${dep}" not in package.json (needed by: ${components.join(', ')})`,
        status: 'warn',
        fixable: false,
        detail: 'Run `stellar-ui deps --update` to install missing dependencies',
      })
    }
  }

  return result
}

/**
 * Check 10: Lock file integrity
 * - All components in lock have valid structure
 * - No orphaned entries (lock entries with no matching registry component)
 */
function checkLockFileIntegrity(
  lock: Record<string, ComponentEntry>,
  _verbose: boolean,
): CheckResult {
  const result: CheckResult = { name: 'Lock File', status: 'ok', issues: [] }

  for (const [name, entry] of Object.entries(lock)) {
    // Check required fields
    if (!entry.version) {
      result.status = 'error'
      result.issues.push({
        message: `${name}: missing "version" in lock entry`,
        status: 'error',
        fixable: false,
      })
    }

    if (!entry.files || !Array.isArray(entry.files)) {
      result.status = 'error'
      result.issues.push({
        message: `${name}: missing or invalid "files" in lock entry`,
        status: 'error',
        fixable: false,
      })
    }

    if (!entry.installedAt) {
      result.status = result.status === 'error' ? 'error' : 'warn'
      result.issues.push({
        message: `${name}: missing "installedAt" timestamp`,
        status: 'warn',
        fixable: false,
      })
    }

    // Check if component exists in registry
    const registryEntry = getComponent(name)
    if (!registryEntry) {
      result.status = result.status === 'error' ? 'error' : 'warn'
      result.issues.push({
        message: `${name}: not found in component registry (orphaned entry)`,
        status: 'warn',
        fixable: false,
        detail: 'This component may have been removed from the registry',
      })
    }
  }

  return result
}

// ---------------------------------------------------------------------------
// Fix logic
// ---------------------------------------------------------------------------

async function applyFixes(
  cwd: string,
  config: StellarConfig,
  _lock: Record<string, ComponentEntry>,
  report: DoctorReport,
): Promise<number> {
  let fixed = 0

  for (const check of report.checks) {
    for (const issue of check.issues) {
      if (!issue.fixable)
        continue

      // Fix: create missing directories
      if (issue.message.includes('does not exist') && check.name === 'Config') {
        const dirMatch = issue.message.match(/^Directory "([^"]+)"/)
        if (dirMatch) {
          const dir = path.resolve(cwd, dirMatch[1]!)
          fs.mkdirSync(dir, { recursive: true })
          console.log(styles.success(`Created directory: ${dirMatch[1]}`))
          fixed++
        }
      }

      // Fix: missing composables
      if (check.name === 'Composables' && issue.message.includes('MISSING')) {
        const composableMatch = issue.message.match(/^([^:]+):/)
        if (composableMatch) {
          const composable = composableMatch[1]!
          const template = COMPOSABLE_TEMPLATES[composable]
          if (template) {
            const composablesDir = path.resolve(cwd, config.composablesDir)
            if (!fs.existsSync(composablesDir)) {
              fs.mkdirSync(composablesDir, { recursive: true })
            }
            const destPath = path.join(composablesDir, composable)
            fs.writeFileSync(destPath, template, 'utf-8')
            console.log(styles.success(`Restored composable: ${composable}`))
            fixed++
          }
        }
      }

      // Fix: missing peer dependencies
      if (check.name === 'Peer Dependencies' && issue.message.includes('missing peer')) {
        const peersMatch = issue.message.match(/missing peers?: (.+)$/)
        if (peersMatch) {
          const peers = peersMatch[1]!.split(', ').map(s => s.trim())
          console.log(styles.info(`Missing peer components: ${peers.join(', ')}`))
          console.log(styles.dim(`Run: stellar-ui add ${peers.join(' ')}`))
          // Do not auto-add components -- that requires interactive confirmation.
          // Instead print the command.
        }
      }

      // Fix: @theme inside .dark selector
      if (
        check.name === 'CSS Variables'
        && issue.message.includes('@theme block found inside .dark')
      ) {
        const cssPath = path.resolve(cwd, config.cssVariables)
        if (fs.existsSync(cssPath)) {
          let content = fs.readFileSync(cssPath, 'utf-8')
          const original = content

          content = fixDarkThemeBlocks(content)

          if (content !== original) {
            fs.writeFileSync(cssPath, content, 'utf-8')
            console.log(
              styles.success(
                'Fixed @theme inside .dark -- converted to plain CSS custom properties',
              ),
            )
            fixed++
          }
        }
      }
    }
  }

  return fixed
}

/**
 * Replace @theme { ... } blocks inside .dark / [data-theme] selectors
 * with plain CSS custom properties.
 *
 * Before:
 *   .dark { @theme { --color-bg: #000; } }
 *
 * After:
 *   .dark { --color-bg: #000; }
 */
function fixDarkThemeBlocks(css: string): string {
  // Pattern: find .dark { ... @theme { props } ... }
  // and replace the @theme { props } with just props
  return css.replace(
    /(@theme\s*\{)([^}]*)\}/g,
    (match, _themeOpen: string, themeBody: string, offset: number) => {
      // Check if this @theme is inside a .dark or [data-theme] selector
      // by looking backwards from the offset for an unclosed .dark {
      const before = css.slice(0, offset)
      const lastDarkOpen = Math.max(
        before.lastIndexOf('.dark {'),
        before.lastIndexOf('.dark{'),
        before.lastIndexOf('[data-theme'),
      )

      if (lastDarkOpen === -1)
        return match // not inside a dark selector, leave as-is

      // Verify the dark selector's brace is still open at this point
      const segment = before.slice(lastDarkOpen)
      let depth = 0
      for (const ch of segment) {
        if (ch === '{')
          depth++
        if (ch === '}')
          depth--
      }

      if (depth > 0) {
        // We are inside a dark selector -- strip @theme wrapper, keep properties
        return themeBody.trim()
      }

      return match
    },
  )
}

// ---------------------------------------------------------------------------
// Report rendering
// ---------------------------------------------------------------------------

function renderReport(report: DoctorReport, verbose: boolean): void {
  header('Stellar UI Doctor')

  for (const check of report.checks) {
    const statusLabel
      = check.status === 'ok'
        ? styles.success('OK')
        : check.status === 'warn'
          ? styles.warning(`${check.issues.length} issue${check.issues.length > 1 ? 's' : ''}`)
          : styles.error(`${check.issues.length} issue${check.issues.length > 1 ? 's' : ''}`)

    const padded = dotPad(check.name, COL_WIDTH)
    console.log(`  ${padded} ${statusLabel}`)

    // Sub-items (e.g. individual components or composables)
    if (check.subItems && check.subItems.length > 0) {
      for (const sub of check.subItems) {
        const subPad = dotPad(sub.name, COL_WIDTH - 2)
        if (sub.status === 'ok') {
          console.log(`    ${subPad} ${styles.success('OK')}`)
        }
        else {
          const subMsg = sub.message ? styles.warning(sub.message) : styles.warning('issue')
          console.log(
            `    ${subMsg.startsWith('\u26A0') ? `    ${subPad} ${subMsg}` : `    ${subPad} ${subMsg}`}`,
          )
        }
      }
    }

    // Verbose: show details for each issue
    if (verbose && check.issues.length > 0) {
      for (const issue of check.issues) {
        const icon = issue.status === 'error' ? styles.error('') : styles.warning('')
        console.log(`    ${icon} ${issue.message}`)
        if (issue.detail) {
          console.log(`      ${styles.dim(issue.detail)}`)
        }
      }
    }
  }

  newLine()

  const summary = `  ${report.passed} check${report.passed !== 1 ? 's' : ''} passed, ${report.issues} issue${report.issues !== 1 ? 's' : ''} found`

  if (report.issues === 0) {
    console.log(styles.success('All checks passed!'))
  }
  else {
    console.log(summary)
    if (report.fixable > 0) {
      console.log(styles.dim('  Run stellar-ui doctor --fix to auto-repair'))
    }
  }

  newLine()
}

function renderJsonReport(report: DoctorReport): void {
  const output = {
    passed: report.passed,
    issues: report.issues,
    fixable: report.fixable,
    checks: report.checks.map(check => ({
      name: check.name,
      status: check.status,
      issues: check.issues.map(issue => ({
        message: issue.message,
        status: issue.status,
        fixable: issue.fixable,
        detail: issue.detail,
      })),
      ...(check.subItems && check.subItems.length > 0
        ? {
            subItems: check.subItems.map(s => ({
              name: s.name,
              status: s.status,
              message: s.message,
            })),
          }
        : {}),
    })),
  }

  console.log(JSON.stringify(output, null, 2))
}

// ---------------------------------------------------------------------------
// Main command
// ---------------------------------------------------------------------------

export async function doctorCommand(options: DoctorOptions): Promise<void> {
  const cwd = path.resolve(options.cwd ?? process.cwd())
  const verbose = options.verbose ?? false
  const fix = options.fix ?? false
  const json = options.json ?? false

  // Step 1: Read config
  const config = await readConfig(cwd)

  // Step 2: Read lock file
  const lockFile = await readLockFile(cwd)
  const lockComponents = lockFile?.components ?? {}

  // Step 3: Run all checks
  const checks: CheckResult[] = []

  // Check 1: Config integrity
  checks.push(await checkConfig(cwd, config, verbose))

  // Only run remaining checks if config is valid
  if (config) {
    // Check 2: CSS wiring
    checks.push(checkCssWiring(cwd, config, verbose))

    // Check 3: Tailwind integration
    checks.push(checkTailwindIntegration(cwd, config, verbose))

    // Check 4: CSS entrypoint
    checks.push(checkCssEntrypoint(cwd, config, verbose))

    // Check 5: Component files
    checks.push(checkComponentFiles(cwd, config, lockComponents, verbose))

    // Check 6: Peer dependencies
    checks.push(checkPeerDependencies(lockComponents, verbose))

    // Check 7: Composable files
    checks.push(checkComposableFiles(cwd, config, lockComponents, verbose))

    // Check 8: Import paths
    checks.push(checkImportPaths(cwd, config, lockComponents, verbose))

    // Check 9: NPM dependencies
    checks.push(checkNpmDependencies(cwd, lockComponents, verbose))

    // Check 10: Lock file integrity
    checks.push(checkLockFileIntegrity(lockComponents, verbose))
  }

  // Step 4: Build report
  const passed = checks.filter(c => c.status === 'ok').length
  const totalIssues = checks.reduce((sum, c) => sum + c.issues.length, 0)
  const fixable = checks.reduce((sum, c) => sum + c.issues.filter(i => i.fixable).length, 0)

  const report: DoctorReport = {
    checks,
    passed,
    issues: totalIssues,
    fixable,
  }

  // Step 5: Output
  if (json) {
    renderJsonReport(report)
  }
  else {
    renderReport(report, verbose)
  }

  // Step 6: Apply fixes if requested
  if (fix && config && fixable > 0) {
    newLine()
    console.log(styles.highlight('Applying fixes...'))
    newLine()

    const fixedCount = await applyFixes(cwd, config, lockComponents, report)

    newLine()
    console.log(
      fixedCount > 0
        ? styles.success(`${fixedCount} issue${fixedCount !== 1 ? 's' : ''} fixed`)
        : styles.dim('No auto-fixable issues remaining'),
    )
    newLine()
  }

  // Set exit code if there are errors
  if (totalIssues > 0) {
    process.exitCode = 1
  }
}
