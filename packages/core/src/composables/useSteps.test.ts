import { describe, expect, it, vi } from 'vitest'
import { useSteps } from './useSteps'

describe('useSteps', () => {
  it('starts at step 1 by default', () => {
    const { current } = useSteps({ total: 5 })
    expect(current.value).toBe(1)
  })

  it('starts at a custom initial step', () => {
    const { current } = useSteps({ total: 5, initial: 3 })
    expect(current.value).toBe(3)
  })

  it('exposes the correct total', () => {
    const { total } = useSteps({ total: 4 })
    expect(total).toBe(4)
  })

  it('next() advances to the next step', () => {
    const { current, next } = useSteps({ total: 5 })
    next()
    expect(current.value).toBe(2)
  })

  it('next() does not advance past the last step', () => {
    const { current, next } = useSteps({ total: 3, initial: 3 })
    next()
    expect(current.value).toBe(3)
  })

  it('prev() goes back one step', () => {
    const { current, prev } = useSteps({ total: 5, initial: 3 })
    prev()
    expect(current.value).toBe(2)
  })

  it('prev() does not go below step 1', () => {
    const { current, prev } = useSteps({ total: 5, initial: 1 })
    prev()
    expect(current.value).toBe(1)
  })

  it('goTo() jumps to the specified step', () => {
    const { current, goTo } = useSteps({ total: 5 })
    goTo(4)
    expect(current.value).toBe(4)
  })

  it('goTo() ignores out-of-range steps below 1', () => {
    const { current, goTo } = useSteps({ total: 5 })
    goTo(0)
    expect(current.value).toBe(1)
  })

  it('goTo() ignores out-of-range steps above total', () => {
    const { current, goTo } = useSteps({ total: 5 })
    goTo(6)
    expect(current.value).toBe(1)
  })

  it('isFirst is true on step 1', () => {
    const { isFirst } = useSteps({ total: 5 })
    expect(isFirst.value).toBe(true)
  })

  it('isFirst is false when not on step 1', () => {
    const { isFirst, next } = useSteps({ total: 5 })
    next()
    expect(isFirst.value).toBe(false)
  })

  it('isLast is true on the last step', () => {
    const { isLast } = useSteps({ total: 3, initial: 3 })
    expect(isLast.value).toBe(true)
  })

  it('isLast is false when not on the last step', () => {
    const { isLast } = useSteps({ total: 5 })
    expect(isLast.value).toBe(false)
  })

  it('progress is 0 on step 1', () => {
    const { progress } = useSteps({ total: 5 })
    expect(progress.value).toBe(0)
  })

  it('progress is 100 on the last step', () => {
    const { progress } = useSteps({ total: 5, initial: 5 })
    expect(progress.value).toBe(100)
  })

  it('progress is 50 at the midpoint of a 3-step flow', () => {
    const { progress } = useSteps({ total: 3, initial: 2 })
    expect(progress.value).toBe(50)
  })

  it('progress updates as steps change', () => {
    const { progress, next } = useSteps({ total: 5 })
    expect(progress.value).toBe(0)
    next()
    expect(progress.value).toBe(25)
    next()
    expect(progress.value).toBe(50)
  })

  it('current is readonly', () => {
    const { current } = useSteps({ total: 5 })
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    // @ts-expect-error testing readonly enforcement at runtime
    current.value = 3
    // Vue readonly silently ignores the write and emits a warning
    expect(current.value).toBe(1)
    warnSpy.mockRestore()
  })
})
