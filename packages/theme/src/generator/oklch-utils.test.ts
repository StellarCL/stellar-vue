import { describe, expect, it } from 'vitest'
import {
  adjustChroma,
  adjustLightness,
  approximateContrastRatio,
  ensureContrast,
  hexToOklch,
  hexToOklchComponents,
  oklch,
  parseOklch,
  withHue,
} from './oklch-utils'

describe('oklch', () => {
  it('formats an OKLCH CSS string', () => {
    expect(oklch(0.55, 0.187, 285)).toBe('oklch(55.00% 0.187 285.00)')
  })

  it('handles zero values', () => {
    expect(oklch(0, 0, 0)).toBe('oklch(0.00% 0.000 0.00)')
  })

  it('handles full lightness', () => {
    expect(oklch(1, 0, 0)).toBe('oklch(100.00% 0.000 0.00)')
  })
})

describe('parseOklch', () => {
  it('parses a standard oklch string', () => {
    const result = parseOklch('oklch(55.00% 0.187 285.00)')
    expect(result).not.toBeNull()
    expect(result!.l).toBeCloseTo(0.55, 2)
    expect(result!.c).toBeCloseTo(0.187, 3)
    expect(result!.h).toBeCloseTo(285, 0)
  })

  it('returns null for invalid strings', () => {
    expect(parseOklch('rgb(255, 0, 0)')).toBeNull()
    expect(parseOklch('')).toBeNull()
    expect(parseOklch('oklch()')).toBeNull()
  })

  it('round-trips with oklch()', () => {
    const original = oklch(0.72, 0.15, 120.5)
    const parsed = parseOklch(original)
    expect(parsed).not.toBeNull()
    expect(parsed!.l).toBeCloseTo(0.72, 2)
    expect(parsed!.c).toBeCloseTo(0.15, 2)
    expect(parsed!.h).toBeCloseTo(120.5, 1)
  })
})

describe('hexToOklch', () => {
  it('converts white (#ffffff)', () => {
    const result = hexToOklch('#ffffff')
    const parsed = parseOklch(result)
    expect(parsed).not.toBeNull()
    expect(parsed!.l).toBeCloseTo(1, 1)
    expect(parsed!.c).toBeCloseTo(0, 2)
  })

  it('converts black (#000000)', () => {
    const result = hexToOklch('#000000')
    const parsed = parseOklch(result)
    expect(parsed).not.toBeNull()
    expect(parsed!.l).toBeCloseTo(0, 1)
  })

  it('converts a mid-range blue (#667eea)', () => {
    const result = hexToOklch('#667eea')
    const parsed = parseOklch(result)
    expect(parsed).not.toBeNull()
    // Should be a blue-ish color with moderate lightness
    expect(parsed!.l).toBeGreaterThan(0.4)
    expect(parsed!.l).toBeLessThan(0.8)
    expect(parsed!.c).toBeGreaterThan(0.05)
    // Hue in blue range (roughly 250-290)
    expect(parsed!.h).toBeGreaterThan(240)
    expect(parsed!.h).toBeLessThan(300)
  })

  it('handles shorthand hex (#f00)', () => {
    const result = hexToOklch('#f00')
    const parsed = parseOklch(result)
    expect(parsed).not.toBeNull()
    // Red should have hue around 20-30
    expect(parsed!.h).toBeGreaterThan(10)
    expect(parsed!.h).toBeLessThan(40)
  })
})

describe('hexToOklchComponents', () => {
  it('returns structured OklchColor', () => {
    const result = hexToOklchComponents('#667eea')
    expect(result).toHaveProperty('l')
    expect(result).toHaveProperty('c')
    expect(result).toHaveProperty('h')
    expect(typeof result.l).toBe('number')
  })
})

