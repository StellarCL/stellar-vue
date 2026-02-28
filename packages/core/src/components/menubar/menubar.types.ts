import type { HTMLAttributes } from 'vue'

export interface MenubarProps {
  /**
   * The controlled value of the menu to open. Used to force-open a specific menu by its value.
   * @default undefined
   */
  modelValue?: string

  /**
   * The value of the menu that should be open when initially rendered.
   * @default undefined
   */
  defaultValue?: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface MenubarMenuProps {
  /**
   * The value of the menu (for controlled open state).
   * @default undefined
   */
  value?: string
}

export interface MenubarTriggerProps {
  /**
   * When true, prevents the user from interacting with the trigger.
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface MenubarContentProps {
  /**
   * The preferred alignment against the trigger.
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end'

  /**
   * The distance in pixels from the trigger.
   * @default 8
   */
  sideOffset?: number

  /**
   * Alignment offset in pixels.
   * @default -4
   */
  alignOffset?: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface MenubarItemProps {
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

export interface MenubarCheckboxItemProps {
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

export interface MenubarRadioGroupProps {
  /**
   * The controlled value of the radio group. Can be bound as `v-model`.
   * @default undefined
   */
  modelValue?: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface MenubarRadioItemProps {
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

export interface MenubarLabelProps {
  /**
   * When true, adds left padding to align with items that have an indicator.
   * @default false
   */
  inset?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface MenubarSeparatorProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface MenubarShortcutProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface MenubarGroupProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface MenubarSubProps {
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

export interface MenubarSubTriggerProps {
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

export interface MenubarSubContentProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
