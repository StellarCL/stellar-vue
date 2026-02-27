import { defineTheme } from '../generator'

/**
 * Vega - Green/teal theme
 * Inspired by the brilliant blue-white star Vega
 * Fresh, natural, and calming with teal-green tones
 */
export const vega = defineTheme({
  name: 'vega',
  type: 'light',
  colors: {
    background: 'oklch(100% 0 0)',
    foreground: 'oklch(12% 0.03 163)',

    primary: {
      DEFAULT: 'oklch(50% 0.14 163)',
      foreground: 'oklch(98% 0.005 163)',
    },
    secondary: {
      DEFAULT: 'oklch(94% 0.02 163)',
      foreground: 'oklch(18% 0.03 163)',
    },
    accent: {
      DEFAULT: 'oklch(93% 0.04 155)',
      foreground: 'oklch(18% 0.03 155)',
    },
    destructive: {
      DEFAULT: 'oklch(50% 0.2 27)',
      foreground: 'oklch(98% 0 0)',
    },
    muted: {
      DEFAULT: 'oklch(95% 0.01 163)',
      foreground: 'oklch(42% 0.02 163)',
    },
    card: {
      DEFAULT: 'oklch(99% 0.005 163)',
      foreground: 'oklch(12% 0.03 163)',
    },
    popover: {
      DEFAULT: 'oklch(99% 0.005 163)',
      foreground: 'oklch(12% 0.03 163)',
    },
    border: 'oklch(91% 0.01 163)',
    input: 'oklch(91% 0.01 163)',
    ring: 'oklch(50% 0.14 163)',

    success: {
      DEFAULT: 'oklch(42% 0.15 155)',
      foreground: 'oklch(98% 0 0)',
    },
    warning: {
      DEFAULT: 'oklch(82% 0.15 80)',
      foreground: 'oklch(18% 0.05 80)',
    },
    info: {
      DEFAULT: 'oklch(50% 0.15 245)',
      foreground: 'oklch(98% 0 0)',
    },
  },
})