describe('adjustLightness', () => {
  it('increases lightness', () => {
    const base = oklch(0.5, 0.15, 285)
    const lighter = adjustLightness(base, 0.1)
    const parsed = parseOklch(lighter)
    expect(parsed!.l).toBeCloseTo(0.6, 2)
  })

  it('decreases lightness', () => {
    const base = oklch(0.5, 0.15, 285)
    const darker = adjustLightness(base, -0.1)
    const parsed = parseOklch(darker)
    expect(parsed!.l).toBeCloseTo(0.4, 2)
  })

  it('clamps to 0', () => {
    const base = oklch(0.05, 0.15, 285)
    const result = adjustLightness(base, -0.5)
    const parsed = parseOklch(result)
    expect(parsed!.l).toBe(0)
  })

  it('clamps to 1', () => {
    const base = oklch(0.95, 0.15, 285)
    const result = adjustLightness(base, 0.5)
    const parsed = parseOklch(result)
    expect(parsed!.l).toBe(1)
  })

  it('returns original on invalid input', () => {
    expect(adjustLightness('invalid', 0.1)).toBe('invalid')
  })
})

describe('adjustChroma', () => {
  it('scales chroma up', () => {
    const base = oklch(0.5, 0.1, 285)
    const result = adjustChroma(base, 2)
    const parsed = parseOklch(result)
    expect(parsed!.c).toBeCloseTo(0.2, 2)
  })

  it('scales chroma down', () => {
    const base = oklch(0.5, 0.2, 285)
    const result = adjustChroma(base, 0.5)
    const parsed = parseOklch(result)
    expect(parsed!.c).toBeCloseTo(0.1, 2)
  })

  it('clamps chroma to max 0.4', () => {
    const base = oklch(0.5, 0.3, 285)
    const result = adjustChroma(base, 5)
    const parsed = parseOklch(result)
    expect(parsed!.c).toBeLessThanOrEqual(0.4)
  })
})

describe('withHue', () => {
  it('replaces hue', () => {
    const base = oklch(0.5, 0.15, 285)
    const result = withHue(base, 120)
    const parsed = parseOklch(result)
    expect(parsed!.h).toBeCloseTo(120, 0)
    expect(parsed!.l).toBeCloseTo(0.5, 2)
    expect(parsed!.c).toBeCloseTo(0.15, 2)
  })
})

describe('approximateContrastRatio', () => {
  it('returns high ratio for black on white', () => {
    const ratio = approximateContrastRatio(oklch(1, 0, 0), oklch(0, 0, 0))
    expect(ratio).toBeGreaterThan(15)
  })

  it('returns 1 for same color', () => {
    const color = oklch(0.5, 0.15, 285)
    const ratio = approximateContrastRatio(color, color)
    expect(ratio).toBeCloseTo(1, 0)
  })

  it('returns 0 for invalid input', () => {
    expect(approximateContrastRatio('invalid', oklch(0.5, 0, 0))).toBe(0)
  })

  it('computes reasonable ratio for mid-range colors', () => {
    const ratio = approximateContrastRatio(oklch(0.95, 0, 0), oklch(0.2, 0, 0))
    // Should be a good contrast
    expect(ratio).toBeGreaterThan(4)
  })
})

describe('ensureContrast', () => {
  it('returns hint when it passes contrast', () => {
    const bg = oklch(0.95, 0, 0) // light bg
    const hint = oklch(0.15, 0.02, 285) // dark fg
    const result = ensureContrast(bg, hint)
    expect(result).toBe(hint)
  })

  it('returns dark text for light backgrounds', () => {
    const bg = oklch(0.95, 0, 0)
    const result = ensureContrast(bg)
    const parsed = parseOklch(result)
    expect(parsed).not.toBeNull()
    expect(parsed!.l).toBeLessThan(0.3) // dark text
  })

  it('returns light text for dark backgrounds', () => {
    const bg = oklch(0.15, 0.02, 285)
    const result = ensureContrast(bg)
    const parsed = parseOklch(result)
    expect(parsed).not.toBeNull()
    expect(parsed!.l).toBeGreaterThan(0.8) // light text
  })

  it('always achieves WCAG AA contrast', () => {
    const testBgs = [
      oklch(0.3, 0.1, 285),
      oklch(0.5, 0.15, 145),
      oklch(0.7, 0.1, 80),
      oklch(0.9, 0, 0),
    ]

    for (const bg of testBgs) {
      const fg = ensureContrast(bg)
      const ratio = approximateContrastRatio(bg, fg)
      expect(ratio).toBeGreaterThanOrEqual(4.5)
    }
  })
})
