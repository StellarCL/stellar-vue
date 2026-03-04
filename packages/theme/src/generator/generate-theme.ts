import type { GenerateThemeOptions, PaletteThemeOptions, ThemeConfig } from '../types'
import { defineTheme } from './define-theme'
import { derivePaletteFromBrandColor, deriveTokensFromPalette } from './derive-tokens'

/**
 * Generate a complete theme from a 5-color palette.
 */
export function generateThemeFromPalette(options: PaletteThemeOptions): ThemeConfig {
  const colors = deriveTokensFromPalette(options.palette, options.type)

  return defineTheme({
    name: options.name,
    type: options.type,
    colors,
    borderRadius: options.borderRadius,
  })
}

/**
 * Generate a theme from a brand color or palette.
 *
 * When `options.palette` is provided, delegates to `generateThemeFromPalette`.
 * When only `brandColor` is provided, derives a palette first (backward compat).
 */
export function generateTheme(options: GenerateThemeOptions): ThemeConfig {
  if (options.palette) {
    return generateThemeFromPalette({
      palette: options.palette,
      name: options.name,
      type: options.type,
    })
  }

  // Legacy path: derive a palette from the single brand color
  const palette = derivePaletteFromBrandColor(options.brandColor, options.type)
  return generateThemeFromPalette({
    palette,
    name: options.name,
    type: options.type,
  })
}
