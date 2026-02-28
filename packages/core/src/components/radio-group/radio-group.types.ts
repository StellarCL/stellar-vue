import type { HTMLAttributes } from 'vue'

export interface RadioGroupProps {
  /** The controlled value of the radio item to check. Can be bound with v-model. */
  modelValue?: string

  /**
   * When true, prevents the user from interacting with radio items
   * @default false
   */
  disabled?: boolean

  /**
   * The orientation of the radio group
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface RadioGroupItemProps {
  /** The value given as data when submitted with a name. */
  value: string

  /**
   * When true, prevents the user from interacting with the radio item
   * @default false
   */
  disabled?: boolean

  /** The id of the radio item element */
  id?: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
