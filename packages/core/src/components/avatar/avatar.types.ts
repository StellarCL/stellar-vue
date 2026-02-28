import type { HTMLAttributes } from 'vue'

export interface AvatarProps {
  /**
   * Size of the avatar
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface AvatarImageProps {
  /** The URL of the image to display */
  src: string

  /** Accessible alternative text for the image */
  alt: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface AvatarFallbackProps {
  /** Useful for delaying rendering so it only appears for those with slower connections */
  delayMs?: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
