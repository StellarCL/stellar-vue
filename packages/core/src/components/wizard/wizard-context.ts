import type { InjectionKey, Ref } from 'vue'

export interface WizardContext {
  current: Readonly<Ref<number>>
  total: number
  isFirst: Readonly<Ref<boolean>>
  isLast: Readonly<Ref<boolean>>
  next: () => Promise<void>
  prev: () => void
  goTo: (step: number) => void
  registerStep: (step: number, validate: (() => Promise<boolean>) | undefined) => void
}

export const WIZARD_INJECTION_KEY: InjectionKey<WizardContext> = Symbol('wizard')
