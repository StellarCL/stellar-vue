import { defineTheme } from '../generator'

/**
 * Sirius - Bright blue theme
 * Inspired by Sirius, the brightest star in the night sky
 * Clean, professional feel with vivid blue tones
 */
export const sirius = defineTheme({
  name: 'sirius',
  type: 'light',
  colors: {
    background: 'oklch(100% 0 0)',
    foreground: 'oklch(12% 0.02 245)',

    primary: {
      DEFAULT: 'oklch(50% 0.18 245)',
      foreground: 'oklch(98% 0.005 245)',
    },
    primaryFocus: 'oklch(43% 0.18 245)',
    secondary: {
      DEFAULT: 'oklch(94% 0.02 245)',
      foreground: 'oklch(18% 0.03 245)',
    },
    accent: {
      DEFAULT: 'oklch(93% 0.04 245)',
      foreground: 'oklch(18% 0.03 245)',
    },
    destructive: {
      DEFAULT: 'oklch(50% 0.2 27)',
      foreground: 'oklch(98% 0 0)',
    },
    error: {
      DEFAULT: 'oklch(50% 0.2 27)',
      foreground: 'oklch(98% 0 0)',
    },
    errorFocus: 'oklch(45% 0.2 27)',
    muted: {
      DEFAULT: 'oklch(95% 0.01 245)',
      foreground: 'oklch(42% 0.02 245)',
    },
    card: {
      DEFAULT: 'oklch(99% 0.003 245)',
      foreground: 'oklch(12% 0.02 245)',
    },
    popover: {
      DEFAULT: 'oklch(99% 0.003 245)',
      foreground: 'oklch(12% 0.02 245)',
    },
    border: 'oklch(91% 0.01 245)',
    input: 'oklch(91% 0.01 245)',
    ring: 'oklch(50% 0.18 245)',

    success: {
      DEFAULT: 'oklch(42% 0.15 155)',
      foreground: 'oklch(98% 0 0)',
    },
    successFocus: 'oklch(38% 0.15 155)',
    warning: {
      DEFAULT: 'oklch(82% 0.15 80)',
      foreground: 'oklch(18% 0.05 80)',
    },
    warningFocus: 'oklch(75% 0.15 80)',
    info: {
      DEFAULT: 'oklch(50% 0.15 250)',
      foreground: 'oklch(98% 0 0)',
    },
    infoFocus: 'oklch(45% 0.15 250)',
  },
})
