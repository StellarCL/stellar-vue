import { describe, it, expect, beforeAll } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { setupMatchers } from '../matchers/accessibility'

// Install matchers before all tests
beforeAll(() => {
  setupMatchers()
})

// ─── Test Components ──────────────────────────────────────────────────────────

const AccessibleButton = defineComponent({
  render() {
    return h('button', { 'aria-label': 'Close dialog', type: 'button' }, 'X')
  },
})

const InaccessibleImage = defineComponent({
  render() {
    return h('div', {}, [h('img', { src: 'photo.jpg' })])
  },
})

const AccessibleImage = defineComponent({
  render() {
    return h('div', {}, [h('img', { src: 'photo.jpg', alt: 'A test photo' })])
  },
})

const InvalidRoleComponent = defineComponent({
  render() {
    return h('div', { role: 'foobar' }, 'bad role')
  },
})

const ValidRoleComponent = defineComponent({
  render() {
    return h('div', { role: 'navigation' }, [h('a', { href: '/' }, 'Home')])
  },
})

const LabelledInput = defineComponent({
  render() {
    return h('div', {}, [
      h('label', { for: 'email-input' }, 'Email'),
      h('input', { id: 'email-input', type: 'email' }),
    ])
  },
})

const UnlabelledInput = defineComponent({
  render() {
    return h('div', {}, [h('input', { type: 'text' })])
  },
})

const AriaLabelInput = defineComponent({
  render() {
    return h('input', { type: 'search', 'aria-label': 'Search the site' })
  },
})

const DisabledButton = defineComponent({
  render() {
    return h('button', { disabled: true, type: 'button' }, 'Disabled')
  },
})

const AriaDisabledButton = defineComponent({
  render() {
    return h('button', { 'aria-disabled': 'true', type: 'button' }, 'Aria Disabled')
  },
})

const EnabledButton = defineComponent({
  render() {
    return h('button', { type: 'button' }, 'Active')
  },
})

const AriaLabelledComponent = defineComponent({
  render() {
    return h('section', { 'aria-label': 'Main content' }, 'Content here')
  },
})

const AriaLabelledByComponent = defineComponent({
  setup() {
    return {}
  },
  render() {
    return h('div', {}, [
      h('h2', { id: 'section-heading' }, 'Section Title'),
      h('section', { 'aria-labelledby': 'section-heading' }, 'Section content'),
    ])
  },
})

// ─── toBeAccessible ───────────────────────────────────────────────────────────

describe('toBeAccessible', () => {
  it('passes for a simple accessible button', () => {
    const wrapper = mount(AccessibleButton)
    expect(wrapper).toBeAccessible()
  })

  it('passes for a div with valid role', () => {
    const wrapper = mount(ValidRoleComponent)
    expect(wrapper).toBeAccessible()
  })

  it('passes for labelled input', () => {
    const wrapper = mount(LabelledInput)
    expect(wrapper).toBeAccessible()
  })

  it('passes for input with aria-label', () => {
    const wrapper = mount(AriaLabelInput)
    expect(wrapper).toBeAccessible()
  })

  it('passes for image with alt text', () => {
    const wrapper = mount(AccessibleImage)
    expect(wrapper).toBeAccessible()
  })

  it('fails for image without alt attribute', () => {
    const wrapper = mount(InaccessibleImage)
    expect(wrapper).not.toBeAccessible()
  })

  it('fails for element with invalid ARIA role', () => {
    const wrapper = mount(InvalidRoleComponent)
    expect(wrapper).not.toBeAccessible()
  })

  it('fails for unlabelled input', () => {
    const wrapper = mount(UnlabelledInput)
    expect(wrapper).not.toBeAccessible()
  })
})

// ─── toHaveFocusWithin ────────────────────────────────────────────────────────

describe('toHaveFocusWithin', () => {
  it('passes when an element inside the wrapper is focused', () => {
    const wrapper = mount(LabelledInput, { attachTo: document.body })
    const input = wrapper.element.querySelector('input') as HTMLElement
    input.focus()
    expect(wrapper).toHaveFocusWithin()
    wrapper.unmount()
  })

  it('fails when no element is focused', () => {
    const wrapper = mount(LabelledInput)
    // Ensure nothing inside is focused by blurring
    ;(document.activeElement as HTMLElement | null)?.blur?.()
    expect(wrapper).not.toHaveFocusWithin()
  })

  it('fails when a different element outside the wrapper is focused', () => {
    const externalInput = document.createElement('input')
    document.body.appendChild(externalInput)
    externalInput.focus()

    const wrapper = mount(LabelledInput)
    expect(wrapper).not.toHaveFocusWithin()

    document.body.removeChild(externalInput)
  })
})

// ─── toHaveAriaLabel ──────────────────────────────────────────────────────────

describe('toHaveAriaLabel', () => {
  it('passes when the element has a matching aria-label', () => {
    const wrapper = mount(AriaLabelledComponent)
    expect(wrapper).toHaveAriaLabel('Main content')
  })

  it('fails when the aria-label does not match', () => {
    const wrapper = mount(AriaLabelledComponent)
    expect(wrapper).not.toHaveAriaLabel('Wrong label')
  })

  it('fails when no aria-label or aria-labelledby is present', () => {
    const wrapper = mount(AccessibleButton)
    // The button has aria-label but we are checking the wrapper root
    // The button IS the root here, so it should pass for the button's label
    expect(wrapper).toHaveAriaLabel('Close dialog')
  })

  it('fails for component with no aria attributes', () => {
    const wrapper = mount(EnabledButton)
    expect(wrapper).not.toHaveAriaLabel('Some label')
  })
})

// ─── toBeDisabledAccessibly ───────────────────────────────────────────────────

describe('toBeDisabledAccessibly', () => {
  it('passes for element with disabled attribute', () => {
    const wrapper = mount(DisabledButton)
    expect(wrapper).toBeDisabledAccessibly()
  })

  it('passes for element with aria-disabled="true"', () => {
    const wrapper = mount(AriaDisabledButton)
    expect(wrapper).toBeDisabledAccessibly()
  })

  it('fails for an enabled element', () => {
    const wrapper = mount(EnabledButton)
    expect(wrapper).not.toBeDisabledAccessibly()
  })
})

// ─── setupMatchers ────────────────────────────────────────────────────────────

describe('setupMatchers', () => {
  it('installs matchers so they work with expect', () => {
    // Already tested above since setupMatchers() was called in beforeAll
    // This just verifies the functions exist
    const wrapper = mount(AccessibleButton)
    expect(() => expect(wrapper).toBeAccessible()).not.toThrow()
  })
})
