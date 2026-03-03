import type { ComponentLock, StellarConfig } from '../types'
import fs from 'node:fs'
import path from 'node:path'
import prompts from 'prompts'
import { COMPONENT_TEMPLATES } from '../templates/components'
import { COMPOSABLE_TEMPLATES } from '../templates/composables'
import { findConfig, readConfig, readLockFile, writeLockFile } from '../utils/config'
import { installDependencies } from '../utils/package-manager'
import { newLine, styles } from '../utils/prompts'
import {
  getComponent,
  getRegistry,
  resolveComposableDependencies,
  resolveDependencies,
} from '../utils/registry'

interface AddOptions {
  cwd?: string
  overwrite?: boolean
  yes?: boolean
}

/**
 * Compute the relative import path from a component directory to the utils directory.
 * Both paths are relative to the project root (cwd).
 */
function computeUtilsRelativePath(componentDir: string, utilsDir: string, cwd: string): string {
  const absComponentDir = path.resolve(cwd, componentDir)
  const absUtilsDir = path.resolve(cwd, utilsDir)
  let rel = path.relative(absComponentDir, absUtilsDir)
  // Ensure forward slashes and starts with ./ or ../
  rel = rel.split(path.sep).join('/')
  if (!rel.startsWith('.')) {
    rel = `./${rel}`
  }
  return rel
}

/**
 * Compute the relative import path from a component directory to the composables directory.
 */
function computeComposablesRelativePath(
  componentDir: string,
  composablesDir: string,
  cwd: string,
): string {
  const absComponentDir = path.resolve(cwd, componentDir)
  const absComposablesDir = path.resolve(cwd, composablesDir)
  let rel = path.relative(absComponentDir, absComposablesDir)
  rel = rel.split(path.sep).join('/')
  if (!rel.startsWith('.')) {
    rel = `./${rel}`
  }
  return rel
}

/**
 * Rewrite import paths in component source code.
 * Replaces `../../utils` references with the correct path to the user's utils directory.
 */
