import type { HTMLAttributes } from 'vue'

export interface TabsProps {
  /**
   * The controlled value of the active tab. Can be bound as `v-model`.
   * @default undefined
   */
  modelValue?: string

  /**
   * The value of the tab that should be active when initially rendered.
   * Use when you do not need to control the state of the tabs.
   * @default undefined
   */
  defaultValue?: string

  /**
   * The orientation of the tabs component.
   * Affects arrow key navigation direction.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface TabsListProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface TabsTriggerProps {
  /** A unique value that associates the trigger with a content panel. */
  value: string

  /**
   * When `true`, prevents the user from interacting with the tab.
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface TabsContentProps {
  /** A unique value that associates the content with a trigger. */
  value: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
