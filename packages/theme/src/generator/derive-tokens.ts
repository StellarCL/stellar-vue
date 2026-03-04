/**
 * Derive a complete set of ~30 theme tokens from a 5-color palette.
 */
import type { ThemeColors } from '../types'
import {
  adjustChroma,
  adjustLightness,
  ensureContrast,
  hexToOklch,
  hexToOklchComponents,
  oklch,
  parseOklch,
} from './oklch-utils'

export interface ThemePalette {
  /** Primary brand color (hex, e.g. '#667eea') */
  primary: string
  /** Secondary color (hex) */
  secondary: string
  /** Accent color (hex) */
  accent: string
  /** Background color (hex) */
  background: string
  /** Foreground/text color (hex) */
  foreground: string
}

/**
 * Derive all ~30 theme color tokens from a 5-color palette.
 */
export function deriveTokensFromPalette(
  palette: ThemePalette,
  type: 'light' | 'dark',
): ThemeColors {
  const isLight = type === 'light'

  // Convert palette hex colors to OKLCH strings
  const bg = hexToOklch(palette.background)
  const fg = hexToOklch(palette.foreground)
  const primary = hexToOklch(palette.primary)
  const secondary = hexToOklch(palette.secondary)
  const accent = hexToOklch(palette.accent)

  // Get parsed primary for deriving semantic chroma
  const primaryParsed = hexToOklchComponents(palette.primary)

  // --- Auto-calculated foregrounds (WCAG AA) ---
  const primaryFg = ensureContrast(primary, fg)
  const secondaryFg = ensureContrast(secondary, fg)
  const accentFg = ensureContrast(accent, fg)

  // --- Derived surfaces (offset from background) ---
  const card = adjustLightness(bg, isLight ? -0.01 : 0.02)
  const cardFg = ensureContrast(card, fg)

  const popover = card
  const popoverFg = cardFg

  const muted = adjustChroma(adjustLightness(bg, isLight ? -0.05 : 0.07), 0.5)
  const mutedFg = ensureContrast(muted, fg)

  // Border/input: slight offset, very low chroma
  const borderBase = adjustLightness(bg, isLight ? -0.09 : 0.12)
  const borderParsed = parseOklch(borderBase)
  const border = borderParsed
    ? oklch(borderParsed.l, Math.min(borderParsed.c, 0.01), borderParsed.h)
    : borderBase
  const input = border

  // Ring = same as primary
  const ring = primary

  // --- Primary focus ---
  const primaryFocus = adjustLightness(primary, isLight ? -0.07 : 0.07)

  // --- Semantic colors (fixed hues, chroma borrowed from primary) ---
  const pC = primaryParsed.c

  const destructiveC = Math.max(0.17, pC)
  const destructive = oklch(isLight ? 0.5 : 0.65, destructiveC, 27)
  const destructiveFg = ensureContrast(destructive, fg)

  const error = destructive
  const errorFg = destructiveFg
  const errorFocus = adjustLightness(error, isLight ? -0.07 : 0.07)

  const successC = Math.max(0.13, pC * 0.8)
  const success = oklch(isLight ? 0.42 : 0.65, successC, 145)
  const successFg = ensureContrast(success, fg)
  const successFocus = adjustLightness(success, isLight ? -0.07 : 0.07)

  const warningC = Math.max(0.13, pC * 0.8)
  const warning = oklch(isLight ? 0.82 : 0.75, warningC, 80)
  const warningFg = ensureContrast(warning, fg)
  const warningFocus = adjustLightness(warning, isLight ? -0.07 : 0.07)

  const infoC = Math.max(0.13, pC * 0.8)
  const info = oklch(isLight ? 0.5 : 0.65, infoC, 250)
  const infoFg = ensureContrast(info, fg)
  const infoFocus = adjustLightness(info, isLight ? -0.07 : 0.07)

  return {
    background: bg,
    foreground: fg,
    primary: { DEFAULT: primary, foreground: primaryFg },
    primaryFocus,
    secondary: { DEFAULT: secondary, foreground: secondaryFg },
    accent: { DEFAULT: accent, foreground: accentFg },
    destructive: { DEFAULT: destructive, foreground: destructiveFg },
    error: { DEFAULT: error, foreground: errorFg },
    errorFocus,
    muted: { DEFAULT: muted, foreground: mutedFg },
    card: { DEFAULT: card, foreground: cardFg },
    popover: { DEFAULT: popover, foreground: popoverFg },
    border,
    input,
    ring,
    success: { DEFAULT: success, foreground: successFg },
    successFocus,
    warning: { DEFAULT: warning, foreground: warningFg },
    warningFocus,
    info: { DEFAULT: info, foreground: infoFg },
    infoFocus,
  }
}

