import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { renderWithTheme } from '../wrappers/render-with-theme'

const SimpleComponent = defineComponent({
  props: {
    label: { type: String, default: 'Hello' },
  },
  render() {
    return h('div', { class: 'test-component' }, this.label)
  },
})

describe('renderWithTheme', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.classList.remove('dark')
  })

  it('mounts the component successfully', () => {
    const wrapper = renderWithTheme(SimpleComponent)
    expect(wrapper.exists()).toBe(true)
  })

  it('sets data-theme to "stellar" by default', () => {
    renderWithTheme(SimpleComponent)
    expect(document.documentElement.getAttribute('data-theme')).toBe('stellar')
  })

  it('sets data-theme to the specified theme', () => {
    renderWithTheme(SimpleComponent, { theme: 'sirius' })
    expect(document.documentElement.getAttribute('data-theme')).toBe('sirius')
  })

  it('sets data-theme to polaris when specified', () => {
    renderWithTheme(SimpleComponent, { theme: 'polaris' })
    expect(document.documentElement.getAttribute('data-theme')).toBe('polaris')
  })

  it('sets data-theme to antares when specified', () => {
    renderWithTheme(SimpleComponent, { theme: 'antares' })
    expect(document.documentElement.getAttribute('data-theme')).toBe('antares')
  })

  it('sets data-theme to vega when specified', () => {
    renderWithTheme(SimpleComponent, { theme: 'vega' })
    expect(document.documentElement.getAttribute('data-theme')).toBe('vega')
  })

  it('sets data-theme to aldebaran when specified', () => {
    renderWithTheme(SimpleComponent, { theme: 'aldebaran' })
    expect(document.documentElement.getAttribute('data-theme')).toBe('aldebaran')
  })

  it('does not add dark class by default', () => {
    renderWithTheme(SimpleComponent)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('adds dark class when dark: true is passed', () => {
    renderWithTheme(SimpleComponent, { dark: true })
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes dark class when dark: false is passed', () => {
    document.documentElement.classList.add('dark')
    renderWithTheme(SimpleComponent, { dark: false })
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('passes props to the component', () => {
    const wrapper = renderWithTheme(SimpleComponent, { props: { label: 'Custom Label' } })
    expect(wrapper.text()).toBe('Custom Label')
  })

  it('returns a VTU wrapper with the correct element', () => {
    const wrapper = renderWithTheme(SimpleComponent)
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes()).toContain('test-component')
  })

  it('supports slots via mountOptions', () => {
    const WithSlot = defineComponent({
      render() {
        return h('div', {}, this.$slots.default?.())
      },
    })
    const wrapper = renderWithTheme(WithSlot, { slots: { default: 'Slotted content' } })
    expect(wrapper.text()).toBe('Slotted content')
  })

  it('can combine theme and dark options', () => {
    renderWithTheme(SimpleComponent, { theme: 'vega', dark: true })
    expect(document.documentElement.getAttribute('data-theme')).toBe('vega')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
