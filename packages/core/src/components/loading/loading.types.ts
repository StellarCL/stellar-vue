import type { HTMLAttributes } from 'vue'

export interface LoadingProps {
  /**
   * Animation variant
   * @default 'spinner'
   */
  variant?: 'spinner' | 'dots' | 'bar' | 'skeleton'

  /**
   * Size of the loading indicator
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /** Optional loading text displayed beneath the indicator */
  text?: string

  /** Wrap the loading indicator in an overlay */
  overlay?: boolean

  /**
   * Whether the overlay covers the entire viewport
   * @default false
   */
  fullscreen?: boolean

  /** Progress value 0-100 for determinate bar mode */
  progress?: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface LoadingSpinnerProps {
  /**
   * Size of the spinner
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface LoadingDotsProps {
  /**
   * Size of the dots
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface LoadingBarProps {
  /** Progress value 0-100. If undefined, renders indeterminate animation */
  progress?: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface LoadingOverlayProps {
  /**
   * Whether the overlay covers the entire viewport
   * @default false
   */
  fullscreen?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
