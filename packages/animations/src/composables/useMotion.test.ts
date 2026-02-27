import { describe, expect, it, vi, beforeEach } from 'vitest'
import { useMotion } from './useMotion'

// Mock Element.animate since jsdom doesn't support Web Animation API
function createMockAnimation(resolveImmediately = true) {
  let resolveFinished: () => void
  let rejectFinished: (reason?: unknown) => void
  const finished = new Promise<Animation>((resolve, reject) => {
    resolveFinished = () => resolve({} as Animation)
    rejectFinished = reject
  })

  const animation = {
    finished,
    cancel: vi.fn(() => {
      rejectFinished(new DOMException('The user aborted a request.', 'AbortError'))
    }),
    pause: vi.fn(),
    play: vi.fn(),
    finish: vi.fn(),
    onfinish: null,
    oncancel: null,
    playState: 'running' as AnimationPlayState,
    currentTime: 0,
    startTime: null,
    id: '',
    effect: null,
    timeline: null,
    playbackRate: 1,
    pending: false,
    ready: Promise.resolve({} as Animation),
    commitStyles: vi.fn(),
    persist: vi.fn(),
    reverse: vi.fn(),
    updatePlaybackRate: vi.fn(),
    replaceState: 'active' as AnimationReplaceState,
    dispatchEvent: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    _resolve: resolveFinished!,
  } as unknown as Animation & { _resolve: () => void }

  if (resolveImmediately) {
    // Resolve on next microtask
    Promise.resolve().then(() => resolveFinished())
  }

  return animation
}

