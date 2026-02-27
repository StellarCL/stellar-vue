import type { HTMLAttributes } from 'vue'

export interface CommandProps {
  /**
   * Optional placeholder override (passed down to CommandInput)
   * @default undefined
   */
  placeholder?: string

  /**
   * Additional CSS classes
   */
  class?: HTMLAttributes['class']
}

export interface CommandDialogProps {
  /**
   * The controlled open state of the command dialog.
   * Can be bound as `v-model:open`.
   * @default false
   */
  open?: boolean

  /**
   * Additional CSS classes applied to the Command root inside the dialog
   */
  class?: HTMLAttributes['class']
}

export interface CommandInputProps {
  /**
   * The placeholder text shown when the input is empty.
   * @default 'Search...'
   */
  placeholder?: string

  /**
   * The current value of the input. Can be bound as `v-model`.
   * @default ''
   */
  modelValue?: string

  /**
   * Additional CSS classes
   */
  class?: HTMLAttributes['class']
}

export interface CommandListProps {
  /**
   * Additional CSS classes
   */
  class?: HTMLAttributes['class']
}

export interface CommandEmptyProps {
  /**
   * Additional CSS classes
   */
  class?: HTMLAttributes['class']
}

export interface CommandGroupProps {
  /**
   * The heading label displayed above the group.
   * @default undefined
   */
  heading?: string

  /**
   * Additional CSS classes
   */
  class?: HTMLAttributes['class']
}

export interface CommandItemProps {
  /**
   * The value used for filtering this item. Falls back to the item's
   * visible text content when not provided.
   * @default undefined
   */
  value?: string

  /**
   * When true, prevents the user from selecting the item.
   * @default false
   */
  disabled?: boolean

  /**
   * Additional CSS classes
   */
  class?: HTMLAttributes['class']
}

export interface CommandSeparatorProps {
  /**
   * Additional CSS classes
   */
  class?: HTMLAttributes['class']
}

export interface CommandShortcutProps {
  /**
   * Additional CSS classes
   */
  class?: HTMLAttributes['class']
}

/** Internal context shape provided by Command to descendant components */
export interface CommandContext {
  /** Current search query */
  search: { value: string }
  /** Index of the currently highlighted item (-1 = none) */
  selectedIndex: { value: number }
  /** Total number of registered (non-filtered) items */
  itemCount: { value: number }
  /** Register an item; returns its assigned index */
  registerItem: (value: string) => number
  /** Remove an item by index */
  unregisterItem: (index: number) => void
  /** Whether an item at a given index matches the current search */
  isItemVisible: (index: number) => boolean
  /** Select the item at the given index */
  selectItem: (index: number) => void
}
