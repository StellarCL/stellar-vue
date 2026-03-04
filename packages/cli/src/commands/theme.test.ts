import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { generateThemeCss, generateThemeJson, generateThemeTailwind } from './theme'

// We need to mock prompts before importing the module under test
vi.mock('prompts', () => ({
  default: vi.fn(),
}))

// Helper to create a temp directory
function makeTempDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'stellar-theme-test-'))
}

// Helper to clean up
function cleanup(dir: string): void {
  fs.rmSync(dir, { recursive: true, force: true })
}

// Default palette for tests
const DEFAULT_PALETTE = {
  primary: '#667eea',
  secondary: '#e2e8f0',
  accent: '#764ba2',
  background: '#ffffff',
  foreground: '#1a1a2e',
}

describe('theme list', () => {
  it('outputs all 6 built-in themes', async () => {
    const { Command } = await import('commander')
    const program = new Command()
    program.exitOverride()

    // Import here to get fresh module
    const { registerThemeCommand: reg } = await import('./theme')
    reg(program)

    const logs: string[] = []
    const spy = vi.spyOn(console, 'log').mockImplementation((...args) => {
      logs.push(args.join(' '))
    })

    // Run the list command
    await program.parseAsync(['node', 'test', 'theme', 'list'])

    spy.mockRestore()

    const output = logs.join('\n')
    expect(output).toContain('stellar')
    expect(output).toContain('sirius')
    expect(output).toContain('polaris')
    expect(output).toContain('antares')
    expect(output).toContain('vega')
    expect(output).toContain('aldebaran')
  })

  it('shows descriptions for built-in themes', async () => {
    const { Command } = await import('commander')
    const program = new Command()
    program.exitOverride()

    const { registerThemeCommand: reg } = await import('./theme')
    reg(program)

    const logs: string[] = []
    const spy = vi.spyOn(console, 'log').mockImplementation((...args) => {
      logs.push(args.join(' '))
    })

    await program.parseAsync(['node', 'test', 'theme', 'list'])

    spy.mockRestore()

    const output = logs.join('\n')
    expect(output).toContain('Default cosmic theme')
    expect(output).toContain('Bright and energetic')
    expect(output).toContain('Cool and professional')
    expect(output).toContain('Warm and bold')
    expect(output).toContain('Clean and minimal')
    expect(output).toContain('Rich and sophisticated')
  })
})

describe('theme create', () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = makeTempDir()
  })

  afterEach(() => {
    cleanup(tmpDir)
  })

  it('generates a CSS file with --yes flag', async () => {
    const { Command } = await import('commander')
    const program = new Command()
    program.exitOverride()

    const { registerThemeCommand: reg } = await import('./theme')
    reg(program)

    const spy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await program.parseAsync(['node', 'test', 'theme', 'create', '--yes', '--cwd', tmpDir])

    spy.mockRestore()

    const themeFile = path.join(tmpDir, 'themes', 'my-theme.css')
    expect(fs.existsSync(themeFile)).toBe(true)

    const content = fs.readFileSync(themeFile, 'utf-8')
    expect(content).toContain('--color-primary:')
    expect(content).toContain('--color-background:')
    expect(content).toContain('--radius-md:')
    expect(content).toContain('my-theme')
    // Should contain all derived tokens
    expect(content).toContain('--color-secondary:')
    expect(content).toContain('--color-accent:')
    expect(content).toContain('--color-muted:')
    expect(content).toContain('--color-destructive:')
    expect(content).toContain('--color-card:')
    expect(content).toContain('--color-border:')
    expect(content).toContain('--color-ring:')
  })

  it('generates a CSS file using prompts with palette', async () => {
    const promptsMock = await import('prompts')
    const mockPrompts = vi.mocked(promptsMock.default)

    mockPrompts.mockResolvedValueOnce({
      themeName: 'test-theme',
      themeType: 'light',
      primary: '#667eea',
      secondary: '#e2e8f0',
      accent: '#764ba2',
      background: '#ffffff',
      foreground: '#1a1a2e',
      borderRadius: '0.375rem',
    })

    const { Command } = await import('commander')
    const program = new Command()
    program.exitOverride()

    const { registerThemeCommand: reg } = await import('./theme')
    reg(program)

    const spy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await program.parseAsync(['node', 'test', 'theme', 'create', '--cwd', tmpDir])

    spy.mockRestore()

    const themeFile = path.join(tmpDir, 'themes', 'test-theme.css')
    expect(fs.existsSync(themeFile)).toBe(true)

    const content = fs.readFileSync(themeFile, 'utf-8')
    expect(content).toContain('test-theme')
    expect(content).toContain('oklch')
    expect(content).toContain('0.375rem')
  })
})

