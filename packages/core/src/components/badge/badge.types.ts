import type { HTMLAttributes } from 'vue'

export interface BadgeProps {
  /** Visual variant of the badge
   * @default 'default'
   */
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