/**
 * Create a default 5-color palette from a single brand color.
 * Backward-compatible: generates sensible defaults for legacy `generateTheme` usage.
 */
export function derivePaletteFromBrandColor(
  brandColor: string,
  type: 'light' | 'dark',
): ThemePalette {
  const isLight = type === 'light'

  // If brandColor is hex, use it directly; otherwise try as-is
  const isHex = /^#[0-9a-f]{3,6}$/i.test(brandColor)
  const primaryHex = isHex ? brandColor : '#667eea'

  // Derive complementary colors from the primary
  const parsed = hexToOklchComponents(primaryHex)

  // Secondary: lower chroma, shifted hue
  const secondaryHue = (parsed.h + 30) % 360
  const secondaryL = isLight ? 0.92 : 0.25
  const secondaryC = Math.min(parsed.c * 0.3, 0.03)

  // Accent: complement hue, moderate chroma
  const accentHue = (parsed.h + 180) % 360
  const accentL = isLight ? 0.55 : 0.7
  const accentC = Math.min(parsed.c * 0.7, 0.15)

  // Background & foreground
  const bgHex = isLight ? '#ffffff' : '#1a1a2e'
  const fgHex = isLight ? '#1a1a2e' : '#f5f5f5'

  // Convert derived OKLCH values back to hex-like representation
  // For simplicity we'll use oklch strings as "hex" and handle both in deriveTokensFromPalette
  // Actually, ThemePalette expects hex strings. Let's construct synthetic hex for the derived colors.
  // We'll keep it simple: return the primary as-is hex, and encode others as hex approximations.

  // Since deriveTokensFromPalette calls hexToOklch on all inputs, we need actual hex values.
  // For secondary/accent, we'll build them from oklch → approximate hex.
  // But to avoid complexity, let's just use well-chosen hex values relative to the primary.

  // Simple approach: use the primary hex directly, and pick good defaults for the rest
  return {
    primary: primaryHex,
    secondary: oklchToApproxHex(secondaryL, secondaryC, secondaryHue),
    accent: oklchToApproxHex(accentL, accentC, accentHue),
    background: bgHex,
    foreground: fgHex,
  }
}

/**
 * Approximate hex from OKLCH values.
 * Reverse of hex→OKLCH: OKLCH → OKLab → linear RGB → sRGB → hex.
 */
function oklchToApproxHex(l: number, c: number, h: number): string {
  const hRad = (h * Math.PI) / 180
  const a = c * Math.cos(hRad)
  const b = c * Math.sin(hRad)

  // OKLab → LMS (inverse of M2)
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b
  const s_ = l - 0.0894841775 * a - 1.291485548 * b

  // Cube (inverse of cube root)
  const lc = l_ * l_ * l_
  const mc = m_ * m_ * m_
  const sc = s_ * s_ * s_

  // LMS → linear RGB (inverse of M1)
  const lr = +4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc
  const lg = -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc
  const lb = -0.0041960863 * lc - 0.7034186147 * mc + 1.707614701 * sc

  // Linear → sRGB gamma
  const toSrgb = (x: number) => {
    const clamped = Math.max(0, Math.min(1, x))
    return clamped <= 0.0031308 ? clamped * 12.92 : 1.055 * clamped ** (1 / 2.4) - 0.055
  }

  const r = Math.round(toSrgb(lr) * 255)
  const g = Math.round(toSrgb(lg) * 255)
  const bv = Math.round(toSrgb(lb) * 255)

  const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(bv)}`
}
