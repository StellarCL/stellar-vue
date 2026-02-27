import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { auditCommand, computeLuminance, contrastRatio, parseCssVariables, checkContrastPairs } from './audit'

function makeTempDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'stellar-audit-test-'))
}

function cleanup(dir: string): void {
  fs.rmSync(dir, { recursive: true, force: true })
}

const SAMPLE_CONFIG = {
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

const SAMPLE_CSS = `/* Sample CSS */
:root {
  --stellar-background: oklch(100% 0 0);
  --stellar-foreground: oklch(12% 0.03 285);
  --stellar-primary: oklch(55% 0.187 285);
  --stellar-primary-foreground: oklch(98% 0.01 285);
  --stellar-secondary: oklch(94% 0.02 285);
  --stellar-secondary-foreground: oklch(18% 0.03 285);
  --stellar-muted: oklch(95% 0.01 285);
  --stellar-muted-foreground: oklch(42% 0.02 285);
  --stellar-accent: oklch(93% 0.04 285);
  --stellar-accent-foreground: oklch(18% 0.03 285);
  --stellar-destructive: oklch(50% 0.2 27);
  --stellar-destructive-foreground: oklch(98% 0 0);
  --stellar-card: oklch(99% 0.005 285);
  --stellar-card-foreground: oklch(12% 0.03 285);
  --stellar-popover: oklch(99% 0.005 285);
  --stellar-popover-foreground: oklch(12% 0.03 285);
  --stellar-border: oklch(91% 0.01 285);
  --stellar-input: oklch(91% 0.01 285);
  --stellar-ring: oklch(55% 0.187 285);
  --stellar-radius: 0.5rem;
}
`

describe('auditCommand - basic audit', () => {
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
    process.exitCode = undefined
  })

  it('runs without error when config exists', async () => {
    fs.writeFileSync(
      path.join(tmpDir, '.stellar-ui.json'),
      JSON.stringify(SAMPLE_CONFIG, null, 2),
      'utf-8',
    )

    // Create CSS file
    const cssDir = path.join(tmpDir, 'assets', 'css')
    fs.mkdirSync(cssDir, { recursive: true })
    fs.writeFileSync(path.join(cssDir, 'variables.css'), SAMPLE_CSS, 'utf-8')

    // Create lock file
    fs.writeFileSync(
      path.join(tmpDir, 'components.lock.json'),
      JSON.stringify({ version: '1.0.0', components: {} }, null, 2),
      'utf-8',
    )

    await auditCommand({ cwd: tmpDir })

    const output = logs.join('\n')
    expect(output).toContain('Audit')
    // Should find config
    expect(output).toContain('Config file')
  })

  it('errors when no config found', async () => {
    // No config file in tmpDir
    await auditCommand({ cwd: tmpDir })

    const output = logs.join('\n')
    // Should mention config missing
    expect(output).toContain('Config file')
    expect(process.exitCode).toBe(1)
  })

  it('reports issues when config is missing', async () => {
    await auditCommand({ cwd: tmpDir })

    const output = logs.join('\n')
    expect(output).toContain('issue')
  })

  it('shows all passing checks when everything is set up correctly', async () => {
    fs.writeFileSync(
      path.join(tmpDir, '.stellar-ui.json'),
      JSON.stringify({ ...SAMPLE_CONFIG, theme: 'stellar' }, null, 2),
      'utf-8',
    )

    const cssDir = path.join(tmpDir, 'assets', 'css')
    fs.mkdirSync(cssDir, { recursive: true })
    fs.writeFileSync(path.join(cssDir, 'variables.css'), SAMPLE_CSS, 'utf-8')

    fs.writeFileSync(
      path.join(tmpDir, 'components.lock.json'),
      JSON.stringify({ version: '1.0.0', components: {} }, null, 2),
      'utf-8',
    )

    await auditCommand({ cwd: tmpDir })

    const output = logs.join('\n')
    expect(output).toContain('All checks passed')
  })
})

describe('auditCommand - keyboard flag', () => {
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
    process.exitCode = undefined
  })

  it('shows placeholder message for --keyboard', async () => {
    await auditCommand({ cwd: tmpDir, keyboard: true })

    const output = logs.join('\n')
    expect(output.toLowerCase()).toContain('keyboard')
    expect(output.toLowerCase()).toContain('coming soon')
  })
})

describe('auditCommand - contrast flag', () => {
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
    process.exitCode = undefined
  })

  it('parses CSS file and reports contrast results', async () => {
    fs.writeFileSync(
      path.join(tmpDir, '.stellar-ui.json'),
      JSON.stringify(SAMPLE_CONFIG, null, 2),
      'utf-8',
    )

    const cssDir = path.join(tmpDir, 'assets', 'css')
    fs.mkdirSync(cssDir, { recursive: true })
    fs.writeFileSync(path.join(cssDir, 'variables.css'), SAMPLE_CSS, 'utf-8')

    await auditCommand({ cwd: tmpDir, contrast: true })

    const output = logs.join('\n')
    // Should show PASS or FAIL for color pairs
    expect(output).toMatch(/PASS|FAIL/)
    // Should show ratio values
    expect(output).toMatch(/\d+\.\d+:1/)
  })

  it('shows error when no config found with --contrast', async () => {
    await auditCommand({ cwd: tmpDir, contrast: true })

    const output = logs.join('\n')
    expect(output).toContain('No Stellar UI config found')
    expect(process.exitCode).toBe(1)
  })

  it('errors when CSS file is missing', async () => {
    fs.writeFileSync(
      path.join(tmpDir, '.stellar-ui.json'),
      JSON.stringify(SAMPLE_CONFIG, null, 2),
      'utf-8',
    )
    // Do NOT create the CSS file

    await auditCommand({ cwd: tmpDir, contrast: true })

    const output = logs.join('\n')
    expect(output).toContain('not found')
    expect(process.exitCode).toBe(1)
  })
})

