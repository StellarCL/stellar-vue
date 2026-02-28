import type { HTMLAttributes } from 'vue'

export type DrawerSide = 'left' | 'right'
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface DrawerProps {
  /**
   * The controlled open state of the drawer. Can be bound as `v-model:open`.
   * @default undefined
   */
  open?: boolean

  /**
   * The open state of the drawer when it is initially rendered.
   * Use when you do not need to control its open state.
   * @default false
   */
  defaultOpen?: boolean
}

export interface DrawerTriggerProps {
  /**
   * Render as child element (Radix Vue primitive)
   * @default false
   */
  asChild?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DrawerPortalProps {
  /**
   * The container element to teleport to.
   * @default document.body
   */
  to?: string | HTMLElement
}

export interface DrawerOverlayProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DrawerContentProps {
  /**
   * The side the drawer slides in from.
   * @default 'right'
   */
  side?: DrawerSide

  /**
   * The size of the drawer panel.
   * @default 'md'
   */
  size?: DrawerSize

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DrawerHeaderProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DrawerFooterProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DrawerTitleProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DrawerDescriptionProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DrawerCloseProps {
  /**
   * Render as child element (Radix Vue primitive)
   * @default false
   */
  asChild?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
