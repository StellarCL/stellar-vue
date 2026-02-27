/**
 * Convert HSB (Hue, Saturation, Brightness) to Hex color string
 */
export function hsbToHex(h: number, s: number, b: number): string {
  const rgb = hsbToRgb(h, s, b)
  return rgbToHex(rgb.r, rgb.g, rgb.b)
}

/**
 * Convert HSB to RGB
 */
export function hsbToRgb(h: number, s: number, b: number): { r: number; g: number; b: number } {
  const sNorm = s / 100
  const bNorm = b / 100
  const c = bNorm * sNorm
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = bNorm - c

  let r = 0
  let g = 0
  let bl = 0

  if (h < 60) { r = c; g = x; bl = 0 }
  else if (h < 120) { r = x; g = c; bl = 0 }
  else if (h < 180) { r = 0; g = c; bl = x }
  else if (h < 240) { r = 0; g = x; bl = c }
  else if (h < 300) { r = x; g = 0; bl = c }
  else { r = c; g = 0; bl = x }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((bl + m) * 255),
  }
}

/**
 * Convert RGB to Hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * Convert Hex to HSB
 */
export function hexToHsb(hex: string): { h: number; s: number; b: number } {
  const rgb = hexToRgb(hex)
  return rgbToHsb(rgb.r, rgb.g, rgb.b)
}

/**
 * Convert Hex to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleaned = hex.replace('#', '')
  const expanded = cleaned.length === 3
    ? cleaned.split('').map(c => c + c).join('')
    : cleaned

  return {
    r: parseInt(expanded.slice(0, 2), 16),
    g: parseInt(expanded.slice(2, 4), 16),
    b: parseInt(expanded.slice(4, 6), 16),
  }
}

/**
 * Convert RGB to HSB
 */
export function rgbToHsb(r: number, g: number, b: number): { h: number; s: number; b: number } {
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255

  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  const delta = max - min

  let h = 0
  if (delta !== 0) {
    if (max === rNorm) h = 60 * (((gNorm - bNorm) / delta) % 6)
    else if (max === gNorm) h = 60 * (((bNorm - rNorm) / delta) + 2)
    else h = 60 * (((rNorm - gNorm) / delta) + 4)
  }
  if (h < 0) h += 360

  const s = max === 0 ? 0 : (delta / max) * 100
  const brightness = max * 100

  return { h: Math.round(h), s: Math.round(s), b: Math.round(brightness) }
}

/**
 * Convert RGB to HSL string
 */
export function rgbToHsl(r: number, g: number, b: number): string {
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255

  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  const delta = max - min

  let h = 0
  if (delta !== 0) {
    if (max === rNorm) h = 60 * (((gNorm - bNorm) / delta) % 6)
    else if (max === gNorm) h = 60 * (((bNorm - rNorm) / delta) + 2)
    else h = 60 * (((rNorm - gNorm) / delta) + 4)
  }
  if (h < 0) h += 360

  const l = (max + min) / 2
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

  return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
}

/**
 * Format a hex color as RGB string
 */
export function hexToRgbString(hex: string): string {
  const { r, g, b } = hexToRgb(hex)
  return `rgb(${r}, ${g}, ${b})`
}

/**
 * Format a hex color as HSL string
 */
export function hexToHslString(hex: string): string {
  const { r, g, b } = hexToRgb(hex)
  return rgbToHsl(r, g, b)
}

/**
 * Validate a hex color string
 */
export function isValidHex(hex: string): boolean {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex)
}
