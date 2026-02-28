import { mount } from '@vue/test-utils'
import { useForm } from 'vee-validate'
import { describe, expect, it } from 'vitest'
import { computed, defineComponent, h, ref } from 'vue'
import { provideFormFieldContext } from '../../composables/useFormField'
import Form from './Form.vue'
import FormControl from './FormControl.vue'
import FormDescription from './FormDescription.vue'
import FormField from './FormField.vue'
import FormItem from './FormItem.vue'
import FormLabel from './FormLabel.vue'
import FormMessage from './FormMessage.vue'

// Helper: wrapper that sets up a VeeValidate form context
function _createVeeFormWrapper(template: string, components: Record<string, any> = {}) {
  return defineComponent({
    components,
    setup() {
      useForm({ initialValues: { test: '', email: '' } })
      return {}
    },
    template: `<form>${template}</form>`,
  })
}

// Helper: wrapper that provides a mock form field context directly
function createFieldContextWrapper(
  slotContent: any,
  contextOverrides: Partial<{ errorValue: string | undefined }> = {},
) {
  const { errorValue } = contextOverrides
  return defineComponent({
    setup() {
      const name = ref('test')
      const error = computed(() => errorValue)
      provideFormFieldContext({
        name,
        id: 'form-field-test-0',
        error,
        formItemId: 'form-field-test-0-item',
        formDescriptionId: 'form-field-test-0-description',
        formMessageId: 'form-field-test-0-message',
      })
      return {}
    },
    render() {
      return h('div', {}, [h(slotContent)])
    },
  })
}

describe('form', () => {
  it('renders as a form element', () => {
    const wrapper = mount(Form)
    expect(wrapper.element.tagName).toBe('FORM')
  })

  it('applies space-y-6 by default', () => {
    const wrapper = mount(Form)
    expect(wrapper.classes()).toContain('space-y-6')
  })

  it('renders slot content', () => {
    const wrapper = mount(Form, {
      slots: { default: '<span>Form content</span>' },
    })
    expect(wrapper.text()).toBe('Form content')
  })

  it('merges custom classes via class prop', () => {
    const wrapper = mount(Form, { props: { class: 'custom-form' } })
    expect(wrapper.classes()).toContain('custom-form')
    expect(wrapper.classes()).toContain('space-y-6')
  })
})

