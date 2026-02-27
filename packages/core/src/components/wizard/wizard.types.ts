import type { HTMLAttributes } from 'vue'

export interface WizardProps {
  /**
   * The currently active step (1-based). Can be bound as `v-model`.
   * @default 1
   */
  modelValue?: number

  /**
   * The total number of steps in the wizard.
   */
  total: number

  /**
   * When true, Next calls each WizardStep's validate function before advancing.
   * @default true
   */
  validateOnNext?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface WizardStepProps {
  /**
   * The 1-based step number this content belongs to.
   */
  step: number

  /**
   * The title of this step.
   */
  title: string

  /**
   * Optional async validation function. Return true to allow advancing, false to block.
   */
  validate?: () => Promise<boolean>

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface WizardActionsProps {
  /**
   * Label for the Previous button.
   * @default 'Previous'
   */
  previousLabel?: string

  /**
   * Label for the Next button.
   * @default 'Next'
   */
  nextLabel?: string

  /**
   * Label for the Submit button shown on the last step.
   * @default 'Submit'
   */
  submitLabel?: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
