import type { HTMLAttributes } from 'vue'

export interface TextareaProps {
  /** The controlled value of the textarea (for v-model) */
  modelValue?: string

  /** Placeholder text displayed when the textarea is empty */
  placeholder?: string

  /** Whether the textarea is disabled
   * @default false
   */
  disabled?: boolean

  /** Whether the textarea is required
   * @default false
   */
  required?: boolean

  /** Whether the textarea is read-only
   * @default false
   */
  readonly?: boolean

  /** Whether the textarea is in an error state — triggers error styling
   * @default false
   */
  error?: boolean

  /** The number of visible text rows
   * @default 3
   */
  rows?: number

  /** The id attribute of the textarea element — a unique id is generated if not provided */
  id?: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
