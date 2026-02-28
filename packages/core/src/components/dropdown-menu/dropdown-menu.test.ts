import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import DropdownMenu from './DropdownMenu.vue'
import DropdownMenuCheckboxItem from './DropdownMenuCheckboxItem.vue'
import DropdownMenuContent from './DropdownMenuContent.vue'
import DropdownMenuGroup from './DropdownMenuGroup.vue'
import DropdownMenuItem from './DropdownMenuItem.vue'
import DropdownMenuLabel from './DropdownMenuLabel.vue'
import DropdownMenuRadioGroup from './DropdownMenuRadioGroup.vue'
import DropdownMenuRadioItem from './DropdownMenuRadioItem.vue'
import DropdownMenuSeparator from './DropdownMenuSeparator.vue'
import DropdownMenuShortcut from './DropdownMenuShortcut.vue'
import DropdownMenuSub from './DropdownMenuSub.vue'
import DropdownMenuSubContent from './DropdownMenuSubContent.vue'
import DropdownMenuSubTrigger from './DropdownMenuSubTrigger.vue'
import DropdownMenuTrigger from './DropdownMenuTrigger.vue'

// Track wrappers for cleanup
const wrappers: ReturnType<typeof mount>[] = []

afterEach(() => {
  wrappers.forEach((w) => {
    try {
      w.unmount()
    }
    catch {}
  })
  wrappers.length = 0
  // Clean up any leftover portal content
  document.body.innerHTML = ''
})

// Mount a component open, attached to document.body, flush DOM updates, and return body innerHTML
async function mountOpenToBody(template: string, components: Record<string, object>): Promise<string> {
  const wrapper = mount(
    { components, template },
    { attachTo: document.body },
  )
  wrappers.push(wrapper)
  await flushPromises()
  return document.body.innerHTML
}

describe('dropdownMenu', () => {
  it('renders without crashing', () => {
    const wrapper = mount(DropdownMenu, {
      slots: { default: '<div>content</div>' },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('passes open prop without crashing', () => {
    const wrapper = mount(DropdownMenu, {
      props: { open: false },
      slots: { default: '<div>content</div>' },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('passes defaultOpen prop without crashing', () => {
    const wrapper = mount(DropdownMenu, {
      props: { defaultOpen: false },
      slots: { default: '<div>content</div>' },
    })
    expect(wrapper.exists()).toBe(true)
  })
})

describe('dropdownMenuTrigger', () => {
  it('renders slot content inside DropdownMenu context', () => {
    const wrapper = mount({
      components: { DropdownMenu, DropdownMenuTrigger },
      template: `<DropdownMenu><DropdownMenuTrigger><button>Open</button></DropdownMenuTrigger></DropdownMenu>`,
    })
    expect(wrapper.text()).toContain('Open')
  })

  it('renders without crashing inside DropdownMenu context', () => {
    const wrapper = mount({
      components: { DropdownMenu, DropdownMenuTrigger },
      template: `<DropdownMenu><DropdownMenuTrigger><button>Trigger</button></DropdownMenuTrigger></DropdownMenu>`,
    })
    expect(wrapper.exists()).toBe(true)
  })
})

describe('dropdownMenuContent', () => {
  it('has correct styling classes when open', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent><p>Item</p></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent },
    )
    expect(bodyHtml).toContain('z-50')
    expect(bodyHtml).toContain('min-w-')
    expect(bodyHtml).toContain('rounded-md')
  })

  it('renders without crashing inside DropdownMenu context', () => {
    const wrapper = mount({
      components: { DropdownMenu, DropdownMenuContent },
      template: `<DropdownMenu><DropdownMenuContent><p>content</p></DropdownMenuContent></DropdownMenu>`,
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('merges custom classes', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent class="custom-content"><p>Item</p></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent },
    )
    expect(bodyHtml).toContain('custom-content')
  })
})

describe('dropdownMenuItem', () => {
  it('renders with correct classes', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>Item Text</DropdownMenuItem></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem },
    )
    expect(bodyHtml).toContain('rounded-sm')
    expect(bodyHtml).toContain('text-sm')
  })

  it('inset adds pl-8 class', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem :inset="true">Inset Item</DropdownMenuItem></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem },
    )
    expect(bodyHtml).toContain('pl-8')
  })

  it('merges custom classes', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem class="custom-item">Item</DropdownMenuItem></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem },
    )
    expect(bodyHtml).toContain('custom-item')
  })
})

