import { vi } from 'vitest'

// Mock Element.animate for jsdom (Web Animation API)
if (!Element.prototype.animate) {
  Element.prototype.animate = vi.fn().mockImplementation(
    (_keyframes: Keyframe[] | PropertyIndexedKeyframes | null, _options?: number | KeyframeAnimationOptions) => {
      const animation = {
        finished: Promise.resolve(),
        cancel: vi.fn(),
        pause: vi.fn(),
        play: vi.fn(),
        finish: vi.fn(),
        onfinish: null as ((this: Animation, ev: AnimationPlaybackEvent) => unknown) | null,
        oncancel: null as ((this: Animation, ev: AnimationPlaybackEvent) => unknown) | null,
        playState: 'finished' as AnimationPlayState,
        currentTime: 0,
        startTime: 0,
        id: '',
        effect: null,
        timeline: null,
        playbackRate: 1,
        pending: false,
        ready: Promise.resolve() as unknown as Promise<Animation>,
        commitStyles: vi.fn(),
        persist: vi.fn(),
        reverse: vi.fn(),
        updatePlaybackRate: vi.fn(),
        replaceState: 'active' as AnimationReplaceState,
        dispatchEvent: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      } as unknown as Animation
      return animation
    }
  ) as typeof Element.prototype.animate
}
