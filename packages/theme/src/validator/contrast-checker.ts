import type { ThemeConfig, ValidationIssue } from '../types'
import { approximateContrastRatio } from '../generator/oklch-utils'

/**
 * Validate a theme's color contrast ratios against WCAG standards
 * Returns an array of issues found
 */
export function validateTheme(theme: ThemeConfig): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const AA_NORMAL = 4.5

  // Check all color pairs (foreground on its background)
  const pairs: Array<{ name: string, bg: string, fg: string }> = [
    { name: 'primary', bg: theme.colors.primary.DEFAULT, fg: theme.colors.primary.foreground },
    {
      name: 'secondary',
      bg: theme.colors.secondary.DEFAULT,
      fg: theme.colors.secondary.foreground,
    },
    { name: 'accent', bg: theme.colors.accent.DEFAULT, fg: theme.colors.accent.foreground },
    {
      name: 'destructive',
      bg: theme.colors.destructive.DEFAULT,
      fg: theme.colors.destructive.foreground,
    },
    { name: 'error', bg: theme.colors.error.DEFAULT, fg: theme.colors.error.foreground },
    { name: 'muted', bg: theme.colors.muted.DEFAULT, fg: theme.colors.muted.foreground },
    { name: 'card', bg: theme.colors.card.DEFAULT, fg: theme.colors.card.foreground },
    { name: 'popover', bg: theme.colors.popover.DEFAULT, fg: theme.colors.popover.foreground },
    { name: 'success', bg: theme.colors.success.DEFAULT, fg: theme.colors.success.foreground },
    { name: 'warning', bg: theme.colors.warning.DEFAULT, fg: theme.colors.warning.foreground },
    { name: 'info', bg: theme.colors.info.DEFAULT, fg: theme.colors.info.foreground },
    { name: 'background', bg: theme.colors.background, fg: theme.colors.foreground },
  ]

  for (const { name, bg, fg } of pairs) {
    const ratio = approximateContrastRatio(bg, fg)

    if (ratio < AA_NORMAL) {
      issues.push({
        token: name,
        background: bg,
        foreground: fg,
        ratio: Math.round(ratio * 100) / 100,
        required: AA_NORMAL,
        level: 'AA',
      })
    }
  }

  return issues
}
