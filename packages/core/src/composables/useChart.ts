import { computed } from 'vue'
import type { UseChartOptions, UseChartReturn, ChartData, ChartOptions } from '../components/chart/chart.types'

/**
 * Stellar theme color palette for charts.
 * These map to the CSS custom properties used by the design tokens.
 * In a browser environment they would be resolved from computed styles;
 * here we fall back to Stellar's default stellar theme values.
 */
const STELLAR_CHART_COLORS = [
  'hsl(262.1 83.3% 57.8%)', // primary (stellar purple)
  'hsl(210 40% 96.1%)',     // secondary
  'hsl(262.1 83.3% 70%)',   // primary lighter
  'hsl(180 60% 50%)',       // teal accent
  'hsl(38 92% 55%)',        // amber
  'hsl(4 90% 58%)',         // red
  'hsl(142 71% 45%)',       // green
  'hsl(217 91% 60%)',       // blue
]

/**
 * Composable for applying Stellar theme colors to Chart.js configurations.
 *
 * Returns reactive chart options and data with design-token-based colors applied.
 * Designed to be used as a thin theming adapter — bring your own Chart.js instance.
 *
 * @param options - Chart configuration
 * @returns Themed chart options, themed data, and the color palette
 *
 * @example
 * ```ts
 * const { chartOptions, themedData, colors } = useChart({
 *   type: 'bar',
 *   data: { labels: ['Jan', 'Feb'], datasets: [{ data: [10, 20] }] },
 * })
 * ```
 */
export function useChart(options: UseChartOptions): UseChartReturn {
  const { type, data, options: userOptions, responsive = true } = options

  const colors = STELLAR_CHART_COLORS

  /** Apply theme colors to datasets that are missing explicit colors */
  const themedData = computed<ChartData>(() => {
    const datasets = data.datasets.map((dataset, index) => {
      const color = colors[index % colors.length]
      const isPie = type === 'pie' || type === 'doughnut'

      return {
        ...dataset,
        backgroundColor:
          dataset.backgroundColor ??
          (isPie ? colors.slice(0, dataset.data.length) : `${color}33`),
        borderColor: dataset.borderColor ?? color,
        borderWidth: dataset.borderWidth ?? 2,
      }
    })

    return { ...data, datasets }
  })

  /** Merge Stellar theme defaults with user-provided options */
  const chartOptions = computed<ChartOptions>(() => {
    const base: ChartOptions = {
      responsive,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: 'hsl(222.2 84% 4.9%)',
            font: { size: 12 },
            padding: 16,
          },
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'hsl(0 0% 100%)',
          titleColor: 'hsl(222.2 84% 4.9%)',
          bodyColor: 'hsl(215.4 16.3% 46.9%)',
          borderColor: 'hsl(214.3 31.8% 91.4%)',
          borderWidth: 1,
        },
      },
      scales:
        type === 'pie' || type === 'doughnut'
          ? undefined
          : {
              x: {
                grid: { color: 'hsl(214.3 31.8% 91.4%)' },
                ticks: { color: 'hsl(215.4 16.3% 46.9%)' },
              },
              y: {
                grid: { color: 'hsl(214.3 31.8% 91.4%)' },
                ticks: { color: 'hsl(215.4 16.3% 46.9%)' },
              },
            },
    }

    // Deep merge user overrides
    return mergeDeep(base, userOptions ?? {})
  })

  return {
    chartOptions: chartOptions.value,
    themedData: themedData.value,
    colors,
  }
}

/** Simple recursive deep merge (last-write-wins for primitives) */
function mergeDeep(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target }
  for (const key of Object.keys(source)) {
    const sourceVal = source[key]
    const targetVal = result[key]
    if (
      sourceVal !== null &&
      typeof sourceVal === 'object' &&
      !Array.isArray(sourceVal) &&
      targetVal !== null &&
      typeof targetVal === 'object' &&
      !Array.isArray(targetVal)
    ) {
      result[key] = mergeDeep(
        targetVal as Record<string, unknown>,
        sourceVal as Record<string, unknown>,
      )
    } else {
      result[key] = sourceVal
    }
  }
  return result
}
