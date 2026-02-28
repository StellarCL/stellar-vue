import type { HTMLAttributes } from 'vue'
import type { Editor } from '@tiptap/vue-3'

/** A toolbar item can be a command name, 'separator', or a group of commands */
export type ToolbarItemCommand =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'bulletList'
  | 'orderedList'
  | 'blockquote'
  | 'codeBlock'
  | 'link'
  | 'image'
  | 'undo'
  | 'redo'

export type ToolbarItem = ToolbarItemCommand | 'separator' | ToolbarItemCommand[]

export const DEFAULT_TOOLBAR: ToolbarItem[] = [
  ['bold', 'italic', 'underline', 'strikethrough'],
  'separator',
  ['heading1', 'heading2', 'heading3'],
  'separator',
  ['bulletList', 'orderedList'],
  'separator',
  ['blockquote', 'codeBlock'],
  'separator',
  ['link', 'image'],
  'separator',
  ['undo', 'redo'],
]

export interface RichTextEditorProps {
  /** HTML string content (v-model) */
  modelValue?: string

  /** Placeholder text shown when editor is empty */
  placeholder?: string

  /** Whether the editor is disabled
   * @default false
   */
  disabled?: boolean

  /** Toolbar configuration
   * @default DEFAULT_TOOLBAR
   */
  toolbar?: ToolbarItem[]

  /** Minimum height of the editor content area
   * @default '150px'
   */
  minHeight?: string

  /** Maximum height of the editor content area
   * @default '500px'
   */
  maxHeight?: string

  /** Maximum character count (0 = unlimited)
   * @default 0
   */
  maxLength?: number

  /** Whether to show character count
   * @default false
   */
  showCharacterCount?: boolean

  /** Whether the editor is in an error state
   * @default false
   */
  error?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface EditorToolbarProps {
  /** The tiptap editor instance */
  editor: Editor | null

  /** Toolbar items configuration */
  items?: ToolbarItem[]

  /** Whether the toolbar is disabled
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ToolbarButtonProps {
  /** The tiptap editor instance */
  editor: Editor | null

  /** The toolbar command name */
  command: ToolbarItemCommand

  /** Whether the button is disabled
   * @default false
   */
  disabled?: boolean

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ToolbarGroupProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface ToolbarSeparatorProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

export interface EditorContentProps {
  /** The tiptap editor instance */
  editor: Editor | null

  /** Minimum height of the content area
   * @default '150px'
   */
  minHeight?: string

  /** Maximum height of the content area
   * @default '500px'
   */
  maxHeight?: string

  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}
