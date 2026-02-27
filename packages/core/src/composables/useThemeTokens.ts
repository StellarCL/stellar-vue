import { ref, onMounted } from 'vue'

/**
 * Provides reactive access to current CSS custom property values
 * from the document root (computed style)
 *
 * @example
 * ```ts
 * const { getToken } = useThemeTokens()
 * const primaryColor = getToken('--color-primary')
 * ```
 */
export function useThemeTokens() {
  const tokens = ref<Record<string, string>>({})

  function getToken(property: string): string {
    if (typeof document === 'undefined') return ''
    return getComputedStyle(document.documentElement).getPropertyValue(property).trim()
  }

  function refreshTokens(): void {
    if (typeof document === 'undefined') return
    const style = getComputedStyle(document.documentElement)
    const tokenNames = [
      '--color-background', '--color-foreground',
      '--color-primary', '--color-primary-foreground',
      '--color-secondary', '--color-secondary-foreground',
      '--color-accent', '--color-accent-foreground',
      '--color-destructive', '--color-destructive-foreground',
      '--color-muted', '--color-muted-foreground',
      '--color-border', '--color-input', '--color-ring',
      '--radius-sm', '--radius-md', '--radius-lg', '--radius-xl',
    ]

    const newTokens: Record<string, string> = {}
    for (const name of tokenNames) {
      newTokens[name] = style.getPropertyValue(name).trim()
    }
    tokens.value = newTokens
  }

  onMounted(() => {
    refreshTokens()
  })

  return {
    /** All cached token values */
    tokens,
    /** Get a specific token value */
    getToken,
    /** Refresh all cached tokens */
    refreshTokens,
  }
}
