import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { depsCommand } from './deps'

// Mock installDependencies to avoid real npm installs in tests
const mockInstallDependencies = vi.fn().mockResolvedValue(true)
vi.mock('../utils/package-manager', () => ({
  installDependencies: (...args: unknown[]) => mockInstallDependencies(...args),
}))

function makeTempDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'stellar-deps-test-'))
}

function cleanup(dir: string): void {
  fs.rmSync(dir, { recursive: true, force: true })
}

function writeConfig(dir: string): void {
  fs.writeFileSync(
    path.join(dir, '.stellar-ui.json'),
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
}

function writeLock(dir: string, components: Record<string, unknown>): void {
  fs.writeFileSync(
    path.join(dir, 'components.lock.json'),
    JSON.stringify({ version: '1.0.0', components }, null, 2),
    'utf-8',
  )
}

function writePackageJson(
  dir: string,
  deps: Record<string, string>,
  devDeps?: Record<string, string>,
): void {
  fs.writeFileSync(
    path.join(dir, 'package.json'),
    JSON.stringify(
      {
        name: 'test-project',
        version: '1.0.0',
        dependencies: deps,
        devDependencies: devDeps ?? {},
      },
      null,
      2,
    ),
    'utf-8',
  )
}

describe('depsCommand', () => {
  let tmpDir: string
  let logs: string[]
  let consoleSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    tmpDir = makeTempDir()
    logs = []
    mockInstallDependencies.mockClear()
    consoleSpy = vi.spyOn(console, 'log').mockImplementation((...args) => {
      logs.push(args.join(' '))
    })
  })

  afterEach(() => {
    consoleSpy.mockRestore()
    cleanup(tmpDir)
    process.exitCode = undefined
  })

  it('reports "no components installed" when lock file is missing', async () => {
    // No lock file at all
    await depsCommand({ cwd: tmpDir })

    const output = logs.join('\n')
    expect(output).toContain('No components installed')
  })

  it('reports "no components installed" when lock file has empty components', async () => {
    writeConfig(tmpDir)
    writeLock(tmpDir, {})

    await depsCommand({ cwd: tmpDir })

    const output = logs.join('\n')
    expect(output).toContain('No components installed')
  })

  it('lists required dependencies from installed components', async () => {
    writeConfig(tmpDir)
    writeLock(tmpDir, {
      button: {
        version: '0.1.0',
        installedAt: new Date().toISOString(),
        customized: false,
        files: [],
        dependencies: { 'radix-vue': '^1.9.0' },
      },
    })
    writePackageJson(tmpDir, { 'radix-vue': '^1.9.0' })

    await depsCommand({ cwd: tmpDir })

    const output = logs.join('\n')
    expect(output).toContain('radix-vue')
  })

  it('detects missing deps by comparing with package.json', async () => {
    writeConfig(tmpDir)
    writeLock(tmpDir, {
      button: {
        version: '0.1.0',
        installedAt: new Date().toISOString(),
        customized: false,
        files: [],
        dependencies: { 'radix-vue': '^1.9.0' },
      },
    })
    // package.json does NOT have radix-vue
    writePackageJson(tmpDir, {})

    await depsCommand({ cwd: tmpDir })

    const output = logs.join('\n')
    expect(output).toContain('radix-vue')
    expect(output).toContain('Missing')
  })

  it('shows all deps as installed when package.json has them', async () => {
    writeConfig(tmpDir)
    writeLock(tmpDir, {
      button: {
        version: '0.1.0',
        installedAt: new Date().toISOString(),
        customized: false,
        files: [],
        dependencies: { 'radix-vue': '^1.9.0' },
      },
    })
    writePackageJson(tmpDir, { 'radix-vue': '^1.9.0' })

    await depsCommand({ cwd: tmpDir })

    const output = logs.join('\n')
    expect(output).toContain('All dependencies are installed')
  })

  it('installs missing deps with --update flag', async () => {
    writeConfig(tmpDir)
    writeLock(tmpDir, {
      button: {
        version: '0.1.0',
        installedAt: new Date().toISOString(),
        customized: false,
        files: [],
        dependencies: { 'radix-vue': '^1.9.0' },
      },
    })
    // package.json does NOT have radix-vue
    writePackageJson(tmpDir, {})

    await depsCommand({ cwd: tmpDir, update: true })

    expect(mockInstallDependencies).toHaveBeenCalledWith(
      ['radix-vue@^1.9.0'],
      expect.stringContaining(tmpDir),
    )
  })

  it('does not show install command without --update flag', async () => {
    writeConfig(tmpDir)
    writeLock(tmpDir, {
      button: {
        version: '0.1.0',
        installedAt: new Date().toISOString(),
        customized: false,
        files: [],
        dependencies: { 'radix-vue': '^1.9.0' },
      },
    })
    // package.json does NOT have radix-vue
    writePackageJson(tmpDir, {})

    await depsCommand({ cwd: tmpDir, update: false })

    const output = logs.join('\n')
    // Without --update, we should NOT show "npm install" command
    // (we should show the hint instead)
    expect(output).toContain('--update')
    // The npm install line should not appear
    const hasInstallCmd = output.includes('npm install radix-vue')
    expect(hasInstallCmd).toBe(false)
  })

  it('handles multiple components with overlapping dependencies', async () => {
    writeConfig(tmpDir)
    writeLock(tmpDir, {
      button: {
        version: '0.1.0',
        installedAt: new Date().toISOString(),
        customized: false,
        files: [],
        dependencies: { 'radix-vue': '^1.9.0' },
      },
      select: {
        version: '0.1.0',
        installedAt: new Date().toISOString(),
        customized: false,
        files: [],
        dependencies: { 'radix-vue': '^1.9.0' },
      },
      form: {
        version: '0.1.0',
        installedAt: new Date().toISOString(),
        customized: false,
        files: [],
        dependencies: { 'radix-vue': '^1.9.0', 'vee-validate': '^4.13.0' },
      },
    })
    writePackageJson(tmpDir, { 'radix-vue': '^1.9.0' })

    await depsCommand({ cwd: tmpDir })

    const output = logs.join('\n')
    // radix-vue should appear as installed
    expect(output).toContain('radix-vue')
    // vee-validate should appear as missing
    expect(output).toContain('vee-validate')
    expect(output).toContain('Missing')
  })

  it('lists installed component names', async () => {
    writeConfig(tmpDir)
    writeLock(tmpDir, {
      button: {
        version: '0.1.0',
        installedAt: new Date().toISOString(),
        customized: false,
        files: [],
        dependencies: { 'radix-vue': '^1.9.0' },
      },
      card: {
        version: '0.1.0',
        installedAt: new Date().toISOString(),
        customized: false,
        files: [],
        dependencies: {},
      },
    })
    writePackageJson(tmpDir, {})

    await depsCommand({ cwd: tmpDir })

    const output = logs.join('\n')
    expect(output).toContain('button')
    expect(output).toContain('card')
  })
})
