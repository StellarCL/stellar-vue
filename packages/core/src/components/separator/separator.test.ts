import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Separator from './Separator.vue'

describe('Separator', () => {
  it('renders horizontal by default', () => {
    const wrapper = mount(Separator)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('h-[1px]')
    expect(classes).toContain('w-full')
  })

  it('renders vertical orientation', () => {
    const wrapper = mount(Separator, {
      props: { orientation: 'vertical' },
    })
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('h-full')
    expect(classes).toContain('w-[1px]')
  })

  it('has role="separator" by default (non-decorative)', () => {
    const wrapper = mount(Separator)
    expect(wrapper.attributes('role')).toBe('separator')
  })

  it('sets role="none" in decorative mode', () => {
    const wrapper = mount(Separator, {
      props: { decorative: true },
    })
    expect(wrapper.attributes('role')).toBe('none')
  })

  it('applies base styling classes', () => {
    const wrapper = mount(Separator)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('shrink-0')
    expect(classes).toContain('bg-border')
  })

  it('applies custom classes via class prop', () => {
    const wrapper = mount(Separator, {
      props: { class: 'my-custom-class' },
    })
    expect(wrapper.classes()).toContain('my-custom-class')
  })

  it('does not set aria-orientation for horizontal (implicit default)', () => {
    const wrapper = mount(Separator, {
      props: { orientation: 'horizontal' },
    })
    // Radix Vue Separator does not set aria-orientation for horizontal (it is the ARIA default)
    expect(wrapper.attributes('aria-orientation')).toBeUndefined()
  })

  it('has correct aria-orientation for vertical', () => {
    const wrapper = mount(Separator, {
      props: { orientation: 'vertical' },
    })
    expect(wrapper.attributes('aria-orientation')).toBe('vertical')
  })
})
