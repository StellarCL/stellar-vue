import type { HTMLAttributes } from 'vue'

export interface ButtonProps {
  /**
   * Visual variant of the button
   * @default 'default'
   */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'

  /**
   * Size of the button
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'icon'

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Whether to show loading state
   * @default false
   */
  loading?: boolean

  /**
   * Render as child element (Radix Vue primitive)
   * @default false
   */
  asChild?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