describe('theme apply', () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = makeTempDir()
  })

  afterEach(() => {
    cleanup(tmpDir)
  })

  it('updates the config and writes CSS when a valid theme is applied', async () => {
    // Create a config file first
    const configData = {
      componentsDir: './components/ui',
      composablesDir: './composables',
      utilsDir: './lib',
      cssVariables: './assets/css/variables.css',
      tailwindConfig: './tailwind.config.ts',
      typescript: true,
      aliases: { '@': './src', '~': './' },
      framework: 'vue',
      features: { animations: true, forms: true, icons: 'lucide' },
    }
    fs.writeFileSync(
      path.join(tmpDir, '.stellar-ui.json'),
      JSON.stringify(configData, null, 2),
      'utf-8',
    )

    const { Command } = await import('commander')
    const program = new Command()
    program.exitOverride()

    const { registerThemeCommand: reg } = await import('./theme')
    reg(program)

    const spy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await program.parseAsync(['node', 'test', 'theme', 'apply', 'sirius', '--cwd', tmpDir])

    spy.mockRestore()

    // Check the config was updated
    const updated = JSON.parse(fs.readFileSync(path.join(tmpDir, '.stellar-ui.json'), 'utf-8'))
    expect(updated.theme).toBe('sirius')

    // Check the CSS variables file was written with the sirius theme
    const cssPath = path.join(tmpDir, 'assets', 'css', 'variables.css')
    expect(fs.existsSync(cssPath)).toBe(true)
    const cssContent = fs.readFileSync(cssPath, 'utf-8')
    expect(cssContent).toContain('Sirius')
  })

  it('applies a custom theme from themes/ directory', async () => {
    const configData = {
      componentsDir: './components/ui',
      composablesDir: './composables',
      utilsDir: './lib',
      cssVariables: './assets/css/variables.css',
      tailwindConfig: './tailwind.config.ts',
      typescript: true,
      aliases: { '@': './src', '~': './' },
      framework: 'vue',
      features: { animations: true, forms: true, icons: 'lucide' },
    }
    fs.writeFileSync(
      path.join(tmpDir, '.stellar-ui.json'),
      JSON.stringify(configData, null, 2),
      'utf-8',
    )

    // Create a custom theme file
    const themesDir = path.join(tmpDir, 'themes')
    fs.mkdirSync(themesDir, { recursive: true })
    const customCss = ':root { --color-primary: red; }\n'
    fs.writeFileSync(path.join(themesDir, 'my-custom.css'), customCss, 'utf-8')

    const { Command } = await import('commander')
    const program = new Command()
    program.exitOverride()

    const { registerThemeCommand: reg } = await import('./theme')
    reg(program)

    const spy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await program.parseAsync(['node', 'test', 'theme', 'apply', 'my-custom', '--cwd', tmpDir])

    spy.mockRestore()

    // Check the CSS variables file was written with the custom theme content
    const cssPath = path.join(tmpDir, 'assets', 'css', 'variables.css')
    expect(fs.existsSync(cssPath)).toBe(true)
    const cssContent = fs.readFileSync(cssPath, 'utf-8')
    expect(cssContent).toBe(customCss)
  })

  it('errors for unknown theme name', async () => {
    // Create a config file first
    const configData = {
      componentsDir: './components/ui',
      composablesDir: './composables',
      utilsDir: './lib',
      cssVariables: './assets/css/variables.css',
      tailwindConfig: './tailwind.config.ts',
      typescript: true,
      aliases: { '@': './src', '~': './' },
      framework: 'vue',
      features: { animations: true, forms: true, icons: 'lucide' },
    }
    fs.writeFileSync(
      path.join(tmpDir, '.stellar-ui.json'),
      JSON.stringify(configData, null, 2),
      'utf-8',
    )

    const { Command } = await import('commander')
    const program = new Command()
    program.exitOverride()

    const { registerThemeCommand: reg } = await import('./theme')
    reg(program)

    const logs: string[] = []
    const spy = vi.spyOn(console, 'log').mockImplementation((...args) => {
      logs.push(args.join(' '))
    })

    const originalExitCode = process.exitCode
    await program.parseAsync([
      'node',
      'test',
      'theme',
      'apply',
      'nonexistent-theme',
      '--cwd',
      tmpDir,
    ])

    spy.mockRestore()
    process.exitCode = originalExitCode

    const output = logs.join('\n')
    expect(output).toContain('Unknown theme')
    expect(output).toContain('nonexistent-theme')
  })

  it('errors when no config found', async () => {
    const { Command } = await import('commander')
    const program = new Command()
    program.exitOverride()

    const { registerThemeCommand: reg } = await import('./theme')
    reg(program)

    const logs: string[] = []
    const spy = vi.spyOn(console, 'log').mockImplementation((...args) => {
      logs.push(args.join(' '))
    })

    const originalExitCode = process.exitCode
    await program.parseAsync(['node', 'test', 'theme', 'apply', 'stellar', '--cwd', tmpDir])

    spy.mockRestore()
    process.exitCode = originalExitCode

    const output = logs.join('\n')
    expect(output).toContain('No Stellar UI config found')
  })
})

