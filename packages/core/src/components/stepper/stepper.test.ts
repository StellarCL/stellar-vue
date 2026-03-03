import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Stepper from './Stepper.vue'
import StepperContent from './StepperContent.vue'
import StepperItem from './StepperItem.vue'
import StepperSeparator from './StepperSeparator.vue'
import StepperTrigger from './StepperTrigger.vue'

const defaultSteps = [
  { title: 'Account', description: 'Set up your account' },
  { title: 'Profile', description: 'Add your details' },
  { title: 'Review', description: 'Confirm everything' },
]

function mountStepper(activeStep = 1, orientation: 'horizontal' | 'vertical' = 'horizontal') {
  return mount({
    components: { Stepper, StepperItem, StepperTrigger, StepperSeparator, StepperContent },
    template: `
      <Stepper :steps="steps" :model-value="activeStep" :orientation="orientation">
        <StepperItem :step="1">
          <StepperTrigger :step="1" />
          <StepperSeparator :step="1" />
        </StepperItem>
        <StepperItem :step="2">
          <StepperTrigger :step="2" />
          <StepperSeparator :step="2" />
        </StepperItem>
        <StepperItem :step="3">
          <StepperTrigger :step="3" />
        </StepperItem>
        <StepperContent :step="1">Step 1 content</StepperContent>
        <StepperContent :step="2">Step 2 content</StepperContent>
        <StepperContent :step="3">Step 3 content</StepperContent>
      </Stepper>
    `,
    data() {
      return { steps: defaultSteps, activeStep, orientation }
    },
  })
}

describe('stepper', () => {
  it('renders all step titles', () => {
    const wrapper = mountStepper()
    expect(wrapper.text()).toContain('Account')
    expect(wrapper.text()).toContain('Profile')
    expect(wrapper.text()).toContain('Review')
  })

  it('horizontal orientation renders flex row', () => {
    const wrapper = mountStepper(1, 'horizontal')
    const root = wrapper.find('div')
    expect(root.classes()).toContain('flex')
    expect(root.classes()).not.toContain('flex-col')
  })

  it('vertical orientation renders flex column', () => {
    const wrapper = mountStepper(1, 'vertical')
    const root = wrapper.find('div')
    expect(root.classes()).toContain('flex')
    expect(root.classes()).toContain('flex-col')
  })

  it('merges custom classes', () => {
    const wrapper = mount({
      components: { Stepper },
      template: `<Stepper :steps="steps" class="custom-stepper" />`,
      data() {
        return { steps: defaultSteps }
      },
    })
    expect(wrapper.html()).toContain('custom-stepper')
  })
})

