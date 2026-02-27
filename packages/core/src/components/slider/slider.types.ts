import type { HTMLAttributes } from 'vue'

export interface SliderProps {
  /** Current value(s) of the slider
   * @default [0]
   */
  modelValue?: number[]

  /** Minimum value
   * @default 0
   */
  min?: number

  /** Maximum value
   * @default 100
   */
  max?: number

  /** Step increment
   * @default 1
   */
  step?: number

  /** Whether the slider is disabled
   * @default false
   */
  disabled?: boolean

  /** Orientation of the slider
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