describe('useMotion', () => {
  let mockEl: HTMLElement
  let animateSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockEl = document.createElement('div')
    animateSpy = vi.fn()
    mockEl.animate = animateSpy
  })

  it('isAnimating starts as false', () => {
    const { isAnimating } = useMotion()
    expect(isAnimating.value).toBe(false)
  })

  it('animate sets isAnimating to true while running', async () => {
    let resolveAnimation!: () => void
    const mockAnim = {
      finished: new Promise<Animation>((res) => { resolveAnimation = () => res({} as Animation) }),
      cancel: vi.fn(),
    } as unknown as Animation

    animateSpy.mockReturnValue(mockAnim)

    const { isAnimating, animate } = useMotion()
    const animatePromise = animate(mockEl, [{ opacity: '0' }, { opacity: '1' }])

    expect(isAnimating.value).toBe(true)

    resolveAnimation()
    await animatePromise

    expect(isAnimating.value).toBe(false)
  })

  it('animate resolves when animation finishes', async () => {
    const mockAnim = createMockAnimation(true)
    animateSpy.mockReturnValue(mockAnim)

    const { animate } = useMotion()
    await expect(animate(mockEl, [{ opacity: '0' }, { opacity: '1' }])).resolves.toBeUndefined()
  })

  it('animate calls Element.animate with correct arguments', async () => {
    const mockAnim = createMockAnimation(true)
    animateSpy.mockReturnValue(mockAnim)

    const { animate } = useMotion()
    const keyframes = [{ opacity: '0' }, { opacity: '1' }]
    await animate(mockEl, keyframes, { duration: 500, easing: 'ease-in' })

    expect(animateSpy).toHaveBeenCalledWith(keyframes, expect.objectContaining({
      duration: 500,
      easing: 'ease-in',
    }))
  })

  it('animate uses default options when none provided', async () => {
    const mockAnim = createMockAnimation(true)
    animateSpy.mockReturnValue(mockAnim)

    const { animate } = useMotion({ duration: 400, easing: 'linear' })
    await animate(mockEl, [{ opacity: '0' }, { opacity: '1' }])

    expect(animateSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ duration: 400, easing: 'linear' })
    )
  })

  it('cancel stops current animation and sets isAnimating to false', async () => {
    let resolveAnimation!: () => void
    const cancelSpy = vi.fn()
    const mockAnim = {
      finished: new Promise<Animation>((res, rej) => {
        resolveAnimation = () => res({} as Animation)
        // cancel rejects the promise
      }),
      cancel: cancelSpy,
    } as unknown as Animation

    // Make cancel also reject the finished promise
    let rejectAnimation!: (e: unknown) => void
    const mockAnim2 = {
      finished: new Promise<Animation>((res, rej) => {
        resolveAnimation = () => res({} as Animation)
        rejectAnimation = rej
      }),
      cancel: vi.fn(() => {
        rejectAnimation(new DOMException('Aborted', 'AbortError'))
      }),
    } as unknown as Animation

    animateSpy.mockReturnValue(mockAnim2)

    const { isAnimating, animate, cancel } = useMotion()
    const animatePromise = animate(mockEl, [{ opacity: '0' }, { opacity: '1' }])

    expect(isAnimating.value).toBe(true)

    cancel()

    expect(isAnimating.value).toBe(false)

    // Wait for the promise to settle (it should not throw)
    await expect(animatePromise).resolves.toBeUndefined()
  })

  it('cancel does nothing when no animation is running', () => {
    const { isAnimating, cancel } = useMotion()
    expect(isAnimating.value).toBe(false)
    expect(() => cancel()).not.toThrow()
    expect(isAnimating.value).toBe(false)
  })

  it('multiple sequential animations work correctly', async () => {
    const createSeqAnim = () => {
      let resolve!: () => void
      const anim = {
        finished: new Promise<Animation>((res) => { resolve = () => res({} as Animation) }),
        cancel: vi.fn(),
        _resolve: () => resolve(),
      } as unknown as Animation & { _resolve: () => void }
      return anim
    }

    const anim1 = createSeqAnim()
    const anim2 = createSeqAnim()

    animateSpy
      .mockReturnValueOnce(anim1)
      .mockReturnValueOnce(anim2)

    const { isAnimating, animate } = useMotion()

    // Start first animation
    const p1 = animate(mockEl, [{ opacity: '0' }, { opacity: '1' }])
    expect(isAnimating.value).toBe(true)

    // Finish first animation
    ;(anim1 as unknown as { _resolve: () => void })._resolve()
    await p1
    expect(isAnimating.value).toBe(false)

    // Start second animation
    const p2 = animate(mockEl, [{ transform: 'scale(0)' }, { transform: 'scale(1)' }])
    expect(isAnimating.value).toBe(true)

    // Finish second animation
    ;(anim2 as unknown as { _resolve: () => void })._resolve()
    await p2
    expect(isAnimating.value).toBe(false)

    expect(animateSpy).toHaveBeenCalledTimes(2)
  })

  it('starting a new animation cancels the previous one', async () => {
    let resolve1!: () => void
    let reject1!: (e: unknown) => void
    const cancelSpy = vi.fn()
    const anim1 = {
      finished: new Promise<Animation>((res, rej) => {
        resolve1 = () => res({} as Animation)
        reject1 = rej
      }),
      cancel: vi.fn(() => {
        reject1(new DOMException('Aborted', 'AbortError'))
        cancelSpy()
      }),
    } as unknown as Animation

    const anim2 = {
      finished: Promise.resolve({} as Animation),
      cancel: vi.fn(),
    } as unknown as Animation

    animateSpy
      .mockReturnValueOnce(anim1)
      .mockReturnValueOnce(anim2)

    const { animate } = useMotion()

    // Start first animation (don't await)
    const p1 = animate(mockEl, [{ opacity: '0' }, { opacity: '1' }])

    // Start second animation — should cancel first
    const p2 = animate(mockEl, [{ transform: 'scale(0)' }, { transform: 'scale(1)' }])

    expect(cancelSpy).toHaveBeenCalled()

    await p1
    await p2
  })

  it('isAnimating is readonly', () => {
    const { isAnimating } = useMotion()
    // @ts-expect-error testing readonly at runtime
    expect(() => { isAnimating.value = true }).not.toThrow()
    expect(isAnimating.value).toBe(false)
  })
})
