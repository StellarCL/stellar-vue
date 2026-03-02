import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import Tooltip from './Tooltip.vue'
import TooltipContent from './TooltipContent.vue'
import TooltipProvider from './TooltipProvider.vue'
import TooltipTrigger from './TooltipTrigger.vue'

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
  document.body.innerHTML = ''
})

// Mount an open tooltip attached to document.body and flush DOM updates
async function mountOpenToBody(
  template: string,
  components: Record<string, object>,
): Promise<string> {
  const wrapper = mount({ components, template }, { attachTo: document.body })
  wrappers.push(wrapper)
  await flushPromises()
  return document.body.innerHTML
}

describe('tooltipProvider', () => {
  it('renders children', () => {
    const wrapper = mount({
      components: { TooltipProvider },
      template: `<TooltipProvider><div>child content</div></TooltipProvider>`,
    })
    expect(wrapper.text()).toContain('child content')
  })

  it('renders without crashing', () => {
    const wrapper = mount(TooltipProvider, {
      slots: { default: '<div>slot</div>' },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('accepts delayDuration prop', () => {
    const wrapper = mount(TooltipProvider, {
      props: { delayDuration: 500 },
      slots: { default: '<div>content</div>' },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('accepts skipDelayDuration prop', () => {
    const wrapper = mount(TooltipProvider, {
      props: { skipDelayDuration: 100 },
      slots: { default: '<div>content</div>' },
    })
    expect(wrapper.exists()).toBe(true)
  })
})

describe('tooltipTrigger', () => {
  it('renders slot content', () => {
    const wrapper = mount({
      components: { TooltipProvider, Tooltip, TooltipTrigger },
      template: `
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><button>Hover Me</button></TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      `,
    })
    expect(wrapper.text()).toContain('Hover Me')
  })

  it('renders without crashing inside Tooltip context', () => {
    const wrapper = mount({
      components: { TooltipProvider, Tooltip, TooltipTrigger },
      template: `
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><button>Trigger</button></TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      `,
    })
    expect(wrapper.exists()).toBe(true)
  })
})

describe('tooltipContent', () => {
  it('has correct base classes', async () => {
    const bodyHtml = await mountOpenToBody(
      `<TooltipProvider><Tooltip :open="true"><TooltipTrigger><button>T</button></TooltipTrigger><TooltipContent>Tooltip text</TooltipContent></Tooltip></TooltipProvider>`,
      { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent },
    )
    expect(bodyHtml).toContain('px-3')
    expect(bodyHtml).toContain('py-1.5')
    expect(bodyHtml).toContain('text-sm')
    expect(bodyHtml).toContain('rounded-md')
    expect(bodyHtml).toContain('bg-slate-150')
    expect(bodyHtml).toContain('text-slate-800')
    expect(bodyHtml).toContain('shadow-soft')
  })

  it('merges custom classes', async () => {
    const bodyHtml = await mountOpenToBody(
      `<TooltipProvider><Tooltip :open="true"><TooltipTrigger><button>T</button></TooltipTrigger><TooltipContent class="my-tooltip-class">Tooltip text</TooltipContent></Tooltip></TooltipProvider>`,
      { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent },
    )
    expect(bodyHtml).toContain('my-tooltip-class')
  })

  it('accepts side prop', () => {
    const wrapper = mount({
      components: { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent },
      template: `
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><button>Trigger</button></TooltipTrigger>
            <TooltipContent side="bottom">Tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      `,
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('accepts align prop', () => {
    const wrapper = mount({
      components: { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent },
      template: `
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><button>Trigger</button></TooltipTrigger>
            <TooltipContent align="end">Tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      `,
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('accepts sideOffset prop', () => {
    const wrapper = mount({
      components: { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent },
      template: `
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><button>Trigger</button></TooltipTrigger>
            <TooltipContent :sideOffset="8">Tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      `,
    })
    expect(wrapper.exists()).toBe(true)
  })
})

describe('tooltip composition', () => {
  it('mounts TooltipProvider > Tooltip > Trigger + Content without error', () => {
    const wrapper = mount({
      components: { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent },
      template: `
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <button>Hover for tooltip</button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tooltip content</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      `,
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Hover for tooltip')
  })

  it('renders trigger text when tooltip is closed', () => {
    const wrapper = mount({
      components: { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent },
      template: `
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <button>Show Tooltip</button>
            </TooltipTrigger>
            <TooltipContent>Hidden tooltip text</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      `,
    })
    expect(wrapper.text()).toContain('Show Tooltip')
  })
})
