import type { HTMLAttributes } from 'vue'

export interface PopoverProps {
  /**
   * The controlled open state of the popover. Can be bound as `v-model:open`.
   * @default undefined
   */
  open?: boolean

  /**
   * The open state of the popover when it is initially rendered.
   * Use when you do not need to control its open state.
   * @default undefined
   */
  defaultOpen?: boolean
}

export interface PopoverTriggerProps {
  /**
   * Render as child element (Radix Vue primitive)
   * @default false
   */
  asChild?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface PopoverContentProps {
  /**
   * The preferred side of the anchor to render against when open.
   * @default 'bottom'
   */
  side?: 'top' | 'right' | 'bottom' | 'left'

  /**
   * The preferred alignment against the anchor.
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end'

  /**
   * The distance in pixels from the anchor.
   * @default 4
   */
  sideOffset?: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
