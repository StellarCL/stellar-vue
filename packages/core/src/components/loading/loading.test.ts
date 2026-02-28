import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Loading from './Loading.vue'
import LoadingSpinner from './LoadingSpinner.vue'
import LoadingDots from './LoadingDots.vue'
import LoadingBar from './LoadingBar.vue'
import LoadingOverlay from './LoadingOverlay.vue'

describe('Loading', () => {
  it('renders spinner variant by default', () => {
    const wrapper = mount(Loading)
    // Should render an SVG (the spinner)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders dots variant', () => {
    const wrapper = mount(Loading, { props: { variant: 'dots' } })
    // Dots renders 3 spans inside the dots container
    const spans = wrapper.findAll('span')
    expect(spans.length).toBe(3)
  })

  it('renders bar variant with progress', () => {
    const wrapper = mount(Loading, { props: { variant: 'bar', progress: 60 } })
    const progressbar = wrapper.find('[role="progressbar"]')
    expect(progressbar.exists()).toBe(true)
    expect(progressbar.attributes('aria-valuenow')).toBe('60')
  })

  it('renders bar variant indeterminate when no progress given', () => {
    const wrapper = mount(Loading, { props: { variant: 'bar' } })
    const progressbar = wrapper.find('[role="progressbar"]')
    expect(progressbar.exists()).toBe(true)
    expect(progressbar.attributes('aria-valuenow')).toBeUndefined()
  })

  it('shows loading text', () => {
    const wrapper = mount(Loading, { props: { text: 'Please wait...' } })
    expect(wrapper.text()).toContain('Please wait...')
  })

  it('does not render text when not provided', () => {
    const wrapper = mount(Loading)
    expect(wrapper.find('span').exists()).toBe(false)
  })

  it('renders skeleton variant', () => {
    const wrapper = mount(Loading, { props: { variant: 'skeleton' } })
    // Skeleton renders divs with animate-pulse
    expect(wrapper.html()).toContain('animate-pulse')
  })

  describe('size variants', () => {
    it('applies sm size to spinner', () => {
      const wrapper = mount(Loading, { props: { size: 'sm' } })
      const svg = wrapper.find('svg')
      expect(svg.classes().join(' ')).toContain('h-4')
      expect(svg.classes().join(' ')).toContain('w-4')
    })

    it('applies md size to spinner by default', () => {
      const wrapper = mount(Loading)
      const svg = wrapper.find('svg')
      expect(svg.classes().join(' ')).toContain('h-6')
      expect(svg.classes().join(' ')).toContain('w-6')
    })

    it('applies lg size to spinner', () => {
      const wrapper = mount(Loading, { props: { size: 'lg' } })
      const svg = wrapper.find('svg')
      expect(svg.classes().join(' ')).toContain('h-10')
      expect(svg.classes().join(' ')).toContain('w-10')
    })
  })

  it('wraps in overlay when overlay prop is true', () => {
    const wrapper = mount(Loading, { props: { overlay: true } })
    // Overlay sets absolute inset-0 positioning
    expect(wrapper.html()).toContain('inset-0')
  })

  it('renders fullscreen overlay when fullscreen prop is true', () => {
    const wrapper = mount(Loading, { props: { fullscreen: true } })
    // Fullscreen sets fixed inset-0 positioning
    expect(wrapper.html()).toContain('fixed')
    expect(wrapper.html()).toContain('inset-0')
  })

  it('merges custom classes', () => {
    const wrapper = mount(Loading, { props: { class: 'my-custom-class' } })
    expect(wrapper.html()).toContain('my-custom-class')
  })
})

