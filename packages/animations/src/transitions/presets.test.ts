import { describe, expect, it } from 'vitest'
import { transitionPresets, type TransitionPreset, type TransitionPresetName } from './presets'

const REQUIRED_KEYS: (keyof TransitionPreset)[] = [
  'enterActiveClass',
  'leaveActiveClass',
  'enterFromClass',
  'enterToClass',
  'leaveFromClass',
  'leaveToClass',
]

const EXPECTED_PRESETS: TransitionPresetName[] = [
  'fade',
  'fadeUp',
  'fadeDown',
  'fadeLeft',
  'fadeRight',
  'slideUp',
  'slideDown',
  'slideLeft',
  'slideRight',
  'scale',
  'scaleUp',
  'scaleDown',
  'expand',
  'collapse',
  'bounce',
  'shake',
  'blur',
]

describe('transitionPresets', () => {
  it('has all 17+ required presets', () => {
    const keys = Object.keys(transitionPresets)
    expect(keys.length).toBeGreaterThanOrEqual(17)
    for (const name of EXPECTED_PRESETS) {
      expect(keys).toContain(name)
    }
  })

  it('each preset has all 6 required class properties', () => {
    for (const [name, preset] of Object.entries(transitionPresets)) {
      for (const key of REQUIRED_KEYS) {
        expect(preset, `preset "${name}" is missing property "${key}"`).toHaveProperty(key)
      }
    }
  })

  it('each class property is a non-empty string', () => {
    for (const [name, preset] of Object.entries(transitionPresets)) {
      for (const key of REQUIRED_KEYS) {
        const value = preset[key as keyof typeof preset]
        expect(typeof value, `preset "${name}.${key}" should be a string`).toBe('string')
        expect(value.length, `preset "${name}.${key}" should not be empty`).toBeGreaterThan(0)
      }
    }
  })

  describe('fade preset', () => {
    it('has opacity in enterFromClass', () => {
      expect(transitionPresets.fade.enterFromClass).toContain('opacity-0')
    })

    it('has opacity-100 in enterToClass', () => {
      expect(transitionPresets.fade.enterToClass).toContain('opacity-100')
    })

    it('has opacity in leaveToClass', () => {
      expect(transitionPresets.fade.leaveToClass).toContain('opacity-0')
    })

    it('has transition-opacity in enterActiveClass', () => {
      expect(transitionPresets.fade.enterActiveClass).toContain('transition-opacity')
    })

    it('has transition-opacity in leaveActiveClass', () => {
      expect(transitionPresets.fade.leaveActiveClass).toContain('transition-opacity')
    })
  })

  describe('scale preset', () => {
    it('has opacity-0 scale-95 in enterFromClass', () => {
      expect(transitionPresets.scale.enterFromClass).toContain('opacity-0')
      expect(transitionPresets.scale.enterFromClass).toContain('scale-95')
    })

    it('has opacity-0 scale-95 in leaveToClass', () => {
      expect(transitionPresets.scale.leaveToClass).toContain('opacity-0')
      expect(transitionPresets.scale.leaveToClass).toContain('scale-95')
    })

    it('has scale-100 in enterToClass', () => {
      expect(transitionPresets.scale.enterToClass).toContain('scale-100')
    })
  })

  describe('slideUp preset', () => {
    it('has translate-y-full in enterFromClass', () => {
      expect(transitionPresets.slideUp.enterFromClass).toContain('translate-y-full')
    })

    it('has translate-y-0 in enterToClass', () => {
      expect(transitionPresets.slideUp.enterToClass).toContain('translate-y-0')
    })

    it('has translate-y-full in leaveToClass', () => {
      expect(transitionPresets.slideUp.leaveToClass).toContain('translate-y-full')
    })
  })

  describe('slideDown preset', () => {
    it('has -translate-y-full in enterFromClass', () => {
      expect(transitionPresets.slideDown.enterFromClass).toContain('-translate-y-full')
    })
  })

  describe('scaleUp preset', () => {
    it('has scale-75 in enterFromClass', () => {
      expect(transitionPresets.scaleUp.enterFromClass).toContain('scale-75')
    })
  })

  describe('scaleDown preset', () => {
    it('has scale-110 in enterFromClass', () => {
      expect(transitionPresets.scaleDown.enterFromClass).toContain('scale-110')
    })
  })

  describe('blur preset', () => {
    it('has opacity-0 and blur-sm in enterFromClass', () => {
      expect(transitionPresets.blur.enterFromClass).toContain('opacity-0')
      expect(transitionPresets.blur.enterFromClass).toContain('blur-sm')
    })
  })

  describe('expand preset', () => {
    it('has max-h-0 in enterFromClass', () => {
      expect(transitionPresets.expand.enterFromClass).toContain('max-h-0')
    })

    it('has max-h-screen in enterToClass', () => {
      expect(transitionPresets.expand.enterToClass).toContain('max-h-screen')
    })
  })

  describe('TransitionPresetName type', () => {
    it('covers all expected preset keys', () => {
      // Type-level test: if this compiles, the type covers all keys
      const allKeys: TransitionPresetName[] = EXPECTED_PRESETS
      const recordKeys = Object.keys(transitionPresets) as TransitionPresetName[]
      expect(allKeys.every((k) => recordKeys.includes(k))).toBe(true)
    })
  })
})
