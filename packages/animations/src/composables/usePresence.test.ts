import { describe, expect, it } from 'vitest'
import { ref, nextTick } from 'vue'
import { usePresence } from './usePresence'

describe('usePresence', () => {
  it('isPresent starts as true when show is true', () => {
    const show = ref(true)
    const { isPresent } = usePresence(show)
    expect(isPresent.value).toBe(true)
  })

  it('isPresent starts as false when show is false', () => {
    const show = ref(false)
    const { isPresent } = usePresence(show)
    expect(isPresent.value).toBe(false)
  })

  it('isAnimating starts as false', () => {
    const show = ref(true)
    const { isAnimating } = usePresence(show)
    expect(isAnimating.value).toBe(false)
  })

  it('isAnimating starts as false when show is false', () => {
    const show = ref(false)
    const { isAnimating } = usePresence(show)
    expect(isAnimating.value).toBe(false)
  })

  it('setting show to true sets isPresent to true', async () => {
    const show = ref(false)
    const { isPresent } = usePresence(show)
    expect(isPresent.value).toBe(false)

    show.value = true
    await nextTick()

    expect(isPresent.value).toBe(true)
  })

  it('setting show to true resets isAnimating to false', async () => {
    const show = ref(true)
    const { isAnimating, safeToRemove } = usePresence(show)

    // Trigger exit
    show.value = false
    await nextTick()
    expect(isAnimating.value).toBe(true)

    // Trigger enter again
    show.value = true
    await nextTick()
    expect(isAnimating.value).toBe(false)
  })

  it('setting show to false sets isAnimating to true (entering exit animation)', async () => {
    const show = ref(true)
    const { isAnimating } = usePresence(show)
    expect(isAnimating.value).toBe(false)

    show.value = false
    await nextTick()

    expect(isAnimating.value).toBe(true)
  })

  it('setting show to false keeps isPresent true until safeToRemove is called', async () => {
    const show = ref(true)
    const { isPresent, isAnimating } = usePresence(show)

    show.value = false
    await nextTick()

    // isPresent stays true because we haven't called safeToRemove yet
    expect(isPresent.value).toBe(true)
    expect(isAnimating.value).toBe(true)
  })

  it('calling safeToRemove after show=false sets isPresent to false', async () => {
    const show = ref(true)
    const { isPresent, safeToRemove } = usePresence(show)

    show.value = false
    await nextTick()

    safeToRemove()

    expect(isPresent.value).toBe(false)
  })

  it('calling safeToRemove after show=false sets isAnimating to false', async () => {
    const show = ref(true)
    const { isAnimating, safeToRemove } = usePresence(show)

    show.value = false
    await nextTick()

    expect(isAnimating.value).toBe(true)
    safeToRemove()
    expect(isAnimating.value).toBe(false)
  })

  it('multiple show toggles work correctly', async () => {
    const show = ref(true)
    const { isPresent, isAnimating, safeToRemove } = usePresence(show)

    // Initial state
    expect(isPresent.value).toBe(true)
    expect(isAnimating.value).toBe(false)

    // Toggle off
    show.value = false
    await nextTick()
    expect(isPresent.value).toBe(true) // still present (animating out)
    expect(isAnimating.value).toBe(true)

    // Complete exit animation
    safeToRemove()
    expect(isPresent.value).toBe(false)
    expect(isAnimating.value).toBe(false)

    // Toggle on again
    show.value = true
    await nextTick()
    expect(isPresent.value).toBe(true)
    expect(isAnimating.value).toBe(false)

    // Toggle off again
    show.value = false
    await nextTick()
    expect(isPresent.value).toBe(true)
    expect(isAnimating.value).toBe(true)

    // Complete second exit animation
    safeToRemove()
    expect(isPresent.value).toBe(false)
    expect(isAnimating.value).toBe(false)
  })

  it('isPresent is readonly', () => {
    const show = ref(true)
    const { isPresent } = usePresence(show)

    // isPresent should be a readonly ref — attempting to write should fail silently
    // @ts-expect-error testing readonly at runtime
    expect(() => { isPresent.value = false }).not.toThrow()
    // But value stays unchanged due to Vue readonly
    expect(isPresent.value).toBe(true)
  })

  it('isAnimating is readonly', () => {
    const show = ref(true)
    const { isAnimating } = usePresence(show)

    // @ts-expect-error testing readonly at runtime
    expect(() => { isAnimating.value = true }).not.toThrow()
    expect(isAnimating.value).toBe(false)
  })
})