describe('stepperTrigger', () => {
  it('shows step number for upcoming steps', () => {
    const wrapper = mountStepper(1)
    const buttons = wrapper.findAll('button')
    // Step 2 and 3 are upcoming — should show step numbers
    expect(buttons[1].text()).toContain('2')
    expect(buttons[2].text()).toContain('3')
  })

  it('shows check icon for completed steps', () => {
    const wrapper = mountStepper(3)
    const buttons = wrapper.findAll('button')
    // Steps 1 and 2 are completed
    const step1Svg = buttons[0].find('svg')
    expect(step1Svg.exists()).toBe(true)
    const step2Svg = buttons[1].find('svg')
    expect(step2Svg.exists()).toBe(true)
  })

  it('shows highlighted number for active step', () => {
    const wrapper = mountStepper(2)
    const buttons = wrapper.findAll('button')
    const activeCircle = buttons[1].find('span')
    expect(activeCircle.classes().join(' ')).toContain('bg-primary')
    expect(activeCircle.classes().join(' ')).toContain('border-primary')
  })

  it('shows primary circle style for completed steps', () => {
    const wrapper = mountStepper(3)
    const buttons = wrapper.findAll('button')
    const completedCircle = buttons[0].find('span')
    expect(completedCircle.classes().join(' ')).toContain('bg-primary')
    expect(completedCircle.classes().join(' ')).toContain('border-primary')
  })

  it('shows muted border for upcoming steps', () => {
    const wrapper = mountStepper(1)
    const buttons = wrapper.findAll('button')
    // Step 2 and 3 are upcoming
    const upcomingCircle = buttons[1].find('span')
    expect(upcomingCircle.classes().join(' ')).toContain('border-border')
  })

  it('clicking a trigger changes active step', async () => {
    const wrapper = mount({
      components: { Stepper, StepperItem, StepperTrigger },
      template: `
        <Stepper :steps="steps" v-model="activeStep">
          <StepperItem :step="1">
            <StepperTrigger :step="1" />
          </StepperItem>
          <StepperItem :step="2">
            <StepperTrigger :step="2" />
          </StepperItem>
          <StepperItem :step="3">
            <StepperTrigger :step="3" />
          </StepperItem>
        </Stepper>
      `,
      data() {
        return { steps: defaultSteps, activeStep: 1 }
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[2].trigger('click')
    expect((wrapper.vm as any).activeStep).toBe(3)
  })
})

describe('stepperSeparator', () => {
  it('shows completed state for passed steps', () => {
    const wrapper = mountStepper(3)
    // When active step is 3, separators for steps 1 and 2 should be completed
    const separators = wrapper.findAll('[role="separator"]')
    expect(separators[0].classes().join(' ')).toContain('bg-primary')
    expect(separators[1].classes().join(' ')).toContain('bg-primary')
  })

  it('shows muted state for upcoming separators', () => {
    const wrapper = mountStepper(1)
    const separators = wrapper.findAll('[role="separator"]')
    // First separator: step 1 is active (not completed), so separator not completed
    expect(separators[0].classes().join(' ')).toContain('bg-border')
    expect(separators[0].classes().join(' ')).not.toContain('bg-primary')
  })

  it('renders horizontal separator with correct classes', () => {
    const wrapper = mountStepper(1, 'horizontal')
    const separator = wrapper.find('[role="separator"]')
    expect(separator.classes().join(' ')).toContain('flex-1')
    expect(separator.classes().join(' ')).toContain('h-0.5')
  })

  it('renders vertical separator with correct classes', () => {
    const wrapper = mountStepper(1, 'vertical')
    const separator = wrapper.find('[role="separator"]')
    expect(separator.classes().join(' ')).toContain('w-0.5')
    expect(separator.classes().join(' ')).toContain('min-h-[2rem]')
  })
})

describe('stepperContent', () => {
  it('only shows content for the active step', () => {
    const wrapper = mountStepper(2)
    expect(wrapper.text()).toContain('Step 2 content')
    expect(wrapper.text()).not.toContain('Step 1 content')
    expect(wrapper.text()).not.toContain('Step 3 content')
  })

  it('shows first step content when active step is 1', () => {
    const wrapper = mountStepper(1)
    expect(wrapper.text()).toContain('Step 1 content')
    expect(wrapper.text()).not.toContain('Step 2 content')
    expect(wrapper.text()).not.toContain('Step 3 content')
  })

  it('shows last step content when active step is last', () => {
    const wrapper = mountStepper(3)
    expect(wrapper.text()).toContain('Step 3 content')
    expect(wrapper.text()).not.toContain('Step 1 content')
    expect(wrapper.text()).not.toContain('Step 2 content')
  })

  it('merges custom class on StepperContent', () => {
    const wrapper = mount({
      components: { Stepper, StepperContent },
      template: `
        <Stepper :steps="steps" :model-value="1">
          <StepperContent :step="1" class="custom-content">Content</StepperContent>
        </Stepper>
      `,
      data() {
        return { steps: defaultSteps }
      },
    })
    expect(wrapper.html()).toContain('custom-content')
  })
})

describe('stepperItem', () => {
  it('non-last items have flex-1 class', () => {
    const wrapper = mountStepper(1)
    const items = wrapper.findAll('[data-step]')
    expect(items[0].classes()).toContain('flex-1')
    expect(items[1].classes()).toContain('flex-1')
  })

  it('last item does not have flex-1 class', () => {
    const wrapper = mountStepper(1)
    const items = wrapper.findAll('[data-step]')
    const lastItem = items[items.length - 1]
    expect(lastItem.classes()).not.toContain('flex-1')
  })
})
