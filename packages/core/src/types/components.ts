import type { HTMLAttributes } from 'vue'

/**
 * Base props shared by all components
 */
export interface BaseComponentProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
  /** Element ID */
  id?: string
}

/**
 * Standard component sizes
 */
export type Size = 'sm' | 'md' | 'lg'

/**
 * Layout orientation
 */
export type Orientation = 'horizontal' | 'vertical'
