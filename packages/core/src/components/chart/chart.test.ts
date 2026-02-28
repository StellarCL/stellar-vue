import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { useChart } from '../../composables/useChart'
import ChartContainer from './ChartContainer.vue'
import ChartLegend from './ChartLegend.vue'
import ChartTooltip from './ChartTooltip.vue'

// ---------------------------------------------------------------------------
// ChartContainer
// ---------------------------------------------------------------------------
describe('chartContainer', () => {
  it('renders with data-chart-container attribute', () => {
    const wrapper = mount(ChartContainer)
    expect(wrapper.find('[data-chart-container]').exists()).toBe(true)
  })

  it('has responsive w-full class by default', () => {
    const wrapper = mount(ChartContainer)
    expect(wrapper.classes()).toContain('w-full')
  })

  it('is not full-width when responsive is false', () => {
    const wrapper = mount(ChartContainer, { props: { responsive: false } })
    expect(wrapper.classes()).toContain('inline-block')
    expect(wrapper.classes()).not.toContain('w-full')
  })

  it('renders slot content', () => {
    const wrapper = mount(ChartContainer, {
      slots: { default: '<canvas id="myChart" />' },
    })
    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  it('has chart-container class', () => {
    const wrapper = mount(ChartContainer)
    expect(wrapper.classes()).toContain('chart-container')
  })

  it('merges custom classes', () => {
    const wrapper = mount(ChartContainer, { props: { class: 'max-w-xl' } })
    expect(wrapper.classes()).toContain('max-w-xl')
  })
})

// ---------------------------------------------------------------------------
// ChartTooltip
// ---------------------------------------------------------------------------
describe('chartTooltip', () => {
  it('renders with data-chart-tooltip attribute', () => {
    const wrapper = mount(ChartTooltip)
    expect(wrapper.find('[data-chart-tooltip]').exists()).toBe(true)
  })

  it('has chart-tooltip class', () => {
    const wrapper = mount(ChartTooltip)
    expect(wrapper.classes()).toContain('chart-tooltip')
  })

  it('applies themed border and background classes', () => {
    const wrapper = mount(ChartTooltip)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('border-border')
    expect(classes).toContain('bg-background')
    expect(classes).toContain('shadow-md')
  })

  it('renders slot content', () => {
    const wrapper = mount(ChartTooltip, {
      slots: { default: '<span class="tooltip-content">Jan: 42</span>' },
    })
    expect(wrapper.find('.tooltip-content').exists()).toBe(true)
    expect(wrapper.text()).toContain('Jan: 42')
  })

  it('merges custom classes', () => {
    const wrapper = mount(ChartTooltip, { props: { class: 'custom-tooltip' } })
    expect(wrapper.classes()).toContain('custom-tooltip')
  })
})

// ---------------------------------------------------------------------------
// ChartLegend
// ---------------------------------------------------------------------------
describe('chartLegend', () => {
  it('renders with data-chart-legend attribute', () => {
    const wrapper = mount(ChartLegend)
    expect(wrapper.find('[data-chart-legend]').exists()).toBe(true)
  })

  it('has chart-legend class', () => {
    const wrapper = mount(ChartLegend)
    expect(wrapper.classes()).toContain('chart-legend')
  })

  it('renders legend items', () => {
    const items = [
      { label: 'Revenue', color: 'hsl(262.1 83.3% 57.8%)' },
      { label: 'Expenses', color: 'hsl(4 90% 58%)' },
    ]
    const wrapper = mount(ChartLegend, { props: { items } })
    expect(wrapper.text()).toContain('Revenue')
    expect(wrapper.text()).toContain('Expenses')
  })

  it('renders color swatches for each item', () => {
    const items = [
      { label: 'A', color: '#ff0000' },
      { label: 'B', color: '#00ff00' },
    ]
    const wrapper = mount(ChartLegend, { props: { items } })
    const swatches = wrapper.findAll('.rounded-full')
    expect(swatches.length).toBe(2)
  })

  it('applies bottom margin with bottom position (default)', () => {
    const wrapper = mount(ChartLegend)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('mt-3')
  })

  it('applies top margin with top position', () => {
    const wrapper = mount(ChartLegend, { props: { position: 'top' } })
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('mb-3')
  })

  it('renders slot content', () => {
    const wrapper = mount(ChartLegend, {
      slots: { default: '<span class="extra-item">Custom</span>' },
    })
    expect(wrapper.find('.extra-item').exists()).toBe(true)
  })

  it('merges custom classes', () => {
    const wrapper = mount(ChartLegend, { props: { class: 'legend-custom' } })
    expect(wrapper.classes()).toContain('legend-custom')
  })
})

// ---------------------------------------------------------------------------
// useChart composable
// ---------------------------------------------------------------------------
describe('useChart', () => {
  const sampleData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      { label: 'Revenue', data: [100, 200, 150] },
    ],
  }

  it('returns colors array with at least one entry', () => {
    const { colors } = useChart({ type: 'bar', data: sampleData })
    expect(Array.isArray(colors)).toBe(true)
    expect(colors.length).toBeGreaterThan(0)
  })

  it('applies theme borderColor to datasets that lack one', () => {
    const { themedData } = useChart({ type: 'bar', data: sampleData })
    expect(themedData.datasets[0].borderColor).toBeDefined()
    expect(typeof themedData.datasets[0].borderColor).toBe('string')
  })

  it('applies theme backgroundColor to datasets that lack one', () => {
    const { themedData } = useChart({ type: 'bar', data: sampleData })
    expect(themedData.datasets[0].backgroundColor).toBeDefined()
  })

  it('preserves existing borderColor on datasets', () => {
    const data = {
      labels: ['Jan'],
      datasets: [{ data: [10], borderColor: '#custom', label: 'Custom' }],
    }
    const { themedData } = useChart({ type: 'bar', data })
    expect(themedData.datasets[0].borderColor).toBe('#custom')
  })

  it('preserves existing backgroundColor on datasets', () => {
    const data = {
      labels: ['Jan'],
      datasets: [{ data: [10], backgroundColor: '#mybg', label: 'Custom' }],
    }
    const { themedData } = useChart({ type: 'bar', data })
    expect(themedData.datasets[0].backgroundColor).toBe('#mybg')
  })

  it('returns chartOptions with responsive: true by default', () => {
    const { chartOptions } = useChart({ type: 'line', data: sampleData })
    expect(chartOptions.responsive).toBe(true)
  })

  it('respects responsive: false option', () => {
    const { chartOptions } = useChart({ type: 'line', data: sampleData, responsive: false })
    expect(chartOptions.responsive).toBe(false)
  })

  it('includes plugin options with legend and tooltip', () => {
    const { chartOptions } = useChart({ type: 'bar', data: sampleData })
    expect(chartOptions.plugins).toBeDefined()
    expect(chartOptions.plugins?.legend).toBeDefined()
    expect(chartOptions.plugins?.tooltip).toBeDefined()
  })

  it('includes scale options for non-pie charts', () => {
    const { chartOptions } = useChart({ type: 'bar', data: sampleData })
    expect(chartOptions.scales).toBeDefined()
  })

  it('omits scale options for pie charts', () => {
    const { chartOptions } = useChart({ type: 'pie', data: sampleData })
    expect(chartOptions.scales).toBeUndefined()
  })

  it('omits scale options for doughnut charts', () => {
    const { chartOptions } = useChart({ type: 'doughnut', data: sampleData })
    expect(chartOptions.scales).toBeUndefined()
  })

  it('applies multiple colors for pie/doughnut datasets', () => {
    const pieData = {
      labels: ['A', 'B', 'C'],
      datasets: [{ data: [30, 40, 30], label: 'Distribution' }],
    }
    const { themedData } = useChart({ type: 'pie', data: pieData })
    const bg = themedData.datasets[0].backgroundColor
    expect(Array.isArray(bg)).toBe(true)
  })

  it('merges user-provided options over defaults', () => {
    const { chartOptions } = useChart({
      type: 'line',
      data: sampleData,
      options: {
        plugins: {
          legend: { display: false },
        },
      },
    })
    expect(chartOptions.plugins?.legend?.display).toBe(false)
  })

  it('preserves labels from source data', () => {
    const { themedData } = useChart({ type: 'bar', data: sampleData })
    expect(themedData.labels).toEqual(['Jan', 'Feb', 'Mar'])
  })
})
