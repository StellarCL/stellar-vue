import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Rating from './Rating.vue'

describe('Rating', () => {
  it('renders 5 stars by default', () => {
    const wrapper = mount(Rating)
    const stars = wrapper.findAll('span[role="radio"]')
    expect(stars.length).toBe(5)
  })

  it('renders custom max stars', () => {
    const wrapper = mount(Rating, { props: { max: 10 } })
    const stars = wrapper.findAll('span[role="radio"]')
    expect(stars.length).toBe(10)
  })

  it('renders SVG star icons', () => {
    const wrapper = mount(Rating)
    const svgs = wrapper.findAll('svg')
    expect(svgs.length).toBe(5)
  })

  it('applies filled class based on modelValue', () => {
    const wrapper = mount(Rating, { props: { modelValue: 3, max: 5 } })
    const svgs = wrapper.findAll('svg')
    // First 3 should be filled (text-yellow-400 with fill=currentColor)
    expect(svgs[0].attributes('fill')).toBe('currentColor')
    expect(svgs[1].attributes('fill')).toBe('currentColor')
    expect(svgs[2].attributes('fill')).toBe('currentColor')
    // Last 2 should be empty
    expect(svgs[3].attributes('fill')).toBe('none')
    expect(svgs[4].attributes('fill')).toBe('none')
  })

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(Rating, { props: { modelValue: 0 } })
    const stars = wrapper.findAll('span[role="radio"]')
    await stars[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([3])
  })

  it('does not emit on click when readonly', async () => {
    const wrapper = mount(Rating, { props: { modelValue: 0, readonly: true } })
    const stars = wrapper.findAll('span[role="radio"]')
    await stars[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('supports hover preview', async () => {
    const wrapper = mount(Rating, { props: { modelValue: 0 } })
    const stars = wrapper.findAll('span[role="radio"]')
    // Simulate mousemove on 4th star
    await stars[3].trigger('mousemove', { clientX: 100, clientY: 10 })
    // After hover, the SVGs should update (star 4 should appear highlighted)
    const svgs = wrapper.findAll('svg')
    expect(svgs[3].attributes('fill')).toBe('currentColor')
  })

  it('resets hover on mouse leave', async () => {
    const wrapper = mount(Rating, { props: { modelValue: 1 } })
    const container = wrapper.find('[role="radiogroup"]')
    const stars = wrapper.findAll('span[role="radio"]')
    // Hover over 4th star
    await stars[3].trigger('mousemove', { clientX: 100, clientY: 10 })
    // Leave container
    await container.trigger('mouseleave')
    // Should go back to modelValue=1
    const svgs = wrapper.findAll('svg')
    expect(svgs[0].attributes('fill')).toBe('currentColor')
    expect(svgs[1].attributes('fill')).toBe('none')
  })

  it('has radiogroup role', () => {
    const wrapper = mount(Rating)
    expect(wrapper.find('[role="radiogroup"]').exists()).toBe(true)
  })

  it('applies size variant classes', () => {
    const wrapper = mount(Rating, { props: { size: 'lg' } })
    const classes = wrapper.find('[role="radiogroup"]').classes().join(' ')
    expect(classes).toContain('[&_svg]:h-7')
    expect(classes).toContain('[&_svg]:w-7')
  })

  it('applies sm size variant classes', () => {
    const wrapper = mount(Rating, { props: { size: 'sm' } })
    const classes = wrapper.find('[role="radiogroup"]').classes().join(' ')
    expect(classes).toContain('[&_svg]:h-4')
    expect(classes).toContain('[&_svg]:w-4')
  })

  it('merges custom classes', () => {
    const wrapper = mount(Rating, { props: { class: 'custom-rating' } })
    expect(wrapper.find('[role="radiogroup"]').classes()).toContain('custom-rating')
  })

  it('updates v-model correctly', async () => {
    const wrapper = mount(Rating, { props: { modelValue: 2 } })
    const stars = wrapper.findAll('span[role="radio"]')
    await stars[4].trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([5])
  })
})
