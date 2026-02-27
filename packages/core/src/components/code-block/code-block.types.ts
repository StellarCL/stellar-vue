import type { HTMLAttributes } from 'vue'

export interface CodeBlockProps {
  /** The code content to display */
  code: string

  /** The programming language */
  language?: string

  /** Show line numbers
   * @default true
   */
  showLineNumbers?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CodeBlockHeaderProps {
  /** The programming language label */
  language?: string

  /** The code to copy */
  code?: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface CodeBlockContentProps {
  /** The code content to display (optional, falls back to parent CodeBlock's code) */
  code?: string

  /** Show line numbers
   * @default true
   */
  showLineNumbers?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
