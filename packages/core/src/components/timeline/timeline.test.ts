import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Timeline from './Timeline.vue'
import TimelineItem from './TimelineItem.vue'
import TimelineContent from './TimelineContent.vue'
import TimelineConnector from './TimelineConnector.vue'

describe('Timeline', () => {
  it('renders as a list', () => {
    const wrapper = mount(Timeline, {
      slots: { default: 'content' },
    })
    expect(wrapper.element.tagName).toBe('UL')
    expect(wrapper.attributes('role')).toBe('list')
  })

  it('merges custom classes', () => {
    const wrapper = mount(Timeline, {
      props: { class: 'custom-timeline' },
      slots: { default: 'content' },
    })
    expect(wrapper.classes()).toContain('custom-timeline')
  })
})

describe('TimelineItem', () => {
  it('renders with dot and content', () => {
    const wrapper = mount({
      components: { Timeline, TimelineItem },
      template: `
        <Timeline>
          <TimelineItem>Event happened</TimelineItem>
        </Timeline>
      `,
    })
    expect(wrapper.text()).toContain('Event happened')
  })

  it('renders date when provided', () => {
    const wrapper = mount({
      components: { Timeline, TimelineItem },
      template: `
        <Timeline>
          <TimelineItem date="Jan 2024">Event</TimelineItem>
        </Timeline>
      `,
    })
    expect(wrapper.text()).toContain('Jan 2024')
    expect(wrapper.find('time').exists()).toBe(true)
  })

  it('renders connector line', () => {
    const wrapper = mount({
      components: { Timeline, TimelineItem },
      template: `
        <Timeline>
          <TimelineItem>First</TimelineItem>
          <TimelineItem>Second</TimelineItem>
        </Timeline>
      `,
    })
    // Each item has a connector line (the w-px div)
    const connectors = wrapper.findAll('.bg-border')
    expect(connectors.length).toBeGreaterThan(0)
  })

  it('renders dot with default variant', () => {
    const wrapper = mount({
      components: { Timeline, TimelineItem },
      template: `
        <Timeline>
          <TimelineItem>Event</TimelineItem>
        </Timeline>
      `,
    })
    const dot = wrapper.find('.rounded-full')
    expect(dot.exists()).toBe(true)
    expect(dot.classes().join(' ')).toContain('bg-primary')
  })

  it('applies success variant to dot', () => {
    const wrapper = mount({
      components: { Timeline, TimelineItem },
      template: `
        <Timeline>
          <TimelineItem variant="success">Event</TimelineItem>
        </Timeline>
      `,
    })
    const dot = wrapper.find('.rounded-full')
    expect(dot.classes().join(' ')).toContain('bg-green-500')
  })

  it('applies warning variant to dot', () => {
    const wrapper = mount({
      components: { Timeline, TimelineItem },
      template: `
        <Timeline>
          <TimelineItem variant="warning">Event</TimelineItem>
        </Timeline>
      `,
    })
    const dot = wrapper.find('.rounded-full')
    expect(dot.classes().join(' ')).toContain('bg-yellow-500')
  })

  it('applies destructive variant to dot', () => {
    const wrapper = mount({
      components: { Timeline, TimelineItem },
      template: `
        <Timeline>
          <TimelineItem variant="destructive">Event</TimelineItem>
        </Timeline>
      `,
    })
    const dot = wrapper.find('.rounded-full')
    expect(dot.classes().join(' ')).toContain('bg-destructive')
  })

  it('renders with right layout', () => {
    const wrapper = mount({
      components: { Timeline, TimelineItem },
      template: `
        <Timeline layout="right">
          <TimelineItem>Event</TimelineItem>
        </Timeline>
      `,
    })
    const item = wrapper.find('li')
    expect(item.classes().join(' ')).toContain('flex-row-reverse')
  })

  it('renders with left layout by default', () => {
    const wrapper = mount({
      components: { Timeline, TimelineItem },
      template: `
        <Timeline>
          <TimelineItem>Event</TimelineItem>
        </Timeline>
      `,
    })
    const item = wrapper.find('li')
    expect(item.classes().join(' ')).not.toContain('flex-row-reverse')
  })

  it('renders custom icon via slot', () => {
    const wrapper = mount({
      components: { Timeline, TimelineItem },
      template: `
        <Timeline>
          <TimelineItem>
            <template #icon>
              <span class="custom-icon">!</span>
            </template>
            Event
          </TimelineItem>
        </Timeline>
      `,
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })
})

describe('TimelineContent', () => {
  it('renders content text', () => {
    const wrapper = mount(TimelineContent, {
      slots: { default: 'Some content' },
    })
    expect(wrapper.text()).toBe('Some content')
    expect(wrapper.classes().join(' ')).toContain('text-sm')
  })

  it('merges custom classes', () => {
    const wrapper = mount(TimelineContent, {
      props: { class: 'custom-content' },
      slots: { default: 'Content' },
    })
    expect(wrapper.classes()).toContain('custom-content')
  })
})

describe('TimelineConnector', () => {
  it('renders a vertical line', () => {
    const wrapper = mount(TimelineConnector)
    expect(wrapper.classes().join(' ')).toContain('bg-border')
    expect(wrapper.classes().join(' ')).toContain('w-px')
  })

  it('merges custom classes', () => {
    const wrapper = mount(TimelineConnector, {
      props: { class: 'custom-connector' },
    })
    expect(wrapper.classes()).toContain('custom-connector')
  })
})

describe('Timeline composition', () => {
  it('renders full timeline with multiple items', () => {
    const wrapper = mount({
      components: { Timeline, TimelineItem, TimelineContent },
      template: `
        <Timeline>
          <TimelineItem date="2024-01">
            <TimelineContent>First event</TimelineContent>
          </TimelineItem>
          <TimelineItem date="2024-02">
            <TimelineContent>Second event</TimelineContent>
          </TimelineItem>
          <TimelineItem date="2024-03">
            <TimelineContent>Third event</TimelineContent>
          </TimelineItem>
        </Timeline>
      `,
    })

    expect(wrapper.text()).toContain('First event')
    expect(wrapper.text()).toContain('Second event')
    expect(wrapper.text()).toContain('Third event')
    const items = wrapper.findAll('li')
    expect(items.length).toBe(3)
  })
})
