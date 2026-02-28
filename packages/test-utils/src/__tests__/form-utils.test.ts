import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { fillForm, getErrors, submitForm } from '../wrappers/form-utils'

// ─── Test Components ──────────────────────────────────────────────────────────

const SimpleForm = defineComponent({
  data() {
    return {
      submitted: false,
      nameValue: '',
      emailValue: '',
    }
  },
  render() {
    return h('form', { onSubmit: () => {
      this.submitted = true
    } }, [
      h('div', {}, [
        h('label', { for: 'name-field' }, 'Full Name'),
        h('input', {
          id: 'name-field',
          type: 'text',
          value: this.nameValue,
          onInput: (e: Event) => { this.nameValue = (e.target as HTMLInputElement).value },
        }),
      ]),
      h('div', {}, [
        h('label', { for: 'email-field' }, 'Email'),
        h('input', {
          id: 'email-field',
          type: 'email',
          value: this.emailValue,
          onInput: (e: Event) => { this.emailValue = (e.target as HTMLInputElement).value },
        }),
      ]),
      h('button', { type: 'submit' }, 'Submit'),
    ])
  },
})

const FormWithErrors = defineComponent({
  render() {
    return h('form', {}, [
      h('p', { role: 'alert' }, 'Name is required'),
      h('p', { role: 'alert' }, 'Email is invalid'),
      h('input', { 'aria-label': 'Name', 'type': 'text' }),
    ])
  },
})

const FormWithNoErrors = defineComponent({
  render() {
    return h('form', {}, [
      h('label', { for: 'ok-field' }, 'Name'),
      h('input', { id: 'ok-field', type: 'text' }),
    ])
  },
})

const FormWithSubmitButton = defineComponent({
  data() {
    return { submitted: false }
  },
  render() {
    return h('div', {}, [
      h('form', { onSubmit: () => { this.submitted = true } }, [
        h('label', { for: 'sf-input' }, 'Name'),
        h('input', { id: 'sf-input', type: 'text' }),
        h('button', { type: 'submit' }, 'Go'),
      ]),
    ])
  },
})

const NestedLabelForm = defineComponent({
  data() {
    return { val: '' }
  },
  render() {
    return h('form', {}, [
      h('label', {}, [
        'Username',
        h('input', {
          type: 'text',
          onInput: (e: Event) => { this.val = (e.target as HTMLInputElement).value },
        }),
      ]),
    ])
  },
})

const _SelectForm = defineComponent({
  data() {
    return { color: '' }
  },
  render() {
    return h('form', {}, [
      h('label', { for: 'color-select' }, 'Color'),
      h('select', {
        id: 'color-select',
        name: 'color',
        onChange: (e: Event) => { this.color = (e.target as HTMLSelectElement).value },
      }, [
        h('option', { value: '' }, 'Choose...'),
        h('option', { value: 'red' }, 'Red'),
        h('option', { value: 'blue' }, 'Blue'),
      ]),
    ])
  },
})

const DestructiveErrorForm = defineComponent({
  render() {
    return h('form', {}, [
      h('p', { class: 'text-destructive' }, 'This field is required'),
      h('input', { 'aria-label': 'Field', 'type': 'text' }),
    ])
  },
})

// ─── fillForm tests ────────────────────────────────────────────────────────────

describe('fillForm', () => {
  it('fills a text input found by label text', async () => {
    const wrapper = mount(SimpleForm)
    await fillForm(wrapper, { 'Full Name': 'Jane Doe' })
    const input = wrapper.element.querySelector('#name-field') as HTMLInputElement
    expect(input.value).toBe('Jane Doe')
  })

  it('fills multiple fields at once', async () => {
    const wrapper = mount(SimpleForm)
    await fillForm(wrapper, {
      'Full Name': 'Jane Doe',
      'Email': 'jane@example.com',
    })
    const nameInput = wrapper.element.querySelector('#name-field') as HTMLInputElement
    const emailInput = wrapper.element.querySelector('#email-field') as HTMLInputElement
    expect(nameInput.value).toBe('Jane Doe')
    expect(emailInput.value).toBe('jane@example.com')
  })

  it('fills an input nested inside a label', async () => {
    const wrapper = mount(NestedLabelForm)
    await fillForm(wrapper, { Username: 'testuser' })
    const input = wrapper.element.querySelector('input') as HTMLInputElement
    expect(input.value).toBe('testuser')
  })

  it('does not throw when label is not found', async () => {
    const wrapper = mount(SimpleForm)
    await expect(fillForm(wrapper, { 'Nonexistent Label': 'value' })).resolves.not.toThrow()
  })

  it('triggers input event when filling a field', async () => {
    const wrapper = mount(SimpleForm)
    await fillForm(wrapper, { 'Full Name': 'Jane Doe' })
    // Vue data should be updated via onInput handler
    expect((wrapper.vm as any).nameValue).toBe('Jane Doe')
  })

  it('can skip triggerInput when option is false', async () => {
    const wrapper = mount(SimpleForm)
    await fillForm(wrapper, { 'Full Name': 'No Event' }, { triggerInput: false })
    const input = wrapper.element.querySelector('#name-field') as HTMLInputElement
    // Value is still set directly
    expect(input.value).toBe('No Event')
  })
})

// ─── submitForm tests ──────────────────────────────────────────────────────────

describe('submitForm', () => {
  it('triggers form submit event on the form element', async () => {
    const wrapper = mount(FormWithSubmitButton)
    await submitForm(wrapper)
    expect((wrapper.vm as any).submitted).toBe(true)
  })

  it('works when the wrapper IS the form element', async () => {
    const wrapper = mount(SimpleForm)
    await submitForm(wrapper)
    expect((wrapper.vm as any).submitted).toBe(true)
  })

  it('does not throw when no form or submit button is found', async () => {
    const NoForm = defineComponent({
      render() {
        return h('div', {}, 'No form here')
      },
    })
    const wrapper = mount(NoForm)
    await expect(submitForm(wrapper)).resolves.not.toThrow()
  })
})

// ─── getErrors tests ───────────────────────────────────────────────────────────

describe('getErrors', () => {
  it('returns an array of error messages from role="alert" elements', () => {
    const wrapper = mount(FormWithErrors)
    const errors = getErrors(wrapper)
    expect(errors).toContain('Name is required')
    expect(errors).toContain('Email is invalid')
  })

  it('returns an empty array when no errors are present', () => {
    const wrapper = mount(FormWithNoErrors)
    const errors = getErrors(wrapper)
    expect(errors).toHaveLength(0)
  })

  it('deduplicates identical error messages', () => {
    const DuplicateErrors = defineComponent({
      render() {
        return h('form', {}, [
          h('p', { role: 'alert' }, 'Duplicate error'),
          h('p', { role: 'alert' }, 'Duplicate error'),
        ])
      },
    })
    const wrapper = mount(DuplicateErrors)
    const errors = getErrors(wrapper)
    expect(errors.filter(e => e === 'Duplicate error')).toHaveLength(1)
  })

  it('picks up .text-destructive error messages', () => {
    const wrapper = mount(DestructiveErrorForm)
    const errors = getErrors(wrapper)
    expect(errors).toContain('This field is required')
  })

  it('returns only non-empty strings', () => {
    const wrapper = mount(FormWithErrors)
    const errors = getErrors(wrapper)
    for (const err of errors) {
      expect(typeof err).toBe('string')
      expect(err.length).toBeGreaterThan(0)
    }
  })
})
