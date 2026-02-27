import type { DateValue } from '@internationalized/date'

/**
 * Formats a DateValue using a simple format pattern.
 * Supported tokens: yyyy, MM, dd
 *
 * @param date - The DateValue to format
 * @param format - The format pattern (e.g., 'MM/dd/yyyy', 'dd/MM/yyyy', 'yyyy-MM-dd')
 * @returns The formatted date string
 */
export function formatDate(date: DateValue, format: string): string {
  const year = String(date.year)
  const month = String(date.month).padStart(2, '0')
  const day = String(date.day).padStart(2, '0')

  return format
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', day)
}
