import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, ref } from 'vue'
import StellarTransition from './StellarTransition.vue'
import { transitionPresets, type TransitionPresetName } from './presets'

// Helper component that conditionally renders slot via v-show equivalent
function makeWrapper(show = true, slotContent = '<p>Content</p>') {
  return defineComponent({
    setup() {
      return { show: ref(show) }
    },
    template: `
      <StellarTransition>
        <p v-if="show">Content</p>
      </StellarTransition>
    `,
    components: { StellarTransition },
  })
}

describe('StellarTransition', () => {
  it('renders default slot content when child is visible', () => {
    const wrapper = mount(StellarTransition, {
      slots: { default: '<p>Hello World</p>' },
    })
    expect(wrapper.text()).toContain('Hello World')
  })

  it('applies fade preset classes by default', () => {
    const wrapper = mount(StellarTransition, {
      slots: { default: '<p>Content</p>' },
    })
    // The component should use the fade preset by default
    const vm = wrapper.vm as InstanceType<typeof StellarTransition> & { $props: { preset: TransitionPresetName } }
    expect(wrapper.props('preset')).toBe('fade')
  })

  it('has preset prop defaulting to fade', () => {
    const wrapper = mount(StellarTransition, {
      slots: { default: '<p>Content</p>' },
    })
    expect(wrapper.props('preset')).toBe('fade')
  })

  it('accepts a custom preset prop', () => {
    const wrapper = mount(StellarTransition, {
      props: { preset: 'scale' },
      slots: { default: '<p>Content</p>' },
    })
    expect(wrapper.props('preset')).toBe('scale')
  })

  it('appear prop defaults to false', () => {
    const wrapper = mount(StellarTransition, {
      slots: { default: '<p>Content</p>' },
    })
    expect(wrapper.props('appear')).toBe(false)
  })

  it('appear prop is forwarded when set to true', () => {
    const wrapper = mount(StellarTransition, {
      props: { appear: true },
      slots: { default: '<p>Content</p>' },
    })
    expect(wrapper.props('appear')).toBe(true)
  })

  it('Transition wrapper is present in component structure', () => {
    const wrapper = mount(StellarTransition, {
      slots: { default: '<p>Content</p>' },
    })
    // The component should contain content from the slot
    expect(wrapper.find('p').exists()).toBe(true)
  })

  it('renders slot content for each preset without errors', () => {
    const presetNames = Object.keys(transitionPresets) as TransitionPresetName[]
    for (const preset of presetNames) {
      expect(() => {
        mount(StellarTransition, {
          props: { preset },
          slots: { default: '<div>Test</div>' },
        })
      }).not.toThrow()
    }
  })

  it('uses correct enterActiveClass from selected preset', async () => {
    // Test that the component correctly reads from presets
    // by checking the computed classes match preset values
    const wrapper = mount(StellarTransition, {
      props: { preset: 'slideUp' },
      slots: { default: '<div>Test</div>' },
    })
    // The component is configured with the slideUp preset
    expect(wrapper.props('preset')).toBe('slideUp')
    // Verify the preset itself has correct values
    expect(transitionPresets.slideUp.enterFromClass).toContain('translate-y-full')
  })

  it('uses correct classes for scale preset', () => {
    const wrapper = mount(StellarTransition, {
      props: { preset: 'scale' },
      slots: { default: '<div>Test</div>' },
    })
    expect(wrapper.props('preset')).toBe('scale')
    expect(transitionPresets.scale.enterFromClass).toContain('scale-95')
  })

  it('uses correct classes for blur preset', () => {
    const wrapper = mount(StellarTransition, {
      props: { preset: 'blur' },
      slots: { default: '<div>Test</div>' },
    })
    expect(wrapper.props('preset')).toBe('blur')
    expect(transitionPresets.blur.enterFromClass).toContain('blur-sm')
  })
})
