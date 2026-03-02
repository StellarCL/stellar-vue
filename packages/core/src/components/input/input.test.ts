import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Input from './Input.vue'

describe('input', () => {
  it('renders input element', () => {
    const wrapper = mount(Input)
    expect(wrapper.element.tagName).toBe('INPUT')
  })

  it('renders with placeholder', () => {
    const wrapper = mount(Input, { props: { placeholder: 'Enter text...' } })
    expect(wrapper.attributes('placeholder')).toBe('Enter text...')
  })

  it('sets the value when modelValue prop is provided', () => {
    const wrapper = mount(Input, { props: { modelValue: 'hello' } })
    const input = wrapper.element as HTMLInputElement
    expect(input.value).toBe('hello')
  })

  it('emits update:modelValue when user types', async () => {
    const wrapper = mount(Input, { props: { modelValue: '' } })
    const input = wrapper.find('input')
    await input.setValue('typed value')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toBe('typed value')
  })

  it('applies error state classes when error is true', () => {
    const wrapper = mount(Input, { props: { error: true } })
    expect(wrapper.classes().join(' ')).toContain('border-destructive')
    expect(wrapper.classes().join(' ')).toContain('focus:border-destructive')
  })

  it('does not apply error classes by default', () => {
    const wrapper = mount(Input)
    expect(wrapper.classes().join(' ')).not.toContain('border-destructive')
  })

  it('sets disabled attribute when disabled', () => {
    const wrapper = mount(Input, { props: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('merges custom classes via class prop', () => {
    const wrapper = mount(Input, { props: { class: 'custom-class' } })
    expect(wrapper.classes()).toContain('custom-class')
  })

  it('uses text type by default', () => {
    const wrapper = mount(Input)
    expect(wrapper.attributes('type')).toBe('text')
  })

  it('applies the provided type prop', async () => {
    const types = ['email', 'password', 'number', 'search', 'tel', 'url'] as const
    for (const type of types) {
      const wrapper = mount(Input, { props: { type } })
      expect(wrapper.attributes('type')).toBe(type)
    }
  })

  it('generates a unique id when id prop is not provided', () => {
    const wrapper1 = mount(Input)
    const wrapper2 = mount(Input)
    const id1 = wrapper1.attributes('id')
    const id2 = wrapper2.attributes('id')
    expect(id1).toBeTruthy()
    expect(id2).toBeTruthy()
    expect(id1).not.toBe(id2)
  })

  it('uses the provided id when given', () => {
    const wrapper = mount(Input, { props: { id: 'my-input' } })
    expect(wrapper.attributes('id')).toBe('my-input')
  })
})