describe('parseCssVariables', () => {
  it('extracts stellar CSS custom properties', () => {
    const vars = parseCssVariables(SAMPLE_CSS)
    expect(vars['stellar-background']).toBe('oklch(100% 0 0)')
    expect(vars['stellar-foreground']).toBe('oklch(12% 0.03 285)')
    expect(vars['stellar-primary']).toBe('oklch(55% 0.187 285)')
  })

  it('ignores non-stellar variables', () => {
    const css = `
      :root {
        --other-color: red;
        --stellar-primary: oklch(55% 0.187 285);
      }
    `
    const vars = parseCssVariables(css)
    expect(vars['other-color']).toBeUndefined()
    expect(vars['stellar-primary']).toBe('oklch(55% 0.187 285)')
  })

  it('handles empty CSS', () => {
    const vars = parseCssVariables('')
    expect(Object.keys(vars)).toHaveLength(0)
  })
})

describe('computeLuminance', () => {
  it('computes luminance from oklch color', () => {
    // White in oklch: L=100%, so luminance should be ~1.0
    const whiteLum = computeLuminance('oklch(100% 0 0)')
    expect(whiteLum).not.toBeNull()
    expect(whiteLum!).toBeCloseTo(1.0, 1)

    // Black in oklch: L=0%, so luminance should be ~0.0
    const blackLum = computeLuminance('oklch(0% 0 0)')
    expect(blackLum).not.toBeNull()
    expect(blackLum!).toBeCloseTo(0.0, 1)
  })

  it('computes luminance from hex color', () => {
    // White
    const whiteLum = computeLuminance('#ffffff')
    expect(whiteLum).not.toBeNull()
    expect(whiteLum!).toBeCloseTo(1.0, 2)

    // Black
    const blackLum = computeLuminance('#000000')
    expect(blackLum).not.toBeNull()
    expect(blackLum!).toBeCloseTo(0.0, 2)
  })

  it('returns null for unsupported color format', () => {
    const lum = computeLuminance('rgb(255, 0, 0)')
    expect(lum).toBeNull()
  })
})

describe('contrastRatio', () => {
  it('computes maximum contrast for black/white', () => {
    // White luminance = 1.0, Black luminance = 0.0
    const ratio = contrastRatio(1.0, 0.0)
    expect(ratio).toBeCloseTo(21, 0)
  })

  it('computes ratio of 1:1 for same luminance', () => {
    const ratio = contrastRatio(0.5, 0.5)
    expect(ratio).toBe(1.0)
  })

  it('WCAG AA requires >= 4.5:1', () => {
    // High contrast pair
    const highRatio = contrastRatio(1.0, 0.0)
    expect(highRatio).toBeGreaterThanOrEqual(4.5)

    // Low contrast pair (similar grays)
    const lowRatio = contrastRatio(0.5, 0.4)
    expect(lowRatio).toBeLessThan(4.5)
  })
})

describe('checkContrastPairs', () => {
  it('returns results for color pairs', () => {
    const vars = parseCssVariables(SAMPLE_CSS)
    const results = checkContrastPairs(vars)

    expect(results.length).toBeGreaterThan(0)
    for (const result of results) {
      expect(result).toHaveProperty('pair')
      expect(result).toHaveProperty('foreground')
      expect(result).toHaveProperty('background')
      expect(result).toHaveProperty('ratio')
      expect(result).toHaveProperty('passes')
      expect(typeof result.ratio).toBe('number')
      expect(typeof result.passes).toBe('boolean')
    }
  })

  it('identifies high contrast pairs as passing', () => {
    // Very light bg, very dark fg = high contrast
    const vars: Record<string, string> = {
      'stellar-background': 'oklch(100% 0 0)',     // white
      'stellar-foreground': 'oklch(0% 0 0)',        // black
    }
    const results = checkContrastPairs(vars)

    const fgBgPair = results.find(r => r.pair.includes('stellar-foreground'))
    expect(fgBgPair).toBeDefined()
    expect(fgBgPair!.passes).toBe(true)
  })

  it('identifies low contrast pairs as failing', () => {
    // Very similar lightness values = low contrast
    const vars: Record<string, string> = {
      'stellar-background': 'oklch(80% 0 0)',
      'stellar-foreground': 'oklch(70% 0 0)',
    }
    const results = checkContrastPairs(vars)

    const fgBgPair = results.find(r => r.pair.includes('stellar-foreground'))
    expect(fgBgPair).toBeDefined()
    expect(fgBgPair!.passes).toBe(false)
  })

  it('skips pairs where variables are missing', () => {
    // Only provide foreground, not background
    const vars: Record<string, string> = {
      'stellar-foreground': 'oklch(12% 0.03 285)',
    }
    const results = checkContrastPairs(vars)
    // No pair should be reported since background is missing
    const fgBgPair = results.find(r => r.pair === 'stellar-foreground / stellar-background')
    expect(fgBgPair).toBeUndefined()
  })
})
