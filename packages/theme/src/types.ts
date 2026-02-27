/**
 * Color pair with a default and foreground color
 */
export interface ColorPair {
  /** The background/main color */
  DEFAULT: string
  /** Text color for use on top of the DEFAULT color */
  foreground: string
}

/**
 * Complete semantic color system for a theme
 */
export interface ThemeColors {
  background: string
  foreground: string
  primary: ColorPair
  secondary: ColorPair
  accent: ColorPair
  destructive: ColorPair
  muted: ColorPair
  card: ColorPair
  popover: ColorPair
  border: string
  input: string
  ring: string
  success: ColorPair
  warning: ColorPair
  info: ColorPair
}

/**
 * Border radius token set
 */
export interface ThemeBorderRadius {
  sm: string
  md: string
  lg: string
  xl: string
}

/**
 * Complete theme configuration
 */
export interface ThemeConfig {
  /** Theme display name */
  name: string
  /** Whether the theme is light or dark */
  type: 'light' | 'dark'
  /** Semantic color tokens */
  colors: ThemeColors
  /** Border radius tokens */
  borderRadius: ThemeBorderRadius
}

/**
 * Options for defineTheme helper
 */
export interface DefineThemeOptions {
  name: string
  type: 'light' | 'dark'
  colors: ThemeColors
  borderRadius?: Partial<ThemeBorderRadius>
  /** Base theme to extend from */
  extends?: string
}

/**
 * Result from theme validation
 */
export interface ValidationIssue {
  /** The token that has an issue */
  token: string
  /** The background color */
  background: string
  /** The foreground color */
  foreground: string
  /** The computed contrast ratio */
  ratio: number
  /** The required minimum ratio */
  required: number
  /** WCAG level that failed */
  level: 'AA' | 'AAA'
}

/**
 * Options for generating a theme from a brand color
 */
export interface GenerateThemeOptions {
  /** The primary brand color (any CSS color format) */
  brandColor: string
  /** Theme name */
  name: string
  /** Light or dark theme */
  type: 'light' | 'dark'
}