function rewriteImports(
  content: string,
  config: StellarConfig,
  componentName: string,
  cwd: string,
): string {
  const componentDir = path.join(config.componentsDir, componentName)
  const utilsRelPath = computeUtilsRelativePath(componentDir, config.utilsDir, cwd)
  const composablesRelPath = computeComposablesRelativePath(
    componentDir,
    config.composablesDir,
    cwd,
  )

  // Replace ../../utils/variants -> <utilsRelPath>/variants
  // Replace ../../utils -> <utilsRelPath>
  // Replace ../../composables/X -> <composablesRelPath>/X
  // Order matters: more specific paths first
  let result = content
  result = result.replace(
    /from\s+['"]\.\.\/\.\.\/utils\/([^'"]+)['"]/g,
    `from '${utilsRelPath}/$1'`,
  )
  result = result.replace(/from\s+['"]\.\.\/\.\.\/utils['"]/g, `from '${utilsRelPath}'`)
  result = result.replace(
    /from\s+['"]\.\.\/\.\.\/composables\/([^'"]+)['"]/g,
    `from '${composablesRelPath}/$1'`,
  )
  return result
}

/**
 * Rewrite import paths in composable source code.
 * Replaces `../components/<name>/<file>` references with the correct relative path
 * from the user's composables directory to their components directory.
 */
function rewriteComposableImports(content: string, config: StellarConfig, cwd: string): string {
  const absComposablesDir = path.resolve(cwd, config.composablesDir)
  const absComponentsDir = path.resolve(cwd, config.componentsDir)
  let rel = path.relative(absComposablesDir, absComponentsDir)
  rel = rel.split(path.sep).join('/')
  if (!rel.startsWith('.')) {
    rel = `./${rel}`
  }

  // Replace ../components/<name>/<file> -> <rel>/<name>/<file>
  return content.replace(/from\s+['"]\.\.\/components\/([^'"]+)['"]/g, `from '${rel}/$1'`)
}

/**
 * Add one or more components to the project.
 */
export async function addCommand(components: string[], options: AddOptions): Promise<void> {
  const cwd = path.resolve(options.cwd ?? process.cwd())

  // 1. Read config — error if not initialized
  const configDir = await findConfig(cwd)
  if (!configDir) {
    console.error(styles.error('Stellar UI is not initialized. Run `stellar-ui init` first.'))
    process.exitCode = 1
    return
  }

  const config = await readConfig(cwd)
  if (!config) {
    console.error(styles.error('Failed to read Stellar UI config. Run `stellar-ui init` first.'))
    process.exitCode = 1
    return
  }

  // 2. If no component names given, show the full registry list for user to pick
  let componentNames = [...components]
  if (componentNames.length === 0) {
    const registry = getRegistry()
    const categories = [...new Set(registry.map(c => c.category))]
    const choices = categories.flatMap((cat) => {
      const items = registry.filter(c => c.category === cat)
      return items.map(item => ({
        title: `${item.name} — ${item.description}`,
        value: item.name,
      }))
    })

    const { selected } = await prompts({
      type: 'select',
      name: 'selected',
      message: 'Select a component to add',
      choices,
    })

    if (!selected) {
      console.log(styles.info('No component selected.'))
      return
    }

    componentNames = [selected]
  }

  // Read or create lock file
  const lock: ComponentLock = (await readLockFile(cwd)) ?? {
    version: '1.0.0',
    components: {},
  }

  const addedComponents: string[] = []
  const allNpmDeps: Record<string, string> = {}

  // 3. For each component name
  for (const name of componentNames) {
    // a. Look up in registry
    const registryEntry = getComponent(name)
    if (!registryEntry) {
      console.error(styles.error(`Component "${name}" not found in registry.`))
      process.exitCode = 1
      return
    }

    // b. Resolve dependencies — add those too
    const deps = resolveDependencies(name)
    const allToInstall = [name, ...deps.filter(d => !lock.components[d])]

    if (deps.length > 0) {
      const newDeps = deps.filter(d => !lock.components[d])
      if (newDeps.length > 0) {
        console.log(styles.info(`Resolving dependencies for "${name}": ${newDeps.join(', ')}`))
      }
    }

    for (const componentName of allToInstall) {
      const entry = getComponent(componentName)
      if (!entry)
        continue

      // c. Check if already installed
      if (lock.components[componentName] && !options.overwrite) {
        if (!options.yes) {
          const { confirm } = await prompts({
            type: 'confirm',
            name: 'confirm',
            message: `Component "${componentName}" is already installed. Overwrite?`,
            initial: false,
          })

          if (!confirm) {
            console.log(styles.dim(`Skipping "${componentName}".`))
            continue
          }
        }
        else {
          console.log(styles.dim(`Skipping "${componentName}" (already installed).`))
          continue
        }
      }

      // d. Write component files from embedded templates
      const componentDir = path.join(cwd, config.componentsDir, componentName)
      if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true })
      }

      const templateMap = COMPONENT_TEMPLATES[componentName]
      const writtenFiles: string[] = []

      for (const file of entry.files) {
        const filePath = path.join(componentDir, file)
        let content = templateMap?.[file]
        if (content) {
          content = rewriteImports(content, config, componentName, cwd)
        }
        else {
          // Fallback stub if template not found
          content = `// Generated by stellar-ui CLI - component: ${componentName}\n// File: ${file}\n`
        }
        fs.writeFileSync(filePath, content, 'utf-8')
        writtenFiles.push(path.join(config.componentsDir, componentName, file))
      }

      // e. Update lock file with new entry
      lock.components[componentName] = {
        version: entry.version,
        installedAt: new Date().toISOString(),
        customized: false,
        files: writtenFiles,
        dependencies: { ...entry.dependencies },
      }

      addedComponents.push(componentName)

      // Collect npm dependencies
      for (const [dep, ver] of Object.entries(entry.dependencies)) {
        allNpmDeps[dep] = ver
      }
    }
  }

  // 3b. Copy composable dependencies for all added components
  const copiedComposables = new Set<string>()
  for (const componentName of addedComponents) {
    const composableDeps = resolveComposableDependencies(componentName)
    for (const composableFile of composableDeps) {
      if (copiedComposables.has(composableFile))
        continue

      const composablesDir = path.join(cwd, config.composablesDir)
      const destPath = path.join(composablesDir, composableFile)

      // Skip if already exists (idempotent)
      if (fs.existsSync(destPath)) {
        copiedComposables.add(composableFile)
        continue
      }

      let content = COMPOSABLE_TEMPLATES[composableFile]
      if (!content) {
        console.log(styles.dim(`Composable template not found: ${composableFile}`))
        continue
      }

      // Rewrite imports in composable files (../components/X → relative path)
      content = rewriteComposableImports(content, config, cwd)

      if (!fs.existsSync(composablesDir)) {
        fs.mkdirSync(composablesDir, { recursive: true })
      }

      fs.writeFileSync(destPath, content, 'utf-8')
      copiedComposables.add(composableFile)
      console.log(styles.dim(`  Added composable: ${composableFile}`))
    }
  }

  // Write updated lock file
  await writeLockFile(lock, configDir)

  // 4. Show success
  if (addedComponents.length > 0) {
    newLine()
    console.log(
      styles.success(`Added ${addedComponents.length} component(s): ${addedComponents.join(', ')}`),
    )
  }

  // 5. Install npm dependencies
  const npmDepEntries = Object.entries(allNpmDeps)
  if (npmDepEntries.length > 0) {
    newLine()
    const deps = npmDepEntries.map(([name, ver]) => `${name}@${ver}`)
    await installDependencies(deps, cwd)
  }
}
