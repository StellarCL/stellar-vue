import type { HTMLAttributes } from 'vue'

export interface RatingProps {
  /**
   * The current rating value (v-model)
   * @default 0
   */
  modelValue?: number

  /**
   * Maximum number of stars
   * @default 5
   */
  max?: number

  /**
   * Enable half-star ratings
   * @default false
   */
  halfStars?: boolean

  /**
   * Prevent user interaction
   * @default false
   */
  readonly?: boolean

  /**
   * Size of the stars
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
