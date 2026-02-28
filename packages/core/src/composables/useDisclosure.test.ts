import { describe, expect, it, vi } from 'vitest'
import { useDisclosure } from './useDisclosure'

describe('useDisclosure', () => {
  it('starts closed by default', () => {
    const { isOpen } = useDisclosure()
    expect(isOpen.value).toBe(false)
  })

  it('starts open when defaultOpen is true', () => {
    const { isOpen } = useDisclosure({ defaultOpen: true })
    expect(isOpen.value).toBe(true)
  })

  it('open() sets isOpen to true', () => {
    const { isOpen, open } = useDisclosure()
    open()
    expect(isOpen.value).toBe(true)
  })

  it('close() sets isOpen to false', () => {
    const { isOpen, open, close } = useDisclosure()
    open()
    close()
    expect(isOpen.value).toBe(false)
  })

  it('toggle() opens when closed', () => {
    const { isOpen, toggle } = useDisclosure()
    toggle()
    expect(isOpen.value).toBe(true)
  })

  it('toggle() closes when open', () => {
    const { isOpen, toggle } = useDisclosure({ defaultOpen: true })
    toggle()
    expect(isOpen.value).toBe(false)
  })

  it('toggle() alternates state on repeated calls', () => {
    const { isOpen, toggle } = useDisclosure()
    toggle()
    expect(isOpen.value).toBe(true)
    toggle()
    expect(isOpen.value).toBe(false)
    toggle()
    expect(isOpen.value).toBe(true)
  })

  it('onOpen callback fires when opening', () => {
    const onOpen = vi.fn()
    const { open } = useDisclosure({ onOpen })
    open()
    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('onOpen callback does not fire if already open', () => {
    const onOpen = vi.fn()
    const { open } = useDisclosure({ defaultOpen: true, onOpen })
    open()
    expect(onOpen).not.toHaveBeenCalled()
  })

  it('onClose callback fires when closing', () => {
    const onClose = vi.fn()
    const { open, close } = useDisclosure({ onClose })
    open()
    close()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('onClose callback does not fire if already closed', () => {
    const onClose = vi.fn()
    const { close } = useDisclosure({ onClose })
    close()
    expect(onClose).not.toHaveBeenCalled()
  })

  it('onOpen fires via toggle', () => {
    const onOpen = vi.fn()
    const { toggle } = useDisclosure({ onOpen })
    toggle()
    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('onClose fires via toggle', () => {
    const onClose = vi.fn()
    const { toggle } = useDisclosure({ defaultOpen: true, onClose })
    toggle()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('isOpen is readonly', () => {
    const { isOpen } = useDisclosure()
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    // @ts-expect-error testing readonly enforcement at runtime
    isOpen.value = true
    // Vue readonly silently ignores the write and emits a warning
    expect(isOpen.value).toBe(false)
    warnSpy.mockRestore()
  })
})
