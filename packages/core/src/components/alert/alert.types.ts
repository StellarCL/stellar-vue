import type { HTMLAttributes } from 'vue'

export interface AlertProps {
  /**
   * Visual variant of the alert
   * @default 'default'
   */
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface AlertTitleProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface AlertDescriptionProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
