import type { HTMLAttributes } from 'vue'

export interface InputProps {
  /**
   * The type of the input element
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'

  /** The controlled value of the input (for v-model) */
  modelValue?: string | number

  /** Placeholder text displayed when the input is empty */
  placeholder?: string

  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Whether the input is required
   * @default false
   */
  required?: boolean

  /**
   * Whether the input is read-only
   * @default false
   */
  readonly?: boolean

  /**
   * Whether the input is in an error state — triggers error styling
   * @default false
   */
  error?: boolean

  /** The id attribute of the input element — a unique id is generated if not provided */
  id?: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
