import type { HTMLAttributes } from 'vue'

export interface NavigationMenuProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface NavigationMenuListProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface NavigationMenuItemProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface NavigationMenuTriggerProps {
  /**
   * When true, prevents the user from interacting with the trigger.
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface NavigationMenuContentProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface NavigationMenuLinkProps {
  /**
   * Whether this link is the currently active page link.
   * @default false
   */
  active?: boolean

  /** The URL the link points to */
  href?: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface NavigationMenuViewportProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface NavigationMenuIndicatorProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
