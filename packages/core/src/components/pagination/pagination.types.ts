import type { HTMLAttributes } from 'vue'

export interface PaginationProps {
  /**
   * Total number of items to paginate.
   */
  total: number

  /**
   * Number of items per page.
   * @default 10
   */
  pageSize?: number

  /**
   * The controlled current page. Can be bound as `v-model`.
   * @default 1
   */
  page?: number

  /**
   * Number of sibling pages to show on each side of the current page.
   * @default 1
   */
  siblingCount?: number

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface PaginationContentProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface PaginationItemProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface PaginationLinkProps {
  /**
   * The page number this link navigates to.
   */
  page: number

  /**
   * Whether this link represents the currently active page.
   * @default false
   */
  isActive?: boolean

  /**
   * When true, the button is non-interactive.
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface PaginationPreviousProps {
  /**
   * When true, the button is non-interactive.
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface PaginationNextProps {
  /**
   * When true, the button is non-interactive.
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface PaginationEllipsisProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface PaginationFirstProps {
  /**
   * When true, the button is non-interactive.
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface PaginationLastProps {
  /**
   * When true, the button is non-interactive.
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
