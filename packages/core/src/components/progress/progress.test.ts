import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Progress from './Progress.vue'

describe('progress', () => {
  it('renders with role="progressbar"', () => {
    const wrapper = mount(Progress)
    expect(wrapper.find('[role="progressbar"]').exists()).toBe(true)
  })

  it('has correct base classes (h-4, rounded-full, bg-secondary)', () => {
    const wrapper = mount(Progress)
    const rootClasses = wrapper.find('[role="progressbar"]').classes().join(' ')
    expect(rootClasses).toContain('h-4')
    expect(rootClasses).toContain('rounded-full')
    expect(rootClasses).toContain('bg-secondary')
  })

  it('indicator has correct default color (bg-primary)', () => {
    const wrapper = mount(Progress)
    const indicator = wrapper.find('[role="progressbar"] > div')
    expect(indicator.classes().join(' ')).toContain('bg-primary')
  })

  it('indicator width matches modelValue percentage', () => {
    const wrapper = mount(Progress, { props: { modelValue: 50, max: 100 } })
    const indicator = wrapper.find('[role="progressbar"] > div')
    expect(indicator.attributes('style')).toContain('width: 50%')
  })

  it('success variant applies bg-green-500', () => {
    const wrapper = mount(Progress, { props: { variant: 'success' } })
    const indicator = wrapper.find('[role="progressbar"] > div')
    expect(indicator.classes().join(' ')).toContain('bg-green-500')
  })

  it('warning variant applies bg-yellow-500', () => {
    const wrapper = mount(Progress, { props: { variant: 'warning' } })
    const indicator = wrapper.find('[role="progressbar"] > div')
    expect(indicator.classes().join(' ')).toContain('bg-yellow-500')
  })

  it('destructive variant applies bg-destructive', () => {
    const wrapper = mount(Progress, { props: { variant: 'destructive' } })
    const indicator = wrapper.find('[role="progressbar"] > div')
    expect(indicator.classes().join(' ')).toContain('bg-destructive')
  })

  it('merges custom classes', () => {
    const wrapper = mount(Progress, { props: { class: 'custom-progress' } })
    expect(wrapper.find('[role="progressbar"]').classes()).toContain('custom-progress')
  })

  it('respects max prop in percentage calculation', () => {
    const wrapper = mount(Progress, { props: { modelValue: 25, max: 50 } })
    const indicator = wrapper.find('[role="progressbar"] > div')
    expect(indicator.attributes('style')).toContain('width: 50%')
  })

  it('has aria-valuenow, aria-valuemin, aria-valuemax', () => {
    const wrapper = mount(Progress, { props: { modelValue: 75, max: 100 } })
    const root = wrapper.find('[role="progressbar"]')
    expect(root.attributes('aria-valuenow')).toBe('75')
    expect(root.attributes('aria-valuemin')).toBe('0')
    expect(root.attributes('aria-valuemax')).toBe('100')
  })
})
