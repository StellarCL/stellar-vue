import type { HTMLAttributes } from 'vue'

export interface CardProps {
  /**
   * Visual variant of the card
   * @default 'default'
   */
  variant?: 'default' | 'bordered' | 'elevated'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CardHeaderProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CardTitleProps {
  /**
   * Heading element to render as
   * @default 'h3'
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CardDescriptionProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CardContentProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CardFooterProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
