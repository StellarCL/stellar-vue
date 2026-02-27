export interface TransitionPreset {
  enterActiveClass: string
  leaveActiveClass: string
  enterFromClass: string
  enterToClass: string
  leaveFromClass: string
  leaveToClass: string
}

export const transitionPresets = {
  // Fade — opacity only
  fade: {
    enterActiveClass: 'transition-opacity duration-200 ease-out',
    leaveActiveClass: 'transition-opacity duration-150 ease-in',
    enterFromClass: 'opacity-0',
    enterToClass: 'opacity-100',
    leaveFromClass: 'opacity-100',
    leaveToClass: 'opacity-0',
  },

  // FadeUp — opacity + translate-y up
  fadeUp: {
    enterActiveClass: 'transition-all duration-200 ease-out',
    leaveActiveClass: 'transition-all duration-150 ease-in',
    enterFromClass: 'opacity-0 translate-y-2',
    enterToClass: 'opacity-100 translate-y-0',
    leaveFromClass: 'opacity-100 translate-y-0',
    leaveToClass: 'opacity-0 translate-y-2',
  },

  // FadeDown — opacity + translate-y down
  fadeDown: {
    enterActiveClass: 'transition-all duration-200 ease-out',
    leaveActiveClass: 'transition-all duration-150 ease-in',
    enterFromClass: 'opacity-0 -translate-y-2',
    enterToClass: 'opacity-100 translate-y-0',
    leaveFromClass: 'opacity-100 translate-y-0',
    leaveToClass: 'opacity-0 -translate-y-2',
  },

  // FadeLeft — opacity + translate-x left
  fadeLeft: {
    enterActiveClass: 'transition-all duration-200 ease-out',
    leaveActiveClass: 'transition-all duration-150 ease-in',
    enterFromClass: 'opacity-0 translate-x-2',
    enterToClass: 'opacity-100 translate-x-0',
    leaveFromClass: 'opacity-100 translate-x-0',
    leaveToClass: 'opacity-0 translate-x-2',
  },

  // FadeRight — opacity + translate-x right
  fadeRight: {
    enterActiveClass: 'transition-all duration-200 ease-out',
    leaveActiveClass: 'transition-all duration-150 ease-in',
    enterFromClass: 'opacity-0 -translate-x-2',
    enterToClass: 'opacity-100 translate-x-0',
    leaveFromClass: 'opacity-100 translate-x-0',
    leaveToClass: 'opacity-0 -translate-x-2',
  },

  // SlideUp — translate-y only (from bottom)
  slideUp: {
    enterActiveClass: 'transition-transform duration-200 ease-out',
    leaveActiveClass: 'transition-transform duration-150 ease-in',
    enterFromClass: 'translate-y-full',
    enterToClass: 'translate-y-0',
    leaveFromClass: 'translate-y-0',
    leaveToClass: 'translate-y-full',
  },

  // SlideDown — translate-y only (from top)
  slideDown: {
    enterActiveClass: 'transition-transform duration-200 ease-out',
    leaveActiveClass: 'transition-transform duration-150 ease-in',
    enterFromClass: '-translate-y-full',
    enterToClass: 'translate-y-0',
    leaveFromClass: 'translate-y-0',
    leaveToClass: '-translate-y-full',
  },

  // SlideLeft — translate-x only (from right)
  slideLeft: {
    enterActiveClass: 'transition-transform duration-200 ease-out',
    leaveActiveClass: 'transition-transform duration-150 ease-in',
    enterFromClass: 'translate-x-full',
    enterToClass: 'translate-x-0',
    leaveFromClass: 'translate-x-0',
    leaveToClass: 'translate-x-full',
  },

  // SlideRight — translate-x only (from left)
  slideRight: {
    enterActiveClass: 'transition-transform duration-200 ease-out',
    leaveActiveClass: 'transition-transform duration-150 ease-in',
    enterFromClass: '-translate-x-full',
    enterToClass: 'translate-x-0',
    leaveFromClass: 'translate-x-0',
    leaveToClass: '-translate-x-full',
  },

  // Scale — opacity + scale (from 95%)
  scale: {
    enterActiveClass: 'transition-all duration-200 ease-out',
    leaveActiveClass: 'transition-all duration-150 ease-in',
    enterFromClass: 'opacity-0 scale-95',
    enterToClass: 'opacity-100 scale-100',
    leaveFromClass: 'opacity-100 scale-100',
    leaveToClass: 'opacity-0 scale-95',
  },

  // ScaleUp — opacity + scale from smaller (from 75%)
  scaleUp: {
    enterActiveClass: 'transition-all duration-200 ease-out',
    leaveActiveClass: 'transition-all duration-150 ease-in',
    enterFromClass: 'opacity-0 scale-75',
    enterToClass: 'opacity-100 scale-100',
    leaveFromClass: 'opacity-100 scale-100',
    leaveToClass: 'opacity-0 scale-75',
  },

  // ScaleDown — opacity + scale from larger (from 110%)
  scaleDown: {
    enterActiveClass: 'transition-all duration-200 ease-out',
    leaveActiveClass: 'transition-all duration-150 ease-in',
    enterFromClass: 'opacity-0 scale-110',
    enterToClass: 'opacity-100 scale-100',
    leaveFromClass: 'opacity-100 scale-100',
    leaveToClass: 'opacity-0 scale-110',
  },

  // Expand — height from 0 (for accordions)
  expand: {
    enterActiveClass: 'transition-all duration-200 ease-out overflow-hidden',
    leaveActiveClass: 'transition-all duration-150 ease-in overflow-hidden',
    enterFromClass: 'max-h-0 overflow-hidden opacity-0',
    enterToClass: 'max-h-screen opacity-100',
    leaveFromClass: 'max-h-screen opacity-100',
    leaveToClass: 'max-h-0 overflow-hidden opacity-0',
  },

  // Collapse — reverse of expand
  collapse: {
    enterActiveClass: 'transition-all duration-200 ease-out overflow-hidden',
    leaveActiveClass: 'transition-all duration-150 ease-in overflow-hidden',
    enterFromClass: 'max-h-screen opacity-100',
    enterToClass: 'max-h-0 overflow-hidden opacity-0',
    leaveFromClass: 'max-h-0 overflow-hidden opacity-0',
    leaveToClass: 'max-h-screen opacity-100',
  },

  // Bounce — enter with bounce effect
  bounce: {
    enterActiveClass: 'transition-all duration-300 ease-out animate-bounce',
    leaveActiveClass: 'transition-all duration-150 ease-in',
    enterFromClass: 'opacity-0 scale-95',
    enterToClass: 'opacity-100 scale-100',
    leaveFromClass: 'opacity-100 scale-100',
    leaveToClass: 'opacity-0 scale-95',
  },

  // Shake — uses animate-pulse for attention-grabbing effect
  shake: {
    enterActiveClass: 'transition-all duration-300 ease-out animate-pulse',
    leaveActiveClass: 'transition-all duration-150 ease-in',
    enterFromClass: 'opacity-0',
    enterToClass: 'opacity-100',
    leaveFromClass: 'opacity-100',
    leaveToClass: 'opacity-0',
  },

  // Blur — opacity + blur
  blur: {
    enterActiveClass: 'transition-all duration-200 ease-out',
    leaveActiveClass: 'transition-all duration-150 ease-in',
    enterFromClass: 'opacity-0 blur-sm',
    enterToClass: 'opacity-100 blur-0',
    leaveFromClass: 'opacity-100 blur-0',
    leaveToClass: 'opacity-0 blur-sm',
  },
} as const satisfies Record<string, TransitionPreset>

export type TransitionPresetName = keyof typeof transitionPresets
