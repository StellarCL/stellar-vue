import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Card from './Card.vue'
import CardContent from './CardContent.vue'
import CardDescription from './CardDescription.vue'
import CardFooter from './CardFooter.vue'
import CardHeader from './CardHeader.vue'
import CardTitle from './CardTitle.vue'

describe('card', () => {
  it('renders Card with default variant classes', () => {
    const wrapper = mount(Card)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('rounded-lg')
    expect(classes).toContain('bg-card')
    expect(classes).toContain('text-card-foreground')
    expect(classes).toContain('shadow-soft')
  })

  it('applies bordered variant', () => {
    const wrapper = mount(Card, { props: { variant: 'bordered' } })
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('border-2')
    expect(classes).toContain('bg-card')
    expect(classes).toContain('text-card-foreground')
  })

  it('applies elevated variant', () => {
    const wrapper = mount(Card, { props: { variant: 'elevated' } })
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('shadow-lg')
    expect(classes).toContain('bg-card')
    expect(classes).toContain('text-card-foreground')
  })

  it('accepts custom class', () => {
    const wrapper = mount(Card, { props: { class: 'custom-card' } })
    expect(wrapper.classes()).toContain('custom-card')
  })

  it('renders slot content', () => {
    const wrapper = mount(Card, { slots: { default: 'Card content' } })
    expect(wrapper.text()).toBe('Card content')
  })
})

describe('cardTitle', () => {
  it('renders as h3 by default', () => {
    const wrapper = mount(CardTitle, { slots: { default: 'Title' } })
    expect(wrapper.element.tagName).toBe('H3')
  })

  it('renders as h1 when as="h1"', () => {
    const wrapper = mount(CardTitle, { props: { as: 'h1' }, slots: { default: 'Title' } })
    expect(wrapper.element.tagName).toBe('H1')
  })

  it('renders as h2 when as="h2"', () => {
    const wrapper = mount(CardTitle, { props: { as: 'h2' }, slots: { default: 'Title' } })
    expect(wrapper.element.tagName).toBe('H2')
  })

  it('applies correct classes', () => {
    const wrapper = mount(CardTitle, { slots: { default: 'Title' } })
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('text-base')
    expect(classes).toContain('font-semibold')
    expect(classes).toContain('leading-none')
    expect(classes).toContain('tracking-tight')
    expect(classes).toContain('text-foreground')
  })

  it('accepts custom class', () => {
    const wrapper = mount(CardTitle, { props: { class: 'custom-title' } })
    expect(wrapper.classes()).toContain('custom-title')
  })
})

describe('cardHeader', () => {
  it('renders slot content', () => {
    const wrapper = mount(CardHeader, { slots: { default: 'Header content' } })
    expect(wrapper.text()).toBe('Header content')
  })

  it('applies correct classes', () => {
    const wrapper = mount(CardHeader)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('flex')
    expect(classes).toContain('flex-col')
    expect(classes).toContain('p-6')
  })

  it('accepts custom class', () => {
    const wrapper = mount(CardHeader, { props: { class: 'custom-header' } })
    expect(wrapper.classes()).toContain('custom-header')
  })
})

describe('cardDescription', () => {
  it('renders text content', () => {
    const wrapper = mount(CardDescription, { slots: { default: 'A description' } })
    expect(wrapper.text()).toBe('A description')
  })

  it('renders as a <p> element', () => {
    const wrapper = mount(CardDescription)
    expect(wrapper.element.tagName).toBe('P')
  })

  it('applies correct classes', () => {
    const wrapper = mount(CardDescription)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('text-sm')
    expect(classes).toContain('text-muted-foreground')
  })

  it('accepts custom class', () => {
    const wrapper = mount(CardDescription, { props: { class: 'custom-desc' } })
    expect(wrapper.classes()).toContain('custom-desc')
  })
})

describe('cardContent', () => {
  it('renders slot content', () => {
    const wrapper = mount(CardContent, { slots: { default: 'Content body' } })
    expect(wrapper.text()).toBe('Content body')
  })

  it('applies correct classes', () => {
    const wrapper = mount(CardContent)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('p-6')
    expect(classes).toContain('pt-0')
  })

  it('accepts custom class', () => {
    const wrapper = mount(CardContent, { props: { class: 'custom-content' } })
    expect(wrapper.classes()).toContain('custom-content')
  })
})

describe('cardFooter', () => {
  it('renders slot content', () => {
    const wrapper = mount(CardFooter, { slots: { default: 'Footer content' } })
    expect(wrapper.text()).toBe('Footer content')
  })

  it('applies correct classes', () => {
    const wrapper = mount(CardFooter)
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('flex')
    expect(classes).toContain('items-center')
    expect(classes).toContain('p-6')
    expect(classes).toContain('pt-0')
  })

  it('accepts custom class', () => {
    const wrapper = mount(CardFooter, { props: { class: 'custom-footer' } })
    expect(wrapper.classes()).toContain('custom-footer')
  })
})

describe('card composition', () => {
  it('renders full Card composition with all sub-components', () => {
    const wrapper = mount({
      components: { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter },
      template: `
        <Card>
          <CardHeader>
            <CardTitle>My Card</CardTitle>
            <CardDescription>Card description text</CardDescription>
          </CardHeader>
          <CardContent>Main content here</CardContent>
          <CardFooter>Footer here</CardFooter>
        </Card>
      `,
    })

    expect(wrapper.text()).toContain('My Card')
    expect(wrapper.text()).toContain('Card description text')
    expect(wrapper.text()).toContain('Main content here')
    expect(wrapper.text()).toContain('Footer here')

    // Card root
    expect(wrapper.find('div').classes().join(' ')).toContain('rounded-lg')

    // CardTitle is an h3
    expect(wrapper.find('h3').exists()).toBe(true)
    expect(wrapper.find('h3').text()).toBe('My Card')

    // CardDescription is a p
    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.find('p').text()).toBe('Card description text')
  })
})
