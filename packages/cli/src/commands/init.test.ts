import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { StellarConfig } from '../types'

// Mock prompts module
vi.mock('prompts', () => ({
  default: vi.fn(),
}))

// Mock ora module
vi.mock('ora', () => ({
  default: vi.fn(() => ({
    start: vi.fn().mockReturnThis(),
    succeed: vi.fn().mockReturnThis(),
    fail: vi.fn().mockReturnThis(),
    stop: vi.fn().mockReturnThis(),
  })),
}))

import prompts from 'prompts'
import { initCommand } from './init'

describe('init command', () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stellar-cli-init-test-'))
    vi.clearAllMocks()
    // Suppress console output during tests
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
    vi.restoreAllMocks()
  })

  describe('framework detection', () => {
    it('detects nuxt when nuxt.config.ts exists', async () => {
      fs.writeFileSync(path.join(tmpDir, 'nuxt.config.ts'), 'export default {}', 'utf-8')

      // Use --yes to skip prompts
      await initCommand({ cwd: tmpDir, yes: true })

      const jsonPath = path.join(tmpDir, '.stellar-ui.json')
      expect(fs.existsSync(jsonPath)).toBe(true)

      const config = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) as StellarConfig
      expect(config.framework).toBe('nuxt')
    })

    it('defaults to vue when no nuxt config exists', async () => {
      await initCommand({ cwd: tmpDir, yes: true })

      const jsonPath = path.join(tmpDir, '.stellar-ui.json')
      const config = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) as StellarConfig
      expect(config.framework).toBe('vue')
    })
  })

  describe('file creation', () => {
    it('creates config file with correct structure', async () => {
      await initCommand({ cwd: tmpDir, yes: true })

      const jsonPath = path.join(tmpDir, '.stellar-ui.json')
      expect(fs.existsSync(jsonPath)).toBe(true)

      const config = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) as StellarConfig
      expect(config).toHaveProperty('componentsDir')
      expect(config).toHaveProperty('composablesDir')
      expect(config).toHaveProperty('utilsDir')
      expect(config).toHaveProperty('cssVariables')
      expect(config).toHaveProperty('tailwindConfig')
      expect(config).toHaveProperty('typescript')
      expect(config).toHaveProperty('aliases')
      expect(config).toHaveProperty('framework')
      expect(config).toHaveProperty('features')

      const tsPath = path.join(tmpDir, 'stellar-ui.config.ts')
      expect(fs.existsSync(tsPath)).toBe(true)
    })

    it('creates lock file with correct structure', async () => {
      await initCommand({ cwd: tmpDir, yes: true })

      const lockPath = path.join(tmpDir, 'components.lock.json')
      expect(fs.existsSync(lockPath)).toBe(true)

      const lock = JSON.parse(fs.readFileSync(lockPath, 'utf-8'))
      expect(lock.version).toBe('1.0.0')
      expect(lock.components).toEqual({})
    })

    it('creates CSS file', async () => {
      await initCommand({ cwd: tmpDir, yes: true })

      const cssPath = path.join(tmpDir, 'assets', 'css', 'variables.css')
      expect(fs.existsSync(cssPath)).toBe(true)

      const cssContent = fs.readFileSync(cssPath, 'utf-8')
      expect(cssContent).toContain('--stellar-primary')
      expect(cssContent).toContain('Stellar UI')
    })
  })

  describe('existing config handling', () => {
    it('prompts overwrite when config already exists', async () => {
      // Create initial config
      await initCommand({ cwd: tmpDir, yes: true })

      // Mock prompts to simulate user cancelling overwrite
      vi.mocked(prompts).mockResolvedValueOnce({ overwrite: false })

      await initCommand({ cwd: tmpDir })

      // Should have called prompts with the overwrite question
      expect(prompts).toHaveBeenCalled()
    })

    it('overwrites config with --yes flag when config exists', async () => {
      // Create initial config
      await initCommand({ cwd: tmpDir, yes: true })

      // Modify the config to verify it gets overwritten
      const jsonPath = path.join(tmpDir, '.stellar-ui.json')
      const original = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
      original.framework = 'nuxt'
      fs.writeFileSync(jsonPath, JSON.stringify(original), 'utf-8')

      // Run init again with --yes (no nuxt.config.ts, so defaults to vue)
      await initCommand({ cwd: tmpDir, yes: true })

      const config = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) as StellarConfig
      expect(config.framework).toBe('vue')
    })
  })

  describe('--yes flag', () => {
    it('skips prompts and uses defaults', async () => {
      await initCommand({ cwd: tmpDir, yes: true })

      // prompts should not have been called
      expect(prompts).not.toHaveBeenCalled()

      // Verify all files exist
      expect(fs.existsSync(path.join(tmpDir, '.stellar-ui.json'))).toBe(true)
      expect(fs.existsSync(path.join(tmpDir, 'stellar-ui.config.ts'))).toBe(true)
      expect(fs.existsSync(path.join(tmpDir, 'components.lock.json'))).toBe(true)
      expect(fs.existsSync(path.join(tmpDir, 'assets', 'css', 'variables.css'))).toBe(true)

      // Verify defaults were used
      const config = JSON.parse(
        fs.readFileSync(path.join(tmpDir, '.stellar-ui.json'), 'utf-8'),
      ) as StellarConfig
      expect(config.componentsDir).toBe('./components/ui')
      expect(config.composablesDir).toBe('./composables')
      expect(config.typescript).toBe(true)
      expect(config.features.animations).toBe(true)
      expect(config.features.icons).toBe('lucide')
    })
  })

  describe('interactive prompts', () => {
    it('uses responses from prompts to build config', async () => {
      vi.mocked(prompts).mockResolvedValueOnce({
        framework: 'nuxt',
        componentsDir: './custom/ui',
        composablesDir: './custom/composables',
        utilsDir: './custom/utils',
        theme: 'sirius',
        animations: false,
        icons: 'heroicons',
      })

      await initCommand({ cwd: tmpDir })

      const jsonPath = path.join(tmpDir, '.stellar-ui.json')
      expect(fs.existsSync(jsonPath)).toBe(true)

      const config = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) as StellarConfig
      expect(config.framework).toBe('nuxt')
      expect(config.componentsDir).toBe('./custom/ui')
      expect(config.composablesDir).toBe('./custom/composables')
      expect(config.utilsDir).toBe('./custom/utils')
      expect(config.features.animations).toBe(false)
      expect(config.features.icons).toBe('heroicons')
    })
  })
})
