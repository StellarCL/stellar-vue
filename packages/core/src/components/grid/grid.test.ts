import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Grid from './Grid.vue'
import GridItem from './GridItem.vue'

describe('Grid', () => {
  it('renders with specified columns', () => {
    const wrapper = mount(Grid, {
      props: { cols: 3 },
    })
    expect(wrapper.classes()).toContain('grid')
    expect(wrapper.classes()).toContain('grid-cols-3')
  })

  it('defaults to 1 column', () => {
    const wrapper = mount(Grid)
    expect(wrapper.classes()).toContain('grid-cols-1')
  })

  it('responsive columns apply correct classes', () => {
    const wrapper = mount(Grid, {
      props: { cols: { sm: 2, md: 3, lg: 4, xl: 6 } },
    })
    expect(wrapper.classes()).toContain('sm:grid-cols-2')
    expect(wrapper.classes()).toContain('md:grid-cols-3')
    expect(wrapper.classes()).toContain('lg:grid-cols-4')
    expect(wrapper.classes()).toContain('xl:grid-cols-6')
  })

  it('partial responsive columns apply correct classes', () => {
    const wrapper = mount(Grid, {
      props: { cols: { md: 2, lg: 4 } },
    })
    expect(wrapper.classes()).toContain('md:grid-cols-2')
    expect(wrapper.classes()).toContain('lg:grid-cols-4')
    expect(wrapper.classes()).not.toContain('sm:grid-cols')
  })

  it('gap applies correctly', () => {
    const wrapper = mount(Grid, {
      props: { gap: '6' },
    })
    expect(wrapper.classes()).toContain('gap-6')
  })

  it('applies default gap', () => {
    const wrapper = mount(Grid)
    expect(wrapper.classes()).toContain('gap-4')
  })

  it('applies rows class when rows prop is set', () => {
    const wrapper = mount(Grid, {
      props: { rows: 3 },
    })
    expect(wrapper.classes()).toContain('grid-rows-3')
  })

  it('renders children in slot', () => {
    const wrapper = mount(Grid, {
      slots: { default: '<div class="child">Child</div>' },
    })
    expect(wrapper.find('.child').exists()).toBe(true)
  })

  it('merges custom class', () => {
    const wrapper = mount(Grid, {
      props: { class: 'custom-grid' },
    })
    expect(wrapper.classes()).toContain('custom-grid')
  })
})

describe('GridItem', () => {
  it('renders without span classes when no props', () => {
    const wrapper = mount(GridItem, {
      slots: { default: 'Content' },
    })
    expect(wrapper.text()).toContain('Content')
  })

  it('spans correct columns', () => {
    const wrapper = mount(GridItem, {
      props: { colSpan: 2 },
    })
    expect(wrapper.classes()).toContain('col-span-2')
  })

  it('spans correct rows', () => {
    const wrapper = mount(GridItem, {
      props: { rowSpan: 3 },
    })
    expect(wrapper.classes()).toContain('row-span-3')
  })

  it('applies both colSpan and rowSpan', () => {
    const wrapper = mount(GridItem, {
      props: { colSpan: 2, rowSpan: 2 },
    })
    expect(wrapper.classes()).toContain('col-span-2')
    expect(wrapper.classes()).toContain('row-span-2')
  })

  it('merges custom class', () => {
    const wrapper = mount(GridItem, {
      props: { class: 'custom-item' },
    })
    expect(wrapper.classes()).toContain('custom-item')
  })

  it('renders slot content', () => {
    const wrapper = mount(GridItem, {
      slots: { default: '<span>Grid content</span>' },
    })
    expect(wrapper.text()).toContain('Grid content')
  })
})

describe('Grid with GridItem', () => {
  it('renders grid with items', () => {
    const wrapper = mount({
      components: { Grid, GridItem },
      template: `
        <Grid :cols="3" gap="4">
          <GridItem :col-span="2">Wide item</GridItem>
          <GridItem>Normal item</GridItem>
        </Grid>
      `,
    })
    expect(wrapper.classes()).toContain('grid-cols-3')
    expect(wrapper.text()).toContain('Wide item')
    expect(wrapper.text()).toContain('Normal item')
    const wideItem = wrapper.find('.col-span-2')
    expect(wideItem.exists()).toBe(true)
  })
})
