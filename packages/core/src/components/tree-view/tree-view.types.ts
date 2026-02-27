import type { Component, HTMLAttributes } from 'vue'

export interface TreeNode {
  /** Unique key for the node */
  key: string

  /** Display label */
  label: string

  /** Child nodes */
  children?: TreeNode[]

  /** Optional icon component */
  icon?: Component

  /** Whether the node is disabled */
  disabled?: boolean
}

export interface TreeViewProps {
  /** Tree data */
  data: TreeNode[]

  /** Keys of expanded nodes */
  expandedKeys?: string[]

  /** Keys of selected nodes */
  selectedKeys?: string[]

  /** Selection mode
   * @default 'none'
   */
  selectionMode?: 'single' | 'multiple' | 'none'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface TreeViewItemProps {
  /** The tree node data */
  node: TreeNode

  /** Nesting depth level */
  level?: number

  /** Keys of expanded nodes */
  expandedKeys: string[]

  /** Keys of selected nodes */
  selectedKeys: string[]

  /** Selection mode */
  selectionMode: 'single' | 'multiple' | 'none'

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface TreeViewContext {
  expandedKeys: string[]
  selectedKeys: string[]
  selectionMode: 'single' | 'multiple' | 'none'
  toggleExpand: (key: string) => void
  toggleSelect: (key: string) => void
}
