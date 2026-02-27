import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Wizard from './Wizard.vue'
import WizardStep from './WizardStep.vue'
import WizardActions from './WizardActions.vue'

function mountWizard(
  options: {
    total?: number
    initialStep?: number
    validateOnNext?: boolean
    validate1?: () => Promise<boolean>
    validate2?: () => Promise<boolean>
  } = {},
) {
  const {
    total = 3,
    initialStep = 1,
    validateOnNext = true,
    validate1,
    validate2,
  } = options

  return mount({
    components: { Wizard, WizardStep, WizardActions },
    template: `
      <Wizard :total="total" v-model="step" :validate-on-next="validateOnNext">
        <WizardStep :step="1" title="Step One" :validate="validate1">
          <p>Step 1 content</p>
        </WizardStep>
        <WizardStep :step="2" title="Step Two" :validate="validate2">
          <p>Step 2 content</p>
        </WizardStep>
        <WizardStep :step="3" title="Step Three">
          <p>Step 3 content</p>
        </WizardStep>
        <WizardActions />
      </Wizard>
    `,
    data() {
      return { total, step: initialStep, validateOnNext, validate1, validate2 }
    },
  })
}

describe('Wizard', () => {
  it('renders current step content', () => {
    const wrapper = mountWizard({ initialStep: 1 })
    expect(wrapper.text()).toContain('Step 1 content')
    expect(wrapper.text()).not.toContain('Step 2 content')
    expect(wrapper.text()).not.toContain('Step 3 content')
  })

  it('renders correct step when initial step is not 1', () => {
    const wrapper = mountWizard({ initialStep: 2 })
    expect(wrapper.text()).toContain('Step 2 content')
    expect(wrapper.text()).not.toContain('Step 1 content')
  })

  it('step content changes when navigating forward', async () => {
    const wrapper = mountWizard({ initialStep: 1, validateOnNext: false })
    expect(wrapper.text()).toContain('Step 1 content')

    const buttons = wrapper.findAll('button')
    const nextButton = buttons.find(b => b.text() === 'Next')
    await nextButton!.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Step 2 content')
    expect(wrapper.text()).not.toContain('Step 1 content')
  })

  it('step content changes when navigating backward', async () => {
    const wrapper = mountWizard({ initialStep: 2, validateOnNext: false })
    expect(wrapper.text()).toContain('Step 2 content')

    const buttons = wrapper.findAll('button')
    const prevButton = buttons.find(b => b.text() === 'Previous')
    await prevButton!.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Step 1 content')
    expect(wrapper.text()).not.toContain('Step 2 content')
  })
})

describe('WizardActions', () => {
  it('Previous button is disabled on first step', () => {
    const wrapper = mountWizard({ initialStep: 1 })
    const buttons = wrapper.findAll('button')
    const prevButton = buttons.find(b => b.text() === 'Previous')
    expect(prevButton!.attributes('disabled')).toBeDefined()
  })

  it('Previous button is enabled on non-first steps', () => {
    const wrapper = mountWizard({ initialStep: 2 })
    const buttons = wrapper.findAll('button')
    const prevButton = buttons.find(b => b.text() === 'Previous')
    expect(prevButton!.attributes('disabled')).toBeUndefined()
  })

  it('Next button is shown on non-last steps', () => {
    const wrapper = mountWizard({ initialStep: 1 })
    const buttons = wrapper.findAll('button')
    const nextButton = buttons.find(b => b.text() === 'Next')
    expect(nextButton).toBeDefined()
  })

  it('Submit button is shown on the last step', () => {
    const wrapper = mountWizard({ initialStep: 3 })
    const buttons = wrapper.findAll('button')
    const submitButton = buttons.find(b => b.text() === 'Submit')
    expect(submitButton).toBeDefined()
    expect(submitButton!.exists()).toBe(true)
  })

  it('Next button is not shown on the last step', () => {
    const wrapper = mountWizard({ initialStep: 3 })
    const buttons = wrapper.findAll('button')
    const nextButton = buttons.find(b => b.text() === 'Next')
    expect(nextButton).toBeUndefined()
  })

  it('Submit button emits submit event', async () => {
    const wrapper = mount({
      components: { Wizard, WizardStep, WizardActions },
      template: `
        <Wizard :total="3" :model-value="3">
          <WizardStep :step="3" title="Last Step">Last step content</WizardStep>
          <WizardActions @submit="onSubmit" />
        </Wizard>
      `,
      data() {
        return { submitted: false }
      },
      methods: {
        onSubmit() {
          (this as any).submitted = true
        },
      },
    })

    const buttons = wrapper.findAll('button')
    const submitButton = buttons.find(b => b.text() === 'Submit')
    await submitButton!.trigger('click')

    expect((wrapper.vm as any).submitted).toBe(true)
  })

  it('renders custom button labels', () => {
    const wrapper = mount({
      components: { Wizard, WizardStep, WizardActions },
      template: `
        <Wizard :total="2" :model-value="1">
          <WizardStep :step="1" title="Step 1">Step 1</WizardStep>
          <WizardStep :step="2" title="Step 2">Step 2</WizardStep>
          <WizardActions previous-label="Back" next-label="Continue" submit-label="Finish" />
        </Wizard>
      `,
    })
    expect(wrapper.text()).toContain('Back')
    expect(wrapper.text()).toContain('Continue')
  })

  it('renders Submit label on last step with custom label', () => {
    const wrapper = mount({
      components: { Wizard, WizardStep, WizardActions },
      template: `
        <Wizard :total="2" :model-value="2">
          <WizardStep :step="2" title="Last">Last</WizardStep>
          <WizardActions submit-label="Finish" />
        </Wizard>
      `,
    })
    expect(wrapper.text()).toContain('Finish')
  })
})

