import type { HTMLAttributes } from 'vue'

export type ToastVariant = 'default' | 'success' | 'destructive' | 'warning' | 'info'

export interface ToastProps {
  /**
   * Visual variant of the toast
   * @default 'default'
   */
  variant?: ToastVariant

  /**
   * The controlled open state of the toast.
   * @default true
   */
  open?: boolean

  /**
   * Time in milliseconds that toast should remain visible.
   * Overrides the provider duration.
   */
  duration?: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ToastTitleProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ToastDescriptionProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ToastActionProps {
  /**
   * A short description for an alternate way to carry out the action.
   * For screen reader users who will not be able to navigate to the button easily/quickly.
   */
  altText: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ToastCloseProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ToastViewportProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']

  /**
   * The keys to use as the keyboard shortcut that will move focus to the toast viewport.
   * @default ['F8']
   */
  hotkey?: string[]

  /**
   * An author-localized label for the toast viewport.
   * @default 'Notifications ({hotkey})'
   */
  label?: string
}

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center'

export interface ToasterProps {
  /**
   * Position of the toaster on screen
   * @default 'top-right'
   */
  position?: ToastPosition

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ToastOptions {
  /** Title text for the toast */
  title?: string

  /** Description/body text for the toast */
  description?: string

  /**
   * Visual variant of the toast
   * @default 'default'
   */
  variant?: ToastVariant

  /** Action button configuration */
  action?: {
    label: string
    onClick: () => void
  }

  /**
   * Duration in milliseconds before auto-dismiss. Set to 0 to disable.
   * @default 5000
   */
  duration?: number
}

export interface ToastItem {
  /** Unique identifier for the toast */
  id: number

  /** Title text */
  title?: string

  /** Description/body text */
  description?: string

  /** Visual variant */
  variant: ToastVariant

  /** Action button configuration */
  action?: {
    label: string
    onClick: () => void
  }

  /** Duration in milliseconds */
  duration: number

  /** Whether the toast is currently open */
  open: boolean
}
