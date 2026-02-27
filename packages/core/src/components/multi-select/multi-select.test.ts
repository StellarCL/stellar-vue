import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import MultiSelect from './MultiSelect.vue'
import MultiSelectTrigger from './MultiSelectTrigger.vue'
import MultiSelectContent from './MultiSelectContent.vue'
import MultiSelectItem from './MultiSelectItem.vue'
import MultiSelectTag from './MultiSelectTag.vue'
import MultiSelectEmpty from './MultiSelectEmpty.vue'

const defaultOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
]

function createMultiSelect(props: Record<string, any> = {}) {
  return defineComponent({
    setup() {
      const modelValue = ref<string[]>(props.modelValue || [])
      return { modelValue }
    },
    render() {
      return h(
        MultiSelect,
        {
          modelValue: this.modelValue,
          options: defaultOptions,
          placeholder: props.placeholder || 'Select items...',
          disabled: props.disabled || false,
          max: props.max,
          'onUpdate:modelValue': (val: string[]) => {
            this.modelValue = val
          },
        },
        {
          default: () => [
            h(MultiSelectTrigger, null, {
              default: () => [
                ...this.modelValue.map((v: string) => {
                  const opt = defaultOptions.find((o) => o.value === v)
                  return h(MultiSelectTag, {
                    key: v,
                    value: v,
                    label: opt?.label || v,
                  })
                }),
                this.modelValue.length === 0
                  ? h('span', { class: 'text-muted-foreground' }, props.placeholder || 'Select items...')
                  : null,
              ],
            }),
            h(MultiSelectContent, null, {
              default: () => {
                const items = defaultOptions.map((opt) =>
                  h(MultiSelectItem, {
                    key: opt.value,
                    value: opt.value,
                    label: opt.label,
                  }),
                )
                return items.length > 0 ? items : [h(MultiSelectEmpty)]
              },
            }),
          ],
        },
      )
    },
  })
}

describe('MultiSelect', () => {
  it('renders with placeholder', () => {
    const Component = createMultiSelect({ placeholder: 'Pick fruits...' })
    const wrapper = mount(Component)
    expect(wrapper.text()).toContain('Pick fruits...')
  })

  it('selects multiple items and updates v-model array', async () => {
    const Component = createMultiSelect()
    const wrapper = mount(Component, { attachTo: document.body })

    // Click trigger to open
    const trigger = wrapper.find('[data-multi-select-trigger]')
    await trigger.trigger('click')
    await nextTick()

    // Click items
    const items = wrapper.findAll('[data-multi-select-item]')
    expect(items.length).toBe(5)

    await items[0].trigger('click')
    await nextTick()

    await items[1].trigger('click')
    await nextTick()

    // Check that the model value has been updated
    expect(wrapper.vm.modelValue).toEqual(['apple', 'banana'])

    wrapper.unmount()
  })

  it('shows tags for selected items', async () => {
    const Component = createMultiSelect({ modelValue: ['apple', 'banana'] })
    const wrapper = mount(Component)

    const tags = wrapper.findAll('[data-multi-select-tag]')
    expect(tags.length).toBe(2)
    expect(tags[0].text()).toContain('Apple')
    expect(tags[1].text()).toContain('Banana')
  })

  it('removes tag on tag close click', async () => {
    const Component = createMultiSelect({ modelValue: ['apple', 'banana'] })
    const wrapper = mount(Component)

    const removeButtons = wrapper.findAll('[data-multi-select-tag-remove]')
    expect(removeButtons.length).toBe(2)

    await removeButtons[0].trigger('click')
    await nextTick()

    expect(wrapper.vm.modelValue).toEqual(['banana'])
  })

  it('max limit prevents additional selections', async () => {
    const Component = createMultiSelect({ modelValue: ['apple', 'banana'], max: 2 })
    const wrapper = mount(Component, { attachTo: document.body })

    // Open dropdown
    const trigger = wrapper.find('[data-multi-select-trigger]')
    await trigger.trigger('click')
    await nextTick()

    // Try to select another item
    const items = wrapper.findAll('[data-multi-select-item]')
    await items[2].trigger('click')
    await nextTick()

    // Should still be 2 items
    expect(wrapper.vm.modelValue).toEqual(['apple', 'banana'])

    wrapper.unmount()
  })

  it('disabled state prevents interaction', async () => {
    const Component = createMultiSelect({ disabled: true })
    const wrapper = mount(Component)

    const trigger = wrapper.find('[data-multi-select-trigger]')
    expect(trigger.attributes('aria-disabled')).toBe('true')
  })

  it('emits update:modelValue with correct array', async () => {
    const emitted: string[][] = []
    const wrapper = mount(
      defineComponent({
        render() {
          return h(
            MultiSelect,
            {
              modelValue: [],
              options: defaultOptions,
              'onUpdate:modelValue': (val: string[]) => {
                emitted.push(val)
              },
            },
            {
              default: () => [
                h(MultiSelectTrigger, null, {
                  default: () => h('span', 'Select...'),
                }),
                h(MultiSelectContent, null, {
                  default: () =>
                    defaultOptions.map((opt) =>
                      h(MultiSelectItem, {
                        key: opt.value,
                        value: opt.value,
                        label: opt.label,
                      }),
                    ),
                }),
              ],
            },
          )
        },
      }),
      { attachTo: document.body },
    )

    // Open
    const trigger = wrapper.find('[data-multi-select-trigger]')
    await trigger.trigger('click')
    await nextTick()

    // Select first item
    const items = wrapper.findAll('[data-multi-select-item]')
    await items[0].trigger('click')
    await nextTick()

    expect(emitted.length).toBe(1)
    expect(emitted[0]).toEqual(['apple'])

    wrapper.unmount()
  })
})

