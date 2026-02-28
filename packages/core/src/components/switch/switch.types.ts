import type { HTMLAttributes } from 'vue'

export interface SwitchProps {
  /**
   * The controlled checked state of the switch. Can be bound with v-model.
   * @default false
   */
  modelValue?: boolean

  /**
   * When true, prevents the user from interacting with the switch
   * @default false
   */
  disabled?: boolean

  /**
   * The size of the switch
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
