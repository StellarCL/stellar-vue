import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Label from './Label.vue'

describe('Label', () => {
  it('renders text content', () => {
    const wrapper = mount(Label, {
      slots: { default: 'Email address' },
    })
    expect(wrapper.text()).toContain('Email address')
  })

  it('links to input via for prop', () => {
    const wrapper = mount(Label, {
      props: { for: 'email-input' },
      slots: { default: 'Email' },
    })
    expect(wrapper.attributes('for')).toBe('email-input')
  })

  it('does not show asterisk when not required', () => {
    const wrapper = mount(Label, {
      slots: { default: 'Name' },
    })
    expect(wrapper.find('span').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('*')
  })

  it('shows required asterisk when required is true', () => {
    const wrapper = mount(Label, {
      props: { required: true },
      slots: { default: 'Name' },
    })
    const asterisk = wrapper.find('span')
    expect(asterisk.exists()).toBe(true)
    expect(asterisk.text()).toBe('*')
    expect(asterisk.classes()).toContain('text-destructive')
  })

  it('has peer-disabled classes in base styles', () => {
    const wrapper = mount(Label, {
      slots: { default: 'Label' },
    })
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('peer-disabled:cursor-not-allowed')
    expect(classes).toContain('peer-disabled:opacity-70')
  })

  it('applies base text styling classes', () => {
    const wrapper = mount(Label, {
      slots: { default: 'Label' },
    })
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('text-sm')
    expect(classes).toContain('font-medium')
    expect(classes).toContain('leading-none')
  })

  it('merges custom classes via class prop', () => {
    const wrapper = mount(Label, {
      props: { class: 'custom-class' },
      slots: { default: 'Label' },
    })
    expect(wrapper.classes()).toContain('custom-class')
  })
})
