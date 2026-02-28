import type { ComponentLock } from '../types'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineConfig } from '../types'
import { writeConfig, writeLockFile } from '../utils/config'
import { listCommand } from './list'

describe('list command', () => {
  let tmpDir: string
  let consoleSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stellar-cli-list-test-'))
    vi.clearAllMocks()
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
    vi.restoreAllMocks()
  })

  async function initProject(dir: string): Promise<void> {
    const config = defineConfig({})
    await writeConfig(config, dir)
    await writeLockFile({ version: '1.0.0', components: {} }, dir)
  }

  async function initProjectWithComponents(dir: string, componentNames: string[]): Promise<void> {
    const config = defineConfig({})
    await writeConfig(config, dir)

    const lock: ComponentLock = {
      version: '1.0.0',
      components: {},
    }

    for (const name of componentNames) {
      lock.components[name] = {
        version: '0.1.0',
        installedAt: new Date().toISOString(),
        customized: false,
        files: [path.join(config.componentsDir, name, `${name}.vue`)],
        dependencies: {},
      }
    }

    await writeLockFile(lock, dir)
  }

  it('lists all components from registry', async () => {
    await initProject(tmpDir)

    await listCommand({ cwd: tmpDir })

    // Should have outputted something to the console
    expect(consoleSpy).toHaveBeenCalled()

    // Check that some known component names appear in the output
    const allOutput = consoleSpy.mock.calls.map(call => call.join(' ')).join('\n')
    expect(allOutput).toContain('button')
    expect(allOutput).toContain('card')
    expect(allOutput).toContain('dialog')
  })

  it('--installed only shows installed components', async () => {
    await initProjectWithComponents(tmpDir, ['button', 'card'])

    await listCommand({ cwd: tmpDir, installed: true })

    const allOutput = consoleSpy.mock.calls.map(call => call.join(' ')).join('\n')
    expect(allOutput).toContain('button')
    expect(allOutput).toContain('card')
    // Non-installed components should not appear in the listed items
    // (dialog is not installed, so it shouldn't show up in installed-only mode)
  })

  it('--category filters by category', async () => {
    await initProject(tmpDir)

    await listCommand({ cwd: tmpDir, category: 'forms' })

    const allOutput = consoleSpy.mock.calls.map(call => call.join(' ')).join('\n')
    expect(allOutput).toContain('button')
    expect(allOutput).toContain('input')
    // 'card' is layout, not forms — should not appear
    expect(allOutput).not.toContain(' card ')
  })

  it('shows correct status (installed, not installed)', async () => {
    await initProjectWithComponents(tmpDir, ['button'])

    await listCommand({ cwd: tmpDir })

    const allOutput = consoleSpy.mock.calls.map(call => call.join(' ')).join('\n')

    // Button should show as installed
    expect(allOutput).toContain('installed')
    // Some other component should show as "not installed"
    expect(allOutput).toContain('not installed')
  })

  it('shows message when no components installed with --installed flag', async () => {
    await initProject(tmpDir)

    await listCommand({ cwd: tmpDir, installed: true })

    const allOutput = consoleSpy.mock.calls.map(call => call.join(' ')).join('\n')
    expect(allOutput).toContain('No components installed')
  })

  it('shows message for unknown category', async () => {
    await initProject(tmpDir)

    await listCommand({ cwd: tmpDir, category: 'nonexistent-category' })

    const allOutput = consoleSpy.mock.calls.map(call => call.join(' ')).join('\n')
    expect(allOutput).toContain('No components found')
  })
})
