import type { HTMLAttributes } from 'vue'

export interface ProgressProps {
  /**
   * The current progress value
   * @default 0
   */
  modelValue?: number

  /**
   * The maximum progress value
   * @default 100
   */
  max?: number

  /**
   * Visual variant of the progress indicator
   * @default 'default'
   */
  variant?: 'default' | 'success' | 'warning' | 'destructive'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
