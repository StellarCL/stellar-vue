import fs from 'node:fs'
import path from 'node:path'
import { readLockFile } from '../utils/config'
import { installDependencies } from '../utils/package-manager'
import { divider, header, newLine, styles } from '../utils/prompts'
import { getComponent } from '../utils/registry'

interface PackageJson {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

function readPackageJson(cwd: string): PackageJson | null {
  const pkgPath = path.join(cwd, 'package.json')
  if (!fs.existsSync(pkgPath))
    return null

  try {
    const raw = fs.readFileSync(pkgPath, 'utf-8')
    return JSON.parse(raw) as PackageJson
  }
  catch {
    return null
  }
}

export async function depsCommand(options: { cwd?: string, update?: boolean }): Promise<void> {
  const cwd = path.resolve(options.cwd ?? process.cwd())

  header('Stellar UI - Dependency Check')

  const lock = await readLockFile(cwd)

  if (!lock || Object.keys(lock.components).length === 0) {
    console.log(styles.info('No components installed.'))
    console.log(styles.dim('Run `stellar-ui add <component>` to install components.'))
    newLine()
    return
  }

  const installedComponents = Object.keys(lock.components)

  // Collect all npm dependencies from installed components
  const requiredDeps = new Map<string, string>() // package name -> version spec

  for (const componentName of installedComponents) {
    const entry = getComponent(componentName)
    if (!entry)
      continue

    for (const [pkg, version] of Object.entries(entry.dependencies)) {
      if (!requiredDeps.has(pkg)) {
        requiredDeps.set(pkg, version)
      }
    }
  }

  if (requiredDeps.size === 0) {
    console.log(styles.info('No npm dependencies required by installed components.'))
    newLine()
    return
  }

  // Read project's package.json
  const pkgJson = readPackageJson(cwd)
  const projectDeps: Record<string, string> = {
    ...(pkgJson?.dependencies ?? {}),
    ...(pkgJson?.devDependencies ?? {}),
    ...(pkgJson?.peerDependencies ?? {}),
  }

  const installedDeps: string[] = []
  const missingDeps: Array<{ name: string, version: string }> = []

  for (const [pkg, version] of requiredDeps) {
    if (projectDeps[pkg] !== undefined) {
      installedDeps.push(pkg)
    }
    else {
      missingDeps.push({ name: pkg, version })
    }
  }

  // Report installed components
  console.log(styles.highlight(`Installed components (${installedComponents.length}):`))
  for (const name of installedComponents) {
    console.log(`  ${styles.dim('•')} ${name}`)
  }
  newLine()

  divider()
  newLine()

  // Report installed deps
  console.log(
    styles.highlight(`Installed dependencies (${installedDeps.length}/${requiredDeps.size}):`),
  )
  if (installedDeps.length > 0) {
    for (const dep of installedDeps) {
      console.log(`  ${styles.success(dep)}`)
    }
  }
  else {
    console.log(`  ${styles.dim('none')}`)
  }
  newLine()

  // Report missing deps
  if (missingDeps.length > 0) {
    console.log(styles.highlight(`Missing dependencies (${missingDeps.length}):`))
    for (const dep of missingDeps) {
      console.log(`  ${styles.warning(`${dep.name} ${dep.version}`)}`)
    }
    newLine()

    if (options.update) {
      const deps = missingDeps.map(d => `${d.name}@${d.version}`)
      await installDependencies(deps, cwd)
    }
    else {
      console.log(styles.dim('Run with --update to install missing dependencies.'))
      newLine()
    }
  }
  else {
    console.log(styles.success('All dependencies are installed.'))
    newLine()
  }
}
