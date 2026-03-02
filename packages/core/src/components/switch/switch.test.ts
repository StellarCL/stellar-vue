import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Switch from './Switch.vue'

describe('switch', () => {
  it('renders unchecked by default', () => {
    const wrapper = mount(Switch)
    const root = wrapper.find('[role="switch"]')
    expect(root.exists()).toBe(true)
    expect(root.attributes('data-state')).toBe('unchecked')
  })

  it('renders checked when modelValue is true', () => {
    const wrapper = mount(Switch, {
      props: { modelValue: true },
    })
    expect(wrapper.find('[role="switch"]').attributes('data-state')).toBe('checked')
  })

  it('has role="switch"', () => {
    const wrapper = mount(Switch)
    expect(wrapper.find('[role="switch"]').exists()).toBe(true)
  })

  it('toggles on click and emits update:modelValue', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false },
    })
    await wrapper.find('[role="switch"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('does not toggle when disabled', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false, disabled: true },
    })
    await wrapper.find('[role="switch"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('has data-disabled attribute when disabled', () => {
    const wrapper = mount(Switch, {
      props: { disabled: true },
    })
    expect(wrapper.find('[role="switch"]').attributes('data-disabled')).toBeDefined()
  })

  it('applies sm size classes', () => {
    const wrapper = mount(Switch, {
      props: { size: 'sm' },
    })
    const classes = wrapper.find('[role="switch"]').classes().join(' ')
    expect(classes).toContain('h-5')
    expect(classes).toContain('w-9')
  })

  it('applies md size classes by default', () => {
    const wrapper = mount(Switch)
    const classes = wrapper.find('[role="switch"]').classes().join(' ')
    expect(classes).toContain('h-5')
    expect(classes).toContain('w-10')
  })

  it('applies lg size classes', () => {
    const wrapper = mount(Switch, {
      props: { size: 'lg' },
    })
    const classes = wrapper.find('[role="switch"]').classes().join(' ')
    expect(classes).toContain('h-7')
  })

  it('merges custom classes', () => {
    const wrapper = mount(Switch, {
      props: { class: 'custom-switch' },
    })
    expect(wrapper.find('[role="switch"]').classes()).toContain('custom-switch')
  })

  it('applies base styling classes', () => {
    const wrapper = mount(Switch)
    const classes = wrapper.find('[role="switch"]').classes().join(' ')
    expect(classes).toContain('rounded-full')
    expect(classes).toContain('inline-flex')
  })

  it('v-model updates when toggled', async () => {
    const wrapper = mount(Switch, {
      props: {
        'modelValue': false,
        'onUpdate:modelValue': (val: boolean) => wrapper.setProps({ modelValue: val }),
      },
    })
    await wrapper.find('[role="switch"]').trigger('click')
    expect(wrapper.props('modelValue')).toBe(true)
  })

  it('renders the thumb element', () => {
    const wrapper = mount(Switch)
    // SwitchThumb renders as a span
    expect(wrapper.find('[role="switch"] span').exists()).toBe(true)
  })

  it('sm thumb has correct translate classes', () => {
    const wrapper = mount(Switch, {
      props: { size: 'sm' },
    })
    const thumb = wrapper.find('[role="switch"] span')
    const classes = thumb.classes().join(' ')
    expect(classes).toContain('h-4')
    expect(classes).toContain('w-4')
  })

  it('md thumb has correct translate classes', () => {
    const wrapper = mount(Switch, {
      props: { size: 'md' },
    })
    const thumb = wrapper.find('[role="switch"] span')
    const classes = thumb.classes().join(' ')
    expect(classes).toContain('h-4')
    expect(classes).toContain('w-4')
  })

  it('lg thumb has correct translate classes', () => {
    const wrapper = mount(Switch, {
      props: { size: 'lg' },
    })
    const thumb = wrapper.find('[role="switch"] span')
    const classes = thumb.classes().join(' ')
    expect(classes).toContain('h-6')
    expect(classes).toContain('w-6')
  })
})
