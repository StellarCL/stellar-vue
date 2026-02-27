import type { HTMLAttributes } from 'vue'

export interface AppShellProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ShellHeaderProps {
  /** Height of the header
   * @default '4rem'
   */
  height?: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ShellSidebarProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ShellMainProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ShellFooterProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
