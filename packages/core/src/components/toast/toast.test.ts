import { mount } from '@vue/test-utils'
// Radix Vue Toast primitives need ToastProvider and ToastRoot context.
import { ToastProvider } from 'radix-vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { useToast } from '../../composables/useToast'
import { toastVariants } from './toast.variants'
import Toast from './Toast.vue'
import ToastAction from './ToastAction.vue'
import ToastClose from './ToastClose.vue'
import ToastDescription from './ToastDescription.vue'
import Toaster from './Toaster.vue'
import ToastTitle from './ToastTitle.vue'

import ToastViewport from './ToastViewport.vue'

/**
 * Helper to mount a full toast setup with provider, toast, viewport,
 * and inspect the document body for teleported content.
 */
function mountToastWithContent(innerTemplate: string, _attachToBody = true) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const wrapper = mount(
    {
      components: {
        ToastProvider,
        Toast,
        ToastTitle,
        ToastDescription,
        ToastAction,
        ToastClose,
        ToastViewport,
      },
      template: `
        <ToastProvider>
          <Toast :open="true" :duration="0">
            ${innerTemplate}
          </Toast>
          <ToastViewport />
        </ToastProvider>
      `,
    },
    { attachTo: div },
  )
  return { wrapper, div }
}

function cleanup(wrapper: ReturnType<typeof mount>, div: HTMLDivElement) {
  wrapper.unmount()
  if (div.parentNode) {
    document.body.removeChild(div)
  }
}

