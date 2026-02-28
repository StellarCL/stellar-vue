<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue'
import { useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import type { RichTextEditorProps } from './rich-text-editor.types'
import { DEFAULT_TOOLBAR } from './rich-text-editor.types'
import EditorToolbar from './EditorToolbar.vue'
import EditorContentVue from './EditorContent.vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<RichTextEditorProps>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  toolbar: () => DEFAULT_TOOLBAR,
  minHeight: '150px',
  maxHeight: '500px',
  maxLength: 0,
  showCharacterCount: false,
  error: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editor = useEditor({
  content: props.modelValue,
  editable: !props.disabled,
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },
    }),
    Underline,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-primary underline cursor-pointer',
      },
    }),
    Image.configure({
      inline: true,
      HTMLAttributes: {
        class: 'max-w-full h-auto rounded-md',
      },
    }),
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
    ...(props.maxLength > 0
      ? [CharacterCount.configure({ limit: props.maxLength })]
      : [CharacterCount]),
  ],
  onUpdate: ({ editor: ed }) => {
    emit('update:modelValue', ed.getHTML())
  },
})

// Sync external modelValue changes into the editor
watch(
  () => props.modelValue,
  (newValue) => {
    if (editor.value && editor.value.getHTML() !== newValue) {
      editor.value.commands.setContent(newValue, false)
    }
  },
)

// Sync disabled state
watch(
  () => props.disabled,
  (newDisabled) => {
    if (editor.value) {
      editor.value.setEditable(!newDisabled)
    }
  },
)

const characterCount = computed(() => {
  if (!editor.value) return 0
  return editor.value.storage.characterCount.characters()
})

const wordCount = computed(() => {
  if (!editor.value) return 0
  return editor.value.storage.characterCount.words()
})

/** Export editor content as markdown-like text */
function getMarkdown(): string {
  if (!editor.value) return ''
  return editor.value.getHTML()
}

/** Import markdown-like HTML content */
function setContent(content: string): void {
  if (editor.value) {
    editor.value.commands.setContent(content)
  }
}

defineExpose({
  editor,
  getMarkdown,
  setContent,
  characterCount,
  wordCount,
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

const containerClasses = computed(() =>
  cn(
    'overflow-hidden rounded-lg border bg-background text-foreground',
    'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
    props.error && 'border-destructive focus-within:ring-destructive',
    props.disabled && 'opacity-50 cursor-not-allowed',
    props.class,
  ),
)
</script>

<template>
  <div :class="containerClasses" data-testid="rich-text-editor">
    <EditorToolbar
      :editor="editor ?? null"
      :items="toolbar"
      :disabled="disabled"
    />
    <EditorContentVue
      :editor="editor ?? null"
      :min-height="minHeight"
      :max-height="maxHeight"
    />
    <div
      v-if="showCharacterCount"
      class="flex items-center justify-end gap-2 border-t bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground"
      data-testid="character-count"
    >
      <span>{{ characterCount }}<template v-if="maxLength > 0"> / {{ maxLength }}</template> characters</span>
      <span class="text-border">|</span>
      <span>{{ wordCount }} words</span>
    </div>
  </div>
</template>
