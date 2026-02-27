import type { DefineThemeOptions, ThemeConfig } from '../types'

const defaultBorderRadius = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
}

/**
 * Type-safe helper to define a theme configuration
 */
export function defineTheme(options: DefineThemeOptions): ThemeConfig {
  return {
    name: options.name,
    type: options.type,
    colors: options.colors,
    borderRadius: {
      ...defaultBorderRadius,
      ...options.borderRadius,
    },
  }
}
