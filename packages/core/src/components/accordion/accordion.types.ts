import type { HTMLAttributes } from 'vue'

export interface AccordionProps {
  /**
   * Determines whether one or multiple items can be opened at the same time
   * @default 'single'
   */
  type?: 'single' | 'multiple'

  /**
   * The controlled value of the item to expand
   */
  modelValue?: string | string[]

  /**
   * When type is "single", allows closing content when clicking trigger for an open item
   * @default false
   */
  collapsible?: boolean

  /**
   * When true, prevents the user from interacting with the accordion and all its items
   * @default false
   */
  disabled?: boolean

  /**
   * Additional CSS classes
   */
  class?: HTMLAttributes['class']
}

export interface AccordionItemProps {
  /**
   * A unique value for the accordion item
   */
  value: string

  /**
   * When true, prevents the user from interacting with this accordion item
   * @default false
   */
  disabled?: boolean

  /**
   * Additional CSS classes
   */
  class?: HTMLAttributes['class']
}

export interface AccordionTriggerProps {
  /**
   * Additional CSS classes
   */
  class?: HTMLAttributes['class']
}

export interface AccordionContentProps {
  /**
   * Additional CSS classes
   */
  class?: HTMLAttributes['class']
}
