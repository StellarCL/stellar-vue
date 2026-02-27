import type { Component, HTMLAttributes } from 'vue'

export interface StepConfig {
  /** The title of the step */
  title: string
  /** Optional description for the step */
  description?: string
  /** Optional custom icon component */
  icon?: Component
}

export interface StepperProps {
  /**
   * Array of step configuration objects defining each step.
   */
  steps: StepConfig[]

  /**
   * The currently active step (1-based). Can be bound as `v-model`.
   * @default 1
   */
  modelValue?: number

  /**
   * The layout orientation of the stepper.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface StepperItemProps {
  /**
   * The 1-based step number this item represents.
   */
  step: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface StepperTriggerProps {
  /**
   * The 1-based step number this trigger represents.
   */
  step: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface StepperSeparatorProps {
  /**
   * The step number before this separator (used to determine completed state).
   */
  step: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface StepperContentProps {
  /**
   * The 1-based step number this content panel belongs to.
   */
  step: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
