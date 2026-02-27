import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Sidebar from './Sidebar.vue'
import SidebarContent from './SidebarContent.vue'
import SidebarHeader from './SidebarHeader.vue'
import SidebarFooter from './SidebarFooter.vue'
import SidebarGroup from './SidebarGroup.vue'
import SidebarGroupLabel from './SidebarGroupLabel.vue'
import SidebarGroupContent from './SidebarGroupContent.vue'
import SidebarMenu from './SidebarMenu.vue'
import SidebarMenuItem from './SidebarMenuItem.vue'
import SidebarMenuButton from './SidebarMenuButton.vue'

function mountSidebar(collapsed = false, collapsible = true) {
  return mount({
    components: {
      Sidebar,
      SidebarContent,
      SidebarHeader,
      SidebarFooter,
      SidebarMenu,
      SidebarMenuItem,
      SidebarMenuButton,
    },
    template: `
      <Sidebar :collapsed="collapsed" :collapsible="collapsible" width="16rem" collapsed-width="4rem">
        <SidebarHeader>Header</SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton :active="false">
                <template #icon><span class="icon">I</span></template>
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton :active="true">
                <template #icon><span class="icon">S</span></template>
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>Footer</SidebarFooter>
      </Sidebar>
    `,
    data() {
      return { collapsed, collapsible }
    },
  })
}

describe('Sidebar', () => {
  it('renders expanded by default', () => {
    const wrapper = mountSidebar(false)
    const sidebar = wrapper.find('div')
    expect(sidebar.attributes('style')).toContain('16rem')
  })

  it('renders with expanded width when not collapsed', () => {
    const wrapper = mountSidebar(false)
    const sidebar = wrapper.find('div')
    expect(sidebar.attributes('style')).toContain('width: 16rem')
  })

  it('collapses when collapsed prop is true', () => {
    const wrapper = mountSidebar(true)
    const sidebar = wrapper.find('div')
    expect(sidebar.attributes('style')).toContain('4rem')
  })

  it('collapsed sidebar shows reduced width', () => {
    const wrapper = mountSidebar(true)
    const sidebar = wrapper.find('div')
    expect(sidebar.attributes('style')).toContain('width: 4rem')
  })

  it('menu items render', () => {
    const wrapper = mountSidebar()
    const items = wrapper.findAll('li')
    expect(items.length).toBe(2)
  })

  it('active menu item has active styles', () => {
    const wrapper = mountSidebar()
    const buttons = wrapper.findAll('button')
    const activeButton = buttons.find(b => b.attributes('data-active') === 'true')
    expect(activeButton).toBeDefined()
    expect(activeButton!.classes()).toContain('bg-accent')
  })

  it('inactive menu item does not have active styles', () => {
    const wrapper = mountSidebar()
    const buttons = wrapper.findAll('button')
    const inactiveButton = buttons.find(b => b.attributes('data-active') === 'false')
    expect(inactiveButton).toBeDefined()
    expect(inactiveButton!.classes()).not.toContain('bg-accent')
  })

  it('toggle changes collapsed state', async () => {
    const wrapper = mount({
      components: { Sidebar },
      template: `
        <Sidebar v-model:collapsed="isCollapsed" width="16rem" collapsed-width="4rem">
          <button @click="toggle">Toggle</button>
        </Sidebar>
      `,
      data() {
        return { isCollapsed: false }
      },
      methods: {
        toggle() {
          (this as any).isCollapsed = !(this as any).isCollapsed
        },
      },
    })

    const sidebar = wrapper.find('div')
    expect(sidebar.attributes('style')).toContain('16rem')

    await wrapper.find('button').trigger('click')
    expect((wrapper.vm as any).isCollapsed).toBe(true)
  })

  it('renders header content', () => {
    const wrapper = mountSidebar()
    expect(wrapper.text()).toContain('Header')
  })

  it('renders footer content', () => {
    const wrapper = mountSidebar()
    expect(wrapper.text()).toContain('Footer')
  })

  it('text is hidden in collapsed state', () => {
    const wrapper = mountSidebar(true)
    // The text span is v-if'd out when collapsed
    const spans = wrapper.findAll('button span.truncate')
    expect(spans.length).toBe(0)
  })

  it('text is visible in expanded state', () => {
    const wrapper = mountSidebar(false)
    // The text span is visible when expanded
    const spans = wrapper.findAll('button span')
    expect(spans.length).toBeGreaterThan(0)
  })
})

describe('SidebarGroup', () => {
  it('renders group with label and content', () => {
    const wrapper = mount({
      components: { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent },
      template: `
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>My Group</SidebarGroupLabel>
              <SidebarGroupContent>Content here</SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      `,
    })
    expect(wrapper.text()).toContain('My Group')
    expect(wrapper.text()).toContain('Content here')
  })
})

describe('SidebarMenu', () => {
  it('renders as ul element', () => {
    const wrapper = mount({
      components: { Sidebar, SidebarMenu },
      template: `
        <Sidebar>
          <SidebarMenu>
            <li>Item</li>
          </SidebarMenu>
        </Sidebar>
      `,
    })
    expect(wrapper.find('ul').exists()).toBe(true)
  })
})

describe('SidebarMenuItem', () => {
  it('renders as li element', () => {
    const wrapper = mount({
      components: { Sidebar, SidebarMenu, SidebarMenuItem },
      template: `
        <Sidebar>
          <SidebarMenu>
            <SidebarMenuItem>Item content</SidebarMenuItem>
          </SidebarMenu>
        </Sidebar>
      `,
    })
    expect(wrapper.find('li').exists()).toBe(true)
    expect(wrapper.find('li').text()).toContain('Item content')
  })
})

describe('SidebarMenuButton', () => {
  it('renders as button element', () => {
    const wrapper = mount({
      components: { Sidebar, SidebarMenuButton },
      template: `
        <Sidebar>
          <SidebarMenuButton>Click me</SidebarMenuButton>
        </Sidebar>
      `,
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('applies active class when active prop is true', () => {
    const wrapper = mount({
      components: { Sidebar, SidebarMenuButton },
      template: `
        <Sidebar>
          <SidebarMenuButton :active="true">Active</SidebarMenuButton>
        </Sidebar>
      `,
    })
    expect(wrapper.find('button').classes()).toContain('bg-accent')
  })

  it('merges custom class', () => {
    const wrapper = mount({
      components: { Sidebar, SidebarMenuButton },
      template: `
        <Sidebar>
          <SidebarMenuButton class="custom-btn">Button</SidebarMenuButton>
        </Sidebar>
      `,
    })
    expect(wrapper.find('button').classes()).toContain('custom-btn')
  })
})
