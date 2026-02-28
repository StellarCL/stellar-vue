import type { HTMLAttributes } from 'vue'

export interface SelectProps {
  /**
   * The controlled value of the Select. Can be bound as `v-model`.
   * @default undefined
   */
  modelValue?: string

  /**
   * Whether the Select is disabled.
   * @default false
   */
  disabled?: boolean

  /**
   * The open state of the select when it is initially rendered.
   * @default false
   */
  defaultOpen?: boolean
}

export interface SelectTriggerProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SelectValueProps {
  /** Placeholder text when no value is selected */
  placeholder?: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SelectContentProps {
  /**
   * The positioning mode of the select content.
   * @default 'popper'
   */
  position?: 'popper' | 'item-aligned'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SelectItemProps {
  /** The value of the item. Required. */
  value: string

  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SelectGroupProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SelectLabelProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SelectSeparatorProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SelectScrollUpButtonProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SelectScrollDownButtonProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
