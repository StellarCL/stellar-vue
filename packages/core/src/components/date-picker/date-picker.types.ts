import type { HTMLAttributes } from 'vue'
import type { DateValue } from '@internationalized/date'

export interface DatePickerProps {
  /** The controlled selected date value. Can be bound as `v-model`. */
  modelValue?: DateValue | undefined

  /** Placeholder text displayed when no date is selected
   * @default 'Pick a date'
   */
  placeholder?: string

  /** Date format string for display
   * @default 'MM/dd/yyyy'
   */
  format?: string

  /** Whether the date picker is disabled
   * @default false
   */
  disabled?: boolean

  /** The minimum date that can be selected */
  minValue?: DateValue

  /** The maximum date that can be selected */
  maxValue?: DateValue

  /** The locale to use for formatting dates
   * @default 'en-US'
   */
  locale?: string

  /** The day of the week to start the calendar on (0 = Sunday)
   * @default 0
   */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DatePickerInputProps {
  /** The formatted date string to display */
  displayValue?: string

  /** Placeholder text displayed when no date is selected
   * @default 'Pick a date'
   */
  placeholder?: string

  /** Whether the input is disabled
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DatePickerContentProps {
  /** The preferred alignment against the anchor
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DateRange {
  start: DateValue | undefined
  end: DateValue | undefined
}

export interface DatePickerRangeProps {
  /** The controlled selected date range. Can be bound as `v-model`. */
  modelValue?: DateRange

  /** Placeholder text displayed when no date is selected
   * @default 'Pick a date range'
   */
  placeholder?: string

  /** Date format string for display
   * @default 'MM/dd/yyyy'
   */
  format?: string

  /** Whether the date picker is disabled
   * @default false
   */
  disabled?: boolean

  /** The minimum date that can be selected */
  minValue?: DateValue

  /** The maximum date that can be selected */
  maxValue?: DateValue

  /** The locale to use for formatting dates
   * @default 'en-US'
   */
  locale?: string

  /** The day of the week to start the calendar on (0 = Sunday)
   * @default 0
   */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface DatePickerPresetsProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface PresetItem {
  /** The display label for the preset */
  label: string
  /** The date value for the preset */
  value: DateValue
}

export interface PresetRangeItem {
  /** The display label for the preset */
  label: string
  /** The start date value for the preset */
  start: DateValue
  /** The end date value for the preset */
  end: DateValue
}
