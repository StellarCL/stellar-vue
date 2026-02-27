import { defineTheme } from '../generator'

/**
 * Polaris - Cool neutral theme
 * Inspired by the North Star, a steady and reliable guide
 * Minimal, mostly neutral gray-scale with subtle cool undertones
 */
export const polaris = defineTheme({
  name: 'polaris',
  type: 'light',
  colors: {
    background: 'oklch(100% 0 0)',
    foreground: 'oklch(12% 0.005 260)',

    primary: {
      DEFAULT: 'oklch(35% 0.02 260)',
      foreground: 'oklch(98% 0 0)',
    },
    secondary: {
      DEFAULT: 'oklch(94% 0.005 260)',
      foreground: 'oklch(18% 0.01 260)',
    },
    accent: {
      DEFAULT: 'oklch(93% 0.01 260)',
      foreground: 'oklch(18% 0.01 260)',
    },
    destructive: {
      DEFAULT: 'oklch(50% 0.2 27)',
      foreground: 'oklch(98% 0 0)',
    },
    muted: {
      DEFAULT: 'oklch(95% 0.003 260)',
      foreground: 'oklch(42% 0.01 260)',
    },
    card: {
      DEFAULT: 'oklch(99% 0.002 260)',
      foreground: 'oklch(12% 0.005 260)',
    },
    popover: {
      DEFAULT: 'oklch(99% 0.002 260)',
      foreground: 'oklch(12% 0.005 260)',
    },
    border: 'oklch(90% 0.005 260)',
    input: 'oklch(90% 0.005 260)',
    ring: 'oklch(35% 0.02 260)',

    success: {
      DEFAULT: 'oklch(42% 0.15 155)',
      foreground: 'oklch(98% 0 0)',
    },
    warning: {
      DEFAULT: 'oklch(82% 0.12 80)',
      foreground: 'oklch(18% 0.05 80)',
    },
    info: {
      DEFAULT: 'oklch(45% 0.1 250)',
      foreground: 'oklch(98% 0 0)',
    },
  },
})