describe('formItem', () => {
  it('renders as a div', () => {
    const wrapper = mount(FormItem)
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('applies space-y-2 by default', () => {
    const wrapper = mount(FormItem)
    expect(wrapper.classes()).toContain('space-y-2')
  })

  it('renders slot content', () => {
    const wrapper = mount(FormItem, {
      slots: { default: '<span>Field content</span>' },
    })
    expect(wrapper.text()).toBe('Field content')
  })

  it('merges custom classes via class prop', () => {
    const wrapper = mount(FormItem, { props: { class: 'custom-item' } })
    expect(wrapper.classes()).toContain('custom-item')
    expect(wrapper.classes()).toContain('space-y-2')
  })
})

describe('formLabel', () => {
  it('renders a label element when outside form context', () => {
    const wrapper = mount(FormLabel, {
      slots: { default: 'Email' },
    })
    expect(wrapper.element.tagName).toBe('LABEL')
  })

  it('renders slot content', () => {
    const wrapper = mount(FormLabel, {
      slots: { default: 'Email address' },
    })
    expect(wrapper.text()).toContain('Email address')
  })

  it('merges custom classes via class prop', () => {
    const wrapper = mount(FormLabel, {
      props: { class: 'custom-label' },
      slots: { default: 'Label' },
    })
    expect(wrapper.classes()).toContain('custom-label')
  })

  it('applies text-sm font-medium from base Label styles', () => {
    const wrapper = mount(FormLabel, {
      slots: { default: 'Label' },
    })
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('text-sm')
    expect(classes).toContain('font-medium')
  })

  it('applies text-destructive when field context has error', () => {
    const Wrapper = createFieldContextWrapper(
      defineComponent({
        render() {
          return h(FormLabel, {}, { default: () => 'Field Label' })
        },
      }),
      { errorValue: 'This field is required' },
    )
    const wrapper = mount(Wrapper)
    const label = wrapper.find('label')
    expect(label.classes()).toContain('text-destructive')
  })

  it('does not apply text-destructive when field context has no error', () => {
    const Wrapper = createFieldContextWrapper(
      defineComponent({
        render() {
          return h(FormLabel, {}, { default: () => 'Field Label' })
        },
      }),
      { errorValue: undefined },
    )
    const wrapper = mount(Wrapper)
    const label = wrapper.find('label')
    expect(label.classes()).not.toContain('text-destructive')
  })

  it('links to formItemId when inside form context', () => {
    const Wrapper = createFieldContextWrapper(
      defineComponent({
        render() {
          return h(FormLabel, {}, { default: () => 'Field Label' })
        },
      }),
    )
    const wrapper = mount(Wrapper)
    const label = wrapper.find('label')
    expect(label.attributes('for')).toBe('form-field-test-0-item')
  })
})

describe('formDescription', () => {
  it('renders as a p element', () => {
    const wrapper = mount(FormDescription, {
      slots: { default: 'Help text' },
    })
    expect(wrapper.element.tagName).toBe('P')
  })

  it('renders slot content', () => {
    const wrapper = mount(FormDescription, {
      slots: { default: 'Enter your email address' },
    })
    expect(wrapper.text()).toBe('Enter your email address')
  })

  it('applies text-sm text-muted-foreground classes', () => {
    const wrapper = mount(FormDescription, {
      slots: { default: 'Help text' },
    })
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('text-sm')
    expect(classes).toContain('text-muted-foreground')
  })

  it('merges custom classes via class prop', () => {
    const wrapper = mount(FormDescription, {
      props: { class: 'custom-description' },
      slots: { default: 'Help text' },
    })
    expect(wrapper.classes()).toContain('custom-description')
    expect(wrapper.classes()).toContain('text-muted-foreground')
  })

  it('sets id from form context when inside field context', () => {
    const Wrapper = createFieldContextWrapper(
      defineComponent({
        render() {
          return h(FormDescription, {}, { default: () => 'Help text' })
        },
      }),
    )
    const wrapper = mount(Wrapper)
    const p = wrapper.find('p')
    expect(p.attributes('id')).toBe('form-field-test-0-description')
  })
})

describe('formMessage', () => {
  it('renders nothing when outside form context', () => {
    const wrapper = mount(FormMessage)
    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('renders nothing when field context has no error', () => {
    const Wrapper = createFieldContextWrapper(
      defineComponent({
        render() {
          return h(FormMessage)
        },
      }),
      { errorValue: undefined },
    )
    const wrapper = mount(Wrapper)
    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('renders error message when field context has an error', () => {
    const Wrapper = createFieldContextWrapper(
      defineComponent({
        render() {
          return h(FormMessage)
        },
      }),
      { errorValue: 'This field is required' },
    )
    const wrapper = mount(Wrapper)
    const p = wrapper.find('p')
    expect(p.exists()).toBe(true)
    expect(p.text()).toBe('This field is required')
  })

  it('applies text-sm font-medium text-destructive classes', () => {
    const Wrapper = createFieldContextWrapper(
      defineComponent({
        render() {
          return h(FormMessage)
        },
      }),
      { errorValue: 'Error!' },
    )
    const wrapper = mount(Wrapper)
    const p = wrapper.find('p')
    const classes = p.classes().join(' ')
    expect(classes).toContain('text-sm')
    expect(classes).toContain('font-medium')
    expect(classes).toContain('text-destructive')
  })

  it('has role="alert" on error message', () => {
    const Wrapper = createFieldContextWrapper(
      defineComponent({
        render() {
          return h(FormMessage)
        },
      }),
      { errorValue: 'Required' },
    )
    const wrapper = mount(Wrapper)
    const p = wrapper.find('p')
    expect(p.attributes('role')).toBe('alert')
  })

  it('uses formMessageId as the element id', () => {
    const Wrapper = createFieldContextWrapper(
      defineComponent({
        render() {
          return h(FormMessage)
        },
      }),
      { errorValue: 'Required' },
    )
    const wrapper = mount(Wrapper)
    const p = wrapper.find('p')
    expect(p.attributes('id')).toBe('form-field-test-0-message')
  })

  it('merges custom classes via class prop', () => {
    const Wrapper = createFieldContextWrapper(
      defineComponent({
        render() {
          return h(FormMessage, { class: 'custom-message' })
        },
      }),
      { errorValue: 'Error!' },
    )
    const wrapper = mount(Wrapper)
    const p = wrapper.find('p')
    expect(p.classes()).toContain('custom-message')
    expect(p.classes()).toContain('text-destructive')
  })
})

describe('formControl', () => {
  it('renders slot content', () => {
    const Wrapper = createFieldContextWrapper(
      defineComponent({
        render() {
          return h(FormControl, null, {
            default: (slotProps: any) => h('input', { ...slotProps }),
          })
        },
      }),
    )
    const wrapper = mount(Wrapper)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('passes formItemId as id to slot', () => {
    const Wrapper = createFieldContextWrapper(
      defineComponent({
        render() {
          return h(FormControl, null, {
            default: (slotProps: any) => h('input', { id: slotProps.id }),
          })
        },
      }),
    )
    const wrapper = mount(Wrapper)
    expect(wrapper.find('input').attributes('id')).toBe('form-field-test-0-item')
  })

  it('passes ariaDescribedby to slot (no error)', () => {
    // Vue 3 normalizes :aria-describedby slot props to ariaDescribedby (camelCase)
    const Wrapper = createFieldContextWrapper(
      defineComponent({
        render() {
          return h(FormControl, null, {
            default: (slotProps: any) => {
              return h('input', { 'data-describedby': slotProps.ariaDescribedby ?? 'none' })
            },
          })
        },
      }),
      { errorValue: undefined },
    )
    const wrapper = mount(Wrapper)
    const input = wrapper.find('input')
    const describedByValue = input.attributes('data-describedby') ?? ''
    expect(describedByValue).toContain('form-field-test-0-description')
  })

  it('includes formMessageId in ariaDescribedby slot prop when error exists', () => {
    // Vue 3 normalizes :aria-describedby slot props to ariaDescribedby (camelCase)
    const Wrapper = createFieldContextWrapper(
      defineComponent({
        render() {
          return h(FormControl, null, {
            default: (slotProps: any) => {
              return h('input', { 'data-describedby': slotProps.ariaDescribedby ?? 'none' })
            },
          })
        },
      }),
      { errorValue: 'Required' },
    )
    const wrapper = mount(Wrapper)
    const input = wrapper.find('input')
    const describedBy = input.attributes('data-describedby') ?? ''
    expect(describedBy).toContain('form-field-test-0-description')
    expect(describedBy).toContain('form-field-test-0-message')
  })
})

describe('formField', () => {
  it('renders slot content within VeeValidate form context', () => {
    const TestComponent = defineComponent({
      components: { FormField },
      setup() {
        useForm({ initialValues: { email: '' } })
        return {}
      },
      template: `
        <form>
          <FormField name="email">
            <template #default="{ field }">
              <input v-bind="field" data-testid="email-input" />
            </template>
          </FormField>
        </form>
      `,
    })

    const wrapper = mount(TestComponent)
    expect(wrapper.find('[data-testid="email-input"]').exists()).toBe(true)
  })

  it('exposes error in slot props', () => {
    const TestComponent = defineComponent({
      components: { FormField },
      setup() {
        useForm({ initialValues: { email: '' } })
        return {}
      },
      template: `
        <form>
          <FormField name="email">
            <template #default="{ error }">
              <span data-testid="error">{{ error ?? 'no-error' }}</span>
            </template>
          </FormField>
        </form>
      `,
    })

    const wrapper = mount(TestComponent)
    expect(wrapper.find('[data-testid="error"]').text()).toBe('no-error')
  })

  it('exposes meta in slot props', () => {
    const TestComponent = defineComponent({
      components: { FormField },
      setup() {
        useForm({ initialValues: { email: '' } })
        return {}
      },
      template: `
        <form>
          <FormField name="email">
            <template #default="{ meta }">
              <span data-testid="valid">{{ meta.valid ? 'valid' : 'invalid' }}</span>
            </template>
          </FormField>
        </form>
      `,
    })

    const wrapper = mount(TestComponent)
    expect(wrapper.find('[data-testid="valid"]').exists()).toBe(true)
  })
})
