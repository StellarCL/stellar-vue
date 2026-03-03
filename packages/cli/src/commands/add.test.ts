import type { ComponentLock } from '../types'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import prompts from 'prompts'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineConfig } from '../types'

import { writeConfig, writeLockFile } from '../utils/config'
import { addCommand } from './add'

// Mock prompts module
vi.mock('prompts', () => ({
  default: vi.fn(),
}))

// Mock installDependencies to avoid real npm installs in tests
vi.mock('../utils/package-manager', () => ({
  installDependencies: vi.fn().mockResolvedValue(true),
}))

describe('add command', () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stellar-cli-add-test-'))
    vi.clearAllMocks()
    // Suppress console output during tests
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
    // Reset process.exitCode
    process.exitCode = undefined
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
    vi.restoreAllMocks()
    process.exitCode = undefined
  })

  async function initProject(dir: string): Promise<void> {
    const config = defineConfig({})
    await writeConfig(config, dir)
    await writeLockFile({ version: '1.0.0', components: {} }, dir)
  }

  it('adds a component and creates files in components dir', async () => {
    await initProject(tmpDir)

    await addCommand(['button'], { cwd: tmpDir })

    const componentDir = path.join(tmpDir, 'src', 'components', 'ui', 'button')
    expect(fs.existsSync(componentDir)).toBe(true)

    // Should have created files
    const files = fs.readdirSync(componentDir)
    expect(files.length).toBeGreaterThan(0)
    expect(files).toContain('Button.vue')
    expect(files).toContain('index.ts')
  })

  it('updates lock file after adding', async () => {
    await initProject(tmpDir)

    await addCommand(['card'], { cwd: tmpDir })

    const lockPath = path.join(tmpDir, 'components.lock.json')
    const lock = JSON.parse(fs.readFileSync(lockPath, 'utf-8')) as ComponentLock
    expect(lock.components.card).toBeDefined()
    expect(lock.components.card!.version).toBe('0.1.0')
  })

  it('resolves and adds dependencies automatically', async () => {
    await initProject(tmpDir)

    // 'input' has peerDependency on 'label'
    await addCommand(['input'], { cwd: tmpDir })

    const lockPath = path.join(tmpDir, 'components.lock.json')
    const lock = JSON.parse(fs.readFileSync(lockPath, 'utf-8')) as ComponentLock

    expect(lock.components.input).toBeDefined()
    expect(lock.components.label).toBeDefined()
  })

  it('errors when config not initialized', async () => {
    await addCommand(['button'], { cwd: tmpDir })

    expect(process.exitCode).toBe(1)
  })

  it('errors for unknown component name', async () => {
    await initProject(tmpDir)

    await addCommand(['nonexistent-component'], { cwd: tmpDir })

    expect(process.exitCode).toBe(1)
  })

  it('supports multiple components at once', async () => {
    await initProject(tmpDir)

    await addCommand(['button', 'card', 'badge'], { cwd: tmpDir })

    const lockPath = path.join(tmpDir, 'components.lock.json')
    const lock = JSON.parse(fs.readFileSync(lockPath, 'utf-8')) as ComponentLock

    expect(lock.components.button).toBeDefined()
    expect(lock.components.card).toBeDefined()
    expect(lock.components.badge).toBeDefined()
  })

  it('prompts before overwriting existing component', async () => {
    await initProject(tmpDir)

    // Add button first
    await addCommand(['button'], { cwd: tmpDir })

    // Mock prompts to deny overwrite
    vi.mocked(prompts).mockResolvedValueOnce({ confirm: false })

    // Try to add button again without --overwrite
    await addCommand(['button'], { cwd: tmpDir })

    // Should have called prompts
    expect(prompts).toHaveBeenCalled()
  })

  it('--overwrite skips the overwrite prompt', async () => {
    await initProject(tmpDir)

    // Add button first
    await addCommand(['button'], { cwd: tmpDir })

    // Add again with --overwrite
    await addCommand(['button'], { cwd: tmpDir, overwrite: true })

    // Prompts should NOT have been called for overwrite
    expect(prompts).not.toHaveBeenCalled()

    // Component should still be in lock file
    const lockPath = path.join(tmpDir, 'components.lock.json')
    const lock = JSON.parse(fs.readFileSync(lockPath, 'utf-8')) as ComponentLock
    expect(lock.components.button).toBeDefined()
  })

  it('copies composable files when adding component with composable deps', async () => {
    await initProject(tmpDir)

    await addCommand(['form'], { cwd: tmpDir })

    const composablePath = path.join(tmpDir, 'src', 'composables', 'useFormField.ts')
    expect(fs.existsSync(composablePath)).toBe(true)

    const content = fs.readFileSync(composablePath, 'utf-8')
    expect(content.length).toBeGreaterThan(0)
  })

  it('rewrites composable import paths in component files', async () => {
    await initProject(tmpDir)

    await addCommand(['form'], { cwd: tmpDir })

    // Check that component files don't reference the original 2-level ../../composables/ pattern
    // The rewritten path goes up 3 levels (../../../composables/) to reach src/composables from src/components/ui/<name>
    const componentDir = path.join(tmpDir, 'src', 'components', 'ui', 'form')
    const files = fs.readdirSync(componentDir)
    for (const file of files) {
      const content = fs.readFileSync(path.join(componentDir, file), 'utf-8')
      // The original pattern "from '../../composables/" should not appear literally
      // (rewritten version has 3 levels: ../../../composables/)
      if (content.includes('composables/')) {
        expect(content).not.toMatch(/from\s+['"]\.\.\/\.\.\/composables\//)
      }
    }
  })

  it('rewrites component import paths in composable files', async () => {
    await initProject(tmpDir)

    await addCommand(['toast'], { cwd: tmpDir })

    const composablePath = path.join(tmpDir, 'src', 'composables', 'useToast.ts')
    expect(fs.existsSync(composablePath)).toBe(true)

    const content = fs.readFileSync(composablePath, 'utf-8')
    // The original pattern "../components/toast/" (without ui/) should be rewritten
    // to include the ui/ subdirectory from the config's componentsDir
    expect(content).not.toMatch(/from\s+['"]\.\.\/components\/toast\//)
    expect(content).toContain('components/ui/toast/')
  })

  it('does not overwrite existing composable when adding second component sharing same composable', async () => {
    await initProject(tmpDir)

    // stepper uses useSteps.ts
    await addCommand(['stepper'], { cwd: tmpDir })

    const composablePath = path.join(tmpDir, 'src', 'composables', 'useSteps.ts')
    expect(fs.existsSync(composablePath)).toBe(true)

    const originalContent = fs.readFileSync(composablePath, 'utf-8')

    // wizard also uses useSteps.ts — should not overwrite
    await addCommand(['wizard'], { cwd: tmpDir, overwrite: true })

    const afterContent = fs.readFileSync(composablePath, 'utf-8')
    expect(afterContent).toBe(originalContent)
  })

  it('records correct version and installedAt in lock', async () => {
    await initProject(tmpDir)

    const before = new Date().toISOString()
    await addCommand(['button'], { cwd: tmpDir })
    const after = new Date().toISOString()

    const lockPath = path.join(tmpDir, 'components.lock.json')
    const lock = JSON.parse(fs.readFileSync(lockPath, 'utf-8')) as ComponentLock

    expect(lock.components.button!.version).toBe('0.1.0')
    expect(lock.components.button!.installedAt).toBeDefined()

    // installedAt should be a valid ISO date string between before and after
    const installedAt = lock.components.button!.installedAt
    expect(installedAt >= before).toBe(true)
    expect(installedAt <= after).toBe(true)
  })
})