describe('LoadingSpinner', () => {
  it('renders an SVG element', () => {
    const wrapper = mount(LoadingSpinner)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('has role="status" and aria-label', () => {
    const wrapper = mount(LoadingSpinner)
    const svg = wrapper.find('svg')
    expect(svg.attributes('role')).toBe('status')
    expect(svg.attributes('aria-label')).toBe('Loading')
  })

  it('has animate-spin class', () => {
    const wrapper = mount(LoadingSpinner)
    expect(wrapper.find('svg').classes()).toContain('animate-spin')
  })

  it('applies sm size class', () => {
    const wrapper = mount(LoadingSpinner, { props: { size: 'sm' } })
    const classes = wrapper.find('svg').classes().join(' ')
    expect(classes).toContain('h-4')
    expect(classes).toContain('w-4')
  })

  it('applies md size class by default', () => {
    const wrapper = mount(LoadingSpinner)
    const classes = wrapper.find('svg').classes().join(' ')
    expect(classes).toContain('h-6')
    expect(classes).toContain('w-6')
  })

  it('applies lg size class', () => {
    const wrapper = mount(LoadingSpinner, { props: { size: 'lg' } })
    const classes = wrapper.find('svg').classes().join(' ')
    expect(classes).toContain('h-10')
    expect(classes).toContain('w-10')
  })

  it('merges custom classes', () => {
    const wrapper = mount(LoadingSpinner, { props: { class: 'text-red-500' } })
    expect(wrapper.find('svg').classes()).toContain('text-red-500')
  })
})

describe('LoadingDots', () => {
  it('renders three dot spans', () => {
    const wrapper = mount(LoadingDots)
    expect(wrapper.findAll('span').length).toBe(3)
  })

  it('has role="status"', () => {
    const wrapper = mount(LoadingDots)
    expect(wrapper.find('[role="status"]').exists()).toBe(true)
  })

  it('dots have animate-bounce class', () => {
    const wrapper = mount(LoadingDots)
    const spans = wrapper.findAll('span')
    spans.forEach((span) => {
      expect(span.classes()).toContain('animate-bounce')
    })
  })

  it('applies sm size to dots', () => {
    const wrapper = mount(LoadingDots, { props: { size: 'sm' } })
    const spans = wrapper.findAll('span')
    spans.forEach((span) => {
      expect(span.classes().join(' ')).toContain('h-1.5')
    })
  })

  it('applies md size to dots by default', () => {
    const wrapper = mount(LoadingDots)
    const spans = wrapper.findAll('span')
    spans.forEach((span) => {
      expect(span.classes().join(' ')).toContain('h-2.5')
    })
  })

  it('applies lg size to dots', () => {
    const wrapper = mount(LoadingDots, { props: { size: 'lg' } })
    const spans = wrapper.findAll('span')
    spans.forEach((span) => {
      expect(span.classes().join(' ')).toContain('h-4')
    })
  })

  it('merges custom classes', () => {
    const wrapper = mount(LoadingDots, { props: { class: 'custom-dots' } })
    expect(wrapper.html()).toContain('custom-dots')
  })
})

describe('LoadingBar', () => {
  it('renders a progressbar', () => {
    const wrapper = mount(LoadingBar)
    expect(wrapper.find('[role="progressbar"]').exists()).toBe(true)
  })

  it('has fixed positioning for top bar', () => {
    const wrapper = mount(LoadingBar)
    const classes = wrapper.find('[role="progressbar"]').classes().join(' ')
    expect(classes).toContain('fixed')
    expect(classes).toContain('top-0')
  })

  it('renders determinate bar with progress value', () => {
    const wrapper = mount(LoadingBar, { props: { progress: 75 } })
    const progressbar = wrapper.find('[role="progressbar"]')
    expect(progressbar.attributes('aria-valuenow')).toBe('75')
    expect(progressbar.attributes('aria-valuemin')).toBe('0')
    expect(progressbar.attributes('aria-valuemax')).toBe('100')
  })

  it('renders determinate bar with correct width style', () => {
    const wrapper = mount(LoadingBar, { props: { progress: 40 } })
    const bar = wrapper.find('[role="progressbar"] > div')
    expect(bar.attributes('style')).toContain('width: 40%')
  })

  it('clamps progress to 0-100', () => {
    const wrapper = mount(LoadingBar, { props: { progress: 150 } })
    const bar = wrapper.find('[role="progressbar"] > div')
    expect(bar.attributes('style')).toContain('width: 100%')
  })

  it('renders indeterminate bar when no progress given', () => {
    const wrapper = mount(LoadingBar)
    const progressbar = wrapper.find('[role="progressbar"]')
    expect(progressbar.attributes('aria-valuenow')).toBeUndefined()
  })

  it('merges custom classes', () => {
    const wrapper = mount(LoadingBar, { props: { class: 'custom-bar' } })
    expect(wrapper.html()).toContain('custom-bar')
  })
})

describe('LoadingOverlay', () => {
  it('renders slot content', () => {
    const wrapper = mount(LoadingOverlay, {
      slots: { default: '<span class="content">Loading...</span>' },
    })
    expect(wrapper.find('.content').exists()).toBe(true)
  })

  it('has role="status"', () => {
    const wrapper = mount(LoadingOverlay)
    expect(wrapper.find('[role="status"]').exists()).toBe(true)
  })

  it('covers container with absolute positioning by default', () => {
    const wrapper = mount(LoadingOverlay)
    const classes = wrapper.find('[role="status"]').classes().join(' ')
    expect(classes).toContain('absolute')
    expect(classes).toContain('inset-0')
  })

  it('covers viewport with fixed positioning when fullscreen', () => {
    const wrapper = mount(LoadingOverlay, { props: { fullscreen: true } })
    const classes = wrapper.find('[role="status"]').classes().join(' ')
    expect(classes).toContain('fixed')
    expect(classes).toContain('inset-0')
  })

  it('merges custom classes', () => {
    const wrapper = mount(LoadingOverlay, { props: { class: 'overlay-custom' } })
    expect(wrapper.html()).toContain('overlay-custom')
  })
})
