import type { StellarConfig } from '../types'
import fs from 'node:fs'
import path from 'node:path'
import ora from 'ora'
import prompts from 'prompts'
import { THEME_TEMPLATES } from '../templates/themes'
import { UTIL_TEMPLATES } from '../templates/utils'
import { defineConfig, getDefaultPaths } from '../types'
import { findConfig, writeConfig, writeLockFile } from '../utils/config'
import { installDependencies } from '../utils/package-manager'
import { header, newLine, styles } from '../utils/prompts'

const THEMES = ['stellar', 'sirius', 'polaris', 'antares', 'vega', 'aldebaran'] as const

interface InitOptions {
  cwd?: string
  yes?: boolean
}

/**
 * Detect the framework by looking for nuxt.config.ts or nuxt.config.js in the working directory.
 */
function detectFramework(cwd: string): 'vue' | 'nuxt' {
  const nuxtConfigFiles = ['nuxt.config.ts', 'nuxt.config.js']
  for (const file of nuxtConfigFiles) {
    if (fs.existsSync(path.join(cwd, file))) {
      return 'nuxt'
    }
  }
  return 'vue'
}

/**
 * Patch vite.config.ts/js to add the @tailwindcss/vite plugin.
 * Returns true if patched, false if file not found or already present.
 */
function patchViteConfig(cwd: string): boolean {
  const candidates = ['vite.config.ts', 'vite.config.js']
  let filePath: string | null = null

  for (const candidate of candidates) {
    const p = path.join(cwd, candidate)
    if (fs.existsSync(p)) {
      filePath = p
      break
    }
  }

  if (!filePath)
    return false

  let content = fs.readFileSync(filePath, 'utf-8')

  if (content.includes('@tailwindcss/vite'))
    return false

  // Add import after the last import line
  const lines = content.split('\n')
  let lastImportIdx = -1
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*import\s/.test(lines[i]!)) {
      lastImportIdx = i
    }
  }
  const importLine = `import tailwindcss from '@tailwindcss/vite'`
  if (lastImportIdx >= 0) {
    lines.splice(lastImportIdx + 1, 0, importLine)
  }
  else {
    lines.unshift(importLine)
  }

  content = lines.join('\n')

  // Add tailwindcss() to the plugins array
  const pluginsMatch = content.match(/plugins\s*:\s*\[/)
  if (pluginsMatch && pluginsMatch.index !== undefined) {
    const insertPos = pluginsMatch.index + pluginsMatch[0].length
    content = `${content.slice(0, insertPos)}\n    tailwindcss(),${content.slice(insertPos)}`
  }

  fs.writeFileSync(filePath, content, 'utf-8')
  return true
}

/**
 * Patch the CSS entrypoint to wire up Tailwind and theme CSS imports.
 * Returns true if patched/created, false if main.ts not found.
 */
