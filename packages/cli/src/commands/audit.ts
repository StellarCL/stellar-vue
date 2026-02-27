import fs from 'node:fs'
import path from 'node:path'
import { readConfig } from '../utils/config'
import { readLockFile } from '../utils/config'
import { styles, header, newLine, divider } from '../utils/prompts'

/**
 * Parse an oklch color string into lightness, chroma, hue.
 * Returns null if not parseable.
 */
function parseOklch(color: string): { l: number; c: number; h: number } | null {
  // Match: oklch(L% C H) or oklch(L C H)
  const match = color.match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)\s*\)/)
  if (!match) return null

  const l = parseFloat(match[1]) / (match[0].includes('%') ? 100 : 1)
  const c = parseFloat(match[2])
  const h = parseFloat(match[3])

  return { l, c, h }
}

/**
 * Parse a hex color string into RGB values (0-1 range).
 */
function parseHex(color: string): { r: number; g: number; b: number } | null {
  const clean = color.replace('#', '')
  if (clean.length !== 6 && clean.length !== 3) return null

  let r: number, g: number, b: number

  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16) / 255
    g = parseInt(clean[1] + clean[1], 16) / 255
    b = parseInt(clean[2] + clean[2], 16) / 255
  } else {
    r = parseInt(clean.slice(0, 2), 16) / 255
    g = parseInt(clean.slice(2, 4), 16) / 255
    b = parseInt(clean.slice(4, 6), 16) / 255
  }

  return { r, g, b }
}

/**
 * Convert a linear RGB channel to sRGB for luminance calculation.
 */