describe('MultiSelectTag', () => {
  it('renders with label', () => {
    const wrapper = mount(MultiSelectTag, {
      props: { value: 'apple', label: 'Apple' },
    })
    expect(wrapper.text()).toContain('Apple')
  })

  it('shows remove button when removable', () => {
    const wrapper = mount(MultiSelectTag, {
      props: { value: 'apple', label: 'Apple', removable: true },
    })
    const removeBtn = wrapper.find('[data-multi-select-tag-remove]')
    expect(removeBtn.exists()).toBe(true)
  })

  it('hides remove button when not removable', () => {
    const wrapper = mount(MultiSelectTag, {
      props: { value: 'apple', label: 'Apple', removable: false },
    })
    const removeBtn = wrapper.find('[data-multi-select-tag-remove]')
    expect(removeBtn.exists()).toBe(false)
  })

  it('emits remove event on close click', async () => {
    const wrapper = mount(MultiSelectTag, {
      props: { value: 'apple', label: 'Apple' },
    })
    const removeBtn = wrapper.find('[data-multi-select-tag-remove]')
    await removeBtn.trigger('click')
    expect(wrapper.emitted('remove')).toBeTruthy()
    expect(wrapper.emitted('remove')![0]).toEqual(['apple'])
  })

  it('applies custom class', () => {
    const wrapper = mount(MultiSelectTag, {
      props: { value: 'apple', label: 'Apple', class: 'custom-tag' },
    })
    expect(wrapper.classes()).toContain('custom-tag')
  })
})

describe('MultiSelectEmpty', () => {
  it('renders default empty message', () => {
    const wrapper = mount(MultiSelectEmpty)
    expect(wrapper.text()).toBe('No results found.')
  })

  it('renders custom slot content', () => {
    const wrapper = mount(MultiSelectEmpty, {
      slots: { default: 'Nothing to show' },
    })
    expect(wrapper.text()).toBe('Nothing to show')
  })

  it('applies custom class', () => {
    const wrapper = mount(MultiSelectEmpty, {
      props: { class: 'custom-empty' },
    })
    expect(wrapper.classes()).toContain('custom-empty')
  })
})

