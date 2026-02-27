import type { HTMLAttributes } from 'vue'

export interface FormProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface FormFieldProps {
  /** The name of the field, used for VeeValidate field registration */
  name: string
}

export interface FormItemProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface FormLabelProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface FormControlProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface FormDescriptionProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface FormMessageProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
