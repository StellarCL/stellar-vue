/**
 * OKLCH color utilities — pure functions, no external dependencies.
 *
 * Conversion chain: hex → sRGB [0-1] → linear RGB → OKLab → OKLCH
 */

export interface OklchColor {
  l: number
  c: number
  h: number
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

/** Format an OKLCH CSS color string: oklch(L% C H) */
export function oklch(l: number, c: number, h: number): string {
  return `oklch(${(l * 100).toFixed(2)}% ${c.toFixed(3)} ${h.toFixed(2)})`
}

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

/** Parse an oklch(...) CSS string into {l, c, h}. Returns null on failure. */
export function parseOklch(color: string): OklchColor | null {
  // Matches oklch(L% C H) with optional spaces/commas
  const match = color.match(/oklch\(\s*([\d.]+)%\s+(?:,\s*)?([\d.]+)\s+(?:,\s*)?([\d.]+)\s*\)/)
  if (!match?.[1] || !match[2] || !match[3])
    return null
  return {
    l: Number.parseFloat(match[1]) / 100,
    c: Number.parseFloat(match[2]),
    h: Number.parseFloat(match[3]),
  }
}

// ---------------------------------------------------------------------------
// Hex → OKLCH conversion
// ---------------------------------------------------------------------------

/** Parse a hex color (#rgb or #rrggbb) to sRGB [0-1] */
function hexToSrgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '')
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
  }
  const n = Number.parseInt(h, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

/** Linearize a single sRGB channel (remove gamma) */
function linearize(c: number): number {
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

/** Convert linear RGB to OKLab using the M1·M2 matrix approach */
function linearRgbToOklab(r: number, g: number, b: number): [number, number, number] {
  // M1: linear RGB → LMS (cone response)
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b

  // Cube root (perceptual non-linearity)
  const l_ = Math.cbrt(l)
  const m_ = Math.cbrt(m)
  const s_ = Math.cbrt(s)

  // M2: LMS → OKLab
  return [
    0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  ]
}

/** Convert OKLab [L, a, b] to OKLCH [L, C, H] (polar form) */
function oklabToOklch(L: number, a: number, b: number): OklchColor {
  const c = Math.sqrt(a * a + b * b)
  let h = (Math.atan2(b, a) * 180) / Math.PI
  if (h < 0)
    h += 360
  return { l: L, c, h }
}

/** Convert a hex color to an OKLCH CSS string */
export function hexToOklch(hex: string): string {
  const [r, g, b] = hexToSrgb(hex)
  const [lr, lg, lb] = [linearize(r), linearize(g), linearize(b)]
  const [L, a, bVal] = linearRgbToOklab(lr, lg, lb)
  const { l, c, h } = oklabToOklch(L, a, bVal)
  return oklch(l, c, h)
}

/** Convert a hex color to OklchColor components */
export function hexToOklchComponents(hex: string): OklchColor {
  const [r, g, b] = hexToSrgb(hex)
  const [lr, lg, lb] = [linearize(r), linearize(g), linearize(b)]
  const [L, a, bVal] = linearRgbToOklab(lr, lg, lb)
  return oklabToOklch(L, a, bVal)
}

// ---------------------------------------------------------------------------
// Color manipulation
// ---------------------------------------------------------------------------

/** Shift lightness by delta (clamped to [0, 1]) */
export function adjustLightness(color: string, delta: number): string {
  const parsed = parseOklch(color)
  if (!parsed)
    return color
  const l = Math.max(0, Math.min(1, parsed.l + delta))
  return oklch(l, parsed.c, parsed.h)
}

/** Scale chroma by a factor (clamped to [0, 0.4]) */
export function adjustChroma(color: string, factor: number): string {
  const parsed = parseOklch(color)
  if (!parsed)
    return color
  const c = Math.max(0, Math.min(0.4, parsed.c * factor))
  return oklch(parsed.l, c, parsed.h)
}

/** Replace the hue of a color */
export function withHue(color: string, hue: number): string {
  const parsed = parseOklch(color)
  if (!parsed)
    return color
  return oklch(parsed.l, parsed.c, hue)
}

// ---------------------------------------------------------------------------
// Contrast
// ---------------------------------------------------------------------------

/**
 * Approximate WCAG contrast ratio using OKLCH lightness.
 * OKLCH L ≈ Y^(1/3), so relative luminance Y ≈ L³.
 */
export function approximateContrastRatio(bg: string, fg: string): number {
  const bgParsed = parseOklch(bg)
  const fgParsed = parseOklch(fg)

  if (!bgParsed || !fgParsed)
    return 0

  const bgLum = bgParsed.l ** 3
  const fgLum = fgParsed.l ** 3

  const lighter = Math.max(bgLum, fgLum)
  const darker = Math.min(bgLum, fgLum)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Find a foreground color that achieves WCAG AA contrast (≥4.5:1) against `bgColor`.
 *
 * Strategy:
 *  1. Try `hintColor` if provided
 *  2. Try standard dark text (L=0.15) or light text (L=0.98)
 *  3. Binary-search lightness for best fit
 */
export function ensureContrast(bgColor: string, hintColor?: string): string {
  const AA = 4.5
  const bg = parseOklch(bgColor)
  if (!bg)
    return oklch(0.15, 0.02, 285)

  // 1. Try hint
  if (hintColor) {
    const ratio = approximateContrastRatio(bgColor, hintColor)
    if (ratio >= AA)
      return hintColor
  }

  // 2. Try standard dark/light text
  const darkText = oklch(0.15, 0.02, 285)
  const lightText = oklch(0.98, 0, 0)

  const darkRatio = approximateContrastRatio(bgColor, darkText)
  const lightRatio = approximateContrastRatio(bgColor, lightText)

  if (darkRatio >= AA && darkRatio >= lightRatio)
    return darkText
  if (lightRatio >= AA)
    return lightText

  // 3. Binary search — pick whichever direction has more room
  const targetIsLight = bg.l < 0.5
  let lo = targetIsLight ? 0.7 : 0
  let hi = targetIsLight ? 1 : 0.3
  let best = targetIsLight ? lightText : darkText

  for (let i = 0; i < 16; i++) {
    const mid = (lo + hi) / 2
    const candidate = oklch(mid, 0.01, bg.h || 0)
    const ratio = approximateContrastRatio(bgColor, candidate)
    if (ratio >= AA) {
      best = candidate
      // Try to get closer to bg for less extreme foreground
      if (targetIsLight)
        lo = mid
      else hi = mid
    }
    else {
      // Need more separation
      if (targetIsLight)
        hi = mid
      else lo = mid
    }
  }

  return best
}
