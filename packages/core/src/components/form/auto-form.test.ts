import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, nextTick } from 'vue'
import { z } from 'zod'
import AutoForm from './AutoForm.vue'

// Helper to create a simple Zod schema for testing
function createTestSchema() {
  return z.object({
    firstName: z.string().min(1),
    email: z.string().email(),
    age: z.number().min(18),
    bio: z.string().max(500).optional(),
    role: z.enum(['admin', 'user', 'moderator']),
    acceptTerms: z.boolean(),
  })
}

describe('autoForm', () => {
  it('renders a form element', () => {
    const schema = z.object({ name: z.string() })
    const wrapper = mount(AutoForm, {
      props: { schema },
    })
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('applies space-y-6 class by default', () => {
    const schema = z.object({ name: z.string() })
    const wrapper = mount(AutoForm, {
      props: { schema },
    })
    expect(wrapper.find('form').classes()).toContain('space-y-6')
  })

  it('merges custom classes', () => {
    const schema = z.object({ name: z.string() })
    const wrapper = mount(AutoForm, {
      props: { schema, class: 'my-form' },
    })
    expect(wrapper.find('form').classes()).toContain('my-form')
    expect(wrapper.find('form').classes()).toContain('space-y-6')
  })

  it('generates form fields from a Zod schema', () => {
    const schema = createTestSchema()
    const wrapper = mount(AutoForm, {
      props: { schema },
    })

    // Should render labels for each field
    const labels = wrapper.findAll('label')
    const labelTexts = labels.map(l => l.text())

    expect(labelTexts).toContain('First Name')
    expect(labelTexts).toContain('Email')
    expect(labelTexts).toContain('Age')
    expect(labelTexts).toContain('Bio')
    expect(labelTexts).toContain('Accept Terms')
  })

  it('renders text inputs for string fields', () => {
    const schema = z.object({
      name: z.string(),
    })
    const wrapper = mount(AutoForm, {
      props: { schema },
    })

    const input = wrapper.find('input[type="text"]')
    expect(input.exists()).toBe(true)
  })

  it('renders email inputs for email-validated strings', () => {
    const schema = z.object({
      email: z.string().email(),
    })
    const wrapper = mount(AutoForm, {
      props: { schema },
    })

    const input = wrapper.find('input[type="email"]')
    expect(input.exists()).toBe(true)
  })

  it('renders number inputs for number fields', () => {
    const schema = z.object({
      age: z.number(),
    })
    const wrapper = mount(AutoForm, {
      props: { schema },
    })

    const input = wrapper.find('input[type="number"]')
    expect(input.exists()).toBe(true)
  })

  it('renders textarea for long text fields', () => {
    const schema = z.object({
      bio: z.string().max(500),
    })
    const wrapper = mount(AutoForm, {
      props: { schema },
    })

    const textarea = wrapper.find('textarea')
    expect(textarea.exists()).toBe(true)
  })

  it('renders checkbox for boolean fields', () => {
    const schema = z.object({
      agree: z.boolean(),
    })
    const wrapper = mount(AutoForm, {
      props: { schema },
    })

    // Radix Checkbox renders as a button with role="checkbox"
    const checkbox = wrapper.find('[role="checkbox"]')
    expect(checkbox.exists()).toBe(true)
  })

  it('renders date inputs for date fields', () => {
    const schema = z.object({
      birthDate: z.date(),
    })
    const wrapper = mount(AutoForm, {
      props: { schema },
    })

    const input = wrapper.find('input[type="date"]')
    expect(input.exists()).toBe(true)
  })

  it('renders a submit button with default label', () => {
    const schema = z.object({ name: z.string() })
    const wrapper = mount(AutoForm, {
      props: { schema },
    })

    const button = wrapper.find('button[type="submit"]')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Submit')
  })

  it('renders a submit button with custom label', () => {
    const schema = z.object({ name: z.string() })
    const wrapper = mount(AutoForm, {
      props: { schema, submitLabel: 'Save Changes' },
    })

    const button = wrapper.find('button[type="submit"]')
    expect(button.text()).toBe('Save Changes')
  })

  it('emits submit event with valid data on form submission', async () => {
    const schema = z.object({
      name: z.string(),
    })
    const wrapper = mount(AutoForm, {
      props: {
        schema,
        defaults: { name: 'John' },
      },
    })

    await wrapper.find('form').trigger('submit')
    await nextTick()

    const submitEvents = wrapper.emitted('submit')
    expect(submitEvents).toBeDefined()
    if (submitEvents) {
      expect(submitEvents[0][0]).toEqual({ name: 'John' })
    }
  })

  it('initializes form values from defaults', () => {
    const schema = z.object({
      name: z.string(),
      email: z.string().email(),
    })
    const wrapper = mount(AutoForm, {
      props: {
        schema,
        defaults: { name: 'Jane', email: 'jane@example.com' },
      },
    })

    const inputs = wrapper.findAll('input')
    // Check the inputs have the default values
    const nameInput = inputs.find(i => (i.element as HTMLInputElement).value === 'Jane')
    expect(nameInput).toBeDefined()
  })

  it('renders enum fields as select components', () => {
    const schema = z.object({
      role: z.enum(['admin', 'user']),
    })
    const wrapper = mount(AutoForm, {
      props: { schema },
    })

    // Radix Select renders a trigger button
    const selectTrigger = wrapper.find('[role="combobox"]')
    expect(selectTrigger.exists()).toBe(true)
  })

  it('supports custom field slot overrides', () => {
    const schema = z.object({
      name: z.string(),
    })

    const WrapperComponent = defineComponent({
      components: { AutoForm },
      setup() {
        return { schema }
      },
      template: `
        <AutoForm :schema="schema">
          <template #field-name="{ field, onChange }">
            <div data-testid="custom-field">
              <label>Custom Name Field</label>
              <input type="text" data-testid="custom-input" />
            </div>
          </template>
        </AutoForm>
      `,
    })

    const wrapper = mount(WrapperComponent)
    expect(wrapper.find('[data-testid="custom-field"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="custom-input"]').exists()).toBe(true)
  })

  it('does not emit submit for invalid data', async () => {
    const schema = z.object({
      email: z.string().email(),
    })
    const wrapper = mount(AutoForm, {
      props: {
        schema,
        defaults: { email: 'not-an-email' },
      },
    })

    await wrapper.find('form').trigger('submit')
    await nextTick()

    const submitEvents = wrapper.emitted('submit')
    // safeParse should fail, so no submit event
    expect(submitEvents).toBeUndefined()
  })

  it('handles schemas with no fields gracefully', () => {
    const schema = z.object({})
    const wrapper = mount(AutoForm, {
      props: { schema },
    })

    // Should still render a form with just the submit button
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('supports submit slot override', () => {
    const schema = z.object({ name: z.string() })

    const WrapperComponent = defineComponent({
      components: { AutoForm },
      setup() {
        return { schema }
      },
      template: `
        <AutoForm :schema="schema">
          <template #submit="{ submitLabel }">
            <button type="submit" data-testid="custom-submit">{{ submitLabel }}</button>
          </template>
        </AutoForm>
      `,
    })

    const wrapper = mount(WrapperComponent)
    expect(wrapper.find('[data-testid="custom-submit"]').exists()).toBe(true)
  })
})
