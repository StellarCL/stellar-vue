import { readonly, ref, type Ref } from 'vue'

export interface UseMotionOptions {
  duration?: number
  easing?: string
  fill?: FillMode
}

export interface UseMotionReturn {
  isAnimating: Readonly<Ref<boolean>>
  animate: (
    el: HTMLElement,
    keyframes: Keyframe[] | PropertyIndexedKeyframes,
    options?: UseMotionOptions
  ) => Promise<void>
  cancel: () => void
}

export function useMotion(defaults?: UseMotionOptions): UseMotionReturn {
  const isAnimating = ref(false)
  let currentAnimation: Animation | null = null

  async function animate(
    el: HTMLElement,
    keyframes: Keyframe[] | PropertyIndexedKeyframes,
    options?: UseMotionOptions,
  ): Promise<void> {
    // Cancel any running animation before starting a new one
    if (currentAnimation) {
      currentAnimation.cancel()
      currentAnimation = null
    }

    const mergedOptions: KeyframeAnimationOptions = {
      duration: options?.duration ?? defaults?.duration ?? 300,
      easing: options?.easing ?? defaults?.easing ?? 'ease',
      fill: options?.fill ?? defaults?.fill ?? 'forwards',
    }

    isAnimating.value = true

    const animation = el.animate(keyframes, mergedOptions)
    currentAnimation = animation

    try {
      await animation.finished
    }
    catch {
      // Animation was cancelled — do not throw
    }
    finally {
      if (currentAnimation === animation) {
        currentAnimation = null
        isAnimating.value = false
      }
    }
  }

  function cancel() {
    if (currentAnimation) {
      currentAnimation.cancel()
      currentAnimation = null
    }
    isAnimating.value = false
  }

  return {
    isAnimating: readonly(isAnimating),
    animate,
    cancel,
  }
}
