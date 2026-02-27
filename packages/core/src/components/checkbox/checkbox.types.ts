import type { HTMLAttributes } from 'vue'

export interface CheckboxProps {
  /** The controlled checked state of the checkbox. Can be bound with v-model.
   * @default false
   */
  modelValue?: boolean | 'indeterminate'

  /** When true, prevents the user from interacting with the checkbox
   * @default false
   */
  disabled?: boolean

  /** When true, indicates that the user must check the checkbox before the owning form can be submitted
   * @default false
   */
  required?: boolean

  /** The id of the checkbox element */
  id?: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
