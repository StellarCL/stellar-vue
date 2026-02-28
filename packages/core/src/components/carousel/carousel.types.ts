import type { HTMLAttributes } from 'vue'

export interface CarouselProps {
  /**
   * Enable auto-play
   * @default false
   */
  autoPlay?: boolean

  /**
   * Auto-play interval in milliseconds
   * @default 5000
   */
  autoPlayInterval?: number

  /**
   * Enable looping from last to first slide
   * @default false
   */
  loop?: boolean

  /**
   * Carousel orientation
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CarouselContentProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CarouselItemProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CarouselPreviousProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CarouselNextProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CarouselContext {
  currentIndex: number
  totalSlides: number
  orientation: 'horizontal' | 'vertical'
  canScrollPrev: boolean
  canScrollNext: boolean
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: (index: number) => void
  registerSlide: () => number
}
