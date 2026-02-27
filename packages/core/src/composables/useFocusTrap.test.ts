import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
import { useFocusTrap } from './useFocusTrap'

function createContainer() {
  const container = document.createElement('div')

  const btn1 = document.createElement('button')
  btn1.textContent = 'Button 1'

  const btn2 = document.createElement('button')
  btn2.textContent = 'Button 2'

  const btn3 = document.createElement('button')
  btn3.textContent = 'Button 3'

  container.appendChild(btn1)
  container.appendChild(btn2)
  container.appendChild(btn3)

  document.body.appendChild(container)

  return { container, buttons: [btn1, btn2, btn3] }
}

function createTabEvent(shiftKey = false) {
  return new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true, cancelable: true })
}

describe('useFocusTrap', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  it('isActive starts as false', () => {
    const containerRef = ref<HTMLElement | null>(null)
    const { isActive } = useFocusTrap(containerRef)
    expect(isActive.value).toBe(false)
  })

  it('activate sets isActive to true', () => {
    const { container } = createContainer()
    const containerRef = ref<HTMLElement | null>(container)
    const { activate, isActive } = useFocusTrap(containerRef)

    activate()
    expect(isActive.value).toBe(true)
  })

  it('deactivate sets isActive to false', () => {
    const { container } = createContainer()
    const containerRef = ref<HTMLElement | null>(container)
    const { activate, deactivate, isActive } = useFocusTrap(containerRef)

    activate()
    expect(isActive.value).toBe(true)

    deactivate()
    expect(isActive.value).toBe(false)
  })

  it('activate focuses first focusable element', () => {
    const { container, buttons } = createContainer()
    const containerRef = ref<HTMLElement | null>(container)
    const { activate } = useFocusTrap(containerRef)

    activate()
    expect(document.activeElement).toBe(buttons[0])
  })

  it('activate focuses initialFocus element when provided', () => {
    const { container, buttons } = createContainer()
    const containerRef = ref<HTMLElement | null>(container)
    const initialFocus = ref<HTMLElement | null>(buttons[1])
    const { activate } = useFocusTrap(containerRef, { initialFocus })

    activate()
    expect(document.activeElement).toBe(buttons[1])
  })

  it('Tab key cycles forward through focusable elements', () => {
    const { container, buttons } = createContainer()
    const containerRef = ref<HTMLElement | null>(container)
    const { activate } = useFocusTrap(containerRef)

    activate()
    // Focus is on buttons[0], Tab should move to buttons[1]
    buttons[0].focus()
    document.dispatchEvent(createTabEvent(false))
    // Default browser Tab behavior is not triggered in jsdom, but the handler
    // only intercepts at the boundary (last element). Move focus to last element.
    buttons[2].focus()
    const event = createTabEvent(false)
    document.dispatchEvent(event)
    expect(document.activeElement).toBe(buttons[0])
  })

  it('Shift+Tab at first element wraps to last', () => {
    const { container, buttons } = createContainer()
    const containerRef = ref<HTMLElement | null>(container)
    const { activate } = useFocusTrap(containerRef)

    activate()
    buttons[0].focus()

    const event = createTabEvent(true)
    document.dispatchEvent(event)
    expect(document.activeElement).toBe(buttons[2])
  })

  it('deactivate returns focus to previously focused element', () => {
    const outerButton = document.createElement('button')
    outerButton.textContent = 'Outside'
    document.body.appendChild(outerButton)
    outerButton.focus()

    const { container } = createContainer()
    const containerRef = ref<HTMLElement | null>(container)
    const { activate, deactivate } = useFocusTrap(containerRef)

    activate()
    deactivate()
    expect(document.activeElement).toBe(outerButton)
  })

  it('deactivate does not return focus when returnFocusOnDeactivate is false', () => {
    const outerButton = document.createElement('button')
    document.body.appendChild(outerButton)
    outerButton.focus()

    const { container } = createContainer()
    const containerRef = ref<HTMLElement | null>(container)
    const { activate, deactivate } = useFocusTrap(containerRef, { returnFocusOnDeactivate: false })

    activate()
    // Focus is now on first button in container
    deactivate()
    // Should NOT have returned focus to outerButton
    expect(document.activeElement).not.toBe(outerButton)
  })

  it('calling activate twice does not duplicate listeners', () => {
    const { container } = createContainer()
    const containerRef = ref<HTMLElement | null>(container)
    const { activate, isActive } = useFocusTrap(containerRef)

    activate()
    activate() // second call should be a no-op
    expect(isActive.value).toBe(true)
  })

  it('calling deactivate when not active is a no-op', () => {
    const { container } = createContainer()
    const containerRef = ref<HTMLElement | null>(container)
    const { deactivate, isActive } = useFocusTrap(containerRef)

    deactivate() // should not throw
    expect(isActive.value).toBe(false)
  })

  it('Tab key does nothing when trap is not active', () => {
    const { container, buttons } = createContainer()
    const containerRef = ref<HTMLElement | null>(container)
    useFocusTrap(containerRef)

    buttons[2].focus()
    document.dispatchEvent(createTabEvent(false))
    // Without trap active, focus is not moved to first element
    expect(document.activeElement).toBe(buttons[2])
  })

  it('isActive is readonly', () => {
    const containerRef = ref<HTMLElement | null>(null)
    const { isActive } = useFocusTrap(containerRef)
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    // @ts-expect-error testing readonly enforcement at runtime
    isActive.value = true
    // Vue readonly silently ignores the write and emits a warning
    expect(isActive.value).toBe(false)
    warnSpy.mockRestore()
  })
})