describe('MultiSelectItem', () => {
  it('renders with label', () => {
    const wrapper = mount(MultiSelectItem, {
      props: { value: 'apple', label: 'Apple' },
    })
    expect(wrapper.text()).toContain('Apple')
  })

  it('shows check icon when selected', () => {
    const wrapper = mount(MultiSelectItem, {
      props: { value: 'apple', label: 'Apple', selected: true },
    })
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
  })

  it('does not show check icon when not selected', () => {
    const wrapper = mount(MultiSelectItem, {
      props: { value: 'apple', label: 'Apple', selected: false },
    })
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(false)
  })

  it('applies correct role and aria attributes', () => {
    const wrapper = mount(MultiSelectItem, {
      props: { value: 'apple', label: 'Apple', selected: true },
    })
    expect(wrapper.attributes('role')).toBe('option')
    expect(wrapper.attributes('aria-selected')).toBe('true')
  })

  it('applies custom class', () => {
    const wrapper = mount(MultiSelectItem, {
      props: { value: 'apple', label: 'Apple', class: 'custom-item' },
    })
    expect(wrapper.classes()).toContain('custom-item')
  })

  it('disabled item has opacity styles', () => {
    const wrapper = mount(MultiSelectItem, {
      props: { value: 'apple', label: 'Apple', disabled: true },
    })
    expect(wrapper.classes().join(' ')).toContain('pointer-events-none')
    expect(wrapper.classes().join(' ')).toContain('opacity-50')
  })
})

describe('MultiSelectTrigger', () => {
  it('renders with combobox role', () => {
    const wrapper = mount(
      defineComponent({
        render() {
          return h(
            MultiSelect,
            { modelValue: [], options: defaultOptions },
            {
              default: () => [
                h(MultiSelectTrigger, null, {
                  default: () => h('span', 'Select...'),
                }),
              ],
            },
          )
        },
      }),
    )
    const trigger = wrapper.find('[role="combobox"]')
    expect(trigger.exists()).toBe(true)
  })

  it('has chevron SVG icon', () => {
    const wrapper = mount(
      defineComponent({
        render() {
          return h(
            MultiSelect,
            { modelValue: [], options: defaultOptions },
            {
              default: () => [
                h(MultiSelectTrigger, null, {
                  default: () => h('span', 'Select...'),
                }),
              ],
            },
          )
        },
      }),
    )
    const svgs = wrapper.findAll('svg')
    expect(svgs.length).toBeGreaterThan(0)
  })

  it('applies custom class', () => {
    const wrapper = mount(
      defineComponent({
        render() {
          return h(
            MultiSelect,
            { modelValue: [], options: defaultOptions },
            {
              default: () => [
                h(MultiSelectTrigger, { class: 'custom-trigger' }, {
                  default: () => h('span', 'Select...'),
                }),
              ],
            },
          )
        },
      }),
    )
    const trigger = wrapper.find('[data-multi-select-trigger]')
    expect(trigger.classes()).toContain('custom-trigger')
  })
})

describe('MultiSelectContent', () => {
  it('renders when open', async () => {
    const wrapper = mount(
      defineComponent({
        render() {
          return h(
            MultiSelect,
            { modelValue: [], options: defaultOptions },
            {
              default: () => [
                h(MultiSelectTrigger, null, {
                  default: () => h('span', 'Select...'),
                }),
                h(MultiSelectContent, null, {
                  default: () =>
                    defaultOptions.map((opt) =>
                      h(MultiSelectItem, {
                        key: opt.value,
                        value: opt.value,
                        label: opt.label,
                      }),
                    ),
                }),
              ],
            },
          )
        },
      }),
      { attachTo: document.body },
    )

    // Open the dropdown
    const trigger = wrapper.find('[data-multi-select-trigger]')
    await trigger.trigger('click')
    await nextTick()

    const content = wrapper.find('[data-multi-select-content]')
    expect(content.exists()).toBe(true)

    wrapper.unmount()
  })

  it('does not render when closed', () => {
    const wrapper = mount(
      defineComponent({
        render() {
          return h(
            MultiSelect,
            { modelValue: [], options: defaultOptions },
            {
              default: () => [
                h(MultiSelectTrigger, null, {
                  default: () => h('span', 'Select...'),
                }),
                h(MultiSelectContent, null, {
                  default: () =>
                    defaultOptions.map((opt) =>
                      h(MultiSelectItem, {
                        key: opt.value,
                        value: opt.value,
                        label: opt.label,
                      }),
                    ),
                }),
              ],
            },
          )
        },
      }),
    )

    const content = wrapper.find('[data-multi-select-content]')
    expect(content.exists()).toBe(false)
  })
})

