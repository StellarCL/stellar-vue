import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { defineConfig } from '../types'
import {
  DEFAULT_CONFIG,
  findConfig,
  readConfig,
  readLockFile,
  writeConfig,
  writeLockFile,
} from './config'

describe('config utils', () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stellar-cli-test-'))
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })

  describe('defineConfig', () => {
    it('returns full config with Vue defaults when called with empty object', () => {
      const config = defineConfig({})

      // Vue framework defaults to src/-prefixed paths
      expect(config.componentsDir).toBe('./src/components/ui')
      expect(config.composablesDir).toBe('./src/composables')
      expect(config.utilsDir).toBe('./src/lib')
      expect(config.cssVariables).toBe('./src/assets/css/variables.css')
      expect(config.tailwindConfig).toBe('./tailwind.config.ts')
      expect(config.typescript).toBe(true)
      expect(config.framework).toBe('vue')
      expect(config.aliases).toEqual({ '@': './src', '~': './' })
      expect(config.features).toEqual({
        animations: true,
        forms: true,
        icons: 'lucide',
      })
    })

    it('merges partial config with defaults', () => {
      const config = defineConfig({
        framework: 'nuxt',
        componentsDir: './custom/components',
        features: {
          animations: false,
          forms: true,
          icons: 'heroicons',
        },
      })

      expect(config.framework).toBe('nuxt')
      expect(config.componentsDir).toBe('./custom/components')
      // Nuxt defaults for non-overridden paths (root-level)
      expect(config.composablesDir).toBe('./composables')
      expect(config.utilsDir).toBe('./lib')
      expect(config.cssVariables).toBe('./assets/css/variables.css')
      expect(config.typescript).toBe(true)
      // Features merged
      expect(config.features.animations).toBe(false)
      expect(config.features.icons).toBe('heroicons')
    })

    it('uses src/-prefixed paths for Vue framework', () => {
      const config = defineConfig({ framework: 'vue' })

      expect(config.componentsDir).toBe('./src/components/ui')
      expect(config.composablesDir).toBe('./src/composables')
      expect(config.utilsDir).toBe('./src/lib')
      expect(config.cssVariables).toBe('./src/assets/css/variables.css')
    })

    it('uses root-level paths for Nuxt framework', () => {
      const config = defineConfig({ framework: 'nuxt' })

      expect(config.componentsDir).toBe('./components/ui')
      expect(config.composablesDir).toBe('./composables')
      expect(config.utilsDir).toBe('./lib')
      expect(config.cssVariables).toBe('./assets/css/variables.css')
    })
  })

  describe('dEFAULT_CONFIG', () => {
    it('has all required fields', () => {
      expect(DEFAULT_CONFIG).toHaveProperty('componentsDir')
      expect(DEFAULT_CONFIG).toHaveProperty('composablesDir')
      expect(DEFAULT_CONFIG).toHaveProperty('utilsDir')
      expect(DEFAULT_CONFIG).toHaveProperty('cssVariables')
      expect(DEFAULT_CONFIG).toHaveProperty('tailwindConfig')
      expect(DEFAULT_CONFIG).toHaveProperty('typescript')
      expect(DEFAULT_CONFIG).toHaveProperty('aliases')
      expect(DEFAULT_CONFIG).toHaveProperty('framework')
      expect(DEFAULT_CONFIG).toHaveProperty('features')
      expect(DEFAULT_CONFIG.features).toHaveProperty('animations')
      expect(DEFAULT_CONFIG.features).toHaveProperty('forms')
      expect(DEFAULT_CONFIG.features).toHaveProperty('icons')
    })
  })

  describe('writeConfig', () => {
    it('creates both .stellar-ui.json and stellar-ui.config.ts files', async () => {
      const config = defineConfig({ framework: 'nuxt' })
      await writeConfig(config, tmpDir)

      const jsonPath = path.join(tmpDir, '.stellar-ui.json')
      const tsPath = path.join(tmpDir, 'stellar-ui.config.ts')

      expect(fs.existsSync(jsonPath)).toBe(true)
      expect(fs.existsSync(tsPath)).toBe(true)

      // Verify JSON is valid
      const jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
      expect(jsonContent.framework).toBe('nuxt')

      // Verify TS file contains import and defineConfig
      const tsContent = fs.readFileSync(tsPath, 'utf-8')
      expect(tsContent).toContain('import { defineConfig }')
      expect(tsContent).toContain('framework: \'nuxt\'')
    })
  })

  describe('readConfig', () => {
    it('reads .stellar-ui.json correctly', async () => {
      const config = defineConfig({ framework: 'nuxt', componentsDir: './my-components' })
      await writeConfig(config, tmpDir)

      const readBack = await readConfig(tmpDir)
      expect(readBack).not.toBeNull()
      expect(readBack!.framework).toBe('nuxt')
      expect(readBack!.componentsDir).toBe('./my-components')
    })

    it('returns null when no config exists', async () => {
      const result = await readConfig(tmpDir)
      expect(result).toBeNull()
    })
  })

  describe('findConfig', () => {
    it('finds config in the given directory', async () => {
      await writeConfig(defineConfig({}), tmpDir)

      const found = await findConfig(tmpDir)
      expect(found).toBe(tmpDir)
    })

    it('finds config in parent directory', async () => {
      await writeConfig(defineConfig({}), tmpDir)
      const subDir = path.join(tmpDir, 'sub', 'deep')
      fs.mkdirSync(subDir, { recursive: true })

      const found = await findConfig(subDir)
      expect(found).toBe(tmpDir)
    })

    it('returns null when no config exists', async () => {
      const found = await findConfig(tmpDir)
      expect(found).toBeNull()
    })
  })

  describe('writeLockFile', () => {
    it('creates valid components.lock.json', async () => {
      const lock = {
        version: '1.0.0',
        components: {
          button: {
            version: '0.1.0',
            installedAt: '2026-02-27T10:30:00.000Z',
            customized: false,
            files: ['components/ui/button/Button.vue'],
            dependencies: { 'radix-vue': '^1.9.0' },
          },
        },
      }

      await writeLockFile(lock, tmpDir)

      const lockPath = path.join(tmpDir, 'components.lock.json')
      expect(fs.existsSync(lockPath)).toBe(true)

      const content = JSON.parse(fs.readFileSync(lockPath, 'utf-8'))
      expect(content.version).toBe('1.0.0')
      expect(content.components.button.version).toBe('0.1.0')
      expect(content.components.button.customized).toBe(false)
    })
  })

  describe('readLockFile', () => {
    it('reads lock file correctly', async () => {
      const lock = {
        version: '1.0.0',
        components: {
          button: {
            version: '0.1.0',
            installedAt: '2026-02-27T10:30:00.000Z',
            customized: false,
            files: ['components/ui/button/Button.vue'],
            dependencies: {},
          },
        },
      }

      // Write config first (so findConfig works), then lock file
      await writeConfig(defineConfig({}), tmpDir)
      await writeLockFile(lock, tmpDir)

      const readBack = await readLockFile(tmpDir)
      expect(readBack).not.toBeNull()
      expect(readBack!.version).toBe('1.0.0')
      expect(readBack!.components.button).toBeDefined()
      expect(readBack!.components.button!.version).toBe('0.1.0')
    })

    it('returns null when no lock file exists', async () => {
      const result = await readLockFile(tmpDir)
      expect(result).toBeNull()
    })
  })
})
