import path from 'node:path'
import { readLockFile } from '../utils/config'
import { divider, header, newLine, styles } from '../utils/prompts'
import { getComponent } from '../utils/registry'

export async function infoCommand(name: string, options: { cwd?: string }): Promise<void> {
  const cwd = path.resolve(options.cwd ?? process.cwd())

  const component = getComponent(name)
  if (!component) {
    console.log(styles.error(`Unknown component: "${name}"`))
    console.log(styles.dim('Run `stellar-ui list` to see available components.'))
    process.exitCode = 1
    return
  }

  header(`Component: ${component.name}`)

  // Basic info
  console.log(`  ${styles.dim('Name:')}        ${styles.highlight(component.name)}`)
  console.log(`  ${styles.dim('Description:')} ${component.description}`)
  console.log(`  ${styles.dim('Category:')}    ${component.category}`)
  console.log(`  ${styles.dim('Version:')}     ${component.version}`)
  console.log(`  ${styles.dim('Files:')}       ${component.files.length} file${component.files.length !== 1 ? 's' : ''}`)

  newLine()

  // Files list
  if (component.files.length > 0) {
    console.log(styles.highlight('Files:'))
    for (const file of component.files) {
      console.log(`  ${styles.dim('•')} ${file}`)
    }
    newLine()
  }

  // npm dependencies
  const depEntries = Object.entries(component.dependencies)
  if (depEntries.length > 0) {
    console.log(styles.highlight('npm Dependencies:'))
    for (const [pkg, version] of depEntries) {
      console.log(`  ${styles.dim('•')} ${pkg} ${styles.dim(version)}`)
    }
    newLine()
  }
  else {
    console.log(styles.highlight('npm Dependencies:'))
    console.log(`  ${styles.dim('none')}`)
    newLine()
  }

  // Peer component dependencies
  if (component.peerDependencies.length > 0) {
    console.log(styles.highlight('Component Dependencies:'))
    for (const peer of component.peerDependencies) {
      console.log(`  ${styles.dim('•')} ${peer}`)
    }
    newLine()
  }
  else {
    console.log(styles.highlight('Component Dependencies:'))
    console.log(`  ${styles.dim('none')}`)
    newLine()
  }

  // Install status
  const lock = await readLockFile(cwd)
  divider()

  if (lock && lock.components[name]) {
    const entry = lock.components[name]
    const isUpToDate = entry.version === component.version
    console.log(`  ${styles.dim('Status:')}   ${styles.success('Installed')}`)
    console.log(`  ${styles.dim('Installed:')} ${entry.version}`)
    console.log(`  ${styles.dim('Latest:')}    ${component.version}`)
    if (!isUpToDate) {
      console.log(`  ${styles.warning(`Update available: ${entry.version} → ${component.version}`)}`)
    }
    else {
      console.log(`  ${styles.dim('Up to date')}`)
    }
    console.log(`  ${styles.dim('Customized:')} ${entry.customized ? 'Yes' : 'No'}`)
  }
  else {
    console.log(`  ${styles.dim('Status:')} ${styles.warning('Not installed')}`)
    console.log(`  ${styles.dim(`Run \`stellar-ui add ${name}\` to install`)}`)
  }

  newLine()
}
