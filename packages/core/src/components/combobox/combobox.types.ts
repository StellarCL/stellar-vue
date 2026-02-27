import type { HTMLAttributes } from 'vue'

export interface ComboboxProps {
  /** The controlled value of the Combobox. Can be bound as `v-model`.
   * @default undefined
   */
  modelValue?: string

  /** The controlled open state of the Combobox. Can be bound as `v-model:open`.
   * @default undefined
   */
  open?: boolean

  /** The open state of the Combobox when it is initially rendered.
   * @default false
   */
  defaultOpen?: boolean

  /** Whether the Combobox is disabled.
   * @default false
   */
  disabled?: boolean

  /** The name of the Combobox. Submitted with its owning form as part of a name/value pair. */
  name?: string
}

export interface ComboboxInputProps {
  /** Placeholder text when no search term is entered */
  placeholder?: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ComboboxTriggerProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ComboboxContentProps {
  /** The positioning mode of the combobox content.
   * @default 'popper'
   */
  position?: 'inline' | 'popper'

  /** The preferred side of the trigger to render against.
   * @default 'bottom'
   */
  side?: 'top' | 'right' | 'bottom' | 'left'

  /** The distance in pixels from the trigger.
   * @default 4
   */
  sideOffset?: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ComboboxItemProps {
  /** The value of the item. Required. */
  value: string

  /** Whether the item is disabled.
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ComboboxEmptyProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ComboboxGroupProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ComboboxLabelProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
