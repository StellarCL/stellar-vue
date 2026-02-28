import type { ComponentLock } from '../types'
import path from 'node:path'
import pc from 'picocolors'
import { findConfig, readLockFile } from '../utils/config'
import { header, newLine, styles } from '../utils/prompts'
import { getRegistry } from '../utils/registry'

interface ListOptions {
  cwd?: string
  installed?: boolean
  category?: string
}

/**
 * List available or installed components.
 */
export async function listCommand(options: ListOptions): Promise<void> {
  const cwd = path.resolve(options.cwd ?? process.cwd())

  // 1. Get registry and optionally read lock file
  const registry = getRegistry()
  let lock: ComponentLock | null = null

  const configDir = await findConfig(cwd)
  if (configDir) {
    lock = await readLockFile(cwd)
  }

  // Filter by category if specified
  let filteredRegistry = registry
  if (options.category) {
    filteredRegistry = registry.filter(c => c.category === options.category)
    if (filteredRegistry.length === 0) {
      console.log(styles.info(`No components found in category "${options.category}".`))
      return
    }
  }

  // 2. If --installed, only show installed components
  if (options.installed) {
    if (!lock || Object.keys(lock.components).length === 0) {
      console.log(styles.info('No components installed.'))
      return
    }

    header('Installed Components')

    for (const [name, entry] of Object.entries(lock.components)) {
      // Check if category filter applies
      const registryEntry = registry.find(c => c.name === name)
      if (options.category && registryEntry && registryEntry.category !== options.category) {
        continue
      }

      // Check if outdated
      let status = pc.green('up to date')
      if (registryEntry && registryEntry.version !== entry.version) {
        status = pc.yellow(`outdated (installed: ${entry.version}, latest: ${registryEntry.version})`)
      }

      console.log(`  ${pc.bold(name)} ${pc.dim(`v${entry.version}`)} - ${status}`)
    }

    newLine()
    return
  }

  // 3. Show all available components grouped by category
  const categories = [...new Set(filteredRegistry.map(c => c.category))]

  header('Available Components')

  for (const category of categories) {
    const categoryComponents = filteredRegistry.filter(c => c.category === category)

    console.log(`\n  ${pc.bold(pc.cyan(category.toUpperCase()))}`)

    for (const comp of categoryComponents) {
      let status: string

      if (lock && lock.components[comp.name]) {
        const installed = lock.components[comp.name]!
        if (installed.version === comp.version) {
          status = pc.green('installed')
        }
        else {
          status = pc.yellow('outdated')
        }
      }
      else {
        status = pc.dim('not installed')
      }

      console.log(`    ${pc.bold(comp.name)} ${pc.dim(`v${comp.version}`)} - ${comp.description} [${status}]`)
    }
  }

  newLine()
}
