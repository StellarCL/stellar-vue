import type { HTMLAttributes } from 'vue'

export interface TooltipProviderProps {
  /** The duration from when the mouse enters a tooltip trigger until the tooltip opens.
   * @default 200
   */
  delayDuration?: number

  /** How much time a user has to enter another trigger without incurring a delay again.
   * @default 300
   */
  skipDelayDuration?: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface TooltipProps {
  /** The controlled open state of the tooltip. Can be bound as `v-model:open`.
   * @default undefined
   */
  open?: boolean

  /** The open state of the tooltip when it is initially rendered.
   * Use when you do not need to control its open state.
   * @default undefined
   */
  defaultOpen?: boolean
}

export interface TooltipTriggerProps {
  /** Render as child element (Radix Vue primitive)
   * @default false
   */
  asChild?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface TooltipContentProps {
  /** The preferred side of the anchor to render against when open.
   * @default 'top'
   */
  side?: 'top' | 'right' | 'bottom' | 'left'

  /** The preferred alignment against the anchor.
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end'

  /** The distance in pixels from the anchor.
   * @default 4
   */
  sideOffset?: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
