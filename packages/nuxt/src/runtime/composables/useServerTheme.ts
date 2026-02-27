import { ref, computed } from 'vue'
import { useCookie, useRuntimeConfig } from '#imports'

/**
 * Server-safe theme composable for Nuxt.
 *
 * On the server, reads theme preferences from cookies.
 * On the client, delegates to useTheme from @stellar-vue-ui/core.
 *
 * This is the recommended composable for Nuxt applications as it
 * ensures proper SSR hydration without flashing.
 *
 * @example
 * ```ts
 * const { theme, isDark, setTheme, toggleDark } = useServerTheme()
 * ```
 */
export function useServerTheme() {
  const config = useRuntimeConfig().public.stellarUI
  const themeCookie = useCookie<string>('stellar-theme', {
    default: () => config.theme,
  })
  const darkCookie = useCookie<string>('stellar-dark', {
    default: () => 'false',
  })

  if (import.meta.client) {
    // On client: delegate to the core useTheme composable
    // Dynamic import to avoid SSR issues with DOM-dependent code
    const { useTheme } = require('@stellar-vue-ui/core') as typeof import('@stellar-vue-ui/core')
    const { theme, isDark, setTheme: coreSetTheme, toggleDark: coreToggleDark } = useTheme({
      defaultTheme: (themeCookie.value || config.theme) as any,
    })

    const setTheme = (name: string) => {
      coreSetTheme(name)
      themeCookie.value = name
    }

    const toggleDark = () => {
      coreToggleDark()
      darkCookie.value = String(!isDark.value)
    }

    return {
      theme,
      isDark,
      setTheme,
      toggleDark,
    }
  }

  // On server: use cookie-based state
  const theme = computed(() => themeCookie.value || config.theme)
  const isDark = computed(() => darkCookie.value === 'true')

  const setTheme = (name: string) => {
    themeCookie.value = name
  }

  const toggleDark = () => {
    darkCookie.value = darkCookie.value === 'true' ? 'false' : 'true'
  }

  return {
    theme,
    isDark,
    setTheme,
    toggleDark,
  }
}
