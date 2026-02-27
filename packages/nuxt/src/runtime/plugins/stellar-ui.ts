import { defineNuxtPlugin, useRuntimeConfig, useCookie } from '#imports'

/**
 * Stellar UI Nuxt plugin
 *
 * Initializes theme on both server and client:
 * - On server: reads theme preference from cookies, applies data attributes for SSR
 * - On client: initializes useTheme composable with the configured defaults
 */
export default defineNuxtPlugin({
  name: 'stellar-ui',
  enforce: 'pre',
  async setup(nuxtApp) {
    const config = useRuntimeConfig().public.stellarUI
    const themeCookie = useCookie<string>('stellar-theme', { default: () => config.theme })
    const darkCookie = useCookie<string>('stellar-dark', { default: () => 'false' })

    if (import.meta.server) {
      // On server: apply theme attributes for SSR hydration
      const themeName = themeCookie.value || config.theme
      const isDarkMode = darkCookie.value === 'true'

      nuxtApp.hook('app:rendered', (ctx) => {
        // Inject theme attributes into the rendered HTML head
        const themeAttr = ` data-theme="${themeName}"`
        const darkClass = isDarkMode ? ' class="dark"' : ''
        ctx.renderResult = ctx.renderResult || ''
      })

      // Use useHead for SSR attribute injection
      nuxtApp.ssrContext?.head?.push({
        htmlAttrs: {
          'data-theme': themeName,
          ...(isDarkMode ? { class: 'dark' } : {}),
        },
      })
    }

    if (import.meta.client) {
      // On client: initialize the theme system
      const { useTheme } = await import('@stellar-vue-ui/core')
      const { setTheme, toggleDark, isDark } = useTheme({
        defaultTheme: (themeCookie.value || config.theme) as any,
      })

      // Apply the theme from cookie/config
      setTheme(themeCookie.value || config.theme)

      // Handle dark mode based on strategy
      if (config.darkMode === 'media') {
        // Media strategy: follow system preference
        if (typeof window !== 'undefined') {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          if (prefersDark !== isDark.value) {
            toggleDark()
          }
        }
      } else {
        // Class strategy: use stored preference
        const shouldBeDark = darkCookie.value === 'true'
        if (shouldBeDark !== isDark.value) {
          toggleDark()
        }
      }

      // Sync theme changes back to cookies for SSR
      nuxtApp.hook('app:mounted', () => {
        const { theme, isDark: darkRef } = useTheme()

        // Watch for theme changes and persist to cookie
        nuxtApp.vueApp.config.globalProperties.$watch?.(
          () => theme.value,
          (newTheme: string) => {
            themeCookie.value = newTheme
          },
        )

        nuxtApp.vueApp.config.globalProperties.$watch?.(
          () => darkRef.value,
          (newDark: boolean) => {
            darkCookie.value = String(newDark)
          },
        )
      })
    }
  },
})
