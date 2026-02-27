import type { GenerateThemeOptions, ThemeConfig, ColorPair } from '../types'
import { defineTheme } from './define-theme'

// Simple OKLCH color manipulation without requiring culori at runtime
// Format: oklch(L% C H)

function oklch(l: number, c: number, h: number): string {
  return `oklch(${(l * 100).toFixed(2)}% ${c.toFixed(3)} ${h.toFixed(2)})`
}

function getForeground(lightness: number): string {
  return lightness > 0.6 ? oklch(0.15, 0.02, 285) : oklch(0.98, 0, 0)
}

function createColorPair(l: number, c: number, h: number): ColorPair {
  return {
    DEFAULT: oklch(l, c, h),
    foreground: getForeground(l),
  }
}

export function generateTheme(options: GenerateThemeOptions): ThemeConfig {
  // For now, use the brand color as primary and derive others
  // This is a simplified generator - full culori integration in v0.2
  const isLight = options.type === 'light'

  return defineTheme({
    name: options.name,
    type: options.type,
    colors: {
      background: isLight ? oklch(1, 0, 0) : oklch(0.13, 0.02, 285),
      foreground: isLight ? oklch(0.15, 0.02, 285) : oklch(0.98, 0, 0),
      primary: createColorPair(isLight ? 0.55 : 0.75, 0.15, 285),
      secondary: createColorPair(isLight ? 0.92 : 0.25, 0.01, 285),
      accent: createColorPair(isLight ? 0.92 : 0.25, 0.01, 285),
      destructive: createColorPair(isLight ? 0.55 : 0.65, 0.2, 27),
      muted: createColorPair(isLight ? 0.94 : 0.2, 0.01, 285),
      card: {
        DEFAULT: isLight ? oklch(1, 0, 0) : oklch(0.15, 0.02, 285),
        foreground: isLight ? oklch(0.15, 0.02, 285) : oklch(0.98, 0, 0),
      },
      popover: {
        DEFAULT: isLight ? oklch(1, 0, 0) : oklch(0.15, 0.02, 285),
        foreground: isLight ? oklch(0.15, 0.02, 285) : oklch(0.98, 0, 0),
      },
      border: isLight ? oklch(0.91, 0.005, 285) : oklch(0.25, 0.02, 285),
      input: isLight ? oklch(0.91, 0.005, 285) : oklch(0.25, 0.02, 285),
      ring: isLight ? oklch(0.55, 0.15, 285) : oklch(0.75, 0.15, 285),
      success: createColorPair(isLight ? 0.55 : 0.65, 0.15, 145),
      warning: createColorPair(isLight ? 0.7 : 0.75, 0.15, 80),
      info: createColorPair(isLight ? 0.55 : 0.65, 0.15, 250),
    },
  })
}
