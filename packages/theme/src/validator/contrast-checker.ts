import type { ThemeConfig, ValidationIssue } from '../types'

/**
 * Parse an OKLCH color string and return its lightness
 * Format: oklch(L% C H)
 */
function parseOklchLightness(color: string): number | null {
  const match = color.match(/oklch\(\s*([\d.]+)%/)
  if (!match) return null
  return Number.parseFloat(match[1]) / 100
}

/**
 * Approximate contrast ratio from OKLCH lightness values
 * This is a simplified check - for production, use a full color library
 *
 * Uses the WCAG relative luminance formula approximated from OKLCH lightness.
 * OKLCH lightness is perceptually uniform, making this a reasonable approximation.
 */
function approximateContrastRatio(bg: string, fg: string): number {
  const bgL = parseOklchLightness(bg)
  const fgL = parseOklchLightness(fg)

  if (bgL === null || fgL === null) return 0

  // Convert OKLCH perceptual lightness to approximate relative luminance
  // L_oklch ≈ Y^(1/3), so Y ≈ L^3
  const bgLum = bgL ** 3
  const fgLum = fgL ** 3

  const lighter = Math.max(bgLum, fgLum)
  const darker = Math.min(bgLum, fgLum)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Validate a theme's color contrast ratios against WCAG standards
 * Returns an array of issues found
 */
export function validateTheme(theme: ThemeConfig): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const AA_NORMAL = 4.5

  // Check all color pairs (foreground on its background)
  const pairs: Array<{ name: string; bg: string; fg: string }> = [
    { name: 'primary', bg: theme.colors.primary.DEFAULT, fg: theme.colors.primary.foreground },
    { name: 'secondary', bg: theme.colors.secondary.DEFAULT, fg: theme.colors.secondary.foreground },
    { name: 'accent', bg: theme.colors.accent.DEFAULT, fg: theme.colors.accent.foreground },
    { name: 'destructive', bg: theme.colors.destructive.DEFAULT, fg: theme.colors.destructive.foreground },
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