describe('MultiSelect clear all', () => {
  it('clear all removes all tags', async () => {
    const Component = defineComponent({
      setup() {
        const modelValue = ref<string[]>(['apple', 'banana', 'cherry'])
        return { modelValue }
      },
      render() {
        return h(
          MultiSelect,
          {
            modelValue: this.modelValue,
            options: defaultOptions,
            'onUpdate:modelValue': (val: string[]) => {
              this.modelValue = val
            },
          },
          {
            default: () => [
              h(MultiSelectTrigger, null, {
                default: () => [
                  ...this.modelValue.map((v: string) => {
                    const opt = defaultOptions.find((o) => o.value === v)
                    return h(MultiSelectTag, {
                      key: v,
                      value: v,
                      label: opt?.label || v,
                    })
                  }),
                ],
              }),
              h(MultiSelectContent, null, {
                default: () =>
                  defaultOptions.map((opt) =>
                    h(MultiSelectItem, {
                      key: opt.value,
                      value: opt.value,
                      label: opt.label,
                    }),
                  ),
              }),
            ],
          },
        )
      },
    })

    const wrapper = mount(Component)
    expect(wrapper.vm.modelValue).toEqual(['apple', 'banana', 'cherry'])

    // Remove all tags one by one
    let removeButtons = wrapper.findAll('[data-multi-select-tag-remove]')
    expect(removeButtons.length).toBe(3)

    await removeButtons[0].trigger('click')
    await nextTick()
    expect(wrapper.vm.modelValue).toEqual(['banana', 'cherry'])

    removeButtons = wrapper.findAll('[data-multi-select-tag-remove]')
    await removeButtons[0].trigger('click')
    await nextTick()
    expect(wrapper.vm.modelValue).toEqual(['cherry'])

    removeButtons = wrapper.findAll('[data-multi-select-tag-remove]')
    await removeButtons[0].trigger('click')
    await nextTick()
    expect(wrapper.vm.modelValue).toEqual([])
  })
})

describe('MultiSelect search filters', () => {
  it('search filters available options', async () => {
    const Component = defineComponent({
      setup() {
        const modelValue = ref<string[]>([])
        const searchTerm = ref('')
        return { modelValue, searchTerm }
      },
      render() {
        const filtered = defaultOptions.filter((opt) =>
          opt.label.toLowerCase().includes(this.searchTerm.toLowerCase()),
        )
        return h(
          MultiSelect,
          {
            modelValue: this.modelValue,
            options: defaultOptions,
            'onUpdate:modelValue': (val: string[]) => {
              this.modelValue = val
            },
          },
          {
            default: () => [
              h(MultiSelectTrigger, null, {
                default: () => h('span', 'Select...'),
              }),
              h(MultiSelectContent, null, {
                default: () =>
                  filtered.length > 0
                    ? filtered.map((opt) =>
                        h(MultiSelectItem, {
                          key: opt.value,
                          value: opt.value,
                          label: opt.label,
                        }),
                      )
                    : [h(MultiSelectEmpty)],
              }),
            ],
          },
        )
      },
    })

    const wrapper = mount(Component, { attachTo: document.body })

    // Open dropdown
    const trigger = wrapper.find('[data-multi-select-trigger]')
    await trigger.trigger('click')
    await nextTick()

    // Initially all items should be shown
    let items = wrapper.findAll('[data-multi-select-item]')
    expect(items.length).toBe(5)

    // Update search term
    wrapper.vm.searchTerm = 'app'
    await nextTick()

    items = wrapper.findAll('[data-multi-select-item]')
    expect(items.length).toBe(1)
    expect(items[0].text()).toContain('Apple')

    wrapper.unmount()
  })
})