describe('toast', () => {
  it('renders without crashing inside provider context', () => {
    const wrapper = mount({
      components: { ToastProvider, Toast },
      template: `
        <ToastProvider>
          <Toast>
            <span>Toast content</span>
          </Toast>
        </ToastProvider>
      `,
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders with title and description', async () => {
    const { wrapper, div } = mountToastWithContent(`
      <ToastTitle>Success!</ToastTitle>
      <ToastDescription>Your changes have been saved.</ToastDescription>
    `)
    await nextTick()
    const bodyHtml = document.body.innerHTML
    expect(bodyHtml).toContain('Success!')
    expect(bodyHtml).toContain('Your changes have been saved.')
    cleanup(wrapper, div)
  })

  it('applies default variant classes', () => {
    const classes = toastVariants({ variant: 'default' })
    expect(classes).toContain('bg-background')
    expect(classes).toContain('text-foreground')
  })

  it('applies success variant classes', () => {
    const classes = toastVariants({ variant: 'success' })
    expect(classes).toContain('border-green-500/50')
    expect(classes).toContain('bg-green-50')
    expect(classes).toContain('text-green-900')
  })

  it('applies destructive variant classes', () => {
    const classes = toastVariants({ variant: 'destructive' })
    expect(classes).toContain('bg-destructive')
    expect(classes).toContain('text-destructive-foreground')
  })

  it('applies warning variant classes', () => {
    const classes = toastVariants({ variant: 'warning' })
    expect(classes).toContain('border-yellow-500/50')
    expect(classes).toContain('bg-yellow-50')
    expect(classes).toContain('text-yellow-900')
  })

  it('applies info variant classes', () => {
    const classes = toastVariants({ variant: 'info' })
    expect(classes).toContain('border-blue-500/50')
    expect(classes).toContain('bg-blue-50')
    expect(classes).toContain('text-blue-900')
  })

  it('has correct base classes in all variants', () => {
    const variants = ['default', 'success', 'destructive', 'warning', 'info'] as const
    for (const variant of variants) {
      const classes = toastVariants({ variant })
      expect(classes).toContain('pointer-events-auto')
      expect(classes).toContain('rounded-md')
      expect(classes).toContain('shadow-lg')
    }
  })
})

describe('toastTitle', () => {
  it('renders slot content inside provider context', async () => {
    const { wrapper, div } = mountToastWithContent(`
      <ToastTitle>My Title</ToastTitle>
    `)
    await nextTick()
    expect(document.body.innerHTML).toContain('My Title')
    cleanup(wrapper, div)
  })

  it('applies font-semibold class', async () => {
    const { wrapper, div } = mountToastWithContent(`
      <ToastTitle>Title</ToastTitle>
    `)
    await nextTick()
    expect(document.body.innerHTML).toContain('font-semibold')
    cleanup(wrapper, div)
  })

  it('merges custom classes', async () => {
    const { wrapper, div } = mountToastWithContent(`
      <ToastTitle class="custom-title">Title</ToastTitle>
    `)
    await nextTick()
    expect(document.body.innerHTML).toContain('custom-title')
    cleanup(wrapper, div)
  })
})

describe('toastDescription', () => {
  it('renders slot content inside provider context', async () => {
    const { wrapper, div } = mountToastWithContent(`
      <ToastDescription>My Description</ToastDescription>
    `)
    await nextTick()
    expect(document.body.innerHTML).toContain('My Description')
    cleanup(wrapper, div)
  })

  it('applies text-sm class', async () => {
    const { wrapper, div } = mountToastWithContent(`
      <ToastDescription>Description</ToastDescription>
    `)
    await nextTick()
    expect(document.body.innerHTML).toContain('text-sm')
    cleanup(wrapper, div)
  })
})

describe('toastAction', () => {
  it('renders action button inside provider context', async () => {
    const { wrapper, div } = mountToastWithContent(`
      <ToastAction alt-text="Undo action">Undo</ToastAction>
    `)
    await nextTick()
    expect(document.body.innerHTML).toContain('Undo')
    cleanup(wrapper, div)
  })

  it('merges custom classes', async () => {
    const { wrapper, div } = mountToastWithContent(`
      <ToastAction alt-text="Custom action" class="custom-action">Act</ToastAction>
    `)
    await nextTick()
    expect(document.body.innerHTML).toContain('custom-action')
    cleanup(wrapper, div)
  })
})

describe('toastClose', () => {
  it('renders close button inside provider context', async () => {
    const { wrapper, div } = mountToastWithContent(`
      <ToastClose />
    `)
    await nextTick()
    const bodyHtml = document.body.innerHTML
    // Should render the X icon SVG and sr-only text
    expect(bodyHtml).toContain('svg')
    expect(bodyHtml).toContain('sr-only')
    expect(bodyHtml).toContain('Close')
    cleanup(wrapper, div)
  })

  it('renders custom slot content', async () => {
    const { wrapper, div } = mountToastWithContent(`
      <ToastClose>Dismiss</ToastClose>
    `)
    await nextTick()
    expect(document.body.innerHTML).toContain('Dismiss')
    cleanup(wrapper, div)
  })
})

describe('toastViewport', () => {
  it('renders without crashing inside provider context', () => {
    const wrapper = mount({
      components: { ToastProvider, ToastViewport },
      template: `
        <ToastProvider>
          <ToastViewport />
        </ToastProvider>
      `,
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('merges custom classes', () => {
    const wrapper = mount({
      components: { ToastProvider, ToastViewport },
      template: `
        <ToastProvider>
          <ToastViewport class="custom-viewport" />
        </ToastProvider>
      `,
    })
    expect(wrapper.html()).toContain('custom-viewport')
  })
})

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // Reset the singleton state by dismissing all toasts
    const { toasts, dismiss } = useToast()
    toasts.value.forEach(t => dismiss(t.id))
    vi.runAllTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('creates a toast and returns id', () => {
    const { toast } = useToast()
    const result = toast({ title: 'Test Toast' })
    expect(typeof result.id).toBe('number')
    expect(typeof result.dismiss).toBe('function')
  })

  it('adds toast to toasts list', () => {
    const { toast, toasts } = useToast()
    toast({ title: 'Hello', description: 'World' })
    expect(toasts.value.length).toBe(1)
    expect(toasts.value[0].title).toBe('Hello')
    expect(toasts.value[0].description).toBe('World')
    expect(toasts.value[0].open).toBe(true)
  })

  it('uses default variant and duration', () => {
    const { toast, toasts } = useToast()
    toast({ title: 'Default' })
    expect(toasts.value[0].variant).toBe('default')
    expect(toasts.value[0].duration).toBe(5000)
  })

  it('respects custom variant and duration', () => {
    const { toast, toasts } = useToast()
    toast({ title: 'Custom', variant: 'success', duration: 10000 })
    expect(toasts.value[0].variant).toBe('success')
    expect(toasts.value[0].duration).toBe(10000)
  })

  it('auto-dismisses after duration', () => {
    const { toast, toasts } = useToast()
    toast({ title: 'Auto Dismiss', duration: 3000 })
    expect(toasts.value.length).toBe(1)
    expect(toasts.value[0].open).toBe(true)

    // Advance time past the duration
    vi.advanceTimersByTime(3000)
    expect(toasts.value[0].open).toBe(false)

    // Advance past the removal animation delay (300ms)
    vi.advanceTimersByTime(300)
    expect(toasts.value.length).toBe(0)
  })

  it('does not auto-dismiss when duration is 0', () => {
    const { toast, toasts } = useToast()
    toast({ title: 'Persistent', duration: 0 })
    expect(toasts.value.length).toBe(1)

    vi.advanceTimersByTime(10000)
    expect(toasts.value.length).toBe(1)
    expect(toasts.value[0].open).toBe(true)
  })

  it('dismiss removes toast', () => {
    const { toast, toasts, dismiss } = useToast()
    const result = toast({ title: 'To Remove' })
    expect(toasts.value.length).toBe(1)

    dismiss(result.id)
    expect(toasts.value[0].open).toBe(false)

    vi.advanceTimersByTime(300)
    expect(toasts.value.length).toBe(0)
  })

  it('dismiss via returned function removes toast', () => {
    const { toast, toasts } = useToast()
    const result = toast({ title: 'Dismiss Me' })
    expect(toasts.value.length).toBe(1)

    result.dismiss()
    expect(toasts.value[0].open).toBe(false)

    vi.advanceTimersByTime(300)
    expect(toasts.value.length).toBe(0)
  })

  it('multiple toasts can stack', () => {
    const { toast, toasts } = useToast()
    toast({ title: 'First' })
    toast({ title: 'Second' })
    toast({ title: 'Third' })
    expect(toasts.value.length).toBe(3)
    expect(toasts.value[0].title).toBe('First')
    expect(toasts.value[1].title).toBe('Second')
    expect(toasts.value[2].title).toBe('Third')
  })

  it('stores action configuration', () => {
    const onClick = vi.fn()
    const { toast, toasts } = useToast()
    toast({
      title: 'With Action',
      action: { label: 'Undo', onClick },
    })
    expect(toasts.value[0].action).toBeDefined()
    expect(toasts.value[0].action!.label).toBe('Undo')
    expect(toasts.value[0].action!.onClick).toBe(onClick)
  })

  it('shares state across multiple useToast calls (singleton)', () => {
    const { toast } = useToast()
    const { toasts } = useToast()

    toast({ title: 'Shared' })
    expect(toasts.value.length).toBe(1)
    expect(toasts.value[0].title).toBe('Shared')
  })

  it('dismiss with non-existent id does nothing', () => {
    const { toast, toasts, dismiss } = useToast()
    toast({ title: 'Existing' })
    dismiss(999999)
    expect(toasts.value.length).toBe(1)
  })
})

describe('toaster', () => {
  it('renders without crashing', () => {
    const wrapper = mount(Toaster)
    expect(wrapper.exists()).toBe(true)
  })

  it('accepts position prop', () => {
    const wrapper = mount(Toaster, {
      props: { position: 'bottom-left' },
    })
    expect(wrapper.exists()).toBe(true)
  })
})

describe('toast variant styling', () => {
  it('each variant produces distinct classes', () => {
    const defaultClasses = toastVariants({ variant: 'default' })
    const successClasses = toastVariants({ variant: 'success' })
    const destructiveClasses = toastVariants({ variant: 'destructive' })
    const warningClasses = toastVariants({ variant: 'warning' })
    const infoClasses = toastVariants({ variant: 'info' })

    // All should be distinct
    const all = [defaultClasses, successClasses, destructiveClasses, warningClasses, infoClasses]
    const unique = new Set(all)
    expect(unique.size).toBe(5)
  })

  it('success variant includes green classes', () => {
    const classes = toastVariants({ variant: 'success' })
    expect(classes).toContain('green')
  })

  it('warning variant includes yellow classes', () => {
    const classes = toastVariants({ variant: 'warning' })
    expect(classes).toContain('yellow')
  })

  it('info variant includes blue classes', () => {
    const classes = toastVariants({ variant: 'info' })
    expect(classes).toContain('blue')
  })

  it('destructive variant includes destructive classes', () => {
    const classes = toastVariants({ variant: 'destructive' })
    expect(classes).toContain('destructive')
  })
})
