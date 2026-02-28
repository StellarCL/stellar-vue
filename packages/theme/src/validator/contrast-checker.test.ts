import type { ThemeConfig } from '../types'
import { describe, expect, it } from 'vitest'
import { validateTheme } from './contrast-checker'

describe('validateTheme', () => {
  it('passes for a well-contrasted theme', () => {
    const theme: ThemeConfig = {
      name: 'Good',
      type: 'light',
      colors: {
        background: 'oklch(100% 0 0)',
        foreground: 'oklch(10% 0.02 285)',
        primary: { DEFAULT: 'oklch(45% 0.15 285)', foreground: 'oklch(98% 0 0)' },
        secondary: { DEFAULT: 'oklch(92% 0.01 285)', foreground: 'oklch(15% 0.02 285)' },
        accent: { DEFAULT: 'oklch(92% 0.01 285)', foreground: 'oklch(15% 0.02 285)' },
        destructive: { DEFAULT: 'oklch(50% 0.2 27)', foreground: 'oklch(98% 0 0)' },
        muted: { DEFAULT: 'oklch(94% 0.01 285)', foreground: 'oklch(35% 0.02 285)' },
        card: { DEFAULT: 'oklch(100% 0 0)', foreground: 'oklch(10% 0.02 285)' },
        popover: { DEFAULT: 'oklch(100% 0 0)', foreground: 'oklch(10% 0.02 285)' },
        border: 'oklch(91% 0.005 285)',
        input: 'oklch(91% 0.005 285)',
        ring: 'oklch(50% 0.15 285)',
        success: { DEFAULT: 'oklch(45% 0.15 145)', foreground: 'oklch(98% 0 0)' },
        warning: { DEFAULT: 'oklch(65% 0.15 80)', foreground: 'oklch(15% 0.02 285)' },
        info: { DEFAULT: 'oklch(45% 0.15 250)', foreground: 'oklch(98% 0 0)' },
      },
      borderRadius: { sm: '0.25rem', md: '0.5rem', lg: '0.75rem', xl: '1rem' },
    }

    const issues = validateTheme(theme)
    expect(issues).toHaveLength(0)
  })

  it('catches low-contrast pairs', () => {
    const theme: ThemeConfig = {
      name: 'Bad',
      type: 'light',
      colors: {
        background: 'oklch(100% 0 0)',
        foreground: 'oklch(80% 0 0)', // Too light on white!
        primary: { DEFAULT: 'oklch(50% 0.15 285)', foreground: 'oklch(55% 0.15 285)' }, // Almost same
        secondary: { DEFAULT: 'oklch(92% 0.01 285)', foreground: 'oklch(15% 0.02 285)' },
        accent: { DEFAULT: 'oklch(92% 0.01 285)', foreground: 'oklch(15% 0.02 285)' },
        destructive: { DEFAULT: 'oklch(50% 0.2 27)', foreground: 'oklch(98% 0 0)' },
        muted: { DEFAULT: 'oklch(94% 0.01 285)', foreground: 'oklch(35% 0.02 285)' },
        card: { DEFAULT: 'oklch(100% 0 0)', foreground: 'oklch(10% 0.02 285)' },
        popover: { DEFAULT: 'oklch(100% 0 0)', foreground: 'oklch(10% 0.02 285)' },
        border: 'oklch(91% 0.005 285)',
        input: 'oklch(91% 0.005 285)',
        ring: 'oklch(50% 0.15 285)',
        success: { DEFAULT: 'oklch(45% 0.15 145)', foreground: 'oklch(98% 0 0)' },
        warning: { DEFAULT: 'oklch(65% 0.15 80)', foreground: 'oklch(15% 0.02 285)' },
        info: { DEFAULT: 'oklch(45% 0.15 250)', foreground: 'oklch(98% 0 0)' },
      },
      borderRadius: { sm: '0.25rem', md: '0.5rem', lg: '0.75rem', xl: '1rem' },
    }

    const issues = validateTheme(theme)
    expect(issues.length).toBeGreaterThan(0)
    expect(issues.some(i => i.token === 'primary')).toBe(true)
    expect(issues.some(i => i.token === 'background')).toBe(true)
  })

  it('returns issue details with correct structure', () => {
    const theme: ThemeConfig = {
      name: 'Detail Test',
      type: 'light',
      colors: {
        background: 'oklch(100% 0 0)',
        foreground: 'oklch(85% 0 0)',
        primary: { DEFAULT: 'oklch(50% 0.15 285)', foreground: 'oklch(98% 0 0)' },
        secondary: { DEFAULT: 'oklch(92% 0.01 285)', foreground: 'oklch(15% 0.02 285)' },
        accent: { DEFAULT: 'oklch(92% 0.01 285)', foreground: 'oklch(15% 0.02 285)' },
        destructive: { DEFAULT: 'oklch(50% 0.2 27)', foreground: 'oklch(98% 0 0)' },
        muted: { DEFAULT: 'oklch(94% 0.01 285)', foreground: 'oklch(35% 0.02 285)' },
        card: { DEFAULT: 'oklch(100% 0 0)', foreground: 'oklch(10% 0.02 285)' },
        popover: { DEFAULT: 'oklch(100% 0 0)', foreground: 'oklch(10% 0.02 285)' },
        border: 'oklch(91% 0.005 285)',
        input: 'oklch(91% 0.005 285)',
        ring: 'oklch(50% 0.15 285)',
        success: { DEFAULT: 'oklch(45% 0.15 145)', foreground: 'oklch(98% 0 0)' },
        warning: { DEFAULT: 'oklch(65% 0.15 80)', foreground: 'oklch(15% 0.02 285)' },
        info: { DEFAULT: 'oklch(45% 0.15 250)', foreground: 'oklch(98% 0 0)' },
      },
      borderRadius: { sm: '0.25rem', md: '0.5rem', lg: '0.75rem', xl: '1rem' },
    }

    const issues = validateTheme(theme)
    const bgIssue = issues.find(i => i.token === 'background')
    if (bgIssue) {
      expect(bgIssue.level).toBe('AA')
      expect(bgIssue.required).toBe(4.5)
      expect(typeof bgIssue.ratio).toBe('number')
    }
  })
})
