import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { defineComponent, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useMediaQuery } from './useMediaQuery'

function createMatchMediaMock(initialMatches: boolean) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = []

  const mql = {
    matches: initialMatches,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
      if (event === 'change') listeners.push(listener)
    }),
    removeEventListener: vi.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
      const idx = listeners.indexOf(listener)
      if (idx !== -1) listeners.splice(idx, 1)
    }),
    dispatchEvent: vi.fn(),
    triggerChange(matches: boolean) {
      mql.matches = matches
      const event = { matches } as MediaQueryListEvent
      listeners.forEach(l => l(event))
    },
  }

  return mql
}

describe('useMediaQuery', () => {
  let matchMediaMock: ReturnType<typeof createMatchMediaMock>

  beforeEach(() => {
    matchMediaMock = createMatchMediaMock(false)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockReturnValue(matchMediaMock),
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns false initially when media does not match', () => {
    let capturedMatches: ReturnType<typeof useMediaQuery> | null = null

    const TestComponent = defineComponent({
      setup() {
        capturedMatches = useMediaQuery('(min-width: 768px)')
        return {}
      },
      template: '<div></div>',
    })

    const wrapper = mount(TestComponent)
    expect(capturedMatches!.value).toBe(false)
    wrapper.unmount()
  })

  it('reflects initial match state on mount', () => {
    matchMediaMock = createMatchMediaMock(true)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockReturnValue(matchMediaMock),
    })

    let capturedMatches: ReturnType<typeof useMediaQuery> | null = null

    const TestComponent = defineComponent({
      setup() {
        capturedMatches = useMediaQuery('(min-width: 768px)')
        return {}
      },
      template: '<div></div>',
    })

    const wrapper = mount(TestComponent)
    expect(capturedMatches!.value).toBe(true)
    wrapper.unmount()
  })

  it('responds to change events updating to true', async () => {
    let capturedMatches: ReturnType<typeof useMediaQuery> | null = null

    const TestComponent = defineComponent({
      setup() {
        capturedMatches = useMediaQuery('(min-width: 768px)')
        return {}
      },
      template: '<div></div>',
    })

    const wrapper = mount(TestComponent)
    expect(capturedMatches!.value).toBe(false)

    matchMediaMock.triggerChange(true)
    await wrapper.vm.$nextTick()
    expect(capturedMatches!.value).toBe(true)

    wrapper.unmount()
  })

  it('responds to change event going back to false', async () => {
    matchMediaMock = createMatchMediaMock(true)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockReturnValue(matchMediaMock),
    })

    let capturedMatches: ReturnType<typeof useMediaQuery> | null = null

    const TestComponent = defineComponent({
      setup() {
        capturedMatches = useMediaQuery('(prefers-color-scheme: dark)')
        return {}
      },
      template: '<div></div>',
    })

    const wrapper = mount(TestComponent)
    expect(capturedMatches!.value).toBe(true)

    matchMediaMock.triggerChange(false)
    await wrapper.vm.$nextTick()
    expect(capturedMatches!.value).toBe(false)

    wrapper.unmount()
  })

  it('removes event listener on unmount', () => {
    const TestComponent = defineComponent({
      setup() {
        useMediaQuery('(min-width: 768px)')
        return {}
      },
      template: '<div></div>',
    })

    const wrapper = mount(TestComponent)
    wrapper.unmount()

    expect(matchMediaMock.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('calls window.matchMedia with the provided query', () => {
    const TestComponent = defineComponent({
      setup() {
        useMediaQuery('(max-width: 1024px)')
        return {}
      },
      template: '<div></div>',
    })

    const wrapper = mount(TestComponent)
    expect(window.matchMedia).toHaveBeenCalledWith('(max-width: 1024px)')
    wrapper.unmount()
  })

  it('return value is readonly', () => {
    let capturedMatches: ReturnType<typeof useMediaQuery> | null = null

    const TestComponent = defineComponent({
      setup() {
        capturedMatches = useMediaQuery('(min-width: 768px)')
        return {}
      },
      template: '<div></div>',
    })

    const wrapper = mount(TestComponent)
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    // @ts-expect-error testing readonly enforcement at runtime
    capturedMatches!.value = true
    // Vue readonly silently ignores the write and emits a warning
    expect(capturedMatches!.value).toBe(false)
    warnSpy.mockRestore()
    wrapper.unmount()
  })
})
