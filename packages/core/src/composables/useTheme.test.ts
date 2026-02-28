import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useTheme } from './useTheme'

// Mock localStorage
const mockStorage: Record<string, string> = {}
const localStorageMock = {
  getItem: vi.fn((key: string) => mockStorage[key] ?? null),
  setItem: vi.fn((key: string, value: string) => { mockStorage[key] = value }),
  removeItem: vi.fn((key: string) => { delete mockStorage[key] }),
  clear: vi.fn(() => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]) }),
  get length() { return Object.keys(mockStorage).length },
  key: vi.fn((i: number) => Object.keys(mockStorage)[i] ?? null),
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('useTheme', () => {
  beforeEach(() => {
    localStorageMock.clear()
    vi.clearAllMocks()
    // Reset document state
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.classList.remove('dark')
  })

  it('returns default theme as stellar', () => {
    const { theme } = useTheme()
    expect(theme.value).toBe('stellar')
  })

  it('setTheme updates reactive value', () => {
    const { theme, setTheme } = useTheme()
    setTheme('sirius')
    expect(theme.value).toBe('sirius')
  })

  it('toggleDark flips isDark', () => {
    const { isDark, toggleDark } = useTheme()
    const initial = isDark.value
    toggleDark()
    expect(isDark.value).toBe(!initial)
  })

  it('returns list of available themes', () => {
    const { themes } = useTheme()
    expect(themes.value).toContain('stellar')
    expect(themes.value).toContain('sirius')
    expect(themes.value).toContain('polaris')
    expect(themes.value).toContain('antares')
    expect(themes.value).toContain('vega')
    expect(themes.value).toContain('aldebaran')
    expect(themes.value).toHaveLength(6)
  })

  it('rejects invalid theme names', () => {
    const { theme, setTheme } = useTheme()
    setTheme('nonexistent')
    expect(theme.value).not.toBe('nonexistent')
  })
})
