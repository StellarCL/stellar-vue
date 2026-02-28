import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Alert from './Alert.vue'
import AlertDescription from './AlertDescription.vue'
import AlertTitle from './AlertTitle.vue'

describe('alert', () => {
  it('renders as a div element', () => {
    const wrapper = mount(Alert)
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('has role="alert" for accessibility', () => {
    const wrapper = mount(Alert)
    expect(wrapper.attributes('role')).toBe('alert')
  })

  it('renders slot content', () => {
    const wrapper = mount(Alert, {
      slots: { default: 'Alert message' },
    })
    expect(wrapper.text()).toBe('Alert message')
  })

  it('applies default variant classes', () => {
    const wrapper = mount(Alert)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('bg-background')
    expect(classes).toContain('text-foreground')
  })

  it('applies destructive variant classes', () => {
    const wrapper = mount(Alert, { props: { variant: 'destructive' } })
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('text-destructive')
  })

  it('applies success variant classes', () => {
    const wrapper = mount(Alert, { props: { variant: 'success' } })
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('text-green-700')
  })

  it('applies warning variant classes', () => {
    const wrapper = mount(Alert, { props: { variant: 'warning' } })
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('text-yellow-700')
  })

  it('applies info variant classes', () => {
    const wrapper = mount(Alert, { props: { variant: 'info' } })
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('text-blue-700')
  })

  it('applies base classes', () => {
    const wrapper = mount(Alert)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('relative')
    expect(classes).toContain('w-full')
    expect(classes).toContain('rounded-lg')
    expect(classes).toContain('border')
    expect(classes).toContain('p-4')
  })

  it('merges custom classes via class prop', () => {
    const wrapper = mount(Alert, { props: { class: 'custom-class' } })
    expect(wrapper.classes()).toContain('custom-class')
  })
})

describe('alertTitle', () => {
  it('renders as an h5 element', () => {
    const wrapper = mount(AlertTitle)
    expect(wrapper.element.tagName).toBe('H5')
  })

  it('renders slot content', () => {
    const wrapper = mount(AlertTitle, {
      slots: { default: 'Alert Title' },
    })
    expect(wrapper.text()).toBe('Alert Title')
  })

  it('applies base classes', () => {
    const wrapper = mount(AlertTitle)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('mb-1')
    expect(classes).toContain('font-medium')
    expect(classes).toContain('leading-none')
    expect(classes).toContain('tracking-tight')
  })

  it('merges custom classes via class prop', () => {
    const wrapper = mount(AlertTitle, { props: { class: 'custom-title' } })
    expect(wrapper.classes()).toContain('custom-title')
  })
})

describe('alertDescription', () => {
  it('renders as a div element', () => {
    const wrapper = mount(AlertDescription)
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('renders slot content', () => {
    const wrapper = mount(AlertDescription, {
      slots: { default: 'Alert description text' },
    })
    expect(wrapper.text()).toBe('Alert description text')
  })

  it('applies base classes', () => {
    const wrapper = mount(AlertDescription)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('text-sm')
  })

  it('merges custom classes via class prop', () => {
    const wrapper = mount(AlertDescription, { props: { class: 'custom-desc' } })
    expect(wrapper.classes()).toContain('custom-desc')
  })
})