function patchCssEntrypoint(cwd: string, variablesCssPath: string): boolean {
  const candidates = ['src/main.ts', 'src/main.js', 'main.ts', 'main.js']
  let mainPath: string | null = null

  for (const candidate of candidates) {
    const p = path.join(cwd, candidate)
    if (fs.existsSync(p)) {
      mainPath = p
      break
    }
  }

  if (!mainPath)
    return false

  const mainContent = fs.readFileSync(mainPath, 'utf-8')
  const cssImportRegex = /import\s+['"](.+\.(?:css|scss|sass|less))['"]/g
  const cssImports: { full: string, file: string }[] = []
  let match: RegExpExecArray | null = cssImportRegex.exec(mainContent)

  while (match !== null) {
    cssImports.push({ full: match[0], file: match[1]! })
    match = cssImportRegex.exec(mainContent)
  }

  const absVariablesCss = path.join(cwd, variablesCssPath)

  if (cssImports.length > 0) {
    // Patch the first CSS file found
    const cssImport = cssImports[0]!
    const mainDir = path.dirname(mainPath)
    const cssFilePath = path.resolve(mainDir, cssImport.file)

    if (!fs.existsSync(cssFilePath))
      return false

    let cssContent = fs.readFileSync(cssFilePath, 'utf-8')
    let changed = false

    if (
      !cssContent.includes(`@import 'tailwindcss'`)
      && !cssContent.includes(`@import "tailwindcss"`)
    ) {
      cssContent = `@import 'tailwindcss';\n${cssContent}`
      changed = true
    }

    const relVarsPath = path
      .relative(path.dirname(cssFilePath), absVariablesCss)
      .split(path.sep)
      .join('/')
    const varsImportA = `@import '${relVarsPath}'`
    const varsImportB = `@import "${relVarsPath}"`
    if (!cssContent.includes(varsImportA) && !cssContent.includes(varsImportB)) {
      cssContent = `${cssContent.trimEnd()}\n@import '${relVarsPath}';\n`
      changed = true
    }

    if (changed) {
      fs.writeFileSync(cssFilePath, cssContent, 'utf-8')
    }
    return true
  }
  else {
    // No CSS import found — create main.css next to variables.css and add import to main.ts
    const cssDir = path.dirname(absVariablesCss)
    if (!fs.existsSync(cssDir)) {
      fs.mkdirSync(cssDir, { recursive: true })
    }
    const newCssPath = path.join(cssDir, 'main.css')
    if (!fs.existsSync(newCssPath)) {
      fs.writeFileSync(newCssPath, `@import 'tailwindcss';\n@import './variables.css';\n`, 'utf-8')
    }

    // Add import to main.ts after the last import line
    const mainDir = path.dirname(mainPath)
    const relCssPath = path.relative(mainDir, newCssPath).split(path.sep).join('/')
    const importStatement = `import './${relCssPath}'`

    if (!mainContent.includes(relCssPath)) {
      const lines = mainContent.split('\n')
      let lastImportIdx = -1
      for (let i = 0; i < lines.length; i++) {
        if (/^\s*import\s/.test(lines[i]!)) {
          lastImportIdx = i
        }
      }
      if (lastImportIdx >= 0) {
        lines.splice(lastImportIdx + 1, 0, importStatement)
      }
      else {
        lines.unshift(importStatement)
      }
      fs.writeFileSync(mainPath, lines.join('\n'), 'utf-8')
    }
    return true
  }
}

/**
 * Patch nuxt.config.ts/js to add the Tailwind module and CSS variables.
 * Returns true if patched, false if not found.
 */
function patchNuxtConfig(cwd: string, variablesCssPath: string): boolean {
  const candidates = ['nuxt.config.ts', 'nuxt.config.js']
  let filePath: string | null = null

  for (const candidate of candidates) {
    const p = path.join(cwd, candidate)
    if (fs.existsSync(p)) {
      filePath = p
      break
    }
  }

  if (!filePath)
    return false

  let content = fs.readFileSync(filePath, 'utf-8')
  let changed = false

  // Add @nuxtjs/tailwindcss to modules array
  if (!content.includes('@nuxtjs/tailwindcss')) {
    const modulesMatch = content.match(/modules\s*:\s*\[/)
    if (modulesMatch && modulesMatch.index !== undefined) {
      const insertPos = modulesMatch.index + modulesMatch[0].length
      content = `${content.slice(0, insertPos)}\n    '@nuxtjs/tailwindcss',${content.slice(insertPos)}`
      changed = true
    }
    else {
      // No modules array — add one inside defineNuxtConfig
      const configMatch = content.match(/defineNuxtConfig\s*\(\s*\{/)
      if (configMatch && configMatch.index !== undefined) {
        const insertPos = configMatch.index + configMatch[0].length
        content = `${content.slice(0, insertPos)}\n  modules: ['@nuxtjs/tailwindcss'],${content.slice(insertPos)}`
        changed = true
      }
    }
  }

  // Normalize variablesCssPath (strip leading ./)
  const cssEntry = variablesCssPath.replace(/^\.\//, '')

  // Add CSS variables file to css array
  if (!content.includes(cssEntry)) {
    const cssArrayMatch = content.match(/css\s*:\s*\[/)
    if (cssArrayMatch && cssArrayMatch.index !== undefined) {
      const insertPos = cssArrayMatch.index + cssArrayMatch[0].length
      content = `${content.slice(0, insertPos)}\n    '~/${cssEntry}',${content.slice(insertPos)}`
      changed = true
    }
    else {
      // No css array — add one inside defineNuxtConfig
      const configMatch = content.match(/defineNuxtConfig\s*\(\s*\{/)
      if (configMatch && configMatch.index !== undefined) {
        const insertPos = configMatch.index + configMatch[0].length
        content = `${content.slice(0, insertPos)}\n  css: ['~/${cssEntry}'],${content.slice(insertPos)}`
        changed = true
      }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8')
  }
  return true
}

export async function initCommand(options: InitOptions): Promise<void> {
  const cwd = path.resolve(options.cwd ?? process.cwd())

  header('Stellar UI - Project Setup')
  console.log(styles.info('Initializing Stellar UI in your project...\n'))

  // 1. Check if config already exists
  const existingConfigDir = await findConfig(cwd)
  if (existingConfigDir) {
    if (options.yes) {
      console.log(styles.warning('Existing config found. Overwriting with defaults.'))
    }
    else {
      const { overwrite } = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: 'A Stellar UI config already exists. Overwrite?',
        initial: false,
      })

      if (!overwrite) {
        console.log(styles.info('Init cancelled.'))
        return
      }
    }
  }

  // 2. Detect framework
  const detectedFramework = detectFramework(cwd)

  let config: StellarConfig
  let selectedTheme = 'stellar'

  if (options.yes) {
    // Use all defaults without prompting (framework-aware)
    config = defineConfig({
      framework: detectedFramework,
    })
  }
  else {
    // 3. Interactive prompts — ask framework first so we can compute defaults
    const { framework } = await prompts({
      type: 'select',
      name: 'framework',
      message: 'Framework',
      choices: [
        { title: 'Vue', value: 'vue' },
        { title: 'Nuxt', value: 'nuxt' },
      ],
      initial: detectedFramework === 'nuxt' ? 1 : 0,
    })

    // Handle user cancellation (Ctrl+C)
    if (framework === undefined) {
      console.log(styles.info('Init cancelled.'))
      return
    }

    const defaults = getDefaultPaths(framework)

    const response = await prompts([
      {
        type: 'text',
        name: 'componentsDir',
        message: 'Components directory',
        initial: defaults.componentsDir,
      },
      {
        type: 'text',
        name: 'composablesDir',
        message: 'Composables directory',
        initial: defaults.composablesDir,
      },
      {
        type: 'text',
        name: 'utilsDir',
        message: 'Utils directory',
        initial: defaults.utilsDir,
      },
      {
        type: 'text',
        name: 'cssVariables',
        message: 'CSS variables file',
        initial: defaults.cssVariables,
      },
      {
        type: 'select',
        name: 'theme',
        message: 'Default theme',
        choices: THEMES.map(t => ({ title: t.charAt(0).toUpperCase() + t.slice(1), value: t })),
        initial: 0,
      },
      {
        type: 'confirm',
        name: 'animations',
        message: 'Include animations?',
        initial: true,
      },
      {
        type: 'select',
        name: 'icons',
        message: 'Icon library',
        choices: [
          { title: 'Lucide', value: 'lucide' },
          { title: 'Heroicons', value: 'heroicons' },
          { title: 'Phosphor', value: 'phosphor' },
          { title: 'None', value: 'none' },
        ],
        initial: 0,
      },
    ])

    // Handle user cancellation (Ctrl+C)
    if (response.componentsDir === undefined) {
      console.log(styles.info('Init cancelled.'))
      return
    }

    selectedTheme = response.theme ?? 'stellar'

    config = defineConfig({
      framework,
      componentsDir: response.componentsDir ?? defaults.componentsDir,
      composablesDir: response.composablesDir ?? defaults.composablesDir,
      utilsDir: response.utilsDir ?? defaults.utilsDir,
      cssVariables: response.cssVariables ?? defaults.cssVariables,
      features: {
        animations: response.animations ?? true,
        forms: true,
        icons: response.icons ?? 'lucide',
      },
    })
  }

  newLine()
  const spinner = ora('Writing configuration files...').start()

  try {
    // 4. Write config files
    await writeConfig(config, cwd)
    spinner.succeed('Config files created')

    // 5. Write initial CSS file with theme tokens
    const cssDir = path.dirname(path.join(cwd, config.cssVariables))
    if (!fs.existsSync(cssDir)) {
      fs.mkdirSync(cssDir, { recursive: true })
    }
    const cssPath = path.join(cwd, config.cssVariables)
    const themeCSS = THEME_TEMPLATES[selectedTheme] ?? THEME_TEMPLATES.stellar ?? ''
    fs.writeFileSync(cssPath, themeCSS, 'utf-8')
    const cssSpinner = ora('CSS variables file created').start()
    cssSpinner.succeed('CSS variables file created')

    // 6. Create project directories
    const dirs = [config.componentsDir, config.composablesDir]
    for (const dir of dirs) {
      const absDir = path.join(cwd, dir)
      if (!fs.existsSync(absDir)) {
        fs.mkdirSync(absDir, { recursive: true })
      }
    }
    const dirsSpinner = ora('Project directories created').start()
    dirsSpinner.succeed('Project directories created')

    // 8. Create components.lock.json
    await writeLockFile(
      {
        version: '1.0.0',
        components: {},
      },
      cwd,
    )
    const lockSpinner = ora('Lock file created').start()
    lockSpinner.succeed('Lock file created')

    // 9. Write shared utils (cn.ts, variants.ts, index.ts)
    const utilsAbsDir = path.join(cwd, config.utilsDir)
    if (!fs.existsSync(utilsAbsDir)) {
      fs.mkdirSync(utilsAbsDir, { recursive: true })
    }
    for (const [fileName, content] of Object.entries(UTIL_TEMPLATES)) {
      fs.writeFileSync(path.join(utilsAbsDir, fileName), content, 'utf-8')
    }
    const utilsSpinner = ora('Shared utils created').start()
    utilsSpinner.succeed('Shared utils created')

    // 10. Install core dependencies
    const coreDeps = [
      'tailwindcss',
      config.framework === 'nuxt' ? '@nuxtjs/tailwindcss' : '@tailwindcss/vite',
      'radix-vue',
      'clsx',
      'tailwind-merge',
      'class-variance-authority',
    ]
    await installDependencies(coreDeps, cwd)

    // 11. Auto-patch project files
    let vitePatched = false
    let cssPatched = false
    let nuxtPatched = false

    if (config.framework === 'vue') {
      vitePatched = patchViteConfig(cwd)
      if (vitePatched) {
        const patchSpinner = ora('Tailwind plugin added to vite.config').start()
        patchSpinner.succeed('Tailwind plugin added to vite.config')
      }
      cssPatched = patchCssEntrypoint(cwd, config.cssVariables)
      if (cssPatched) {
        const cssSpinner2 = ora('CSS imports wired up').start()
        cssSpinner2.succeed('CSS imports wired up')
      }
    }
    else {
      nuxtPatched = patchNuxtConfig(cwd, config.cssVariables)
      if (nuxtPatched) {
        const nuxtSpinner = ora('Nuxt config patched with Tailwind module + CSS').start()
        nuxtSpinner.succeed('Nuxt config patched with Tailwind module + CSS')
      }
    }

    // 12. Success message
    newLine()
    console.log(styles.success('Stellar UI initialized successfully!'))
    newLine()

    const allPatched = config.framework === 'vue' ? vitePatched && cssPatched : nuxtPatched

    if (allPatched) {
      console.log(styles.highlight('Everything is wired up! Next steps:'))
      console.log(styles.dim(`  1. Add components:  npx stellar-ui add button`))
      console.log(styles.dim(`  2. Customize theme in ${config.cssVariables}`))
    }
    else {
      console.log(styles.highlight('Next steps:'))
      let step = 1
      if (config.framework === 'vue') {
        if (!vitePatched) {
          console.log(styles.dim(`  ${step}. Add the Tailwind plugin to vite.config.ts:`))
          console.log(styles.dim(`     import tailwindcss from '@tailwindcss/vite'`))
          console.log(styles.dim(`     // add tailwindcss() to the plugins array`))
          step++
        }
        if (!cssPatched) {
          const varsBasename = path.basename(config.cssVariables)
          console.log(styles.dim(`  ${step}. Add Tailwind + theme imports to your main CSS file:`))
          console.log(styles.dim(`     @import 'tailwindcss';`))
          console.log(styles.dim(`     @import './${varsBasename}';`))
          console.log(styles.dim(`     Then make sure that CSS file is imported in main.ts`))
          step++
        }
      }
      else {
        if (!nuxtPatched) {
          console.log(
            styles.dim(`  ${step}. Add '@nuxtjs/tailwindcss' to your nuxt.config modules`),
          )
          step++
        }
      }
      console.log(styles.dim(`  ${step}. Add components:  npx stellar-ui add button`))
      step++
      console.log(styles.dim(`  ${step}. Customize theme in ${config.cssVariables}`))
    }
    newLine()
  }
  catch (error) {
    spinner.fail('Failed to initialize Stellar UI')
    const message = error instanceof Error ? error.message : String(error)
    console.error(styles.error(message))
    process.exitCode = 1
  }
}
