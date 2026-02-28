import type { HTMLAttributes } from 'vue'

export interface MultiSelectOption {
  /** Display label for the option */
  label: string
  /** Value of the option */
  value: string
}

export interface MultiSelectProps {
  /**
   * The controlled value of the MultiSelect. Can be bound as `v-model`.
   * @default []
   */
  modelValue?: string[]

  /** The list of available options */
  options?: MultiSelectOption[]

  /** Placeholder text when no items are selected */
  placeholder?: string

  /**
   * Whether the MultiSelect is disabled.
   * @default false
   */
  disabled?: boolean

  /**
   * Maximum number of selections allowed.
   * @default undefined (unlimited)
   */
  max?: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface MultiSelectTriggerProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface MultiSelectContentProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface MultiSelectItemProps {
  /** The value of the item */
  value: string

  /** Display label for the item */
  label: string

  /**
   * Whether the item is selected
   * @default false
   */
  selected?: boolean

  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface MultiSelectTagProps {
  /** The value of the tag */
  value: string

  /** Display label for the tag */
  label: string

  /**
   * Whether the tag can be removed
   * @default true
   */
  removable?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface MultiSelectEmptyProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
