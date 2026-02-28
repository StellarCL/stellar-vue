<script setup lang="ts">
import { inject, ref, computed } from 'vue'
import type { FileUploadDropzoneProps } from './file-upload.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<FileUploadDropzoneProps>(), {
  multiple: false,
  disabled: false,
})

const emit = defineEmits<{
  filesDropped: [files: File[]]
}>()

// Inject context from parent FileUpload if available
const context = inject<{
  addFiles: (files: File[]) => void
  isDragging: { value: boolean }
  accept?: string
  maxFiles?: number
  multiple?: boolean
  disabled?: boolean
} | null>('fileUpload', null)

const localIsDragging = ref(false)

const isDragging = computed(() => {
  if (context) return context.isDragging.value
  return localIsDragging.value
})

const isDisabled = computed(() => props.disabled || context?.disabled)

const dropzoneClasses = computed(() =>
  cn(
    'relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center transition-colors',
    isDragging.value
      ? 'border-primary bg-primary/5 text-primary'
      : 'border-muted-foreground/25 hover:border-muted-foreground/50',
    isDisabled.value && 'cursor-not-allowed opacity-50',
    !isDisabled.value && !isDragging.value && 'cursor-pointer',
    props.class,
  ),
)

function handleDragEnter(event: DragEvent) {
  if (isDisabled.value) return
  event.preventDefault()
  localIsDragging.value = true
  if (context) context.isDragging.value = true
}

function handleDragOver(event: DragEvent) {
  if (isDisabled.value) return
  event.preventDefault()
}

function handleDragLeave(event: DragEvent) {
  const target = event.currentTarget as HTMLElement
  const related = event.relatedTarget as Node | null
  if (related && target.contains(related)) return
  localIsDragging.value = false
  if (context) context.isDragging.value = false
}

function handleDrop(event: DragEvent) {
  if (isDisabled.value) return
  event.preventDefault()
  localIsDragging.value = false
  if (context) context.isDragging.value = false

  const droppedFiles = Array.from(event.dataTransfer?.files ?? [])
  if (droppedFiles.length === 0) return

  const filesToAdd = props.multiple ?? context?.multiple ? droppedFiles : droppedFiles.slice(0, 1)

  if (context) {
    context.addFiles(filesToAdd)
  } else {
    emit('filesDropped', filesToAdd)
  }
}

function handleClick() {
  if (isDisabled.value) return
  // FileUploadTrigger handles the actual input click; clicking the dropzone
  // triggers the hidden file input if one exists inside via slot
  const input = document.querySelector<HTMLInputElement>('[data-stellar-file-input]')
  input?.click()
}
</script>

<template>
  <div
    :class="dropzoneClasses"
    :aria-disabled="isDisabled || undefined"
    role="button"
    tabindex="0"
    @dragenter="handleDragEnter"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <slot>
      <div class="flex flex-col items-center gap-2 text-muted-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
        <p class="text-sm font-medium">
          <span v-if="isDragging">Drop files here</span>
          <span v-else>Drag &amp; drop files here, or click to browse</span>
        </p>
        <p v-if="accept" class="text-xs">Accepted: {{ accept }}</p>
        <p v-if="maxSize" class="text-xs">Max size: {{ (maxSize / 1024 / 1024).toFixed(1) }} MB</p>
      </div>
    </slot>
  </div>
</template>
