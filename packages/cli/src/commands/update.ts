import type { ComponentLock, StellarConfig } from '../types'
import fs from 'node:fs'
import path from 'node:path'
import prompts from 'prompts'
import { COMPONENT_TEMPLATES } from '../templates/components'
import { COMPOSABLE_TEMPLATES } from '../templates/composables'
import { findConfig, readConfig, readLockFile, writeLockFile } from '../utils/config'
import { computeHash, displayDiff } from '../utils/diff'
import { installDependencies } from '../utils/package-manager'
import { newLine, styles } from '../utils/prompts'
import { getComponent, resolveComposableDependencies } from '../utils/registry'

interface UpdateOptions {
  cwd?: string
  all?: boolean
  force?: boolean
  yes?: boolean
}

/**
 * Compute the relative import path from a component directory to the utils directory.
 */
function computeUtilsRelativePath(componentDir: string, utilsDir: string, cwd: string): string {
  const absComponentDir = path.resolve(cwd, componentDir)
  const absUtilsDir = path.resolve(cwd, utilsDir)
  let rel = path.relative(absComponentDir, absUtilsDir)
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
 */
function rewriteComposableImports(content: string, config: StellarConfig, cwd: string): string {
  const absComposablesDir = path.resolve(cwd, config.composablesDir)
  const absComponentsDir = path.resolve(cwd, config.componentsDir)
  let rel = path.relative(absComposablesDir, absComponentsDir)
  rel = rel.split(path.sep).join('/')
  if (!rel.startsWith('.')) {
    rel = `./${rel}`
  }

  return content.replace(/from\s+['"]\.\.\/components\/([^'"]+)['"]/g, `from '${rel}/$1'`)
}

/**
 * Generate the content that the template would produce for a given file.
 * Returns null if no template exists.
 */
function getTemplateContent(
  componentName: string,
  file: string,
  config: StellarConfig,
  cwd: string,
): string | null {
  const templateMap = COMPONENT_TEMPLATES[componentName]
  let content = templateMap?.[file]
  if (content) {
    content = rewriteImports(content, config, componentName, cwd)
    return content
  }
  return null
}

/**
 * Update one or more installed components.
 *
 * Uses the same COMPONENT_TEMPLATES + rewriteImports() pipeline as `add`,
 * so updated components get real source code, not stubs.
 *
 * --force bypasses the version check, allowing users to pull template
 * changes even when the lock file version already matches the registry.
 */
export async function updateCommand(components: string[], options: UpdateOptions): Promise<void> {
  const cwd = path.resolve(options.cwd ?? process.cwd())

  // 1. Read config and lock file — error if not initialized
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

  const lock: ComponentLock | null = await readLockFile(cwd)
  if (!lock) {
    console.error(styles.error('No lock file found. Run `stellar-ui init` first.'))
    process.exitCode = 1
    return
  }

  // 2. Determine which components to update
  let componentNames: string[]
  if (options.all) {
    componentNames = Object.keys(lock.components)
    if (componentNames.length === 0) {
      console.log(styles.info('No components installed.'))
      return
    }
  }
  else {
    componentNames = [...components]
    if (componentNames.length === 0) {
      console.log(
        styles.info('No components specified. Use --all to update all installed components.'),
      )
      return
    }
  }

  const updatedComponents: string[] = []
  const skippedComponents: string[] = []
  const allNpmDeps: Record<string, string> = {}

  // 3. For each component
  for (const name of componentNames) {
    // a. Check it's in the lock file
    const lockEntry = lock.components[name]
    if (!lockEntry) {
      console.error(styles.error(`Component "${name}" is not installed.`))
      process.exitCode = 1
      return
    }

    // b. Compare installed version with registry version
    const registryEntry = getComponent(name)
    if (!registryEntry) {
      console.error(styles.error(`Component "${name}" not found in registry.`))
      process.exitCode = 1
      return
    }

    // c. If same version and not --force, skip
    if (lockEntry.version === registryEntry.version && !options.force) {
      console.log(styles.dim(`"${name}" is already up to date (v${lockEntry.version}).`))
      skippedComponents.push(name)
      continue
    }

    // d. Check for customizations by comparing file hashes against templates
    const componentDir = path.join(cwd, config.componentsDir, name)
    let hasCustomizations = false

    if (fs.existsSync(componentDir)) {
      for (const file of lockEntry.files) {
        const filePath = path.join(cwd, file)
        if (fs.existsSync(filePath)) {
          const currentContent = fs.readFileSync(filePath, 'utf-8')
          const fileName = path.basename(file)
          const templateContent = getTemplateContent(name, fileName, config, cwd)
          // If we have a template, compare against it. Otherwise assume customized.
          if (templateContent) {
            if (computeHash(currentContent) !== computeHash(templateContent)) {
              hasCustomizations = true
              break
            }
          }
          else {
            hasCustomizations = true
            break
          }
        }
      }
    }

    if (hasCustomizations && !options.yes) {
      console.log(styles.warning(`Component "${name}" has been customized.`))

      // e. Show diff preview against new template content
      for (const file of lockEntry.files) {
        const filePath = path.join(cwd, file)
        if (fs.existsSync(filePath)) {
          const currentContent = fs.readFileSync(filePath, 'utf-8')
          const fileName = path.basename(file)
          const newContent = getTemplateContent(name, fileName, config, cwd)
          if (newContent) {
            displayDiff(fileName, currentContent, newContent)
          }
        }
      }

      const { confirm } = await prompts({
        type: 'confirm',
        name: 'confirm',
        message: `Update "${name}" and overwrite customizations?`,
        initial: false,
      })

      if (!confirm) {
        console.log(styles.dim(`Skipping "${name}".`))
        continue
      }
    }

    // f. Apply update — write real component files from COMPONENT_TEMPLATES
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true })
    }

    const templateMap = COMPONENT_TEMPLATES[name]
    const writtenFiles: string[] = []

    for (const file of registryEntry.files) {
      const filePath = path.join(componentDir, file)
      let content = templateMap?.[file]
      if (content) {
        content = rewriteImports(content, config, name, cwd)
      }
      else {
        // Fallback stub if template not found
        content = `// Generated by stellar-ui CLI - component: ${name}\n// File: ${file}\n`
      }
      fs.writeFileSync(filePath, content, 'utf-8')
      writtenFiles.push(path.join(config.componentsDir, name, file))
    }

    // g. Update lock file entry
    lock.components[name] = {
      version: registryEntry.version,
      installedAt: new Date().toISOString(),
      customized: false,
      files: writtenFiles,
      dependencies: { ...registryEntry.dependencies },
    }

    updatedComponents.push(name)

    // Collect npm dependencies
    for (const [dep, ver] of Object.entries(registryEntry.dependencies)) {
      allNpmDeps[dep] = ver
    }
  }

  // 3b. Copy composable dependencies for all updated components
  const copiedComposables = new Set<string>()
  for (const componentName of updatedComponents) {
    const composableDeps = resolveComposableDependencies(componentName)
    for (const composableFile of composableDeps) {
      if (copiedComposables.has(composableFile))
        continue

      const composablesDir = path.join(cwd, config.composablesDir)
      const destPath = path.join(composablesDir, composableFile)

      let content = COMPOSABLE_TEMPLATES[composableFile]
      if (!content) {
        copiedComposables.add(composableFile)
        continue
      }

      // Always overwrite composables during update
      content = rewriteComposableImports(content, config, cwd)

      if (!fs.existsSync(composablesDir)) {
        fs.mkdirSync(composablesDir, { recursive: true })
      }

      fs.writeFileSync(destPath, content, 'utf-8')
      copiedComposables.add(composableFile)
      console.log(styles.dim(`  Updated composable: ${composableFile}`))
    }
  }

  // Write updated lock file
  await writeLockFile(lock, configDir)

  // 4. Show summary
  newLine()
  if (updatedComponents.length > 0) {
    console.log(
      styles.success(
        `Updated ${updatedComponents.length} component(s): ${updatedComponents.join(', ')}`,
      ),
    )
  }
  if (skippedComponents.length > 0) {
    console.log(styles.dim(`${skippedComponents.length} component(s) already up to date.`))
  }
  if (updatedComponents.length === 0 && skippedComponents.length === 0) {
    console.log(styles.info('No components were updated.'))
  }

  // 5. Install npm dependencies if needed
  const npmDepEntries = Object.entries(allNpmDeps)
  if (npmDepEntries.length > 0) {
    newLine()
    const deps = npmDepEntries.map(([name, ver]) => `${name}@${ver}`)
    await installDependencies(deps, cwd)
  }
}
