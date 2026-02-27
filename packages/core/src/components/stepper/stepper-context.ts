import type { InjectionKey, Ref } from 'vue'
import type { StepConfig } from './stepper.types'

export interface StepperContext {
  activeStep: Readonly<Ref<number>>
  orientation: Ref<'horizontal' | 'vertical'>
  steps: StepConfig[]
  goTo: (step: number) => void
  isCompleted: (step: number) => boolean
  isActive: (step: number) => boolean
}

export const STEPPER_INJECTION_KEY: InjectionKey<StepperContext> = Symbol('stepper')
