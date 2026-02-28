import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const source = ref('hello')
    const debounced = useDebounce(source, 300)
    expect(debounced.value).toBe('hello')
  })

  it('does not update immediately when source changes', () => {
    const source = ref('hello')
    const debounced = useDebounce(source, 300)

    source.value = 'world'
    expect(debounced.value).toBe('hello')
  })

  it('updates after delay has elapsed', async () => {
    const source = ref('hello')
    const debounced = useDebounce(source, 300)

    source.value = 'world'
    await vi.advanceTimersByTimeAsync(300)
    expect(debounced.value).toBe('world')
  })

  it('resets timer on rapid changes', async () => {
    const source = ref('hello')
    const debounced = useDebounce(source, 300)

    source.value = 'world'
    await vi.advanceTimersByTimeAsync(200)
    source.value = 'again'
    await vi.advanceTimersByTimeAsync(200)
    // Still not 300ms since last change
    expect(debounced.value).toBe('hello')

    await vi.advanceTimersByTimeAsync(100)
    expect(debounced.value).toBe('again')
  })

  it('only reflects the last value after rapid changes', async () => {
    const source = ref(0)
    const debounced = useDebounce(source, 300)

    source.value = 1
    await vi.advanceTimersByTimeAsync(50)
    source.value = 2
    await vi.advanceTimersByTimeAsync(50)
    source.value = 3
    await vi.advanceTimersByTimeAsync(300)

    expect(debounced.value).toBe(3)
  })

  it('uses default delay of 300ms when not specified', async () => {
    const source = ref('initial')
    const debounced = useDebounce(source)

    source.value = 'updated'
    await vi.advanceTimersByTimeAsync(299)
    expect(debounced.value).toBe('initial')

    await vi.advanceTimersByTimeAsync(1)
    expect(debounced.value).toBe('updated')
  })

  it('works with custom delay', async () => {
    const source = ref(0)
    const debounced = useDebounce(source, 1000)

    source.value = 42
    await vi.advanceTimersByTimeAsync(999)
    expect(debounced.value).toBe(0)

    await vi.advanceTimersByTimeAsync(1)
    expect(debounced.value).toBe(42)
  })

  it('works with non-primitive values', async () => {
    const source = ref({ name: 'Alice' })
    const debounced = useDebounce(source, 300)

    source.value = { name: 'Bob' }
    await vi.advanceTimersByTimeAsync(300)
    expect(debounced.value).toEqual({ name: 'Bob' })
  })

  it('is readonly', () => {
    const source = ref('test')
    const debounced = useDebounce(source, 300)
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    // @ts-expect-error testing readonly enforcement at runtime
    debounced.value = 'mutated'
    // Vue readonly silently ignores the write and emits a warning
    expect(debounced.value).toBe('test')
    warnSpy.mockRestore()
  })
})
