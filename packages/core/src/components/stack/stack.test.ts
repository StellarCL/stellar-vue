import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Stack from './Stack.vue'

describe('Stack', () => {
  it('renders with vertical direction (flex-col class)', () => {
    const wrapper = mount(Stack, {
      props: { direction: 'vertical' },
      slots: { default: '<span>Item</span>' },
    })
    expect(wrapper.classes()).toContain('flex')
    expect(wrapper.classes()).toContain('flex-col')
  })

  it('renders with horizontal direction (flex-row class)', () => {
    const wrapper = mount(Stack, {
      props: { direction: 'horizontal' },
      slots: { default: '<span>Item</span>' },
    })
    expect(wrapper.classes()).toContain('flex')
    expect(wrapper.classes()).toContain('flex-row')
  })

  it('defaults to vertical direction', () => {
    const wrapper = mount(Stack)
    expect(wrapper.classes()).toContain('flex-col')
  })

  it('applies gap class', () => {
    const wrapper = mount(Stack, {
      props: { gap: '6' },
    })
    expect(wrapper.classes()).toContain('gap-6')
  })

  it('applies default gap class', () => {
    const wrapper = mount(Stack)
    expect(wrapper.classes()).toContain('gap-4')
  })

  it('applies align class', () => {
    const wrapper = mount(Stack, {
      props: { align: 'center' },
    })
    expect(wrapper.classes()).toContain('items-center')
  })

  it('applies justify class', () => {
    const wrapper = mount(Stack, {
      props: { justify: 'between' },
    })
    expect(wrapper.classes()).toContain('justify-between')
  })

  it('applies flex-wrap when wrap is true', () => {
    const wrapper = mount(Stack, {
      props: { wrap: true },
    })
    expect(wrapper.classes()).toContain('flex-wrap')
  })

  it('does not apply flex-wrap by default', () => {
    const wrapper = mount(Stack)
    expect(wrapper.classes()).not.toContain('flex-wrap')
  })

  it('renders children in slot', () => {
    const wrapper = mount(Stack, {
      slots: { default: '<span class="child">Child content</span>' },
    })
    expect(wrapper.find('.child').exists()).toBe(true)
    expect(wrapper.text()).toContain('Child content')
  })

  it('renders as div by default', () => {
    const wrapper = mount(Stack)
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('renders custom element via as prop', () => {
    const wrapper = mount(Stack, {
      props: { as: 'section' },
    })
    expect(wrapper.element.tagName.toLowerCase()).toBe('section')
  })

  it('merges custom class', () => {
    const wrapper = mount(Stack, {
      props: { class: 'custom-stack' },
    })
    expect(wrapper.classes()).toContain('custom-stack')
  })

  it('applies numeric gap', () => {
    const wrapper = mount(Stack, {
      props: { gap: 8 },
    })
    expect(wrapper.classes()).toContain('gap-8')
  })
})
