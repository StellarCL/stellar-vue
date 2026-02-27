import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { useKeyboardNav } from './useKeyboardNav'

function createItems(count: number): HTMLElement[] {
  return Array.from({ length: count }, (_, i) => {
    const btn = document.createElement('button')
    btn.textContent = `Item ${i}`
    document.body.appendChild(btn)
    return btn
  })
}

function fireKey(key: string, handler: (e: KeyboardEvent) => void) {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true })
  handler(event)
  return event
}

describe('useKeyboardNav', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('activeIndex starts at 0', () => {
    const items = ref(createItems(3))
    const { activeIndex } = useKeyboardNav({ items })
    expect(activeIndex.value).toBe(0)
  })

  it('ArrowDown increments activeIndex', () => {
    const elements = createItems(3)
    const items = ref(elements)
    const { activeIndex, onKeyDown } = useKeyboardNav({ items })

    fireKey('ArrowDown', onKeyDown)
    expect(activeIndex.value).toBe(1)
  })

  it('ArrowDown increments to last item', () => {
    const elements = createItems(3)
    const items = ref(elements)
    const { activeIndex, onKeyDown } = useKeyboardNav({ items })

    fireKey('ArrowDown', onKeyDown)
    fireKey('ArrowDown', onKeyDown)
    expect(activeIndex.value).toBe(2)
  })

  it('ArrowDown loops from last to first when loop is true', () => {
    const elements = createItems(3)
    const items = ref(elements)
    const { activeIndex, onKeyDown } = useKeyboardNav({ items, loop: true })

    fireKey('ArrowDown', onKeyDown)
    fireKey('ArrowDown', onKeyDown)
    fireKey('ArrowDown', onKeyDown)
    expect(activeIndex.value).toBe(0)
  })

  it('ArrowDown does not loop when loop is false', () => {
    const elements = createItems(3)
    const items = ref(elements)
    const { activeIndex, onKeyDown } = useKeyboardNav({ items, loop: false })

    fireKey('ArrowDown', onKeyDown)
    fireKey('ArrowDown', onKeyDown)
    fireKey('ArrowDown', onKeyDown) // already at last, should stay
    expect(activeIndex.value).toBe(2)
  })

  it('ArrowUp decrements activeIndex', () => {
    const elements = createItems(3)
    const items = ref(elements)
    const { activeIndex, onKeyDown } = useKeyboardNav({ items })

    fireKey('ArrowDown', onKeyDown)
    fireKey('ArrowDown', onKeyDown)
    fireKey('ArrowUp', onKeyDown)
    expect(activeIndex.value).toBe(1)
  })

  it('ArrowUp loops from first to last when loop is true', () => {
    const elements = createItems(3)
    const items = ref(elements)
    const { activeIndex, onKeyDown } = useKeyboardNav({ items, loop: true })

    fireKey('ArrowUp', onKeyDown)
    expect(activeIndex.value).toBe(2)
  })

  it('ArrowUp does not loop when loop is false', () => {
    const elements = createItems(3)
    const items = ref(elements)
    const { activeIndex, onKeyDown } = useKeyboardNav({ items, loop: false })

    fireKey('ArrowUp', onKeyDown)
    expect(activeIndex.value).toBe(0)
  })

  it('Home key sets activeIndex to 0', () => {
    const elements = createItems(3)
    const items = ref(elements)
    const { activeIndex, onKeyDown } = useKeyboardNav({ items })

    fireKey('ArrowDown', onKeyDown)
    fireKey('ArrowDown', onKeyDown)
    fireKey('Home', onKeyDown)
    expect(activeIndex.value).toBe(0)
  })

  it('End key sets activeIndex to last', () => {
    const elements = createItems(3)
    const items = ref(elements)
    const { activeIndex, onKeyDown } = useKeyboardNav({ items })

    fireKey('End', onKeyDown)
    expect(activeIndex.value).toBe(2)
  })

  it('focuses the correct element on ArrowDown', () => {
    const elements = createItems(3)
    const items = ref(elements)
    const focusSpy = vi.spyOn(elements[1], 'focus')
    const { onKeyDown } = useKeyboardNav({ items })

    fireKey('ArrowDown', onKeyDown)
    expect(focusSpy).toHaveBeenCalled()
  })

  it('focuses the correct element on Home', () => {
    const elements = createItems(3)
    const items = ref(elements)
    const focusSpy = vi.spyOn(elements[0], 'focus')
    const { onKeyDown } = useKeyboardNav({ items })

    fireKey('ArrowDown', onKeyDown)
    fireKey('Home', onKeyDown)
    expect(focusSpy).toHaveBeenCalled()
  })

  it('focuses the correct element on End', () => {
    const elements = createItems(3)
    const items = ref(elements)
    const focusSpy = vi.spyOn(elements[2], 'focus')
    const { onKeyDown } = useKeyboardNav({ items })

    fireKey('End', onKeyDown)
    expect(focusSpy).toHaveBeenCalled()
  })

  it('horizontal orientation uses ArrowLeft/ArrowRight', () => {
    const elements = createItems(3)
    const items = ref(elements)
    const { activeIndex, onKeyDown } = useKeyboardNav({ items, orientation: 'horizontal' })

    fireKey('ArrowRight', onKeyDown)
    expect(activeIndex.value).toBe(1)

    fireKey('ArrowLeft', onKeyDown)
    expect(activeIndex.value).toBe(0)
  })

  it('horizontal orientation does not respond to ArrowDown/ArrowUp', () => {
    const elements = createItems(3)
    const items = ref(elements)
    const { activeIndex, onKeyDown } = useKeyboardNav({ items, orientation: 'horizontal' })

    fireKey('ArrowDown', onKeyDown)
    expect(activeIndex.value).toBe(0)

    fireKey('ArrowUp', onKeyDown)
    expect(activeIndex.value).toBe(0)
  })

  it('vertical orientation does not respond to ArrowLeft/ArrowRight', () => {
    const elements = createItems(3)
    const items = ref(elements)
    const { activeIndex, onKeyDown } = useKeyboardNav({ items, orientation: 'vertical' })

    fireKey('ArrowRight', onKeyDown)
    expect(activeIndex.value).toBe(0)

    fireKey('ArrowLeft', onKeyDown)
    expect(activeIndex.value).toBe(0)
  })

  it('does nothing when items list is empty', () => {
    const items = ref<HTMLElement[]>([])
    const { activeIndex, onKeyDown } = useKeyboardNav({ items })

    fireKey('ArrowDown', onKeyDown)
    expect(activeIndex.value).toBe(0)
  })

  it('activeIndex is readonly', () => {
    const items = ref(createItems(3))
    const { activeIndex } = useKeyboardNav({ items })
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    // @ts-expect-error testing readonly enforcement at runtime
    activeIndex.value = 5
    // Vue readonly silently ignores the write and emits a warning
    expect(activeIndex.value).toBe(0)
    warnSpy.mockRestore()
  })
})