describe('Wizard validation', () => {
  it('Next with validate returning false blocks advancement', async () => {
    const validate = vi.fn(async () => false)
    const wrapper = mountWizard({
      initialStep: 1,
      validateOnNext: true,
      validate1: validate,
    })

    expect(wrapper.text()).toContain('Step 1 content')

    const buttons = wrapper.findAll('button')
    const nextButton = buttons.find(b => b.text() === 'Next')
    await nextButton!.trigger('click')
    await wrapper.vm.$nextTick()

    expect(validate).toHaveBeenCalledOnce()
    expect(wrapper.text()).toContain('Step 1 content')
    expect(wrapper.text()).not.toContain('Step 2 content')
  })

  it('Next with validate returning true allows advancement', async () => {
    const validate = vi.fn(async () => true)
    const wrapper = mountWizard({
      initialStep: 1,
      validateOnNext: true,
      validate1: validate,
    })

    const buttons = wrapper.findAll('button')
    const nextButton = buttons.find(b => b.text() === 'Next')
    await nextButton!.trigger('click')
    await wrapper.vm.$nextTick()

    expect(validate).toHaveBeenCalledOnce()
    expect(wrapper.text()).toContain('Step 2 content')
  })

  it('Next without validateOnNext advances normally without calling validate', async () => {
    const validate = vi.fn(async () => false)
    const wrapper = mountWizard({
      initialStep: 1,
      validateOnNext: false,
      validate1: validate,
    })

    const buttons = wrapper.findAll('button')
    const nextButton = buttons.find(b => b.text() === 'Next')
    await nextButton!.trigger('click')
    await wrapper.vm.$nextTick()

    expect(validate).not.toHaveBeenCalled()
    expect(wrapper.text()).toContain('Step 2 content')
  })

  it('Previous goes to prior step without validation', async () => {
    const validate = vi.fn(async () => false)
    const wrapper = mountWizard({
      initialStep: 2,
      validateOnNext: true,
      validate2: validate,
    })

    expect(wrapper.text()).toContain('Step 2 content')

    const buttons = wrapper.findAll('button')
    const prevButton = buttons.find(b => b.text() === 'Previous')
    await prevButton!.trigger('click')
    await wrapper.vm.$nextTick()

    expect(validate).not.toHaveBeenCalled()
    expect(wrapper.text()).toContain('Step 1 content')
  })

  it('step with no validate function advances without error', async () => {
    const wrapper = mountWizard({
      initialStep: 1,
      validateOnNext: true,
      // No validate functions provided
    })

    const buttons = wrapper.findAll('button')
    const nextButton = buttons.find(b => b.text() === 'Next')
    await nextButton!.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Step 2 content')
  })
})

describe('WizardStep', () => {
  it('only renders when active', () => {
    const wrapper = mountWizard({ initialStep: 1 })
    const steps = wrapper.findAll('[data-step]')
    // Only step 1 is mounted (v-if)
    expect(steps.length).toBe(1)
    expect(steps[0].attributes('data-step')).toBe('1')
  })

  it('renders step content in slot', () => {
    const wrapper = mount({
      components: { Wizard, WizardStep },
      template: `
        <Wizard :total="1" :model-value="1">
          <WizardStep :step="1" title="Only Step">
            <span class="custom-slot">Custom slot content</span>
          </WizardStep>
        </Wizard>
      `,
    })
    expect(wrapper.html()).toContain('custom-slot')
    expect(wrapper.text()).toContain('Custom slot content')
  })
})
