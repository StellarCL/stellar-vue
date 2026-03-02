import { defineTheme } from '../generator'

/**
 * Antares - Warm red/orange theme
 * Inspired by the red supergiant star Antares
 * Bold, warm, and energetic with fiery red-orange tones
 */
export const antares = defineTheme({
  name: 'antares',
  type: 'light',
  colors: {
    background: 'oklch(100% 0 0)',
    foreground: 'oklch(12% 0.03 30)',

    primary: {
      DEFAULT: 'oklch(55% 0.19 30)',
      foreground: 'oklch(98% 0.005 30)',
    },
    primaryFocus: 'oklch(48% 0.19 30)',
    secondary: {
      DEFAULT: 'oklch(94% 0.02 30)',
      foreground: 'oklch(18% 0.03 30)',
    },
    accent: {
      DEFAULT: 'oklch(93% 0.04 25)',
      foreground: 'oklch(18% 0.03 25)',
    },
    destructive: {
      DEFAULT: 'oklch(48% 0.2 25)',
      foreground: 'oklch(98% 0 0)',
    },
    error: {
      DEFAULT: 'oklch(48% 0.2 25)',
      foreground: 'oklch(98% 0 0)',
    },
    errorFocus: 'oklch(43% 0.2 25)',
    muted: {
      DEFAULT: 'oklch(95% 0.01 30)',
      foreground: 'oklch(42% 0.02 30)',
    },
    card: {
      DEFAULT: 'oklch(99% 0.005 30)',
      foreground: 'oklch(12% 0.03 30)',
    },
    popover: {
      DEFAULT: 'oklch(99% 0.005 30)',
      foreground: 'oklch(12% 0.03 30)',
    },
    border: 'oklch(91% 0.01 30)',
    input: 'oklch(91% 0.01 30)',
    ring: 'oklch(55% 0.19 30)',

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
