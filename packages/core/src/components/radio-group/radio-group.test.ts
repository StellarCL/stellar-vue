import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import RadioGroup from './RadioGroup.vue'
import RadioGroupItem from './RadioGroupItem.vue'

describe('radioGroup', () => {
  it('renders the radio group', () => {
    const wrapper = mount(RadioGroup)
    expect(wrapper.find('[role="radiogroup"]').exists()).toBe(true)
  })

  it('renders radio group items', () => {
    const wrapper = mount(RadioGroup, {
      slots: {
        default: `
          <RadioGroupItem value="a" />
          <RadioGroupItem value="b" />
        `,
      },
      global: {
        components: { RadioGroupItem },
      },
    })
    expect(wrapper.findAll('[role="radio"]').length).toBe(2)
  })

  it('applies vertical grid layout by default', () => {
    const wrapper = mount(RadioGroup)
    expect(wrapper.find('[role="radiogroup"]').classes()).toContain('grid')
    expect(wrapper.find('[role="radiogroup"]').classes()).toContain('gap-2')
  })

  it('applies horizontal flex layout when orientation is horizontal', () => {
    const wrapper = mount(RadioGroup, {
      props: { orientation: 'horizontal' },
    })
    expect(wrapper.find('[role="radiogroup"]').classes()).toContain('flex')
    expect(wrapper.find('[role="radiogroup"]').classes()).toContain('gap-2')
  })

  it('emits update:modelValue when item is selected', async () => {
    const wrapper = mount(RadioGroup, {
      props: { modelValue: '' },
      slots: {
        default: `<RadioGroupItem value="option-a" />`,
      },
      global: {
        components: { RadioGroupItem },
      },
    })
    await wrapper.find('[role="radio"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['option-a'])
  })

  it('shows selected item as checked', () => {
    const wrapper = mount(RadioGroup, {
      props: { modelValue: 'option-a' },
      slots: {
        default: `
          <RadioGroupItem value="option-a" />
          <RadioGroupItem value="option-b" />
        `,
      },
      global: {
        components: { RadioGroupItem },
      },
    })
    const items = wrapper.findAll('[role="radio"]')
    expect(items[0].attributes('data-state')).toBe('checked')
    expect(items[1].attributes('data-state')).toBe('unchecked')
  })

  it('disables all items when group is disabled', () => {
    const wrapper = mount(RadioGroup, {
      props: { disabled: true },
      slots: {
        default: `
          <RadioGroupItem value="a" />
          <RadioGroupItem value="b" />
        `,
      },
      global: {
        components: { RadioGroupItem },
      },
    })
    const items = wrapper.findAll('[role="radio"]')
    items.forEach((item) => {
      expect(item.attributes('data-disabled')).toBeDefined()
    })
  })

  it('merges custom classes on group', () => {
    const wrapper = mount(RadioGroup, {
      props: { class: 'custom-group' },
    })
    expect(wrapper.find('[role="radiogroup"]').classes()).toContain('custom-group')
  })
})

describe('radioGroupItem', () => {
  it('renders as a radio button', () => {
    const wrapper = mount(RadioGroup, {
      slots: {
        default: `<RadioGroupItem value="test" />`,
      },
      global: {
        components: { RadioGroupItem },
      },
    })
    expect(wrapper.find('[role="radio"]').exists()).toBe(true)
  })

  it('has proper data-state when unchecked', () => {
    const wrapper = mount(RadioGroup, {
      slots: {
        default: `<RadioGroupItem value="test" />`,
      },
      global: {
        components: { RadioGroupItem },
      },
    })
    expect(wrapper.find('[role="radio"]').attributes('data-state')).toBe('unchecked')
  })

  it('is disabled when disabled prop is set', () => {
    const wrapper = mount(RadioGroup, {
      slots: {
        default: `<RadioGroupItem value="test" disabled />`,
      },
      global: {
        components: { RadioGroupItem },
      },
    })
    expect(wrapper.find('[role="radio"]').attributes('data-disabled')).toBeDefined()
  })

  it('applies base styling classes', () => {
    const wrapper = mount(RadioGroup, {
      slots: {
        default: `<RadioGroupItem value="test" />`,
      },
      global: {
        components: { RadioGroupItem },
      },
    })
    const classes = wrapper.find('[role="radio"]').classes().join(' ')
    expect(classes).toContain('h-5')
    expect(classes).toContain('w-5')
    expect(classes).toContain('rounded-full')
  })

  it('merges custom classes on item', () => {
    const wrapper = mount(RadioGroup, {
      slots: {
        default: `<RadioGroupItem value="test" class="custom-item" />`,
      },
      global: {
        components: { RadioGroupItem },
      },
    })
    expect(wrapper.find('[role="radio"]').classes()).toContain('custom-item')
  })

  it('sets id attribute when provided', () => {
    const wrapper = mount(RadioGroup, {
      slots: {
        default: `<RadioGroupItem value="test" id="radio-test" />`,
      },
      global: {
        components: { RadioGroupItem },
      },
    })
    expect(wrapper.find('[role="radio"]').attributes('id')).toBe('radio-test')
  })
})
