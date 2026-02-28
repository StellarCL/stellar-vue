import type { HTMLAttributes } from 'vue'

/** Supported chart types */
export type ChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'area'

/** A single dataset within chart data */
export interface ChartDataset {
  label?: string
  data: number[]
  backgroundColor?: string | string[]
  borderColor?: string | string[]
  borderWidth?: number
  fill?: boolean
  [key: string]: unknown
}

/** Data structure passed to chart components */
export interface ChartData {
  labels?: string[]
  datasets: ChartDataset[]
}

/** Subset of Chart.js options relevant for theming and configuration */
export interface ChartOptions {
  responsive?: boolean
  maintainAspectRatio?: boolean
  plugins?: {
    legend?: {
      display?: boolean
      position?: 'top' | 'bottom' | 'left' | 'right'
      labels?: Record<string, unknown>
    }
    tooltip?: {
      enabled?: boolean
      backgroundColor?: string
      titleColor?: string
      bodyColor?: string
      borderColor?: string
      borderWidth?: number
      [key: string]: unknown
    }
    [key: string]: unknown
  }
  scales?: Record<string, unknown>
  [key: string]: unknown
}

/** Options accepted by the useChart composable */
export interface UseChartOptions {
  /** Chart type */
  type: ChartType
  /** Chart data */
  data: ChartData
  /** Optional Chart.js option overrides */
  options?: ChartOptions
  /** Whether the chart should be responsive
   * @default true
   */
  responsive?: boolean
}

/** Return value from the useChart composable */
export interface UseChartReturn {
  /** Merged Chart.js options with Stellar theme colors applied */
  chartOptions: ChartOptions
  /** Chart data with theme colors applied to datasets */
  themedData: ChartData
  /** Default color palette derived from Stellar design tokens */
  colors: string[]
}

export interface ChartContainerProps {
  /** Whether the chart fills its container responsively
   * @default true
   */
  responsive?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ChartTooltipProps {
  /** Background color for the tooltip */
  backgroundColor?: string

  /** Text color for tooltip title */
  titleColor?: string

  /** Text color for tooltip body */
  bodyColor?: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ChartLegendProps {
  /** Position of the legend
   * @default 'bottom'
   */
  position?: 'top' | 'bottom' | 'left' | 'right'

  /** Legend items to display */
  items?: Array<{ label: string; color: string }>

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
