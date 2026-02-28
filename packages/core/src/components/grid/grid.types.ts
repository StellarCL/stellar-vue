import type { HTMLAttributes } from 'vue'

export interface ResponsiveCols {
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

export interface GridProps {
  /**
   * Number of grid columns, or responsive object
   * @default 1
   */
  cols?: number | ResponsiveCols

  /**
   * Gap between grid cells (Tailwind spacing scale value)
   * @default '4'
   */
  gap?: string | number

  /** Number of grid rows */
  rows?: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface GridItemProps {
  /** Number of columns to span */
  colSpan?: number

  /** Number of rows to span */
  rowSpan?: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
