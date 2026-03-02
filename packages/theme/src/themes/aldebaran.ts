import { defineTheme } from '../generator'

/**
 * Aldebaran - Amber/gold theme
 * Inspired by the orange giant star Aldebaran
 * Warm, rich, and luxurious with amber/gold tones
 */
export const aldebaran = defineTheme({
  name: 'aldebaran',
  type: 'light',
  colors: {
    background: 'oklch(100% 0 0)',
    foreground: 'oklch(12% 0.03 75)',

    primary: {
      DEFAULT: 'oklch(55% 0.14 75)',
      foreground: 'oklch(98% 0.005 75)',
    },
    primaryFocus: 'oklch(48% 0.14 75)',
    secondary: {
      DEFAULT: 'oklch(94% 0.02 75)',
      foreground: 'oklch(18% 0.03 75)',
    },
    accent: {
      DEFAULT: 'oklch(93% 0.04 80)',
      foreground: 'oklch(18% 0.03 80)',
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
      DEFAULT: 'oklch(95% 0.01 75)',
      foreground: 'oklch(42% 0.02 75)',
    },
    card: {
      DEFAULT: 'oklch(99% 0.005 75)',
      foreground: 'oklch(12% 0.03 75)',
    },
    popover: {
      DEFAULT: 'oklch(99% 0.005 75)',
      foreground: 'oklch(12% 0.03 75)',
    },
    border: 'oklch(91% 0.01 75)',
    input: 'oklch(91% 0.01 75)',
    ring: 'oklch(55% 0.14 75)',

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
