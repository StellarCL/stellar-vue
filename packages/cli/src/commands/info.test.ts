import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { infoCommand } from './info'

function makeTempDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'stellar-info-test-'))
}

function cleanup(dir: string): void {
  fs.rmSync(dir, { recursive: true, force: true })
}

describe('infoCommand', () => {
  let tmpDir: string
  let logs: string[]
  let consoleSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    tmpDir = makeTempDir()
    logs = []
    consoleSpy = vi.spyOn(console, 'log').mockImplementation((...args) => {
      logs.push(args.join(' '))
    })
  })

  afterEach(() => {
    consoleSpy.mockRestore()
    cleanup(tmpDir)
    // Reset exitCode
    process.exitCode = undefined
  })

  it('shows component info for a known component', async () => {
    await infoCommand('button', { cwd: tmpDir })

    const output = logs.join('\n')
    expect(output).toContain('button')
    expect(output).toContain('Interactive button')
    expect(output).toContain('forms')
    expect(output).toContain('0.1.0')
  })

  it('shows files count for a known component', async () => {
    await infoCommand('card', { cwd: tmpDir })

    const output = logs.join('\n')
    expect(output).toContain('card')
    // card has 9 files (including types and variants)
    expect(output).toContain('9 files')
  })

  it('shows npm dependencies', async () => {
    await infoCommand('button', { cwd: tmpDir })

    const output = logs.join('\n')
    expect(output).toContain('radix-vue')
  })

  it('shows peer component dependencies', async () => {
    await infoCommand('input', { cwd: tmpDir })

    const output = logs.join('\n')
    expect(output).toContain('label')
  })

  it('errors for unknown component', async () => {
    await infoCommand('nonexistent-component', { cwd: tmpDir })

    const output = logs.join('\n')
    expect(output).toContain('Unknown component')
    expect(output).toContain('nonexistent-component')
    expect(process.exitCode).toBe(1)
  })

  it('shows "not installed" when no lock file', async () => {
    // No lock file in tmpDir
    await infoCommand('button', { cwd: tmpDir })

    const output = logs.join('\n')
    expect(output).toContain('Not installed')
  })

  it('shows install status when component is in lock file', async () => {
    // Create a config file (needed for lock file lookup)
    fs.writeFileSync(
      path.join(tmpDir, '.stellar-ui.json'),
      JSON.stringify(
        {
          componentsDir: './components/ui',
          composablesDir: './composables',
          utilsDir: './lib',
          cssVariables: './assets/css/variables.css',
          tailwindConfig: './tailwind.config.ts',
          typescript: true,
          aliases: { '@': './src', '~': './' },
          framework: 'vue',
          features: { animations: true, forms: true, icons: 'lucide' },
        },
        null,
        2,
      ),
      'utf-8',
    )

    // Create a lock file with button installed
    const lockData = {
      version: '1.0.0',
      components: {
        button: {
          version: '0.1.0',
          installedAt: new Date().toISOString(),
          customized: false,
          files: ['components/ui/button/Button.vue', 'components/ui/button/index.ts'],
          dependencies: { 'radix-vue': '^1.9.0' },
        },
      },
    }
    fs.writeFileSync(
      path.join(tmpDir, 'components.lock.json'),
      JSON.stringify(lockData, null, 2),
      'utf-8',
    )

    await infoCommand('button', { cwd: tmpDir })

    const output = logs.join('\n')
    expect(output).toContain('Installed')
    expect(output).toContain('0.1.0')
  })

  it('shows "not installed" when component is not in lock file', async () => {
    // Create a config file
    fs.writeFileSync(
      path.join(tmpDir, '.stellar-ui.json'),
      JSON.stringify(
        {
          componentsDir: './components/ui',
          composablesDir: './composables',
          utilsDir: './lib',
          cssVariables: './assets/css/variables.css',
          tailwindConfig: './tailwind.config.ts',
          typescript: true,
          aliases: { '@': './src', '~': './' },
          framework: 'vue',
          features: { animations: true, forms: true, icons: 'lucide' },
        },
        null,
        2,
      ),
      'utf-8',
    )

    // Create a lock file WITHOUT the button
    const lockData = {
      version: '1.0.0',
      components: {},
    }
    fs.writeFileSync(
      path.join(tmpDir, 'components.lock.json'),
      JSON.stringify(lockData, null, 2),
      'utf-8',
    )

    await infoCommand('button', { cwd: tmpDir })

    const output = logs.join('\n')
    expect(output).toContain('Not installed')
  })

  it('shows version comparison when installed version differs from latest', async () => {
    // Create a config file
    fs.writeFileSync(
      path.join(tmpDir, '.stellar-ui.json'),
      JSON.stringify(
        {
          componentsDir: './components/ui',
          composablesDir: './composables',
          utilsDir: './lib',
          cssVariables: './assets/css/variables.css',
          tailwindConfig: './tailwind.config.ts',
          typescript: true,
          aliases: { '@': './src', '~': './' },
          framework: 'vue',
          features: { animations: true, forms: true, icons: 'lucide' },
        },
        null,
        2,
      ),
      'utf-8',
    )

    // Create a lock file with an older version of button
    const lockData = {
      version: '1.0.0',
      components: {
        button: {
          version: '0.0.1',
          installedAt: new Date().toISOString(),
          customized: false,
          files: [],
          dependencies: {},
        },
      },
    }
    fs.writeFileSync(
      path.join(tmpDir, 'components.lock.json'),
      JSON.stringify(lockData, null, 2),
      'utf-8',
    )

    await infoCommand('button', { cwd: tmpDir })

    const output = logs.join('\n')
    // Should show update available
    expect(output).toContain('Update available')
    expect(output).toContain('0.0.1')
    expect(output).toContain('0.1.0')
  })
})
