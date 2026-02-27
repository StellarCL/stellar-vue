import type { HTMLAttributes } from 'vue'

export interface BreadcrumbProps {
  /**
   * The accessible label for the breadcrumb navigation landmark.
   * @default 'Breadcrumb'
   */
  ariaLabel?: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface BreadcrumbListProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface BreadcrumbItemProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface BreadcrumbLinkProps {
  /**
   * The URL the link points to.
   * @default undefined
   */
  href?: string

  /**
   * When true, renders as a plain span instead of an anchor element.
   * @default false
   */
  asChild?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface BreadcrumbPageProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface BreadcrumbSeparatorProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface BreadcrumbEllipsisProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
