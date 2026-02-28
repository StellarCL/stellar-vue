<script setup lang="ts">
import { computed } from 'vue'
import type { ToolbarButtonProps, ToolbarItemCommand } from './rich-text-editor.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<ToolbarButtonProps>(), {
  disabled: false,
})

const commandConfig: Record<ToolbarItemCommand, { label: string; icon: string }> = {
  bold: { label: 'Bold', icon: 'B' },
  italic: { label: 'Italic', icon: 'I' },
  underline: { label: 'Underline', icon: 'U' },
  strikethrough: { label: 'Strikethrough', icon: 'S' },
  heading1: { label: 'Heading 1', icon: 'H1' },
  heading2: { label: 'Heading 2', icon: 'H2' },
  heading3: { label: 'Heading 3', icon: 'H3' },
  bulletList: { label: 'Bullet List', icon: 'UL' },
  orderedList: { label: 'Ordered List', icon: 'OL' },
  blockquote: { label: 'Blockquote', icon: 'BQ' },
  codeBlock: { label: 'Code Block', icon: '<>' },
  link: { label: 'Link', icon: 'LN' },
  image: { label: 'Image', icon: 'IM' },
  undo: { label: 'Undo', icon: '\u21A9' },
  redo: { label: 'Redo', icon: '\u21AA' },
}

const config = computed(() => commandConfig[props.command])

const isActive = computed(() => {
  if (!props.editor) return false
  switch (props.command) {
    case 'bold':
      return props.editor.isActive('bold')
    case 'italic':
      return props.editor.isActive('italic')
    case 'underline':
      return props.editor.isActive('underline')
    case 'strikethrough':
      return props.editor.isActive('strike')
    case 'heading1':
      return props.editor.isActive('heading', { level: 1 })
    case 'heading2':
      return props.editor.isActive('heading', { level: 2 })
    case 'heading3':
      return props.editor.isActive('heading', { level: 3 })
    case 'bulletList':
      return props.editor.isActive('bulletList')
    case 'orderedList':
      return props.editor.isActive('orderedList')
    case 'blockquote':
      return props.editor.isActive('blockquote')
    case 'codeBlock':
      return props.editor.isActive('codeBlock')
    case 'link':
      return props.editor.isActive('link')
    default:
      return false
  }
})

function executeCommand() {
  if (!props.editor || props.disabled) return

  switch (props.command) {
    case 'bold':
      props.editor.chain().focus().toggleBold().run()
      break
    case 'italic':
      props.editor.chain().focus().toggleItalic().run()
      break
    case 'underline':
      props.editor.chain().focus().toggleUnderline().run()
      break
    case 'strikethrough':
      props.editor.chain().focus().toggleStrike().run()
      break
    case 'heading1':
      props.editor.chain().focus().toggleHeading({ level: 1 }).run()
      break
    case 'heading2':
      props.editor.chain().focus().toggleHeading({ level: 2 }).run()
      break
    case 'heading3':
      props.editor.chain().focus().toggleHeading({ level: 3 }).run()
      break
    case 'bulletList':
      props.editor.chain().focus().toggleBulletList().run()
      break
    case 'orderedList':
      props.editor.chain().focus().toggleOrderedList().run()
      break
    case 'blockquote':
      props.editor.chain().focus().toggleBlockquote().run()
      break
    case 'codeBlock':
      props.editor.chain().focus().toggleCodeBlock().run()
      break
    case 'link': {
      if (props.editor.isActive('link')) {
        props.editor.chain().focus().unsetLink().run()
      } else {
        const url = window.prompt('Enter URL:')
        if (url) {
          props.editor.chain().focus().setLink({ href: url }).run()
        }
      }
      break
    }
    case 'image': {
      const src = window.prompt('Enter image URL:')
      if (src) {
        props.editor.chain().focus().setImage({ src }).run()
      }
      break
    }
    case 'undo':
      props.editor.chain().focus().undo().run()
      break
    case 'redo':
      props.editor.chain().focus().redo().run()
      break
  }
}

const classes = computed(() =>
  cn(
    'inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors',
    'hover:bg-accent hover:text-accent-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    isActive.value && 'bg-accent text-accent-foreground',
    props.class,
  ),
)
</script>

<template>
  <button
    type="button"
    :class="classes"
    :disabled="disabled || !editor"
    :title="config.label"
    :aria-label="config.label"
    :aria-pressed="isActive"
    :data-active="isActive || undefined"
    @click="executeCommand"
  >
    <span class="text-xs font-semibold">{{ config.icon }}</span>
  </button>
</template>
