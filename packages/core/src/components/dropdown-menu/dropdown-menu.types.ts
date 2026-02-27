import type { HTMLAttributes } from 'vue'

export interface DropdownMenuProps {
  /** The controlled open state of the dropdown menu.
   * @default undefined
   */
  open?: boolean

  /** The open state of the dropdown menu when it is initially rendered.
   * @default false
   */
  defaultOpen?: boolean
}

export interface DropdownMenuTriggerProps {
  /** Whether to render as child element (Radix Vue primitive).
   * @default false
   */
  asChild?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DropdownMenuContentProps {
  /** The distance in pixels from the trigger.
   * @default 4
   */
  sideOffset?: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DropdownMenuItemProps {
  /** When true, adds left padding to align with items that have an indicator.
   * @default false
   */
  inset?: boolean

  /** When true, prevents the user from interacting with the item.
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DropdownMenuCheckboxItemProps {
  /** The controlled checked state of the checkbox item.
   * @default false
   */
  checked?: boolean

  /** When true, prevents the user from interacting with the item.
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DropdownMenuRadioGroupProps {
  /** The controlled value of the radio group. Can be bound as `v-model`.
   * @default undefined
   */
  modelValue?: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DropdownMenuRadioItemProps {
  /** The value of the radio item. Required. */
  value: string

  /** When true, prevents the user from interacting with the item.
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DropdownMenuLabelProps {
  /** When true, adds left padding to align with items that have an indicator.
   * @default false
   */
  inset?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DropdownMenuSeparatorProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DropdownMenuShortcutProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DropdownMenuGroupProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DropdownMenuSubProps {
  /** The controlled open state of the submenu.
   * @default undefined
   */
  open?: boolean

  /** The open state of the submenu when it is initially rendered.
   * @default false
   */
  defaultOpen?: boolean
}

export interface DropdownMenuSubTriggerProps {
  /** When true, adds left padding to align with items that have an indicator.
   * @default false
   */
  inset?: boolean

  /** When true, prevents the user from interacting with the sub trigger.
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DropdownMenuSubContentProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
