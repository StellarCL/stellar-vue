import type { HTMLAttributes } from 'vue'

export interface DialogProps {
  /**
   * The controlled open state of the dialog. Can be bound as `v-model:open`.
   * @default undefined
   */
  open?: boolean

  /**
   * The open state of the dialog when it is initially rendered.
   * Use when you do not need to control its open state.
   * @default false
   */
  defaultOpen?: boolean
}

export interface DialogTriggerProps {
  /**
   * Render as child element (Radix Vue primitive)
   * @default false
   */
  asChild?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DialogPortalProps {
  /**
   * The container element to teleport to.
   * @default document.body
   */
  to?: string | HTMLElement
}

export interface DialogOverlayProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DialogContentProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DialogHeaderProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DialogFooterProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DialogTitleProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DialogDescriptionProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DialogCloseProps {
  /**
   * Render as child element (Radix Vue primitive)
   * @default false
   */
  asChild?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
