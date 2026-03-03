import type { HTMLAttributes } from 'vue'

export interface AutoFormProps {
  /** Zod schema to generate form from */
  schema: any
  /** Default values for form fields */
  defaults?: Record<string, any>
  /** Submit button label */
  submitLabel?: string
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
