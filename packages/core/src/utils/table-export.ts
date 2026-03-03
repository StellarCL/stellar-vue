import type { ColumnDef } from '../components/data-table/data-table.types'

/**
 * Escapes a value for safe inclusion in a CSV cell.
 * Wraps in double quotes if the value contains a comma, double quote, or newline.
 */
function escapeCsvValue(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

/**
 * Gets the cell value for a row using the column definition.
 */
function getCellValue<T>(row: T, col: ColumnDef<T>): string {
  let value: any

  if (col.accessorFn) {
    value = col.accessorFn(row)
  }
  else if (col.accessorKey) {
    value = (row as any)[col.accessorKey]
  }

  if (value == null) {
    return ''
  }

  return String(value)
}

/**
 * Gets the header label for a column.
 */
function getHeaderLabel<T>(col: ColumnDef<T>): string {
  if (typeof col.header === 'string') {
    return col.header
  }
  return col.id
}

/**
 * Exports table data to a specified format.
 *
 * @param columns - Column definitions describing the table structure
 * @param rows - Array of row data to export
 * @param format - Export format: 'csv' returns a CSV string, 'clipboard' copies to clipboard and returns the text
 * @returns The exported text content (CSV format or tab-separated for clipboard)
 *
 * @example
 * ```ts
 * const csv = exportTableData(columns, rows, 'csv')
 * // Download as file...
 *
 * const text = await exportTableData(columns, rows, 'clipboard')
 * // Already copied to clipboard
 * ```
 */
export function exportTableData<T>(
  columns: ColumnDef<T>[],
  rows: T[],
  format: 'csv' | 'clipboard',
): string {
  const visibleColumns = columns.filter(col => col.accessorKey || col.accessorFn)

  if (format === 'csv') {
    // Build CSV with comma separator
    const headerRow = visibleColumns.map(col => escapeCsvValue(getHeaderLabel(col))).join(',')

    const dataRows = rows.map(row =>
      visibleColumns.map(col => escapeCsvValue(getCellValue(row, col))).join(','),
    )

    return [headerRow, ...dataRows].join('\n')
  }

  // Clipboard format: tab-separated values
  const separator = '\t'

  const headerRow = visibleColumns.map(col => getHeaderLabel(col)).join(separator)

  const dataRows = rows.map(row =>
    visibleColumns.map(col => getCellValue(row, col)).join(separator),
  )

  const text = [headerRow, ...dataRows].join('\n')

  // Copy to clipboard if available
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => {
      // Silently fail if clipboard access is denied
    })
  }

  return text
}