describe('dropdownMenuCheckboxItem', () => {
  it('renders with indicator area inside DropdownMenu context', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuCheckboxItem :checked="true">Check Item</DropdownMenuCheckboxItem></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem },
    )
    // Indicator area (span with absolute positioning)
    expect(bodyHtml).toContain('absolute')
  })

  it('renders without crashing with checked=false', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuCheckboxItem :checked="false">Unchecked</DropdownMenuCheckboxItem></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem },
    )
    expect(bodyHtml).toContain('Unchecked')
  })

  it('merges custom classes', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuCheckboxItem class="custom-checkbox">Item</DropdownMenuCheckboxItem></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem },
    )
    expect(bodyHtml).toContain('custom-checkbox')
  })
})

describe('dropdownMenuRadioGroup', () => {
  it('renders without crashing inside DropdownMenu context', () => {
    const wrapper = mount({
      components: { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup },
      template: `
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup model-value="a"><div>items</div></DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      `,
    })
    expect(wrapper.exists()).toBe(true)
  })
})

describe('dropdownMenuRadioItem', () => {
  it('renders with indicator area inside DropdownMenu context', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuRadioGroup model-value="a"><DropdownMenuRadioItem value="a">Option A</DropdownMenuRadioItem></DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem },
    )
    // Indicator area (span with absolute positioning)
    expect(bodyHtml).toContain('absolute')
  })

  it('renders slot content', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuRadioGroup model-value="b"><DropdownMenuRadioItem value="b">Option B</DropdownMenuRadioItem></DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem },
    )
    expect(bodyHtml).toContain('Option B')
  })

  it('merges custom classes', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuRadioGroup model-value="a"><DropdownMenuRadioItem value="a" class="custom-radio">Option A</DropdownMenuRadioItem></DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem },
    )
    expect(bodyHtml).toContain('custom-radio')
  })
})

describe('dropdownMenuLabel', () => {
  it('renders with font-semibold class inside DropdownMenu context', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>My Account</DropdownMenuLabel></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel },
    )
    expect(bodyHtml).toContain('font-semibold')
  })

  it('inset adds pl-8 class', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel :inset="true">Inset Label</DropdownMenuLabel></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel },
    )
    expect(bodyHtml).toContain('pl-8')
  })

  it('merges custom classes', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel class="custom-label">Label</DropdownMenuLabel></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel },
    )
    expect(bodyHtml).toContain('custom-label')
  })
})

describe('dropdownMenuSeparator', () => {
  it('renders with bg-muted class inside DropdownMenu context', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuSeparator /></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator },
    )
    expect(bodyHtml).toContain('bg-muted')
  })

  it('merges custom classes', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuSeparator class="custom-sep" /></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator },
    )
    expect(bodyHtml).toContain('custom-sep')
  })
})

describe('dropdownMenuShortcut', () => {
  it('renders with opacity-60 class', () => {
    const wrapper = mount(DropdownMenuShortcut, {
      slots: { default: '⌘K' },
    })
    expect(wrapper.classes().join(' ')).toContain('opacity-60')
  })

  it('renders slot content', () => {
    const wrapper = mount(DropdownMenuShortcut, {
      slots: { default: '⌘K' },
    })
    expect(wrapper.text()).toContain('⌘K')
  })

  it('has ml-auto class', () => {
    const wrapper = mount(DropdownMenuShortcut)
    expect(wrapper.classes().join(' ')).toContain('ml-auto')
  })

  it('has tracking-widest class', () => {
    const wrapper = mount(DropdownMenuShortcut)
    expect(wrapper.classes().join(' ')).toContain('tracking-widest')
  })

  it('merges custom classes', () => {
    const wrapper = mount(DropdownMenuShortcut, {
      props: { class: 'custom-shortcut' },
    })
    expect(wrapper.classes()).toContain('custom-shortcut')
  })

  it('renders as a span element', () => {
    const wrapper = mount(DropdownMenuShortcut)
    expect(wrapper.element.tagName).toBe('SPAN')
  })
})