describe('theme export', () => {
  it('produces CSS custom properties for css format', async () => {
    const { Command } = await import('commander')
    const program = new Command()
    program.exitOverride()

    const { registerThemeCommand: reg } = await import('./theme')
    reg(program)

    const logs: string[] = []
    const spy = vi.spyOn(console, 'log').mockImplementation((...args) => {
      logs.push(args.join(' '))
    })

    await program.parseAsync(['node', 'test', 'theme', 'export', 'stellar', '--format', 'css'])

    spy.mockRestore()

    const output = logs.join('\n')
    expect(output).toContain('--color-primary:')
    expect(output).toContain('--color-background:')
    expect(output).toContain('@theme')
  })

  it('produces valid JSON for json format', async () => {
    const { Command } = await import('commander')
    const program = new Command()
    program.exitOverride()

    const { registerThemeCommand: reg } = await import('./theme')
    reg(program)

    const logs: string[] = []
    const spy = vi.spyOn(console, 'log').mockImplementation((...args) => {
      logs.push(args.join(' '))
    })

    await program.parseAsync(['node', 'test', 'theme', 'export', 'stellar', '--format', 'json'])

    spy.mockRestore()

    const output = logs.join('\n')
    // Should be parseable JSON
    expect(() => JSON.parse(output)).not.toThrow()
    const parsed = JSON.parse(output)
    expect(parsed).toHaveProperty('name', 'stellar')
    expect(parsed).toHaveProperty('colors')
    expect(parsed.colors).toHaveProperty('primary')
    expect(parsed).toHaveProperty('borderRadius')
  })

  it('produces a Tailwind config snippet for tailwind format', async () => {
    const { Command } = await import('commander')
    const program = new Command()
    program.exitOverride()

    const { registerThemeCommand: reg } = await import('./theme')
    reg(program)

    const logs: string[] = []
    const spy = vi.spyOn(console, 'log').mockImplementation((...args) => {
      logs.push(args.join(' '))
    })

    await program.parseAsync(['node', 'test', 'theme', 'export', 'stellar', '--format', 'tailwind'])

    spy.mockRestore()

    const output = logs.join('\n')
    expect(output).toContain('extend')
    expect(output).toContain('colors')
    expect(output).toContain('stellar')
    expect(output).toContain('var(--color-primary)')
    expect(output).toContain('borderRadius')
  })

  it('errors gracefully for unknown theme name', async () => {
    const { Command } = await import('commander')
    const program = new Command()
    program.exitOverride()

    const { registerThemeCommand: reg } = await import('./theme')
    reg(program)

    const logs: string[] = []
    const spy = vi.spyOn(console, 'log').mockImplementation((...args) => {
      logs.push(args.join(' '))
    })

    const originalExitCode = process.exitCode
    await program.parseAsync(['node', 'test', 'theme', 'export', 'unknown-theme-xyz'])

    spy.mockRestore()
    process.exitCode = originalExitCode

    const output = logs.join('\n')
    expect(output).toContain('Unknown theme')
    expect(output).toContain('unknown-theme-xyz')
  })
})

describe('generateThemeCss', () => {
  it('contains all required CSS custom properties', () => {
    const css = generateThemeCss('test', DEFAULT_PALETTE, '0.5rem')
    expect(css).toContain('--color-primary:')
    expect(css).toContain('--color-background:')
    expect(css).toContain('--color-foreground:')
    expect(css).toContain('--radius-md:')
    expect(css).toContain('@theme')
    expect(css).toContain('.dark')
  })

  it('contains all derived token properties', () => {
    const css = generateThemeCss('test', DEFAULT_PALETTE, '0.5rem')
    expect(css).toContain('--color-secondary:')
    expect(css).toContain('--color-accent:')
    expect(css).toContain('--color-muted:')
    expect(css).toContain('--color-destructive:')
    expect(css).toContain('--color-card:')
    expect(css).toContain('--color-popover:')
    expect(css).toContain('--color-border:')
    expect(css).toContain('--color-input:')
    expect(css).toContain('--color-ring:')
    expect(css).toContain('--color-success:')
    expect(css).toContain('--color-warning:')
    expect(css).toContain('--color-info:')
    expect(css).toContain('--color-error:')
  })

  it('produces oklch values from hex palette', () => {
    const css = generateThemeCss('test', DEFAULT_PALETTE, '0.25rem')
    expect(css).toContain('oklch(')
    expect(css).toContain('0.25rem')
  })
})

describe('generateThemeJson', () => {
  it('produces valid JSON with expected fields', () => {
    const json = generateThemeJson('my-theme', DEFAULT_PALETTE, '0.5rem')
    expect(() => JSON.parse(json)).not.toThrow()
    const parsed = JSON.parse(json)
    expect(parsed.name).toBe('my-theme')
    expect(parsed.palette).toBeDefined()
    expect(parsed.colors).toBeDefined()
    expect(parsed.borderRadius).toBe('0.5rem')
  })
})

describe('generateThemeTailwind', () => {
  it('contains expected tailwind config structure', () => {
    const tw = generateThemeTailwind('my-theme', '0.5rem')
    expect(tw).toContain('extend')
    expect(tw).toContain('colors')
    expect(tw).toContain('var(--color-primary)')
    expect(tw).toContain('borderRadius')
    expect(tw).toContain('var(--radius-md)')
    expect(tw).toContain('my-theme')
  })
})
