import type { ThemeConfig } from '../types'

/**
 * Converts a ThemeConfig into CSS @theme blocks for Tailwind v4
 */
export function generateCSS(theme: ThemeConfig): string {
  const lines: string[] = []

  lines.push('@theme {')

  // Colors
  lines.push(`  --color-background: ${theme.colors.background};`)
  lines.push(`  --color-foreground: ${theme.colors.foreground};`)

  const colorPairs = [
    'primary',
    'secondary',
    'accent',
    'destructive',
    'error',
    'muted',
    'card',
    'popover',
    'success',
    'warning',
    'info',
  ] as const

  for (const name of colorPairs) {
    const pair = theme.colors[name]
    lines.push(`  --color-${name}: ${pair.DEFAULT};`)
    lines.push(`  --color-${name}-foreground: ${pair.foreground};`)
  }

  // Focus variant tokens
  lines.push(`  --color-primary-focus: ${theme.colors.primaryFocus};`)
  lines.push(`  --color-error-focus: ${theme.colors.errorFocus};`)
  lines.push(`  --color-success-focus: ${theme.colors.successFocus};`)
  lines.push(`  --color-warning-focus: ${theme.colors.warningFocus};`)
  lines.push(`  --color-info-focus: ${theme.colors.infoFocus};`)

  lines.push(`  --color-border: ${theme.colors.border};`)
  lines.push(`  --color-input: ${theme.colors.input};`)
  lines.push(`  --color-ring: ${theme.colors.ring};`)

  // Border radius
  lines.push(`  --radius-sm: ${theme.borderRadius.sm};`)
  lines.push(`  --radius-md: ${theme.borderRadius.md};`)
  lines.push(`  --radius-lg: ${theme.borderRadius.lg};`)
  lines.push(`  --radius-xl: ${theme.borderRadius.xl};`)

  lines.push('}')

  return lines.join('\n')
}
