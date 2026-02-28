<script setup lang="ts">
import { computed } from 'vue'
import { EditorContent as TiptapEditorContent } from '@tiptap/vue-3'
import type { EditorContentProps } from './rich-text-editor.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<EditorContentProps>(), {
  minHeight: '150px',
  maxHeight: '500px',
})

const classes = computed(() =>
  cn(
    'prose prose-sm max-w-none overflow-y-auto px-4 py-3',
    'focus-within:outline-none',
    '[&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[inherit]',
    '[&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0',
    props.class,
  ),
)

const style = computed(() => ({
  minHeight: props.minHeight,
  maxHeight: props.maxHeight,
}))
</script>

<template>
  <div
    :class="classes"
    :style="style"
  >
    <TiptapEditorContent
      v-if="editor"
      :editor="editor"
    />
  </div>
</template>
