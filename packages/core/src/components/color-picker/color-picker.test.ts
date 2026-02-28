import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { hexToHsb, hexToRgb, hsbToHex, isValidHex, rgbToHex } from './color-picker.utils'
import ColorPicker from './ColorPicker.vue'
import ColorPickerAlphaSlider from './ColorPickerAlphaSlider.vue'
import ColorPickerArea from './ColorPickerArea.vue'
import ColorPickerHueSlider from './ColorPickerHueSlider.vue'
import ColorPickerInput from './ColorPickerInput.vue'
import ColorPickerPreview from './ColorPickerPreview.vue'
import ColorPickerSwatches from './ColorPickerSwatches.vue'

describe('color Picker utils', () => {
  it('converts HSB to Hex', () => {
    expect(hsbToHex(0, 100, 100)).toBe('#ff0000')
    expect(hsbToHex(0, 0, 100)).toBe('#ffffff')
    expect(hsbToHex(0, 0, 0)).toBe('#000000')
  })

  it('converts Hex to HSB', () => {
    const red = hexToHsb('#ff0000')
    expect(red.h).toBe(0)
    expect(red.s).toBe(100)
    expect(red.b).toBe(100)
  })

  it('validates hex strings', () => {
    expect(isValidHex('#ff0000')).toBe(true)
    expect(isValidHex('#fff')).toBe(true)
    expect(isValidHex('ff0000')).toBe(true)
    expect(isValidHex('#gggggg')).toBe(false)
    expect(isValidHex('invalid')).toBe(false)
  })

  it('converts hex to RGB', () => {
    const rgb = hexToRgb('#ff0000')
    expect(rgb.r).toBe(255)
    expect(rgb.g).toBe(0)
    expect(rgb.b).toBe(0)
  })

  it('converts RGB to hex', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000')
    expect(rgbToHex(0, 0, 0)).toBe('#000000')
  })
})

describe('colorPicker', () => {
  it('renders with group role', () => {
    const wrapper = mount(ColorPicker, {
      slots: { default: 'picker content' },
    })
    expect(wrapper.find('[role="group"]').exists()).toBe(true)
  })

  it('merges custom classes', () => {
    const wrapper = mount(ColorPicker, {
      props: { class: 'custom-picker' },
      slots: { default: 'content' },
    })
    expect(wrapper.find('[role="group"]').classes()).toContain('custom-picker')
  })
})

describe('colorPicker with sub-components', () => {
  function createPicker(props = {}) {
    return mount({
      components: {
        ColorPicker,
        ColorPickerArea,
        ColorPickerHueSlider,
        ColorPickerInput,
        ColorPickerSwatches,
        ColorPickerPreview,
      },
      template: `
        <ColorPicker v-bind="pickerProps">
          <ColorPickerArea />
          <ColorPickerHueSlider />
          <ColorPickerInput />
          <ColorPickerSwatches />
          <ColorPickerPreview />
        </ColorPicker>
      `,
      data() {
        return { pickerProps: props }
      },
    })
  }

  it('renders color area', () => {
    const wrapper = createPicker()
    expect(wrapper.find('[role="slider"]').exists()).toBe(true)
  })

  it('renders hue slider', () => {
    const wrapper = createPicker()
    const hueSlider = wrapper.find('input[type="range"]')
    expect(hueSlider.exists()).toBe(true)
    expect(hueSlider.attributes('aria-label')).toBe('Hue')
  })

  it('renders input with hex value', () => {
    const wrapper = createPicker({ modelValue: '#ff0000' })
    const input = wrapper.find('input:not([type="range"])')
    expect(input.exists()).toBe(true)
  })

  it('renders color preview', () => {
    const wrapper = createPicker({ modelValue: '#ff0000' })
    const preview = wrapper.find('[role="img"]')
    expect(preview.exists()).toBe(true)
  })

  it('renders preset swatches when provided', () => {
    const wrapper = createPicker({
      presets: ['#ff0000', '#00ff00', '#0000ff'],
    })
    const swatches = wrapper.findAll('[role="option"]')
    expect(swatches.length).toBe(3)
  })

  it('does not render swatches without presets', () => {
    const wrapper = createPicker()
    const swatches = wrapper.findAll('[role="option"]')
    expect(swatches.length).toBe(0)
  })

  it('clicking a swatch emits update', async () => {
    const wrapper = createPicker({
      modelValue: '#000000',
      presets: ['#ff0000', '#00ff00'],
    })
    const swatches = wrapper.findAll('[role="option"]')
    await swatches[0].trigger('click')
    const emitted = wrapper.findComponent(ColorPicker).emitted('update:modelValue')
    expect(emitted).toBeTruthy()
  })

  it('hue slider changes hue value', async () => {
    const wrapper = createPicker({ modelValue: '#ff0000' })
    const hueSlider = wrapper.find('input[type="range"][aria-label="Hue"]')
    await hueSlider.setValue('120')
    await hueSlider.trigger('input')
    // The color should have changed
    const emitted = wrapper.findComponent(ColorPicker).emitted('update:modelValue')
    expect(emitted).toBeTruthy()
  })
})

describe('colorPickerAlphaSlider', () => {
  it('renders alpha slider', () => {
    const wrapper = mount({
      components: { ColorPicker, ColorPickerAlphaSlider },
      template: `
        <ColorPicker :show-alpha="true">
          <ColorPickerAlphaSlider />
        </ColorPicker>
      `,
    })
    const alphaSlider = wrapper.find('input[type="range"][aria-label="Alpha"]')
    expect(alphaSlider.exists()).toBe(true)
  })
})
