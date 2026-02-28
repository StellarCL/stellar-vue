import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import Carousel from './Carousel.vue'
import CarouselContent from './CarouselContent.vue'
import CarouselItem from './CarouselItem.vue'
import CarouselNext from './CarouselNext.vue'
import CarouselPrevious from './CarouselPrevious.vue'

describe('carousel', () => {
  it('renders with region role', () => {
    const wrapper = mount(Carousel, {
      slots: { default: 'slides' },
    })
    expect(wrapper.find('[role="region"]').exists()).toBe(true)
    expect(wrapper.find('[aria-roledescription="carousel"]').exists()).toBe(true)
  })

  it('merges custom classes', () => {
    const wrapper = mount(Carousel, {
      props: { class: 'custom-carousel' },
      slots: { default: 'slides' },
    })
    expect(wrapper.find('[role="region"]').classes()).toContain('custom-carousel')
  })
})

describe('carousel with slides', () => {
  async function createCarousel(props = {}) {
    const wrapper = mount({
      components: { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext },
      template: `
        <Carousel v-bind="carouselProps">
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
            <CarouselItem>Slide 2</CarouselItem>
            <CarouselItem>Slide 3</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      `,
      data() {
        return { carouselProps: props }
      },
    })
    await nextTick()
    return wrapper
  }

  it('renders slides', async () => {
    const wrapper = await createCarousel()
    expect(wrapper.text()).toContain('Slide 1')
    expect(wrapper.text()).toContain('Slide 2')
    expect(wrapper.text()).toContain('Slide 3')
  })

  it('renders slide items with correct role', async () => {
    const wrapper = await createCarousel()
    const slides = wrapper.findAll('[role="group"]')
    expect(slides.length).toBe(3)
    expect(slides[0].attributes('aria-roledescription')).toBe('slide')
  })

  it('renders prev/next buttons', async () => {
    const wrapper = await createCarousel()
    expect(wrapper.find('[aria-label="Previous slide"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Next slide"]').exists()).toBe(true)
  })

  it('disables previous button on first slide by default', async () => {
    const wrapper = await createCarousel()
    const prevButton = wrapper.find('[aria-label="Previous slide"]')
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('navigates to next slide on next click', async () => {
    const wrapper = await createCarousel()
    const nextButton = wrapper.find('[aria-label="Next slide"]')
    await nextButton.trigger('click')
    await nextTick()
    const content = wrapper.find('.transition-transform')
    expect(content.attributes('style')).toContain('translateX(-100%)')
  })

  it('navigates back on previous click', async () => {
    const wrapper = await createCarousel()
    const nextButton = wrapper.find('[aria-label="Next slide"]')
    const prevButton = wrapper.find('[aria-label="Previous slide"]')
    await nextButton.trigger('click')
    await nextTick()
    await prevButton.trigger('click')
    await nextTick()
    const content = wrapper.find('.transition-transform')
    expect(content.attributes('style')).toContain('translateX(0%)')
  })

  it('disables next button on last slide without loop', async () => {
    const wrapper = await createCarousel()
    const nextButton = wrapper.find('[aria-label="Next slide"]')
    await nextButton.trigger('click')
    await nextTick()
    await nextButton.trigger('click')
    await nextTick()
    // Now on last slide
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('loops from last to first when loop enabled', async () => {
    const wrapper = await createCarousel({ loop: true })
    const nextButton = wrapper.find('[aria-label="Next slide"]')
    await nextButton.trigger('click')
    await nextTick()
    await nextButton.trigger('click')
    await nextTick()
    await nextButton.trigger('click')
    await nextTick()
    // Should loop back to first
    const content = wrapper.find('.transition-transform')
    expect(content.attributes('style')).toContain('translateX(0%)')
  })

  it('renders dot indicators', async () => {
    const wrapper = await createCarousel()
    const dots = wrapper.findAll('[role="tab"]')
    expect(dots.length).toBe(3)
  })

  it('clicking dot indicator navigates to slide', async () => {
    const wrapper = await createCarousel()
    const dots = wrapper.findAll('[role="tab"]')
    await dots[2].trigger('click')
    await nextTick()
    const content = wrapper.find('.transition-transform')
    expect(content.attributes('style')).toContain('translateX(-200%)')
  })
})

describe('carousel auto-play', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('auto-advances slides with autoPlay', async () => {
    const wrapper = mount({
      components: { Carousel, CarouselContent, CarouselItem },
      template: `
        <Carousel :auto-play="true" :auto-play-interval="1000">
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
            <CarouselItem>Slide 2</CarouselItem>
            <CarouselItem>Slide 3</CarouselItem>
          </CarouselContent>
        </Carousel>
      `,
    })

    await nextTick()
    const content = wrapper.find('.transition-transform')
    expect(content.attributes('style')).toContain('translateX(0%)')

    vi.advanceTimersByTime(1000)
    await nextTick()
    expect(content.attributes('style')).toContain('translateX(-100%)')

    vi.advanceTimersByTime(1000)
    await nextTick()
    expect(content.attributes('style')).toContain('translateX(-200%)')
  })
})
