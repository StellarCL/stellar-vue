import type { HTMLAttributes } from 'vue'

export interface TimelineProps {
  /**
   * Layout direction for timeline items
   * @default 'left'
   */
  layout?: 'left' | 'right' | 'alternating'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface TimelineItemProps {
  /** Date string to display */
  date?: string

  /**
   * Visual variant of the timeline dot
   * @default 'default'
   */
  variant?: 'default' | 'success' | 'warning' | 'destructive'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface TimelineConnectorProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface TimelineContentProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
