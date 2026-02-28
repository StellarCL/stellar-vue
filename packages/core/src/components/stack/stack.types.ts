import type { HTMLAttributes } from 'vue'

export interface StackProps {
  /**
   * Direction of the stack layout
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal'

  /**
   * Gap between children (Tailwind spacing scale value)
   * @default '4'
   */
  gap?: string | number

  /** Align items along the cross axis */
  align?: 'start' | 'center' | 'end' | 'stretch'

  /** Justify items along the main axis */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'

  /**
   * Whether children should wrap
   * @default false
   */
  wrap?: boolean

  /**
   * HTML element to render as
   * @default 'div'
   */
  as?: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
