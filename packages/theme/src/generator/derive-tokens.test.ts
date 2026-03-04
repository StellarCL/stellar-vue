import type { ThemePalette } from './derive-tokens'
import { describe, expect, it } from 'vitest'
import { derivePaletteFromBrandColor, deriveTokensFromPalette } from './derive-tokens'
import { approximateContrastRatio, parseOklch } from './oklch-utils'

const STELLAR_PALETTE: ThemePalette = {
  primary: '#667eea',
  secondary: '#e2e8f0',
  accent: '#764ba2',
  background: '#ffffff',
  foreground: '#1a1a2e',
}

const DARK_PALETTE: ThemePalette = {
  primary: '#667eea',
  secondary: '#2d3748',
  accent: '#764ba2',
  background: '#1a1a2e',
  foreground: '#f5f5f5',
}

describe('deriveTokensFromPalette', () => {
  it('produces all required token keys for light theme', () => {
    const tokens = deriveTokensFromPalette(STELLAR_PALETTE, 'light')

    // All top-level keys
    expect(tokens).toHaveProperty('background')
    expect(tokens).toHaveProperty('foreground')
    expect(tokens).toHaveProperty('primary')
    expect(tokens).toHaveProperty('primaryFocus')
    expect(tokens).toHaveProperty('secondary')
    expect(tokens).toHaveProperty('accent')
    expect(tokens).toHaveProperty('destructive')
    expect(tokens).toHaveProperty('error')
    expect(tokens).toHaveProperty('errorFocus')
    expect(tokens).toHaveProperty('muted')
    expect(tokens).toHaveProperty('card')
    expect(tokens).toHaveProperty('popover')
    expect(tokens).toHaveProperty('border')
    expect(tokens).toHaveProperty('input')
    expect(tokens).toHaveProperty('ring')
    expect(tokens).toHaveProperty('success')
    expect(tokens).toHaveProperty('successFocus')
    expect(tokens).toHaveProperty('warning')
    expect(tokens).toHaveProperty('warningFocus')
    expect(tokens).toHaveProperty('info')
    expect(tokens).toHaveProperty('infoFocus')
  })

  it('uses palette colors as base for primary/secondary/accent', () => {
    const tokens = deriveTokensFromPalette(STELLAR_PALETTE, 'light')

    // Primary should be derived from the palette primary hex
    expect(tokens.primary.DEFAULT).toContain('oklch')
    expect(tokens.secondary.DEFAULT).toContain('oklch')
    expect(tokens.accent.DEFAULT).toContain('oklch')
  })

  it('all color pairs have valid oklch values', () => {
    const tokens = deriveTokensFromPalette(STELLAR_PALETTE, 'light')

    const allColors = [
      tokens.background,
      tokens.foreground,
      tokens.primary.DEFAULT,
      tokens.primary.foreground,
      tokens.secondary.DEFAULT,
      tokens.secondary.foreground,
      tokens.accent.DEFAULT,
      tokens.accent.foreground,
      tokens.destructive.DEFAULT,
      tokens.destructive.foreground,
      tokens.muted.DEFAULT,
      tokens.muted.foreground,
      tokens.card.DEFAULT,
      tokens.card.foreground,
      tokens.popover.DEFAULT,
      tokens.popover.foreground,
      tokens.border,
      tokens.input,
      tokens.ring,
      tokens.success.DEFAULT,
      tokens.success.foreground,
      tokens.warning.DEFAULT,
      tokens.warning.foreground,
      tokens.info.DEFAULT,
      tokens.info.foreground,
      tokens.primaryFocus,
      tokens.errorFocus,
      tokens.successFocus,
      tokens.warningFocus,
      tokens.infoFocus,
    ]

    for (const color of allColors) {
      expect(color).toContain('oklch')
      expect(parseOklch(color)).not.toBeNull()
    }
  })

  it('passes WCAG AA for all foreground/background pairs (light)', () => {
    const tokens = deriveTokensFromPalette(STELLAR_PALETTE, 'light')
    const AA = 4.5

    const pairs = [
      { name: 'background', bg: tokens.background, fg: tokens.foreground },
      { name: 'primary', bg: tokens.primary.DEFAULT, fg: tokens.primary.foreground },
      { name: 'secondary', bg: tokens.secondary.DEFAULT, fg: tokens.secondary.foreground },
      { name: 'accent', bg: tokens.accent.DEFAULT, fg: tokens.accent.foreground },
      { name: 'destructive', bg: tokens.destructive.DEFAULT, fg: tokens.destructive.foreground },
      { name: 'muted', bg: tokens.muted.DEFAULT, fg: tokens.muted.foreground },
      { name: 'card', bg: tokens.card.DEFAULT, fg: tokens.card.foreground },
      { name: 'popover', bg: tokens.popover.DEFAULT, fg: tokens.popover.foreground },
      { name: 'success', bg: tokens.success.DEFAULT, fg: tokens.success.foreground },
      { name: 'warning', bg: tokens.warning.DEFAULT, fg: tokens.warning.foreground },
      { name: 'info', bg: tokens.info.DEFAULT, fg: tokens.info.foreground },
    ]

    for (const { name, bg, fg } of pairs) {
      const ratio = approximateContrastRatio(bg, fg)
      expect(ratio, `${name} contrast: ${ratio}`).toBeGreaterThanOrEqual(AA)
    }
  })

  it('passes WCAG AA for all foreground/background pairs (dark)', () => {
    const tokens = deriveTokensFromPalette(DARK_PALETTE, 'dark')
    const AA = 4.5

    const pairs = [
      { name: 'background', bg: tokens.background, fg: tokens.foreground },
      { name: 'primary', bg: tokens.primary.DEFAULT, fg: tokens.primary.foreground },
      { name: 'secondary', bg: tokens.secondary.DEFAULT, fg: tokens.secondary.foreground },
      { name: 'accent', bg: tokens.accent.DEFAULT, fg: tokens.accent.foreground },
      { name: 'destructive', bg: tokens.destructive.DEFAULT, fg: tokens.destructive.foreground },
      { name: 'muted', bg: tokens.muted.DEFAULT, fg: tokens.muted.foreground },
      { name: 'card', bg: tokens.card.DEFAULT, fg: tokens.card.foreground },
      { name: 'popover', bg: tokens.popover.DEFAULT, fg: tokens.popover.foreground },
      { name: 'success', bg: tokens.success.DEFAULT, fg: tokens.success.foreground },
      { name: 'warning', bg: tokens.warning.DEFAULT, fg: tokens.warning.foreground },
      { name: 'info', bg: tokens.info.DEFAULT, fg: tokens.info.foreground },
    ]

    for (const { name, bg, fg } of pairs) {
      const ratio = approximateContrastRatio(bg, fg)
      expect(ratio, `${name} contrast: ${ratio}`).toBeGreaterThanOrEqual(AA)
    }
  })

  it('semantic colors use fixed hues', () => {
    const tokens = deriveTokensFromPalette(STELLAR_PALETTE, 'light')

    const destructiveH = parseOklch(tokens.destructive.DEFAULT)!.h
    expect(destructiveH).toBeCloseTo(27, 0)

    const successH = parseOklch(tokens.success.DEFAULT)!.h
    expect(successH).toBeCloseTo(145, 0)

    const warningH = parseOklch(tokens.warning.DEFAULT)!.h
    expect(warningH).toBeCloseTo(80, 0)

    const infoH = parseOklch(tokens.info.DEFAULT)!.h
    expect(infoH).toBeCloseTo(250, 0)
  })

  it('focus variants shift lightness from base', () => {
    const tokens = deriveTokensFromPalette(STELLAR_PALETTE, 'light')

    const primaryL = parseOklch(tokens.primary.DEFAULT)!.l
    const focusL = parseOklch(tokens.primaryFocus)!.l
    // Light theme: focus should be darker (lower lightness)
    expect(focusL).toBeLessThan(primaryL)
  })

  it('card is slightly offset from background', () => {
    const tokens = deriveTokensFromPalette(STELLAR_PALETTE, 'light')

    const bgL = parseOklch(tokens.background)!.l
    const cardL = parseOklch(tokens.card.DEFAULT)!.l

    // Card should be slightly different from background
    expect(Math.abs(bgL - cardL)).toBeLessThan(0.05)
    expect(Math.abs(bgL - cardL)).toBeGreaterThan(0)
  })

  it('ring equals primary', () => {
    const tokens = deriveTokensFromPalette(STELLAR_PALETTE, 'light')
    expect(tokens.ring).toBe(tokens.primary.DEFAULT)
  })

  it('border has low chroma', () => {
    const tokens = deriveTokensFromPalette(STELLAR_PALETTE, 'light')
    const borderParsed = parseOklch(tokens.border)
    expect(borderParsed!.c).toBeLessThanOrEqual(0.01)
  })
})

