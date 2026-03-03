import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Slider from './Slider.vue'

describe('slider', () => {
  it('renders with role="slider" on thumb', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: [50] },
    })
    const thumb = wrapper.find('[role="slider"]')
    expect(thumb.exists()).toBe(true)
  })

  it('has correct base classes on root', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: [50] },
    })
    const root = wrapper.find('span[data-slider-impl]')
    const classes = root.classes().join(' ')
    expect(classes).toContain('flex')
    expect(classes).toContain('touch-none')
    expect(classes).toContain('select-none')
  })

  it('track has bg-muted and rounded-full', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: [50] },
    })
    const track = wrapper.find('span.bg-muted')
    expect(track.exists()).toBe(true)
    expect(track.classes()).toContain('rounded-full')
  })

  it('range has bg-primary', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: [50] },
    })
    const range = wrapper.find('span.bg-primary')
    expect(range.exists()).toBe(true)
  })

  it('thumb has correct styling classes', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: [50] },
    })
    const thumb = wrapper.find('[role="slider"]')
    const classes = thumb.classes().join(' ')
    expect(classes).toContain('h-5')
    expect(classes).toContain('w-5')
    expect(classes).toContain('rounded-full')
    expect(classes).toContain('border-2')
    expect(classes).toContain('border-primary')
  })

  it('renders one thumb for single value [50]', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: [50] },
    })
    const thumbs = wrapper.findAll('[role="slider"]')
    expect(thumbs).toHaveLength(1)
  })

  it('renders two thumbs for range value [25, 75]', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: [25, 75] },
    })
    const thumbs = wrapper.findAll('[role="slider"]')
    expect(thumbs).toHaveLength(2)
  })

  it('disabled state: root passes disabled through', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: [50], disabled: true },
    })
    const root = wrapper.find('span[data-slider-impl]')
    expect(root.attributes('aria-disabled')).toBe('true')
  })

  it('custom classes merge on root', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: [50], class: 'custom-slider' },
    })
    const root = wrapper.find('span[data-slider-impl]')
    expect(root.classes()).toContain('custom-slider')
  })

  it('has aria-valuemin on thumb matching min prop', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: [50], min: 0, max: 100 },
    })
    const thumb = wrapper.find('[role="slider"]')
    expect(thumb.attributes('aria-valuemin')).toBe('0')
  })

  it('has aria-valuemax on thumb matching max prop', () => {
    const wrapper = mount(Slider, {
      props: { modelValue: [50], min: 0, max: 100 },
    })
    const thumb = wrapper.find('[role="slider"]')
    expect(thumb.attributes('aria-valuemax')).toBe('100')
  })

  it('has aria-valuenow on thumb matching modelValue', async () => {
    const wrapper = mount(Slider, {
      props: { modelValue: [50] },
      attachTo: document.body,
    })
    await wrapper.vm.$nextTick()
    const thumb = wrapper.find('[role="slider"]')
    expect(thumb.attributes('aria-valuenow')).toBe('50')
    wrapper.unmount()
  })
})
