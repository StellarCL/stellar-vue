import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import EmptyState from './EmptyState.vue'
import EmptyStateAction from './EmptyStateAction.vue'
import EmptyStateDescription from './EmptyStateDescription.vue'
import EmptyStateIcon from './EmptyStateIcon.vue'
import EmptyStateTitle from './EmptyStateTitle.vue'

describe('emptyState', () => {
  it('renders centered container', () => {
    const wrapper = mount(EmptyState, {
      slots: { default: 'content' },
    })
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('flex')
    expect(classes).toContain('flex-col')
    expect(classes).toContain('items-center')
    expect(classes).toContain('justify-center')
    expect(classes).toContain('text-center')
  })

  it('renders slot content', () => {
    const wrapper = mount(EmptyState, {
      slots: { default: 'Empty state content' },
    })
    expect(wrapper.text()).toBe('Empty state content')
  })

  it('merges custom classes', () => {
    const wrapper = mount(EmptyState, {
      props: { class: 'custom-empty' },
      slots: { default: 'content' },
    })
    expect(wrapper.classes()).toContain('custom-empty')
  })
})

describe('emptyStateIcon', () => {
  it('renders icon container', () => {
    const wrapper = mount(EmptyStateIcon, {
      slots: { default: '<svg></svg>' },
    })
    const classes = wrapper.classes().join(' ')
    expect(classes).toContain('rounded-full')
    expect(classes).toContain('bg-muted')
    expect(classes).toContain('mb-4')
  })

  it('merges custom classes', () => {
    const wrapper = mount(EmptyStateIcon, {
      props: { class: 'custom-icon' },
      slots: { default: '<svg></svg>' },
    })
    expect(wrapper.classes()).toContain('custom-icon')
  })
})

describe('emptyStateTitle', () => {
  it('renders as h3 heading', () => {
    const wrapper = mount(EmptyStateTitle, {
      slots: { default: 'No results' },
    })
    expect(wrapper.element.tagName).toBe('H3')
    expect(wrapper.text()).toBe('No results')
  })

  it('has font-semibold class', () => {
    const wrapper = mount(EmptyStateTitle, {
      slots: { default: 'Title' },
    })
    expect(wrapper.classes().join(' ')).toContain('font-semibold')
  })

  it('merges custom classes', () => {
    const wrapper = mount(EmptyStateTitle, {
      props: { class: 'custom-title' },
      slots: { default: 'Title' },
    })
    expect(wrapper.classes()).toContain('custom-title')
  })
})

describe('emptyStateDescription', () => {
  it('renders as paragraph', () => {
    const wrapper = mount(EmptyStateDescription, {
      slots: { default: 'Try adjusting your search' },
    })
    expect(wrapper.element.tagName).toBe('P')
    expect(wrapper.text()).toBe('Try adjusting your search')
  })

  it('has muted text color', () => {
    const wrapper = mount(EmptyStateDescription, {
      slots: { default: 'Description' },
    })
    expect(wrapper.classes().join(' ')).toContain('text-muted-foreground')
  })

  it('merges custom classes', () => {
    const wrapper = mount(EmptyStateDescription, {
      props: { class: 'custom-desc' },
      slots: { default: 'Desc' },
    })
    expect(wrapper.classes()).toContain('custom-desc')
  })
})

describe('emptyStateAction', () => {
  it('renders action area', () => {
    const wrapper = mount(EmptyStateAction, {
      slots: { default: '<button>Action</button>' },
    })
    expect(wrapper.text()).toBe('Action')
    expect(wrapper.classes().join(' ')).toContain('flex')
  })

  it('merges custom classes', () => {
    const wrapper = mount(EmptyStateAction, {
      props: { class: 'custom-action' },
      slots: { default: '<button>Go</button>' },
    })
    expect(wrapper.classes()).toContain('custom-action')
  })
})

describe('emptyState composition', () => {
  it('renders full composition', () => {
    const wrapper = mount({
      components: { EmptyState, EmptyStateIcon, EmptyStateTitle, EmptyStateDescription, EmptyStateAction },
      template: `
        <EmptyState>
          <EmptyStateIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
          </EmptyStateIcon>
          <EmptyStateTitle>No items found</EmptyStateTitle>
          <EmptyStateDescription>Try adding some items to get started.</EmptyStateDescription>
          <EmptyStateAction>
            <button>Add item</button>
          </EmptyStateAction>
        </EmptyState>
      `,
    })

    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.text()).toContain('No items found')
    expect(wrapper.text()).toContain('Try adding some items')
    expect(wrapper.text()).toContain('Add item')
    expect(wrapper.find('h3').exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })
})
