import type { HTMLAttributes } from 'vue'

export interface SidebarProps {
  /** Whether the sidebar is collapsed (v-model) */
  collapsed?: boolean

  /** Width when collapsed
   * @default '4rem'
   */
  collapsedWidth?: string

  /** Width when expanded
   * @default '16rem'
   */
  width?: string

  /** Whether the sidebar can be collapsed
   * @default true
   */
  collapsible?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SidebarContentProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SidebarHeaderProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SidebarFooterProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SidebarGroupProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SidebarGroupLabelProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SidebarGroupContentProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SidebarMenuProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SidebarMenuItemProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface SidebarMenuButtonProps {
  /** Whether the menu item is active */
  active?: boolean

  /** Whether to render as child element */
  asChild?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
