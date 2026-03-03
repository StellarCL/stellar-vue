import type { Component, HTMLAttributes, VNode } from 'vue'

export interface ColumnDef<T = any> {
  /**
   * Unique identifier for the column.
   */
  id: string

  /**
   * Column header label or component.
   */
  header?: string | Component

  /**
   * Key on the row object to use as the cell value.
   */
  accessorKey?: keyof T & string

  /**
   * Function to derive the cell value from the row.
   */
  accessorFn?: (row: T) => any

  /**
   * Custom cell renderer returning a string or VNode.
   */
  cell?: (info: { row: T, getValue: () => any }) => string | VNode

  /**
   * Whether this column supports sorting.
   * @default false
   */
  enableSorting?: boolean

  /**
   * Whether this column can be hidden via column visibility controls.
   * @default true
   */
  enableHiding?: boolean

  /**
   * Whether this column supports text filtering.
   * @default false
   */
  filterable?: boolean

  /**
   * Preferred column width in pixels.
   */
  size?: number

  /**
   * Minimum column width in pixels.
   */
  minSize?: number

  /**
   * Maximum column width in pixels.
   */
  maxSize?: number
}

export type SortDirection = 'asc' | 'desc' | false

export interface SortingState {
  id: string
  desc: boolean
}

export interface DataTableProps<T = any> {
  /**
   * Column definitions array.
   */
  columns: ColumnDef<T>[]

  /**
   * Row data array.
   */
  data: T[]

  /**
   * Number of rows per page.
   * @default 10
   */
  pageSize?: number

  /**
   * Additional CSS classes for the table wrapper.
   */
  class?: HTMLAttributes['class']
}

export interface DataTableHeaderProps {
  /**
   * Additional CSS classes.
   */
  class?: HTMLAttributes['class']
}

export interface DataTableBodyProps {
  /**
   * Additional CSS classes.
   */
  class?: HTMLAttributes['class']
}

export interface DataTableRowProps {
  /**
   * Whether this row is currently selected.
   * @default false
   */
  selected?: boolean

  /**
   * Additional CSS classes.
   */
  class?: HTMLAttributes['class']
}

export interface DataTableHeadProps {
  /**
   * Additional CSS classes.
   */
  class?: HTMLAttributes['class']
}

export interface DataTableCellProps {
  /**
   * Additional CSS classes.
   */
  class?: HTMLAttributes['class']
}

export interface DataTablePaginationProps {
  /**
   * Total number of rows.
   */
  total: number

  /**
   * Current page (1-indexed).
   */
  page: number

  /**
   * Number of rows per page.
   */
  pageSize: number

  /**
   * Number of selected rows.
   */
  selectedCount: number

  /**
   * Additional CSS classes.
   */
  class?: HTMLAttributes['class']
}

export interface DataTableColumnHeaderProps {
  /**
   * The column title displayed in the header.
   */
  title: string

  /**
   * Current sort direction for this column.
   */
  sortDirection?: SortDirection

  /**
   * Whether sorting is enabled for this column.
   * @default false
   */
  canSort?: boolean

  /**
   * Additional CSS classes.
   */
  class?: HTMLAttributes['class']
}

export interface DataTableToolbarProps {
  /**
   * Additional CSS classes.
   */
  class?: HTMLAttributes['class']
}

export interface DataTableRowActionsProps {
  /**
   * Additional CSS classes.
   */
  class?: HTMLAttributes['class']
}

export interface DataTableColumnToggleProps {
  /**
   * Column definitions array.
   */
  columns: ColumnDef[]

  /**
   * Map of columnId to visibility state.
   */
  columnVisibility: Record<string, boolean>

  /**
   * Additional CSS classes.
   */
  class?: HTMLAttributes['class']
}

export interface DataTableFilterProps {
  /**
   * Column definitions array.
   */
  columns: ColumnDef[]

  /**
   * Map of columnId to current filter value.
   */
  filter: Record<string, string>

  /**
   * Additional CSS classes.
   */
  class?: HTMLAttributes['class']
}
