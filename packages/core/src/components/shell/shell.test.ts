import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppShell from './AppShell.vue'
import ShellHeader from './ShellHeader.vue'
import ShellSidebar from './ShellSidebar.vue'
import ShellMain from './ShellMain.vue'
import ShellFooter from './ShellFooter.vue'

function mountAppShell(includeSidebar = true) {
  return mount({
    components: { AppShell, ShellHeader, ShellSidebar, ShellMain, ShellFooter },
    template: includeSidebar
      ? `
        <AppShell>
          <ShellHeader>Header content</ShellHeader>
          <div class="flex flex-1 overflow-hidden">
            <ShellSidebar>Sidebar content</ShellSidebar>
            <ShellMain>Main content</ShellMain>
          </div>
          <ShellFooter>Footer content</ShellFooter>
        </AppShell>
      `
      : `
        <AppShell>
          <ShellHeader>Header content</ShellHeader>
          <ShellMain>Main content</ShellMain>
          <ShellFooter>Footer content</ShellFooter>
        </AppShell>
      `,
  })
}

describe('AppShell', () => {
  it('renders all sections (header, sidebar, main, footer)', () => {
    const wrapper = mountAppShell(true)
    expect(wrapper.text()).toContain('Header content')
    expect(wrapper.text()).toContain('Sidebar content')
    expect(wrapper.text()).toContain('Main content')
    expect(wrapper.text()).toContain('Footer content')
  })

  it('renders with full viewport height class', () => {
    const wrapper = mount(AppShell)
    expect(wrapper.classes()).toContain('h-screen')
  })

  it('has overflow-hidden class', () => {
    const wrapper = mount(AppShell)
    expect(wrapper.classes()).toContain('overflow-hidden')
  })

  it('renders without sidebar', () => {
    const wrapper = mountAppShell(false)
    expect(wrapper.text()).toContain('Header content')
    expect(wrapper.text()).toContain('Main content')
    expect(wrapper.text()).toContain('Footer content')
    expect(wrapper.find('aside').exists()).toBe(false)
  })

  it('merges custom class', () => {
    const wrapper = mount(AppShell, {
      props: { class: 'custom-shell' },
    })
    expect(wrapper.classes()).toContain('custom-shell')
  })
})

describe('ShellHeader', () => {
  it('renders as header element', () => {
    const wrapper = mount(ShellHeader, {
      slots: { default: 'Header' },
    })
    expect(wrapper.find('header').exists()).toBe(true)
  })

  it('renders with default height', () => {
    const wrapper = mount(ShellHeader)
    expect(wrapper.attributes('style')).toContain('height: 4rem')
  })

  it('renders with custom height', () => {
    const wrapper = mount(ShellHeader, {
      props: { height: '5rem' },
    })
    expect(wrapper.attributes('style')).toContain('height: 5rem')
  })

  it('is fixed at top via shrink-0 class', () => {
    const wrapper = mount(ShellHeader)
    expect(wrapper.classes()).toContain('shrink-0')
  })

  it('renders slot content', () => {
    const wrapper = mount(ShellHeader, {
      slots: { default: 'App Title' },
    })
    expect(wrapper.text()).toContain('App Title')
  })

  it('merges custom class', () => {
    const wrapper = mount(ShellHeader, {
      props: { class: 'custom-header' },
    })
    expect(wrapper.classes()).toContain('custom-header')
  })
})

describe('ShellSidebar', () => {
  it('renders as aside element', () => {
    const wrapper = mount(ShellSidebar, {
      slots: { default: 'Sidebar' },
    })
    expect(wrapper.find('aside').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(ShellSidebar, {
      slots: { default: 'Nav items' },
    })
    expect(wrapper.text()).toContain('Nav items')
  })

  it('merges custom class', () => {
    const wrapper = mount(ShellSidebar, {
      props: { class: 'custom-sidebar' },
    })
    expect(wrapper.classes()).toContain('custom-sidebar')
  })
})

describe('ShellMain', () => {
  it('renders as main element', () => {
    const wrapper = mount(ShellMain, {
      slots: { default: 'Content' },
    })
    expect(wrapper.find('main').exists()).toBe(true)
  })

  it('main area is scrollable (overflow-y-auto)', () => {
    const wrapper = mount(ShellMain)
    expect(wrapper.classes()).toContain('overflow-y-auto')
  })

  it('has flex-1 to take remaining space', () => {
    const wrapper = mount(ShellMain)
    expect(wrapper.classes()).toContain('flex-1')
  })

  it('renders slot content', () => {
    const wrapper = mount(ShellMain, {
      slots: { default: 'Page content' },
    })
    expect(wrapper.text()).toContain('Page content')
  })

  it('merges custom class', () => {
    const wrapper = mount(ShellMain, {
      props: { class: 'custom-main' },
    })
    expect(wrapper.classes()).toContain('custom-main')
  })
})

describe('ShellFooter', () => {
  it('renders as footer element', () => {
    const wrapper = mount(ShellFooter, {
      slots: { default: 'Footer' },
    })
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(ShellFooter, {
      slots: { default: 'Footer content' },
    })
    expect(wrapper.text()).toContain('Footer content')
  })

  it('merges custom class', () => {
    const wrapper = mount(ShellFooter, {
      props: { class: 'custom-footer' },
    })
    expect(wrapper.classes()).toContain('custom-footer')
  })

  it('has shrink-0 class to prevent shrinking', () => {
    const wrapper = mount(ShellFooter)
    expect(wrapper.classes()).toContain('shrink-0')
  })
})
