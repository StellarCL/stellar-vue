import fs from 'node:fs'
import path from 'node:path'
import { execaCommand } from 'execa'
import ora from 'ora'
import { styles } from './prompts'

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun'

/**
 * Detect the package manager by checking for lockfiles and package.json `packageManager` field.
 * Searches from `cwd` upward.
 */
export function detectPackageManager(cwd: string): PackageManager {
  const lockfiles: Record<string, PackageManager> = {
    'pnpm-lock.yaml': 'pnpm',
    'yarn.lock': 'yarn',
    'bun.lockb': 'bun',
    'bun.lock': 'bun',
    'package-lock.json': 'npm',
  }

  // Walk up to find a lockfile
  let dir = path.resolve(cwd)
  const root = path.parse(dir).root

  while (dir !== root) {
    for (const [file, pm] of Object.entries(lockfiles)) {
      if (fs.existsSync(path.join(dir, file))) {
        return pm
      }
    }

    // Check packageManager field in package.json
    const pkgPath = path.join(dir, 'package.json')
    if (fs.existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
        if (typeof pkg.packageManager === 'string') {
          const name = pkg.packageManager.split('@')[0] as string
          if (['pnpm', 'yarn', 'bun', 'npm'].includes(name)) {
            return name as PackageManager
          }
        }
      }
      catch {
        // ignore parse errors
      }
    }

    const parent = path.dirname(dir)
    if (parent === dir)
      break
    dir = parent
  }

  return 'npm'
}

/**
 * Build the install command string for the given package manager and dependencies.
 */
function buildInstallCommand(pm: PackageManager, deps: string[]): string {
  const depList = deps.join(' ')
  switch (pm) {
    case 'pnpm':
      return `pnpm add ${depList}`
    case 'yarn':
      return `yarn add ${depList}`
    case 'bun':
      return `bun add ${depList}`
    default:
      return `npm install ${depList}`
  }
}

/**
 * Install npm dependencies using the detected package manager.
 * Returns true if install succeeded, false otherwise.
 */
export async function installDependencies(deps: string[], cwd: string): Promise<boolean> {
  if (deps.length === 0)
    return true

  const pm = detectPackageManager(cwd)
  const command = buildInstallCommand(pm, deps)

  const spinner = ora(`Installing dependencies with ${pm}...`).start()

  try {
    await execaCommand(command, { cwd, stdio: 'pipe' })
    spinner.succeed(`Dependencies installed with ${pm}`)
    return true
  }
  catch (error) {
    spinner.fail('Failed to install dependencies')
    const message = error instanceof Error ? error.message : String(error)
    console.error(styles.error(message))
    console.log(styles.dim(`Run manually: ${command}`))
    return false
  }
}
