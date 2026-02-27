import { describe, expect, it, vi } from 'vitest'
import { useToggle } from './useToggle'

describe('useToggle', () => {
  it('defaults to false', () => {
    const { value } = useToggle()
    expect(value.value).toBe(false)
  })

  it('accepts a custom default of true', () => {
    const { value } = useToggle(true)
    expect(value.value).toBe(true)
  })

  it('toggle() flips false to true', () => {
    const { value, toggle } = useToggle()
    toggle()
    expect(value.value).toBe(true)
  })

  it('toggle() flips true to false', () => {
    const { value, toggle } = useToggle(true)
    toggle()
    expect(value.value).toBe(false)
  })

  it('toggle() alternates on repeated calls', () => {
    const { value, toggle } = useToggle()
    toggle()
    expect(value.value).toBe(true)
    toggle()
    expect(value.value).toBe(false)
    toggle()
    expect(value.value).toBe(true)
  })

  it('setTrue() sets value to true', () => {
    const { value, setTrue } = useToggle()
    setTrue()
    expect(value.value).toBe(true)
  })

  it('setTrue() is idempotent when already true', () => {
    const { value, setTrue } = useToggle(true)
    setTrue()
    expect(value.value).toBe(true)
  })

  it('setFalse() sets value to false', () => {
    const { value, setFalse } = useToggle(true)
    setFalse()
    expect(value.value).toBe(false)
  })

  it('setFalse() is idempotent when already false', () => {
    const { value, setFalse } = useToggle()
    setFalse()
    expect(value.value).toBe(false)
  })

  it('value is readonly', () => {
    const { value } = useToggle()
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    // @ts-expect-error testing readonly enforcement at runtime
    value.value = true
    // Vue readonly silently ignores the write and emits a warning
    expect(value.value).toBe(false)
    warnSpy.mockRestore()
  })
})