function linearize(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

/**
 * Compute relative luminance from hex color (WCAG definition).
 */
function luminanceFromHex(hex: string): number | null {
  const rgb = parseHex(hex)
  if (!rgb) return null

  const r = linearize(rgb.r)
  const g = linearize(rgb.g)
  const b = linearize(rgb.b)

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Approximate luminance from oklch color.
 * Uses the L (lightness) component as an approximation.
 * L in oklch is perceptually uniform, so L^2 approximates relative luminance.
 */
function luminanceFromOklch(color: string): number | null {
  const oklch = parseOklch(color)
  if (!oklch) return null

  // oklch L is in [0, 1] (after dividing by 100 if %)
  // Approximate relative luminance: L^2 is a reasonable approximation
  // for the perceptually-uniform OKLCH lightness
  return oklch.l * oklch.l
}

/**
 * Compute luminance from any color string (hex or oklch).
 */
export function computeLuminance(color: string): number | null {
  const trimmed = color.trim()
  if (trimmed.startsWith('#')) {
    return luminanceFromHex(trimmed)
  }
  if (trimmed.startsWith('oklch(')) {
    return luminanceFromOklch(trimmed)
  }
  return null
}

/**
 * Compute WCAG contrast ratio between two relative luminances.
 */
export function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Parse CSS file and extract --stellar-* variable pairs with their values.
 */
export function parseCssVariables(cssContent: string): Record<string, string> {
  const vars: Record<string, string> = {}
  // Match CSS custom property declarations
  const regex = /--([\w-]+)\s*:\s*([^;]+);/g
  let match: RegExpExecArray | null

  while ((match = regex.exec(cssContent)) !== null) {
    const name = match[1].trim()
    const value = match[2].trim()
    // Only include stellar variables
    if (name.startsWith('stellar-')) {
      vars[name] = value
    }
  }

  return vars
}

/**
 * Check contrast between foreground/background color pairs.
 */
export function checkContrastPairs(cssVariables: Record<string, string>): Array<{
  pair: string
  foreground: string
  background: string
  ratio: number
  passes: boolean
}> {
  const pairs = [
    { fg: 'stellar-foreground', bg: 'stellar-background' },
    { fg: 'stellar-primary-foreground', bg: 'stellar-primary' },
    { fg: 'stellar-secondary-foreground', bg: 'stellar-secondary' },
    { fg: 'stellar-muted-foreground', bg: 'stellar-muted' },
    { fg: 'stellar-accent-foreground', bg: 'stellar-accent' },
    { fg: 'stellar-destructive-foreground', bg: 'stellar-destructive' },
    { fg: 'stellar-card-foreground', bg: 'stellar-card' },
    { fg: 'stellar-popover-foreground', bg: 'stellar-popover' },
  ]

  const results = []

  for (const { fg, bg } of pairs) {
    const fgColor = cssVariables[fg]
    const bgColor = cssVariables[bg]

    if (!fgColor || !bgColor) continue

    const fgLum = computeLuminance(fgColor)
    const bgLum = computeLuminance(bgColor)

    if (fgLum === null || bgLum === null) continue

    const ratio = contrastRatio(fgLum, bgLum)
    const passes = ratio >= 4.5

    results.push({
      pair: `${fg} / ${bg}`,
      foreground: fgColor,
      background: bgColor,
      ratio,
      passes,
    })
  }

  return results
}

export async function auditCommand(options: {
  cwd?: string
  contrast?: boolean
  keyboard?: boolean
}): Promise<void> {
  const cwd = path.resolve(options.cwd ?? process.cwd())

  // --keyboard flag
  if (options.keyboard) {
    header('Stellar UI - Keyboard Navigation Audit')
    console.log(styles.info('Keyboard audit coming soon'))
    newLine()
    return
  }

  // --contrast flag
  if (options.contrast) {
    header('Stellar UI - Color Contrast Audit (WCAG AA)')

    const config = await readConfig(cwd)
    if (!config) {
      console.log(styles.error('No Stellar UI config found. Run `stellar-ui init` first.'))
      process.exitCode = 1
      return
    }

    const cssPath = path.join(cwd, config.cssVariables)
    if (!fs.existsSync(cssPath)) {
      console.log(styles.error(`CSS variables file not found: ${config.cssVariables}`))
      console.log(styles.dim('Run `stellar-ui init` to create the CSS variables file.'))
      process.exitCode = 1
      return
    }

    const cssContent = fs.readFileSync(cssPath, 'utf-8')
    const cssVariables = parseCssVariables(cssContent)

    if (Object.keys(cssVariables).length === 0) {
      console.log(styles.warning('No Stellar CSS variables found in the CSS file.'))
      newLine()
      return
    }

    const results = checkContrastPairs(cssVariables)

    if (results.length === 0) {
      console.log(styles.warning('No color pairs found to check.'))
      console.log(styles.dim('Make sure your CSS file contains --stellar-* color variables.'))
      newLine()
      return
    }

    let passing = 0
    let failing = 0

    for (const result of results) {
      const ratio = result.ratio.toFixed(2)
      const label = result.pair
      if (result.passes) {
        passing++
        console.log(`  ${styles.success(`PASS`)} ${styles.dim(label)} — ${ratio}:1`)
      } else {
        failing++
        console.log(`  ${styles.error(`FAIL`)} ${styles.dim(label)} — ${ratio}:1 (needs >= 4.5:1)`)
      }
    }

    newLine()
    divider()
    newLine()
    console.log(`  ${styles.highlight('Results:')} ${passing} passing, ${failing} failing`)
    newLine()

    if (failing > 0) {
      process.exitCode = 1
    }

    return
  }

  // Default audit (no flags)
  header('Stellar UI - Project Audit')

  const issues: string[] = []
  const checks: Array<{ label: string; ok: boolean; detail?: string }> = []

  // Check 1: Config exists
  const config = await readConfig(cwd)
  if (config) {
    checks.push({ label: 'Config file', ok: true, detail: '.stellar-ui.json found' })
  } else {
    checks.push({ label: 'Config file', ok: false, detail: 'Not found — run `stellar-ui init`' })
    issues.push('Missing config file')
  }

  // Check 2: Theme is set
  if (config) {
    const themeValue = (config as typeof config & { theme?: string }).theme
    if (themeValue) {
      checks.push({ label: 'Theme', ok: true, detail: `Theme: ${themeValue}` })
    } else {
      checks.push({ label: 'Theme', ok: false, detail: 'No theme set in config' })
      issues.push('No theme set')
    }
  }

  // Check 3: Lock file / components tracked
  const lock = await readLockFile(cwd)
  if (lock) {
    const count = Object.keys(lock.components).length
    checks.push({
      label: 'Components tracked',
      ok: true,
      detail: `${count} component${count !== 1 ? 's' : ''} in lock file`,
    })
  } else {
    checks.push({
      label: 'Components tracked',
      ok: false,
      detail: 'No lock file found',
    })
    issues.push('Missing lock file')
  }

  // Check 4: CSS variables file exists
  if (config) {
    const cssPath = path.join(cwd, config.cssVariables)
    if (fs.existsSync(cssPath)) {
      checks.push({ label: 'CSS variables file', ok: true, detail: config.cssVariables })
    } else {
      checks.push({
        label: 'CSS variables file',
        ok: false,
        detail: `Not found at ${config.cssVariables}`,
      })
      issues.push('Missing CSS variables file')
    }
  }

  // Print results
  for (const check of checks) {
    if (check.ok) {
      console.log(`  ${styles.success(check.label)}${check.detail ? styles.dim(` — ${check.detail}`) : ''}`)
    } else {
      console.log(`  ${styles.error(check.label)}${check.detail ? styles.dim(` — ${check.detail}`) : ''}`)
    }
  }

  newLine()
  divider()
  newLine()

  if (issues.length === 0) {
    console.log(styles.success('All checks passed!'))
  } else {
    console.log(styles.warning(`${issues.length} issue${issues.length !== 1 ? 's' : ''} found:`))
    for (const issue of issues) {
      console.log(`  ${styles.dim('•')} ${issue}`)
    }
    process.exitCode = 1
  }

  newLine()
}
