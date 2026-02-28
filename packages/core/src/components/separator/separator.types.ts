import type { HTMLAttributes } from 'vue'

export interface SeparatorProps {
  /**
   * The orientation of the separator
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * Whether the separator is purely decorative. When true, renders role="none" instead of role="separator"
   * @default false
   */
  decorative?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