describe('derivePaletteFromBrandColor', () => {
  it('produces a valid ThemePalette from a hex color', () => {
    const palette = derivePaletteFromBrandColor('#667eea', 'light')

    expect(palette).toHaveProperty('primary')
    expect(palette).toHaveProperty('secondary')
    expect(palette).toHaveProperty('accent')
    expect(palette).toHaveProperty('background')
    expect(palette).toHaveProperty('foreground')

    // All values should be hex
    for (const value of Object.values(palette)) {
      expect(value).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })

  it('uses the brand color as primary', () => {
    const palette = derivePaletteFromBrandColor('#ff5733', 'light')
    expect(palette.primary).toBe('#ff5733')
  })

  it('uses white bg for light themes', () => {
    const palette = derivePaletteFromBrandColor('#667eea', 'light')
    expect(palette.background).toBe('#ffffff')
  })

  it('uses dark bg for dark themes', () => {
    const palette = derivePaletteFromBrandColor('#667eea', 'dark')
    expect(palette.background).toBe('#1a1a2e')
  })

  it('derived palette produces WCAG-compliant tokens', () => {
    const palette = derivePaletteFromBrandColor('#667eea', 'light')
    const tokens = deriveTokensFromPalette(palette, 'light')

    const ratio = approximateContrastRatio(tokens.background, tokens.foreground)
    expect(ratio).toBeGreaterThanOrEqual(4.5)
  })

  it('falls back gracefully for non-hex input', () => {
    const palette = derivePaletteFromBrandColor('oklch(55% 0.15 285)', 'light')
    // Should fall back to default primary
    expect(palette.primary).toBe('#667eea')
  })
})
