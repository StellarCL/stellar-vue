import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Skeleton from './Skeleton.vue'

describe('Skeleton', () => {
  it('renders as a div element', () => {
    const wrapper = mount(Skeleton)
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('applies base classes', () => {
    const wrapper = mount(Skeleton)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('animate-pulse')
    expect(classes).toContain('rounded-md')
    expect(classes).toContain('bg-muted')
  })

  it('has role="status" for accessibility', () => {
    const wrapper = mount(Skeleton)
    expect(wrapper.attributes('role')).toBe('status')
  })

  it('has aria-label="Loading" for accessibility', () => {
    const wrapper = mount(Skeleton)
    expect(wrapper.attributes('aria-label')).toBe('Loading')
  })

  it('merges custom classes via class prop', () => {
    const wrapper = mount(Skeleton, { props: { class: 'h-4 w-full' } })
    expect(wrapper.classes()).toContain('h-4')
    expect(wrapper.classes()).toContain('w-full')
  })
})
