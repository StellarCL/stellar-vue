import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Accordion from './Accordion.vue'
import AccordionItem from './AccordionItem.vue'
import AccordionTrigger from './AccordionTrigger.vue'
import AccordionContent from './AccordionContent.vue'

describe('Accordion', () => {
  it('renders with AccordionItem children', () => {
    const wrapper = mount({
      components: { Accordion, AccordionItem },
      template: `
        <Accordion type="single">
          <AccordionItem value="item-1">Item 1</AccordionItem>
        </Accordion>
      `,
    })
    expect(wrapper.text()).toContain('Item 1')
  })

  it('merges custom class on Accordion', () => {
    const wrapper = mount({
      components: { Accordion, AccordionItem },
      template: `
        <Accordion type="single" class="custom-accordion">
          <AccordionItem value="item-1">Item</AccordionItem>
        </Accordion>
      `,
    })
    expect(wrapper.html()).toContain('custom-accordion')
  })
})

describe('AccordionItem', () => {
  it('has border-b class', () => {
    const wrapper = mount({
      components: { Accordion, AccordionItem },
      template: `
        <Accordion type="single">
          <AccordionItem value="item-1">Item</AccordionItem>
        </Accordion>
      `,
    })
    // Radix Vue AccordionItem renders as a div with data-state attribute
    const item = wrapper.find('[data-state]')
    expect(item.classes().join(' ')).toContain('border-b')
  })

  it('merges custom class on AccordionItem', () => {
    const wrapper = mount({
      components: { Accordion, AccordionItem },
      template: `
        <Accordion type="single">
          <AccordionItem value="item-1" class="custom-item">Item</AccordionItem>
        </Accordion>
      `,
    })
    expect(wrapper.html()).toContain('custom-item')
  })
})

describe('AccordionTrigger', () => {
  it('renders text content', () => {
    const wrapper = mount({
      components: { Accordion, AccordionItem, AccordionTrigger },
      template: `
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger Text</AccordionTrigger>
          </AccordionItem>
        </Accordion>
      `,
    })
    expect(wrapper.text()).toContain('Trigger Text')
  })

  it('renders chevron SVG icon', () => {
    const wrapper = mount({
      components: { Accordion, AccordionItem, AccordionTrigger },
      template: `
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>Click me</AccordionTrigger>
          </AccordionItem>
        </Accordion>
      `,
    })
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('polyline').exists()).toBe(true)
  })

  it('has hover:underline class on trigger button', () => {
    const wrapper = mount({
      components: { Accordion, AccordionItem, AccordionTrigger },
      template: `
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger</AccordionTrigger>
          </AccordionItem>
        </Accordion>
      `,
    })
    const trigger = wrapper.find('button')
    expect(trigger.classes().join(' ')).toContain('hover:underline')
  })

  it('merges custom class on AccordionTrigger', () => {
    const wrapper = mount({
      components: { Accordion, AccordionItem, AccordionTrigger },
      template: `
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger class="custom-trigger">Trigger</AccordionTrigger>
          </AccordionItem>
        </Accordion>
      `,
    })
    expect(wrapper.html()).toContain('custom-trigger')
  })
})

describe('AccordionContent', () => {
  it('has animation classes', () => {
    const wrapper = mount({
      components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
      template: `
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger</AccordionTrigger>
            <AccordionContent>Content here</AccordionContent>
          </AccordionItem>
        </Accordion>
      `,
    })
    // AccordionContent renders as a div with role="region"
    const content = wrapper.find('[role="region"]')
    const classes = content.classes().join(' ')
    expect(classes).toContain('overflow-hidden')
    expect(classes).toContain('text-sm')
    expect(classes).toContain('transition-all')
  })

  it('merges custom class on AccordionContent', () => {
    const wrapper = mount({
      components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
      template: `
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>Trigger</AccordionTrigger>
            <AccordionContent class="custom-content">Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      `,
    })
    expect(wrapper.html()).toContain('custom-content')
  })
})

describe('Accordion composition', () => {
  it('renders full Accordion composition with items, triggers, and content', () => {
    const wrapper = mount({
      components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
      template: `
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Section One</AccordionTrigger>
            <AccordionContent>Content for section one</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Section Two</AccordionTrigger>
            <AccordionContent>Content for section two</AccordionContent>
          </AccordionItem>
        </Accordion>
      `,
    })

    expect(wrapper.text()).toContain('Section One')
    expect(wrapper.text()).toContain('Section Two')

    // Each AccordionItem has border-b class
    const items = wrapper.findAll('.border-b')
    expect(items.length).toBe(2)

    const triggers = wrapper.findAll('button')
    expect(triggers.length).toBe(2)
    triggers.forEach((trigger) => {
      expect(trigger.classes().join(' ')).toContain('hover:underline')
    })

    const svgs = wrapper.findAll('svg')
    expect(svgs.length).toBe(2)
  })
})
