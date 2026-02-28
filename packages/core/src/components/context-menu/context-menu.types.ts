import type { HTMLAttributes } from 'vue'

export interface ContextMenuProps {
  /**
   * The controlled open state of the context menu.
   * @default undefined
   */
  open?: boolean

  /**
   * The open state of the context menu when it is initially rendered.
   * @default false
   */
  defaultOpen?: boolean
}

export interface ContextMenuTriggerProps {
  /**
   * Whether to render as child element (Radix Vue primitive).
   * @default false
   */
  asChild?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ContextMenuContentProps {
  /**
   * The distance in pixels from the trigger.
   * @default 0
   */
  sideOffset?: number

  /**
   * Alignment offset in pixels.
   * @default 2
   */
  alignOffset?: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ContextMenuItemProps {
  /**
   * When true, adds left padding to align with items that have an indicator.
   * @default false
   */
  inset?: boolean

  /**
   * When true, prevents the user from interacting with the item.
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ContextMenuCheckboxItemProps {
  /**
   * The controlled checked state of the checkbox item.
   * @default false
   */
  checked?: boolean

  /**
   * When true, prevents the user from interacting with the item.
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ContextMenuRadioGroupProps {
  /**
   * The controlled value of the radio group. Can be bound as `v-model`.
   * @default undefined
   */
  modelValue?: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ContextMenuRadioItemProps {
  /** The value of the radio item. Required. */
  value: string

  /**
   * When true, prevents the user from interacting with the item.
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ContextMenuLabelProps {
  /**
   * When true, adds left padding to align with items that have an indicator.
   * @default false
   */
  inset?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ContextMenuSeparatorProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ContextMenuShortcutProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ContextMenuGroupProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ContextMenuSubProps {
  /**
   * The controlled open state of the submenu.
   * @default undefined
   */
  open?: boolean

  /**
   * The open state of the submenu when it is initially rendered.
   * @default false
   */
  defaultOpen?: boolean
}

export interface ContextMenuSubTriggerProps {
  /**
   * When true, adds left padding to align with items that have an indicator.
   * @default false
   */
  inset?: boolean

  /**
   * When true, prevents the user from interacting with the sub trigger.
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ContextMenuSubContentProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
