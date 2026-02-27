import fs from 'node:fs'
import path from 'node:path'
import type { ComponentLock, StellarConfig } from '../types'
import { defineConfig } from '../types'

export const DEFAULT_CONFIG: StellarConfig = defineConfig({})

const CONFIG_TS_NAME = 'stellar-ui.config.ts'
const CONFIG_JSON_NAME = '.stellar-ui.json'
const LOCK_FILE_NAME = 'components.lock.json'

/**
 * Find stellar-ui.config.ts (or .stellar-ui.json) in cwd or ancestor directories.
 * Returns the directory containing the config, or null if not found.
 */
export async function findConfig(cwd?: string): Promise<string | null> {
  let dir = path.resolve(cwd ?? process.cwd())
  const root = path.parse(dir).root

  while (dir !== root) {
    const jsonPath = path.join(dir, CONFIG_JSON_NAME)
    const tsPath = path.join(dir, CONFIG_TS_NAME)

    if (fs.existsSync(jsonPath) || fs.existsSync(tsPath)) {
      return dir
    }

    const parent = path.dirname(dir)
    if (parent === dir) break
    dir = parent
  }

  return null
}

/**
 * Read and parse the config from .stellar-ui.json.
 * Returns null if config file is not found.
 */
export async function readConfig(cwd?: string): Promise<StellarConfig | null> {
  const configDir = await findConfig(cwd)
  if (!configDir) return null

  const jsonPath = path.join(configDir, CONFIG_JSON_NAME)
  if (!fs.existsSync(jsonPath)) return null

  try {
    const raw = fs.readFileSync(jsonPath, 'utf-8')
    const parsed = JSON.parse(raw) as Partial<StellarConfig>
    return defineConfig(parsed)
  } catch {
    return null
  }
}

/**
 * Write config file to disk.
 * Writes both stellar-ui.config.ts (human-readable) and .stellar-ui.json (machine-readable).
 */
export async function writeConfig(config: StellarConfig, dir: string): Promise<void> {
  const resolvedDir = path.resolve(dir)

  if (!fs.existsSync(resolvedDir)) {
    fs.mkdirSync(resolvedDir, { recursive: true })
  }

  // Write machine-readable JSON
  const jsonPath = path.join(resolvedDir, CONFIG_JSON_NAME)
  fs.writeFileSync(jsonPath, JSON.stringify(config, null, 2) + '\n', 'utf-8')

  // Write human-readable TypeScript config
  const tsPath = path.join(resolvedDir, CONFIG_TS_NAME)
  const tsContent = generateTsConfig(config)
  fs.writeFileSync(tsPath, tsContent, 'utf-8')
}

/**
 * Read components.lock.json from the given directory or by searching upward.
 */
export async function readLockFile(cwd?: string): Promise<ComponentLock | null> {
  const configDir = await findConfig(cwd)
  const dir = configDir ?? (cwd ?? process.cwd())
  const lockPath = path.join(dir, LOCK_FILE_NAME)

  if (!fs.existsSync(lockPath)) return null

  try {
    const raw = fs.readFileSync(lockPath, 'utf-8')
    return JSON.parse(raw) as ComponentLock
  } catch {
    return null
  }
}

/**
 * Write components.lock.json to disk.
 */
export async function writeLockFile(lock: ComponentLock, dir: string): Promise<void> {
  const resolvedDir = path.resolve(dir)

  if (!fs.existsSync(resolvedDir)) {
    fs.mkdirSync(resolvedDir, { recursive: true })
  }

  const lockPath = path.join(resolvedDir, LOCK_FILE_NAME)
  fs.writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n', 'utf-8')
}

/**
 * Generate a nicely formatted TypeScript config file string.
 */
function generateTsConfig(config: StellarConfig): string {
  const aliasEntries = Object.entries(config.aliases)
    .map(([key, value]) => `    '${key}': '${value}',`)
    .join('\n')

  return `import { defineConfig } from '@stellar-vue-ui/cli'

export default defineConfig({
  componentsDir: '${config.componentsDir}',
  composablesDir: '${config.composablesDir}',
  utilsDir: '${config.utilsDir}',
  cssVariables: '${config.cssVariables}',
  tailwindConfig: '${config.tailwindConfig}',
  typescript: ${config.typescript},
  aliases: {
${aliasEntries}
  },
  framework: '${config.framework}',
  features: {
    animations: ${config.features.animations},
    forms: ${config.features.forms},
    icons: '${config.features.icons}',
  },
})
`
}
