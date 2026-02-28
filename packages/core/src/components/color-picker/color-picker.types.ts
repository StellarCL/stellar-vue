import type { HTMLAttributes } from 'vue'

export interface ColorPickerProps {
  /**
   * The current color value (hex string, v-model)
   * @default '#000000'
   */
  modelValue?: string

  /**
   * Show alpha slider
   * @default false
   */
  showAlpha?: boolean

  /** Preset color swatches */
  presets?: string[]

  /**
   * Color format for the input
   * @default 'hex'
   */
  format?: 'hex' | 'rgb' | 'hsl'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ColorPickerAreaProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ColorPickerHueSliderProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ColorPickerAlphaSliderProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ColorPickerInputProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ColorPickerSwatchesProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ColorPickerPreviewProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ColorPickerContext {
  hue: number
  saturation: number
  brightness: number
  alpha: number
  hexValue: string
  format: 'hex' | 'rgb' | 'hsl'
  showAlpha: boolean
  presets: string[]
  setHue: (h: number) => void
  setSaturation: (s: number) => void
  setBrightness: (b: number) => void
  setAlpha: (a: number) => void
  setFromHex: (hex: string) => void
}