describe('dropdownMenuGroup', () => {
  it('renders without crashing inside DropdownMenu context', () => {
    const wrapper = mount({
      components: { DropdownMenu, DropdownMenuContent, DropdownMenuGroup },
      template: `
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuGroup><div>grouped</div></DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      `,
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount({
      components: { DropdownMenu, DropdownMenuGroup },
      template: `<DropdownMenu><DropdownMenuGroup><div>Group Content</div></DropdownMenuGroup></DropdownMenu>`,
    })
    expect(wrapper.text()).toContain('Group Content')
  })
})

describe('dropdownMenuSub', () => {
  it('renders without crashing inside DropdownMenu context', () => {
    const wrapper = mount({
      components: { DropdownMenu, DropdownMenuContent, DropdownMenuSub },
      template: `
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuSub><div>sub</div></DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      `,
    })
    expect(wrapper.exists()).toBe(true)
  })
})

describe('dropdownMenuSubTrigger', () => {
  it('shows chevron icon inside DropdownMenu context', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuSub><DropdownMenuSubTrigger>More</DropdownMenuSubTrigger></DropdownMenuSub></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSub, DropdownMenuSubTrigger },
    )
    // SVG chevron polyline should be present
    expect(bodyHtml).toContain('polyline')
  })

  it('renders slot text content', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuSub><DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger></DropdownMenuSub></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSub, DropdownMenuSubTrigger },
    )
    expect(bodyHtml).toContain('More Options')
  })

  it('inset adds pl-8 class', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuSub><DropdownMenuSubTrigger :inset="true">More</DropdownMenuSubTrigger></DropdownMenuSub></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSub, DropdownMenuSubTrigger },
    )
    expect(bodyHtml).toContain('pl-8')
  })

  it('merges custom classes', async () => {
    const bodyHtml = await mountOpenToBody(
      `<DropdownMenu :open="true"><DropdownMenuTrigger><button>T</button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuSub><DropdownMenuSubTrigger class="custom-sub-trigger">More</DropdownMenuSubTrigger></DropdownMenuSub></DropdownMenuContent></DropdownMenu>`,
      { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSub, DropdownMenuSubTrigger },
    )
    expect(bodyHtml).toContain('custom-sub-trigger')
  })
})

describe('dropdownMenuSubContent', () => {
  it('renders without crashing inside DropdownMenu context', () => {
    const wrapper = mount({
      components: { DropdownMenu, DropdownMenuContent, DropdownMenuSub, DropdownMenuSubContent },
      template: `
        <DropdownMenu>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubContent><div>sub content</div></DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      `,
    })
    expect(wrapper.exists()).toBe(true)
  })
})

describe('dropdownMenu composition', () => {
  it('mounts full dropdown composition without errors', () => {
    const wrapper = mount({
      components: {
        DropdownMenu,
        DropdownMenuTrigger,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuSeparator,
        DropdownMenuShortcut,
        DropdownMenuGroup,
      },
      template: `
        <DropdownMenu>
          <DropdownMenuTrigger><button>Open</button></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem :inset="true">Settings</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      `,
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Open')
  })

  it('dropdownMenuShortcut renders correctly standalone', () => {
    const wrapper = mount(DropdownMenuShortcut, {
      slots: { default: '⌘S' },
    })
    expect(wrapper.text()).toBe('⌘S')
    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes().join(' ')).toContain('ml-auto')
    expect(wrapper.classes().join(' ')).toContain('opacity-60')
    expect(wrapper.classes().join(' ')).toContain('tracking-widest')
  })
})
