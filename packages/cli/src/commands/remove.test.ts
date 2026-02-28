import type { ComponentLock } from '../types'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import prompts from 'prompts'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineConfig } from '../types'

import { writeConfig, writeLockFile } from '../utils/config'
import { removeCommand } from './remove'

// Mock prompts module
vi.mock('prompts', () => ({
  default: vi.fn(),
}))

describe('remove command', () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stellar-cli-remove-test-'))
    vi.clearAllMocks()
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
    process.exitCode = undefined
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
    vi.restoreAllMocks()
    process.exitCode = undefined
  })

  async function initProjectWithComponent(dir: string, componentName: string): Promise<void> {
    const config = defineConfig({})
    await writeConfig(config, dir)

    // Create component files
    const componentDir = path.join(dir, config.componentsDir, componentName)
    fs.mkdirSync(componentDir, { recursive: true })

    const fileName = `${componentName.charAt(0).toUpperCase() + componentName.slice(1)}.vue`
    const filePath = path.join(componentDir, fileName)
    fs.writeFileSync(filePath, `// component: ${componentName}`, 'utf-8')

    const lock: ComponentLock = {
      version: '1.0.0',
      components: {
        [componentName]: {
          version: '0.1.0',
          installedAt: new Date().toISOString(),
          customized: false,
          files: [path.join(config.componentsDir, componentName, fileName)],
          dependencies: {},
        },
      },
    }
    await writeLockFile(lock, dir)
  }

  it('removes component files from disk', async () => {
    await initProjectWithComponent(tmpDir, 'button')

    // Confirm removal
    vi.mocked(prompts).mockResolvedValueOnce({ confirm: true })

    await removeCommand(['button'], { cwd: tmpDir })

    const componentDir = path.join(tmpDir, 'components', 'ui', 'button')
    expect(fs.existsSync(componentDir)).toBe(false)
  })

  it('removes entry from lock file', async () => {
    await initProjectWithComponent(tmpDir, 'button')

    vi.mocked(prompts).mockResolvedValueOnce({ confirm: true })

    await removeCommand(['button'], { cwd: tmpDir })

    const lockPath = path.join(tmpDir, 'components.lock.json')
    const lock = JSON.parse(fs.readFileSync(lockPath, 'utf-8')) as ComponentLock
    expect(lock.components.button).toBeUndefined()
  })

  it('errors when component not installed', async () => {
    const config = defineConfig({})
    await writeConfig(config, tmpDir)
    await writeLockFile({ version: '1.0.0', components: {} }, tmpDir)

    await removeCommand(['button'], { cwd: tmpDir })

    expect(process.exitCode).toBe(1)
  })

  it('warns about dependents', async () => {
    const config = defineConfig({})
    await writeConfig(config, tmpDir)

    // Install both 'label' and 'input' (input depends on label)
    const lock: ComponentLock = {
      version: '1.0.0',
      components: {
        label: {
          version: '0.1.0',
          installedAt: new Date().toISOString(),
          customized: false,
          files: [path.join(config.componentsDir, 'label', 'Label.vue')],
          dependencies: {},
        },
        input: {
          version: '0.1.0',
          installedAt: new Date().toISOString(),
          customized: false,
          files: [path.join(config.componentsDir, 'input', 'Input.vue')],
          dependencies: {},
        },
      },
    }
    await writeLockFile(lock, tmpDir)

    // Create component directories
    for (const name of ['label', 'input']) {
      const componentDir = path.join(tmpDir, config.componentsDir, name)
      fs.mkdirSync(componentDir, { recursive: true })
      fs.writeFileSync(path.join(componentDir, `${name}.vue`), `// component: ${name}`, 'utf-8')
    }

    // Confirm removal
    vi.mocked(prompts).mockResolvedValueOnce({ confirm: true })

    await removeCommand(['label'], { cwd: tmpDir })

    // Should have warned about input depending on label
    const warningCalls = vi.mocked(console.log).mock.calls
    const hasWarning = warningCalls.some(call =>
      call.some(arg => typeof arg === 'string' && arg.includes('input')),
    )
    expect(hasWarning).toBe(true)
  })

  it('--yes skips confirmation prompt', async () => {
    await initProjectWithComponent(tmpDir, 'button')

    await removeCommand(['button'], { cwd: tmpDir, yes: true })

    // Prompts should not have been called
    expect(prompts).not.toHaveBeenCalled()

    // Component should be removed
    const componentDir = path.join(tmpDir, 'components', 'ui', 'button')
    expect(fs.existsSync(componentDir)).toBe(false)
  })
})
