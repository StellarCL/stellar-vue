import type { HTMLAttributes } from 'vue'

export interface LabelProps {
  /** The id of the form element this label is associated with */
  for?: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']

  /**
   * Whether the associated field is required, shows an asterisk indicator
   * @default false
   */
  required?: boolean
}
