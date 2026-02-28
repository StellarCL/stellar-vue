import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Checkbox from './Checkbox.vue'

describe('checkbox', () => {
  it('renders unchecked by default', () => {
    const wrapper = mount(Checkbox)
    const root = wrapper.find('[role="checkbox"]')
    expect(root.exists()).toBe(true)
    expect(root.attributes('data-state')).toBe('unchecked')
  })

  it('renders with checked state when modelValue is true', () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: true },
    })
    const root = wrapper.find('[role="checkbox"]')
    expect(root.attributes('data-state')).toBe('checked')
  })

  it('renders with indeterminate state when modelValue is indeterminate', () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: 'indeterminate' },
    })
    const root = wrapper.find('[role="checkbox"]')
    expect(root.attributes('data-state')).toBe('indeterminate')
  })

  it('toggles on click and emits update:modelValue', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false },
    })
    const root = wrapper.find('[role="checkbox"]')
    await root.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('does not toggle when disabled', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false, disabled: true },
    })
    const root = wrapper.find('[role="checkbox"]')
    await root.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('has data-disabled attribute when disabled', () => {
    const wrapper = mount(Checkbox, {
      props: { disabled: true },
    })
    const root = wrapper.find('[role="checkbox"]')
    expect(root.attributes('data-disabled')).toBeDefined()
  })

  it('has proper data-state attribute when unchecked', () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false },
    })
    expect(wrapper.find('[role="checkbox"]').attributes('data-state')).toBe('unchecked')
  })

  it('has proper data-state attribute when checked', () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: true },
    })
    expect(wrapper.find('[role="checkbox"]').attributes('data-state')).toBe('checked')
  })

  it('merges custom classes', () => {
    const wrapper = mount(Checkbox, {
      props: { class: 'custom-class' },
    })
    expect(wrapper.find('[role="checkbox"]').classes()).toContain('custom-class')
  })

  it('applies base styling classes', () => {
    const wrapper = mount(Checkbox)
    const classes = wrapper.find('[role="checkbox"]').classes().join(' ')
    expect(classes).toContain('h-4')
    expect(classes).toContain('w-4')
    expect(classes).toContain('rounded-sm')
  })

  it('renders check icon when checked', () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: true },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders minus icon when indeterminate', () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: 'indeterminate' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('does not render icon when unchecked', () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false },
    })
    expect(wrapper.find('svg').exists()).toBe(false)
  })

  it('sets id attribute when provided', () => {
    const wrapper = mount(Checkbox, {
      props: { id: 'my-checkbox' },
    })
    expect(wrapper.find('[role="checkbox"]').attributes('id')).toBe('my-checkbox')
  })
})
