import { describe, expect, it } from 'vitest'
import { generateCSS } from './css-generator'
import { defineTheme } from './define-theme'
import { generateTheme } from './generate-theme'

describe('defineTheme', () => {
  it('returns a complete theme config with defaults', () => {
    const theme = defineTheme({
      name: 'Test',
      type: 'light',
      colors: {
        background: 'oklch(100% 0 0)',
        foreground: 'oklch(15% 0.02 285)',
        primary: { DEFAULT: 'oklch(55% 0.15 285)', foreground: 'oklch(98% 0 0)' },
        secondary: { DEFAULT: 'oklch(92% 0.01 285)', foreground: 'oklch(15% 0.02 285)' },
        accent: { DEFAULT: 'oklch(92% 0.01 285)', foreground: 'oklch(15% 0.02 285)' },
        destructive: { DEFAULT: 'oklch(55% 0.2 27)', foreground: 'oklch(98% 0 0)' },
        muted: { DEFAULT: 'oklch(94% 0.01 285)', foreground: 'oklch(45% 0.02 285)' },
        card: { DEFAULT: 'oklch(100% 0 0)', foreground: 'oklch(15% 0.02 285)' },
        popover: { DEFAULT: 'oklch(100% 0 0)', foreground: 'oklch(15% 0.02 285)' },
        border: 'oklch(91% 0.005 285)',
        input: 'oklch(91% 0.005 285)',
        ring: 'oklch(55% 0.15 285)',
        success: { DEFAULT: 'oklch(55% 0.15 145)', foreground: 'oklch(98% 0 0)' },
        warning: { DEFAULT: 'oklch(70% 0.15 80)', foreground: 'oklch(15% 0.02 285)' },
        info: { DEFAULT: 'oklch(55% 0.15 250)', foreground: 'oklch(98% 0 0)' },
      },
    })

    expect(theme.name).toBe('Test')
    expect(theme.type).toBe('light')
    expect(theme.borderRadius.md).toBe('0.5rem')
    expect(theme.colors.primary.DEFAULT).toContain('oklch')
  })

  it('allows custom border radius', () => {
    const theme = defineTheme({
      name: 'Custom',
      type: 'dark',
      colors: {} as any,
      borderRadius: { lg: '1rem' },
    })

    expect(theme.borderRadius.lg).toBe('1rem')
    expect(theme.borderRadius.sm).toBe('0.25rem')
  })
})

describe('generateTheme', () => {
  it('generates a complete light theme', () => {
    const theme = generateTheme({
      brandColor: '#667eea',
      name: 'Generated',
      type: 'light',
    })

    expect(theme.name).toBe('Generated')
    expect(theme.type).toBe('light')
    expect(theme.colors.primary.DEFAULT).toContain('oklch')
    expect(theme.colors.destructive.DEFAULT).toContain('oklch')
    expect(theme.colors.success.DEFAULT).toContain('oklch')
  })

  it('generates a complete dark theme', () => {
    const theme = generateTheme({
      brandColor: '#667eea',
      name: 'Dark Generated',
      type: 'dark',
    })

    expect(theme.type).toBe('dark')
    expect(theme.colors.background).toContain('oklch')
  })
})

describe('generateCSS', () => {
  it('outputs valid @theme CSS', () => {
    const theme = generateTheme({
      brandColor: '#667eea',
      name: 'CSS Test',
      type: 'light',
    })
    const css = generateCSS(theme)

    expect(css).toContain('@theme {')
    expect(css).toContain('--color-primary:')
    expect(css).toContain('--color-primary-foreground:')
    expect(css).toContain('--color-background:')
    expect(css).toContain('--radius-md:')
    expect(css).toContain('}')
  })
})
