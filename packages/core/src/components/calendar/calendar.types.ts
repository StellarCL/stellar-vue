import type { DateValue } from '@internationalized/date'
import type { HTMLAttributes } from 'vue'

export interface CalendarProps {
  /** The controlled selected date value. Can be bound as `v-model`. */
  modelValue?: DateValue | undefined

  /** The default value when initially rendered */
  defaultValue?: DateValue

  /** The placeholder date, which is used to determine what month to display when no date is selected */
  placeholder?: DateValue

  /** The minimum date that can be selected */
  minValue?: DateValue

  /** The maximum date that can be selected */
  maxValue?: DateValue

  /**
   * Whether the calendar is disabled
   * @default false
   */
  disabled?: boolean

  /** A function that returns whether a date is disabled */
  isDateDisabled?: (date: DateValue) => boolean

  /** A function that returns whether a date is unavailable */
  isDateUnavailable?: (date: DateValue) => boolean

  /**
   * The locale to use for formatting dates
   * @default 'en-US'
   */
  locale?: string

  /**
   * The day of the week to start the calendar on (0 = Sunday)
   * @default 0
   */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6

  /**
   * Whether to always display 6 weeks in the calendar
   * @default false
   */
  fixedWeeks?: boolean

  /**
   * The number of months to display at once
   * @default 1
   */
  numberOfMonths?: number

  /**
   * Whether or not to prevent the user from deselecting a date
   * @default false
   */
  preventDeselect?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CalendarHeaderProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CalendarHeadingProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CalendarGridProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CalendarGridHeadProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CalendarGridBodyProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CalendarGridRowProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CalendarCellProps {
  /** The date value for the cell */
  date: DateValue

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CalendarDayProps {
  /** The day date value */
  day: DateValue

  /** The month in which the cell is rendered */
  month: DateValue

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CalendarHeadCellProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CalendarNextButtonProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CalendarPrevButtonProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
