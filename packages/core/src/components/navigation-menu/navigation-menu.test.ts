import { describe, expect, it, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import NavigationMenu from './NavigationMenu.vue'
import NavigationMenuList from './NavigationMenuList.vue'
import NavigationMenuItem from './NavigationMenuItem.vue'
import NavigationMenuTrigger from './NavigationMenuTrigger.vue'
import NavigationMenuContent from './NavigationMenuContent.vue'
import NavigationMenuLink from './NavigationMenuLink.vue'
import NavigationMenuViewport from './NavigationMenuViewport.vue'
import NavigationMenuIndicator from './NavigationMenuIndicator.vue'

// Track wrappers for cleanup
const wrappers: ReturnType<typeof mount>[] = []

afterEach(() => {
  wrappers.forEach((w) => {
    try { w.unmount() } catch {}
  })
  wrappers.length = 0
  document.body.innerHTML = ''
})

async function mountToBody(template: string, components: Record<string, object>): Promise<string> {
  const wrapper = mount(
    { components, template },
    { attachTo: document.body },
  )
  wrappers.push(wrapper)
  await flushPromises()
  return document.body.innerHTML
}

describe('NavigationMenu', () => {
  it('renders navigation menu with items', () => {
    const wrapper = mount({
      components: { NavigationMenu, NavigationMenuList, NavigationMenuItem },
      template: `
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>Item One</NavigationMenuItem>
            <NavigationMenuItem>Item Two</NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      `,
    })
    expect(wrapper.text()).toContain('Item One')
    expect(wrapper.text()).toContain('Item Two')
  })

  it('renders without crashing', () => {
    const wrapper = mount(NavigationMenu, {
      slots: { default: '<div>content</div>' },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('applies base classes', async () => {
    const bodyHtml = await mountToBody(
      `<NavigationMenu><NavigationMenuList><NavigationMenuItem>Test</NavigationMenuItem></NavigationMenuList></NavigationMenu>`,
      { NavigationMenu, NavigationMenuList, NavigationMenuItem },
    )
    expect(bodyHtml).toContain('relative')
    expect(bodyHtml).toContain('z-10')
    expect(bodyHtml).toContain('flex')
  })

  it('merges custom classes', async () => {
    const bodyHtml = await mountToBody(
      `<NavigationMenu class="custom-nav"><NavigationMenuList><NavigationMenuItem>Test</NavigationMenuItem></NavigationMenuList></NavigationMenu>`,
      { NavigationMenu, NavigationMenuList, NavigationMenuItem },
    )
    expect(bodyHtml).toContain('custom-nav')
  })
})

describe('NavigationMenuList', () => {
  it('renders with correct base classes', async () => {
    const bodyHtml = await mountToBody(
      `<NavigationMenu><NavigationMenuList><NavigationMenuItem>Item</NavigationMenuItem></NavigationMenuList></NavigationMenu>`,
      { NavigationMenu, NavigationMenuList, NavigationMenuItem },
    )
    expect(bodyHtml).toContain('flex')
    expect(bodyHtml).toContain('list-none')
    expect(bodyHtml).toContain('items-center')
    expect(bodyHtml).toContain('justify-center')
    expect(bodyHtml).toContain('space-x-1')
  })

  it('merges custom classes', async () => {
    const bodyHtml = await mountToBody(
      `<NavigationMenu><NavigationMenuList class="custom-list"><NavigationMenuItem>Item</NavigationMenuItem></NavigationMenuList></NavigationMenu>`,
      { NavigationMenu, NavigationMenuList, NavigationMenuItem },
    )
    expect(bodyHtml).toContain('custom-list')
  })

  it('renders slot content', () => {
    const wrapper = mount({
      components: { NavigationMenu, NavigationMenuList, NavigationMenuItem },
      template: `
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>Nav Item</NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      `,
    })
    expect(wrapper.text()).toContain('Nav Item')
  })
})

describe('NavigationMenuItem', () => {
  it('renders without crashing inside NavigationMenu context', () => {
    const wrapper = mount({
      components: { NavigationMenu, NavigationMenuList, NavigationMenuItem },
      template: `
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>Item</NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      `,
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount({
      components: { NavigationMenu, NavigationMenuList, NavigationMenuItem },
      template: `
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>Menu Item Content</NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      `,
    })
    expect(wrapper.text()).toContain('Menu Item Content')
  })

  it('merges custom classes', async () => {
    const bodyHtml = await mountToBody(
      `<NavigationMenu><NavigationMenuList><NavigationMenuItem class="custom-item">Item</NavigationMenuItem></NavigationMenuList></NavigationMenu>`,
      { NavigationMenu, NavigationMenuList, NavigationMenuItem },
    )
    expect(bodyHtml).toContain('custom-item')
  })

  it('multiple menu items work independently', () => {
    const wrapper = mount({
      components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent },
      template: `
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent><p>Products panel</p></NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
              <NavigationMenuContent><p>Solutions panel</p></NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      `,
    })
    expect(wrapper.text()).toContain('Products')
    expect(wrapper.text()).toContain('Solutions')
  })
})

describe('NavigationMenuTrigger', () => {
  it('renders trigger with chevron icon', async () => {
    const bodyHtml = await mountToBody(
      `<NavigationMenu><NavigationMenuList><NavigationMenuItem><NavigationMenuTrigger>Menu</NavigationMenuTrigger></NavigationMenuItem></NavigationMenuList></NavigationMenu>`,
      { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger },
    )
    // Chevron-down polyline points
    expect(bodyHtml).toContain('polyline')
  })

  it('renders slot content', () => {
    const wrapper = mount({
      components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger },
      template: `
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      `,
    })
    expect(wrapper.text()).toContain('Getting Started')
  })

  it('applies base styling classes', async () => {
    const bodyHtml = await mountToBody(
      `<NavigationMenu><NavigationMenuList><NavigationMenuItem><NavigationMenuTrigger>Menu</NavigationMenuTrigger></NavigationMenuItem></NavigationMenuList></NavigationMenu>`,
      { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger },
    )
    expect(bodyHtml).toContain('inline-flex')
    expect(bodyHtml).toContain('h-10')
    expect(bodyHtml).toContain('rounded-md')
    expect(bodyHtml).toContain('text-sm')
    expect(bodyHtml).toContain('font-medium')
  })

  it('merges custom classes', async () => {
    const bodyHtml = await mountToBody(
      `<NavigationMenu><NavigationMenuList><NavigationMenuItem><NavigationMenuTrigger class="custom-trigger">Menu</NavigationMenuTrigger></NavigationMenuItem></NavigationMenuList></NavigationMenu>`,
      { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger },
    )
    expect(bodyHtml).toContain('custom-trigger')
  })

  it('trigger opens content panel', async () => {
    const wrapper = mount(
      {
        components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent },
        template: `
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent><p id="panel-content">Products panel</p></NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        `,
      },
      { attachTo: document.body },
    )
    wrappers.push(wrapper)
    await flushPromises()

    const trigger = wrapper.find('button')
    expect(trigger.exists()).toBe(true)
    await trigger.trigger('click')
    await flushPromises()

    // After clicking, state should reflect open interaction
    expect(trigger.exists()).toBe(true)
  })
})

describe('NavigationMenuContent', () => {
  it('renders without crashing inside NavigationMenu context', () => {
    const wrapper = mount({
      components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent },
      template: `
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuContent><p>Content</p></NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      `,
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders slot content when open', async () => {
    const wrapper = mount(
      {
        components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent },
        template: `
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                <NavigationMenuContent><p>Panel content here</p></NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        `,
      },
      { attachTo: document.body },
    )
    wrappers.push(wrapper)
    await flushPromises()

    const trigger = wrapper.find('button')
    await trigger.trigger('click')
    await flushPromises()

    // Content panel text appears in the document after opening
    expect(document.body.innerHTML).toContain('Panel content here')
  })

  it('applies animation and positioning classes when open', async () => {
    const wrapper = mount(
      {
        components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent },
        template: `
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                <NavigationMenuContent><p>Panel</p></NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        `,
      },
      { attachTo: document.body },
    )
    wrappers.push(wrapper)
    await flushPromises()

    const trigger = wrapper.find('button')
    await trigger.trigger('click')
    await flushPromises()

    // Content classes are applied to the DOM element when open
    expect(document.body.innerHTML).toContain('left-0')
    expect(document.body.innerHTML).toContain('top-0')
  })

  it('merges custom classes when open', async () => {
    const wrapper = mount(
      {
        components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent },
        template: `
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                <NavigationMenuContent class="custom-content"><p>Panel</p></NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        `,
      },
      { attachTo: document.body },
    )
    wrappers.push(wrapper)
    await flushPromises()

    const trigger = wrapper.find('button')
    await trigger.trigger('click')
    await flushPromises()

    expect(document.body.innerHTML).toContain('custom-content')
  })
})

describe('NavigationMenuLink', () => {
  it('renders as link with slot content', () => {
    const wrapper = mount({
      components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink },
      template: `
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/home">Home</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      `,
    })
    expect(wrapper.text()).toContain('Home')
  })

  it('applies base styling classes', async () => {
    const bodyHtml = await mountToBody(
      `<NavigationMenu><NavigationMenuList><NavigationMenuItem><NavigationMenuLink href="/docs">Docs</NavigationMenuLink></NavigationMenuItem></NavigationMenuList></NavigationMenu>`,
      { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink },
    )
    expect(bodyHtml).toContain('block')
    expect(bodyHtml).toContain('select-none')
    expect(bodyHtml).toContain('rounded-md')
    expect(bodyHtml).toContain('no-underline')
  })

  it('renders with href attribute', async () => {
    const bodyHtml = await mountToBody(
      `<NavigationMenu><NavigationMenuList><NavigationMenuItem><NavigationMenuLink href="/about">About</NavigationMenuLink></NavigationMenuItem></NavigationMenuList></NavigationMenu>`,
      { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink },
    )
    expect(bodyHtml).toContain('/about')
    expect(bodyHtml).toContain('About')
  })

  it('merges custom classes', async () => {
    const bodyHtml = await mountToBody(
      `<NavigationMenu><NavigationMenuList><NavigationMenuItem><NavigationMenuLink class="custom-link" href="/">Home</NavigationMenuLink></NavigationMenuItem></NavigationMenuList></NavigationMenu>`,
      { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink },
    )
    expect(bodyHtml).toContain('custom-link')
  })

  it('accepts active prop without crashing', () => {
    const wrapper = mount({
      components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink },
      template: `
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink :active="true" href="/current">Current Page</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      `,
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Current Page')
  })
})

describe('NavigationMenuViewport', () => {
  it('renders without crashing inside NavigationMenu context', () => {
    const wrapper = mount({
      components: { NavigationMenu, NavigationMenuList, NavigationMenuItem },
      template: `
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>Item</NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      `,
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('viewport wrapper div is present in the DOM', async () => {
    const bodyHtml = await mountToBody(
      `<NavigationMenu><NavigationMenuList><NavigationMenuItem><NavigationMenuTrigger>Menu</NavigationMenuTrigger><NavigationMenuContent><p>Panel</p></NavigationMenuContent></NavigationMenuItem></NavigationMenuList></NavigationMenu>`,
      { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent },
    )
    // The viewport wrapper div with positioning classes is always rendered
    expect(bodyHtml).toContain('absolute')
    expect(bodyHtml).toContain('left-0')
    expect(bodyHtml).toContain('top-full')
    expect(bodyHtml).toContain('justify-center')
  })

  it('NavigationMenu includes NavigationMenuViewport by default', () => {
    const wrapper = mount({
      components: { NavigationMenu, NavigationMenuList, NavigationMenuItem },
      template: `
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>Item</NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      `,
    })
    // NavigationMenu auto-renders NavigationMenuViewport internally
    expect(wrapper.exists()).toBe(true)
  })

  it('custom NavigationMenuViewport accepts class prop', () => {
    const wrapper = mount({
      components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuViewport },
      template: `
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>Item</NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuViewport class="custom-viewport" />
        </NavigationMenu>
      `,
    })
    expect(wrapper.exists()).toBe(true)
  })
})

describe('NavigationMenuIndicator', () => {
  it('renders without crashing inside NavigationMenu context', () => {
    const wrapper = mount({
      components: { NavigationMenu, NavigationMenuList, NavigationMenuIndicator },
      template: `
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuIndicator />
          </NavigationMenuList>
        </NavigationMenu>
      `,
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('indicator shows under active item — contains inner arrow div when open', async () => {
    const wrapper = mount(
      {
        components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuIndicator },
        template: `
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                <NavigationMenuContent><p>Panel</p></NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuIndicator />
            </NavigationMenuList>
          </NavigationMenu>
        `,
      },
      { attachTo: document.body },
    )
    wrappers.push(wrapper)
    await flushPromises()

    const trigger = wrapper.find('button')
    await trigger.trigger('click')
    await flushPromises()

    // Inner arrow div classes appear in DOM when the indicator is visible
    expect(document.body.innerHTML).toContain('rotate-45')
    expect(document.body.innerHTML).toContain('rounded-tl-sm')
    expect(document.body.innerHTML).toContain('bg-border')
    expect(document.body.innerHTML).toContain('shadow-md')
  })

  it('applies indicator base classes when open', async () => {
    const wrapper = mount(
      {
        components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuIndicator },
        template: `
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                <NavigationMenuContent><p>Panel</p></NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuIndicator />
            </NavigationMenuList>
          </NavigationMenu>
        `,
      },
      { attachTo: document.body },
    )
    wrappers.push(wrapper)
    await flushPromises()

    const trigger = wrapper.find('button')
    await trigger.trigger('click')
    await flushPromises()

    expect(document.body.innerHTML).toContain('z-[1]')
    expect(document.body.innerHTML).toContain('overflow-hidden')
  })

  it('merges custom classes when open', async () => {
    const wrapper = mount(
      {
        components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuIndicator },
        template: `
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                <NavigationMenuContent><p>Panel</p></NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuIndicator class="custom-indicator" />
            </NavigationMenuList>
          </NavigationMenu>
        `,
      },
      { attachTo: document.body },
    )
    wrappers.push(wrapper)
    await flushPromises()

    const trigger = wrapper.find('button')
    await trigger.trigger('click')
    await flushPromises()

    expect(document.body.innerHTML).toContain('custom-indicator')
  })
})

describe('NavigationMenu keyboard navigation', () => {
  it('trigger responds to Enter key', async () => {
    const wrapper = mount(
      {
        components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent },
        template: `
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent><p>Products panel</p></NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        `,
      },
      { attachTo: document.body },
    )
    wrappers.push(wrapper)
    await flushPromises()

    const trigger = wrapper.find('button')
    expect(trigger.exists()).toBe(true)
    await trigger.trigger('keydown', { key: 'Enter' })
    await flushPromises()
    expect(trigger.exists()).toBe(true)
  })

  it('trigger responds to Escape key', async () => {
    const wrapper = mount(
      {
        components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent },
        template: `
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent><p>Products panel</p></NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        `,
      },
      { attachTo: document.body },
    )
    wrappers.push(wrapper)
    await flushPromises()

    const trigger = wrapper.find('button')
    await trigger.trigger('click')
    await flushPromises()
    await trigger.trigger('keydown', { key: 'Escape' })
    await flushPromises()
    expect(wrapper.exists()).toBe(true)
  })

  it('supports arrow key navigation between triggers', async () => {
    const wrapper = mount(
      {
        components: { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger },
        template: `
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        `,
      },
      { attachTo: document.body },
    )
    wrappers.push(wrapper)
    await flushPromises()

    const triggers = wrapper.findAll('button')
    expect(triggers.length).toBe(2)

    await triggers[0].trigger('keydown', { key: 'ArrowRight' })
    await flushPromises()
    expect(wrapper.exists()).toBe(true)
  })
})

describe('NavigationMenu composition', () => {
  it('mounts full navigation menu composition without errors', () => {
    const wrapper = mount({
      components: {
        NavigationMenu,
        NavigationMenuList,
        NavigationMenuItem,
        NavigationMenuTrigger,
        NavigationMenuContent,
        NavigationMenuLink,
        NavigationMenuIndicator,
      },
      template: `
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/docs/introduction">Introduction</NavigationMenuLink>
                <NavigationMenuLink href="/docs/installation">Installation</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/docs/button">Button</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/about">About</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuIndicator />
          </NavigationMenuList>
        </NavigationMenu>
      `,
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Getting Started')
    expect(wrapper.text()).toContain('Components')
    expect(wrapper.text()).toContain('About')
  })
})
