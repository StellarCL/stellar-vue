import { ref, readonly, computed, watch, onMounted } from 'vue'

const THEME_NAMES = ['stellar', 'sirius', 'polaris', 'antares', 'vega', 'aldebaran'] as const
type ThemeName = typeof THEME_NAMES[number]

export interface UseThemeOptions {
  /** Storage mechanism for persistence */
  storage?: 'localStorage' | 'sessionStorage' | 'cookie'
  /** Storage key for theme preference */
  key?: string
  /** Sync across browser tabs */
  sync?: boolean
  /** Default theme name */
  defaultTheme?: ThemeName
}

const currentTheme = ref<string>('stellar')
const isDark = ref(false)

let initialized = false

/**
 * Composable for managing theme state, dark mode, and persistence
 *
 * @param options - Configuration options
 * @returns Reactive theme state and controls
 *
 * @example
 * ```ts
 * const { theme, isDark, setTheme, toggleDark } = useTheme()
 * setTheme('sirius')
 * toggleDark()
 * ```
 */
export function useTheme(options: UseThemeOptions = {}) {
  const {
    storage = 'localStorage',
    key = 'stellar-theme',
    sync = true,
    defaultTheme = 'stellar',
  } = options

  const darkKey = `${key}-dark`

  function getStorage(): Storage | null {
    if (typeof window === 'undefined') return null
    if (storage === 'localStorage') return window.localStorage
    if (storage === 'sessionStorage') return window.sessionStorage
    return null
  }

  function applyTheme(name: string): void {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-theme', name)
  }

  function applyDarkMode(dark: boolean): void {
    if (typeof document === 'undefined') return
    document.documentElement.classList.toggle('dark', dark)
  }

  function loadFromStorage(): void {
    const store = getStorage()
    if (!store) return

    const savedTheme = store.getItem(key)
    if (savedTheme && THEME_NAMES.includes(savedTheme as ThemeName)) {
      currentTheme.value = savedTheme
    }

    const savedDark = store.getItem(darkKey)
    if (savedDark !== null) {
      isDark.value = savedDark === 'true'
    } else if (typeof window !== 'undefined') {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }

  function saveToStorage(): void {
    const store = getStorage()
    if (!store) return
    store.setItem(key, currentTheme.value)
    store.setItem(darkKey, String(isDark.value))
  }

  function setTheme(name: string): void {
    if (!THEME_NAMES.includes(name as ThemeName)) return
    currentTheme.value = name
    applyTheme(name)
    saveToStorage()
  }

  function toggleDark(): void {
    isDark.value = !isDark.value
    applyDarkMode(isDark.value)
    saveToStorage()
  }

  // Initialize once
  if (!initialized) {
    loadFromStorage()
    initialized = true
  }

  // Apply on mount (SSR-safe)
  onMounted(() => {
    applyTheme(currentTheme.value)
    applyDarkMode(isDark.value)

    // Listen for system preference changes
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', (e) => {
        const store = getStorage()
        // Only auto-switch if user hasn't explicitly set dark mode
        if (!store?.getItem(darkKey)) {
          isDark.value = e.matches
          applyDarkMode(isDark.value)
        }
      })
    }

    // Sync across tabs
    if (sync && typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === key && e.newValue) {
          currentTheme.value = e.newValue
          applyTheme(e.newValue)
        }
        if (e.key === darkKey && e.newValue !== null) {
          isDark.value = e.newValue === 'true'
          applyDarkMode(isDark.value)
        }
      })
    }
  })

  // Watch for programmatic changes
  watch(currentTheme, (name) => {
    applyTheme(name)
    saveToStorage()
  })

  watch(isDark, (dark) => {
    applyDarkMode(dark)
    saveToStorage()
  })

  return {
    /** Current theme name */
    theme: readonly(currentTheme),
    /** Whether dark mode is active */
    isDark: readonly(isDark),
    /** Set the active theme */
    setTheme,
    /** Toggle dark mode on/off */
    toggleDark,
    /** List of available theme names */
    themes: readonly(ref(THEME_NAMES)),
  }
}
