import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Textarea from './Textarea.vue'

describe('textarea', () => {
  it('renders textarea element', () => {
    const wrapper = mount(Textarea)
    expect(wrapper.element.tagName).toBe('TEXTAREA')
  })

  it('renders with placeholder', () => {
    const wrapper = mount(Textarea, { props: { placeholder: 'Enter text...' } })
    expect(wrapper.attributes('placeholder')).toBe('Enter text...')
  })

  it('sets the value when modelValue prop is provided', () => {
    const wrapper = mount(Textarea, { props: { modelValue: 'hello' } })
    const textarea = wrapper.element as HTMLTextAreaElement
    expect(textarea.value).toBe('hello')
  })

  it('emits update:modelValue when user types', async () => {
    const wrapper = mount(Textarea, { props: { modelValue: '' } })
    const textarea = wrapper.find('textarea')
    await textarea.setValue('typed value')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toBe('typed value')
  })

  it('respects the rows prop as an attribute', () => {
    const wrapper = mount(Textarea, { props: { rows: 5 } })
    expect(wrapper.attributes('rows')).toBe('5')
  })

  it('uses rows=3 by default', () => {
    const wrapper = mount(Textarea)
    expect(wrapper.attributes('rows')).toBe('3')
  })

  it('applies error state classes when error is true', () => {
    const wrapper = mount(Textarea, { props: { error: true } })
    expect(wrapper.classes().join(' ')).toContain('border-destructive')
    expect(wrapper.classes().join(' ')).toContain('focus-visible:ring-destructive')
  })

  it('does not apply error classes by default', () => {
    const wrapper = mount(Textarea)
    expect(wrapper.classes().join(' ')).not.toContain('border-destructive')
  })

  it('sets disabled attribute when disabled', () => {
    const wrapper = mount(Textarea, { props: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('merges custom classes via class prop', () => {
    const wrapper = mount(Textarea, { props: { class: 'custom-class' } })
    expect(wrapper.classes()).toContain('custom-class')
  })

  it('generates a unique id when id prop is not provided', () => {
    const wrapper1 = mount(Textarea)
    const wrapper2 = mount(Textarea)
    const id1 = wrapper1.attributes('id')
    const id2 = wrapper2.attributes('id')
    expect(id1).toBeTruthy()
    expect(id2).toBeTruthy()
    expect(id1).not.toBe(id2)
  })

  it('uses the provided id when given', () => {
    const wrapper = mount(Textarea, { props: { id: 'my-textarea' } })
    expect(wrapper.attributes('id')).toBe('my-textarea')
  })
})
