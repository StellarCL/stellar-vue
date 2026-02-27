import type { HTMLAttributes } from 'vue'

export type SheetSide = 'top' | 'bottom' | 'left' | 'right'
export type SheetSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface SheetProps {
  /** The controlled open state of the sheet. Can be bound as `v-model:open`.
   * @default undefined
   */
  open?: boolean

  /** The open state of the sheet when it is initially rendered.
   * Use when you do not need to control its open state.
   * @default false
   */
  defaultOpen?: boolean
}

export interface SheetTriggerProps {
  /** Render as child element (Radix Vue primitive)
   * @default false
   */
  asChild?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SheetPortalProps {
  /** The container element to teleport to.
   * @default document.body
   */
  to?: string | HTMLElement
}

export interface SheetOverlayProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SheetContentProps {
  /** The side the sheet slides in from.
   * @default 'bottom'
   */
  side?: SheetSide

  /** The size of the sheet panel.
   * @default 'md'
   */
  size?: SheetSize

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SheetHeaderProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SheetFooterProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SheetTitleProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SheetDescriptionProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SheetCloseProps {
  /** Render as child element (Radix Vue primitive)
   * @default false
   */
  asChild?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
