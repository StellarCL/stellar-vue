import { defineTheme } from '../generator'

/**
 * Stellar - The default cosmic purple theme
 * Inspired by the brand colors (#667eea)
 * Purple/cosmic palette with vibrant, stellar energy
 */
export const stellar = defineTheme({
  name: 'stellar',
  type: 'light',
  colors: {
    background: 'oklch(100% 0 0)',
    foreground: 'oklch(12% 0.03 285)',

    primary: {
      DEFAULT: 'oklch(55% 0.187 285)',
      foreground: 'oklch(98% 0.01 285)',
    },
    primaryFocus: 'oklch(48% 0.187 285)',
    secondary: {
      DEFAULT: 'oklch(94% 0.02 285)',
      foreground: 'oklch(18% 0.03 285)',
    },
    accent: {
      DEFAULT: 'oklch(93% 0.04 285)',
      foreground: 'oklch(18% 0.03 285)',
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
      DEFAULT: 'oklch(95% 0.01 285)',
      foreground: 'oklch(42% 0.02 285)',
    },
    card: {
      DEFAULT: 'oklch(99% 0.005 285)',
      foreground: 'oklch(12% 0.03 285)',
    },
    popover: {
      DEFAULT: 'oklch(99% 0.005 285)',
      foreground: 'oklch(12% 0.03 285)',
    },
    border: 'oklch(91% 0.01 285)',
    input: 'oklch(91% 0.01 285)',
    ring: 'oklch(55% 0.187 285)',

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
      DEFAULT: 'oklch(50% 0.15 245)',
      foreground: 'oklch(98% 0 0)',
    },
    infoFocus: 'oklch(45% 0.15 245)',
  },
})
