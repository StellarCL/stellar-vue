import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import Popover from './Popover.vue'
import PopoverContent from './PopoverContent.vue'
import PopoverTrigger from './PopoverTrigger.vue'

// Track wrappers for cleanup
const wrappers: ReturnType<typeof mount>[] = []

afterEach(() => {
  wrappers.forEach((w) => {
    try {
      w.unmount()
    } catch {}
  })
  wrappers.length = 0
  document.body.innerHTML = ''
})

// Mount an open popover attached to document.body and flush DOM updates
async function mountOpenToBody(
  template: string,
  components: Record<string, object>,
): Promise<string> {
  const wrapper = mount({ components, template }, { attachTo: document.body })
  wrappers.push(wrapper)
  await flushPromises()
  return document.body.innerHTML
}

describe('popoverTrigger', () => {
  it('renders slot content', () => {
    const wrapper = mount({
      components: { Popover, PopoverTrigger },
      template: `<Popover><PopoverTrigger><button>Open Popover</button></PopoverTrigger></Popover>`,
    })
    expect(wrapper.text()).toContain('Open Popover')
  })

  it('renders without crashing inside Popover context', () => {
    const wrapper = mount({
      components: { Popover, PopoverTrigger },
      template: `<Popover><PopoverTrigger><button>Trigger</button></PopoverTrigger></Popover>`,
    })
    expect(wrapper.exists()).toBe(true)
  })
})

describe('popoverContent', () => {
  it('has correct base classes', async () => {
    const bodyHtml = await mountOpenToBody(
      `<Popover :open="true"><PopoverTrigger><button>T</button></PopoverTrigger><PopoverContent>Content</PopoverContent></Popover>`,
      { Popover, PopoverTrigger, PopoverContent },
    )
    expect(bodyHtml).toContain('w-72')
    expect(bodyHtml).toContain('rounded-lg')
    expect(bodyHtml).toContain('border')
    expect(bodyHtml).toContain('border-slate-150')
    expect(bodyHtml).toContain('bg-white')
    expect(bodyHtml).toContain('p-4')
    expect(bodyHtml).toContain('text-popover-foreground')
    expect(bodyHtml).toContain('shadow-soft')
  })

  it('merges custom classes', async () => {
    const bodyHtml = await mountOpenToBody(
      `<Popover :open="true"><PopoverTrigger><button>T</button></PopoverTrigger><PopoverContent class="my-custom-class">Content</PopoverContent></Popover>`,
      { Popover, PopoverTrigger, PopoverContent },
    )
    expect(bodyHtml).toContain('my-custom-class')
  })

  it('receives side prop', () => {
    const wrapper = mount({
      components: { Popover, PopoverContent },
      template: `<Popover><PopoverContent side="top">Content</PopoverContent></Popover>`,
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('receives align prop', () => {
    const wrapper = mount({
      components: { Popover, PopoverContent },
      template: `<Popover><PopoverContent align="start">Content</PopoverContent></Popover>`,
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('receives sideOffset prop', () => {
    const wrapper = mount({
      components: { Popover, PopoverContent },
      template: `<Popover><PopoverContent :sideOffset="8">Content</PopoverContent></Popover>`,
    })
    expect(wrapper.exists()).toBe(true)
  })
})

describe('popover composition', () => {
  it('mounts Popover with trigger and content without error', () => {
    const wrapper = mount({
      components: { Popover, PopoverTrigger, PopoverContent },
      template: `
        <Popover>
          <PopoverTrigger>
            <button>Open</button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Popover content</p>
          </PopoverContent>
        </Popover>
      `,
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Open')
  })

  it('renders trigger text when popover is closed', () => {
    const wrapper = mount({
      components: { Popover, PopoverTrigger, PopoverContent },
      template: `
        <Popover>
          <PopoverTrigger>
            <button>Toggle Popover</button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Hidden Content</p>
          </PopoverContent>
        </Popover>
      `,
    })
    expect(wrapper.text()).toContain('Toggle Popover')
  })
})
