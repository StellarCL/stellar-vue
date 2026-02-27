import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  it('renders default button with slot content', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click me' },
    })
    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  it('has type="button" by default', () => {
    const wrapper = mount(Button)
    expect(wrapper.attributes('type')).toBe('button')
  })

  it('applies default variant classes', () => {
    const wrapper = mount(Button)
    expect(wrapper.classes().join(' ')).toContain('bg-primary')
    expect(wrapper.classes().join(' ')).toContain('text-primary-foreground')
  })

  it('applies destructive variant classes', () => {
    const wrapper = mount(Button, { props: { variant: 'destructive' } })
    expect(wrapper.classes().join(' ')).toContain('bg-destructive')
  })

  it('applies outline variant classes', () => {
    const wrapper = mount(Button, { props: { variant: 'outline' } })
    expect(wrapper.classes().join(' ')).toContain('border')
  })

  it('applies secondary variant classes', () => {
    const wrapper = mount(Button, { props: { variant: 'secondary' } })
    expect(wrapper.classes().join(' ')).toContain('bg-secondary')
  })

  it('applies ghost variant classes', () => {
    const wrapper = mount(Button, { props: { variant: 'ghost' } })
    expect(wrapper.classes().join(' ')).toContain('hover:bg-accent')
  })

  it('applies link variant classes', () => {
    const wrapper = mount(Button, { props: { variant: 'link' } })
    expect(wrapper.classes().join(' ')).toContain('underline-offset-4')
  })

  it('applies sm size classes', () => {
    const wrapper = mount(Button, { props: { size: 'sm' } })
    expect(wrapper.classes().join(' ')).toContain('h-9')
  })

  it('applies lg size classes', () => {
    const wrapper = mount(Button, { props: { size: 'lg' } })
    expect(wrapper.classes().join(' ')).toContain('h-11')
  })

  it('applies icon size classes', () => {
    const wrapper = mount(Button, { props: { size: 'icon' } })
    expect(wrapper.classes().join(' ')).toContain('h-10')
    expect(wrapper.classes().join(' ')).toContain('w-10')
  })

  it('sets disabled attribute when disabled', () => {
    const wrapper = mount(Button, { props: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does NOT emit click when disabled', async () => {
    const wrapper = mount(Button, { props: { disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('shows spinner when loading', () => {
    const wrapper = mount(Button, { props: { loading: true } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('is disabled when loading', () => {
    const wrapper = mount(Button, { props: { loading: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('sets aria-disabled when loading', () => {
    const wrapper = mount(Button, { props: { loading: true } })
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('sets aria-busy when loading', () => {
    const wrapper = mount(Button, { props: { loading: true } })
    expect(wrapper.attributes('aria-busy')).toBe('true')
  })

  it('does not show spinner when not loading', () => {
    const wrapper = mount(Button)
    expect(wrapper.find('svg').exists()).toBe(false)
  })

  it('merges custom classes via class prop', () => {
    const wrapper = mount(Button, { props: { class: 'custom-class' } })
    expect(wrapper.classes()).toContain('custom-class')
  })
})
