import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from './Badge.vue'

describe('Badge', () => {
  it('renders default badge with slot content', () => {
    const wrapper = mount(Badge, {
      slots: { default: 'New' },
    })
    expect(wrapper.text()).toBe('New')
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('applies default variant classes', () => {
    const wrapper = mount(Badge)
    expect(wrapper.classes().join(' ')).toContain('bg-primary')
    expect(wrapper.classes().join(' ')).toContain('text-primary-foreground')
  })

  it('applies secondary variant classes', () => {
    const wrapper = mount(Badge, { props: { variant: 'secondary' } })
    expect(wrapper.classes().join(' ')).toContain('bg-secondary')
    expect(wrapper.classes().join(' ')).toContain('text-secondary-foreground')
  })

  it('applies destructive variant classes', () => {
    const wrapper = mount(Badge, { props: { variant: 'destructive' } })
    expect(wrapper.classes().join(' ')).toContain('bg-destructive')
    expect(wrapper.classes().join(' ')).toContain('text-destructive-foreground')
  })

  it('applies outline variant classes', () => {
    const wrapper = mount(Badge, { props: { variant: 'outline' } })
    expect(wrapper.classes().join(' ')).toContain('border')
    expect(wrapper.classes().join(' ')).toContain('text-foreground')
  })

  it('applies base classes', () => {
    const wrapper = mount(Badge)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('inline-flex')
    expect(classes).toContain('items-center')
    expect(classes).toContain('rounded-full')
    expect(classes).toContain('px-2.5')
    expect(classes).toContain('py-0.5')
    expect(classes).toContain('text-xs')
    expect(classes).toContain('font-semibold')
  })

  it('merges custom classes via class prop', () => {
    const wrapper = mount(Badge, { props: { class: 'custom-class' } })
    expect(wrapper.classes()).toContain('custom-class')
  })
})
