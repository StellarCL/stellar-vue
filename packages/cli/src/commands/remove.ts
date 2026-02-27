import fs from 'node:fs'
import path from 'node:path'
import prompts from 'prompts'
import type { ComponentLock } from '../types'
import { findConfig, readConfig, readLockFile, writeLockFile } from '../utils/config'
import { getComponent } from '../utils/registry'
import { styles, header, newLine } from '../utils/prompts'

interface RemoveOptions {
  cwd?: string
  yes?: boolean
}

/**
 * Remove one or more installed components.
 */
export async function removeCommand(components: string[], options: RemoveOptions): Promise<void> {
  const cwd = path.resolve(options.cwd ?? process.cwd())

  // 1. Read config and lock file
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

  const removedComponents: string[] = []
  const removedDeps: Record<string, string>[] = []

  // 2. For each component
  for (const name of components) {
    // a. Check it's installed
    if (!lock.components[name]) {
      console.error(styles.error(`Component "${name}" is not installed.`))
      process.exitCode = 1
      return
    }

    // b. Check for dependents (other installed components that have this as peerDependency)
    const dependents: string[] = []
    for (const [installedName, _entry] of Object.entries(lock.components)) {
      if (installedName === name) continue
      const registryEntry = getComponent(installedName)
      if (registryEntry && registryEntry.peerDependencies.includes(name)) {
        dependents.push(installedName)
      }
    }

    if (dependents.length > 0) {
      console.log(styles.warning(`Component "${name}" is used by: ${dependents.join(', ')}`))
    }

    // c. Prompt to confirm removal (unless --yes)
    if (!options.yes) {
      const { confirm } = await prompts({
        type: 'confirm',
        name: 'confirm',
        message: `Remove "${name}"?`,
        initial: true,
      })

      if (!confirm) {
        console.log(styles.dim(`Skipping "${name}".`))
        continue
      }
    }

    // d. Remove component files (delete the directory)
    const componentDir = path.join(cwd, config.componentsDir, name)
    if (fs.existsSync(componentDir)) {
      fs.rmSync(componentDir, { recursive: true, force: true })
    }

    // Track dependencies before removing
    removedDeps.push({ ...lock.components[name].dependencies })

    // e. Remove from lock file
    delete lock.components[name]

    removedComponents.push(name)
  }

  // Write updated lock file
  await writeLockFile(lock, configDir)

  // 3. Show success
  if (removedComponents.length > 0) {
    newLine()
    console.log(styles.success(`Removed ${removedComponents.length} component(s): ${removedComponents.join(', ')}`))
  }

  // 4. List any npm dependencies that might now be unused
  // Collect all deps still in use by remaining components
  const remainingDeps = new Set<string>()
  for (const entry of Object.values(lock.components)) {
    for (const dep of Object.keys(entry.dependencies)) {
      remainingDeps.add(dep)
    }
  }

  // Find deps that were used by removed components but no longer needed
  const potentiallyUnused: string[] = []
  for (const depMap of removedDeps) {
    for (const dep of Object.keys(depMap)) {
      if (!remainingDeps.has(dep) && !potentiallyUnused.includes(dep)) {
        potentiallyUnused.push(dep)
      }
    }
  }

  if (potentiallyUnused.length > 0) {
    newLine()
    console.log(styles.info('The following npm dependencies may no longer be needed:'))
    for (const dep of potentiallyUnused) {
      console.log(styles.dim(`  - ${dep}`))
    }
  }
}
