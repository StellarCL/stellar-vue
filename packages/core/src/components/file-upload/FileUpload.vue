<script setup lang="ts">
import type { FileUploadProps, FileWithPreview } from './file-upload.types'
import { provide } from 'vue'
import { useFileUpload } from '../../composables/useFileUpload'
import { cn } from '../../utils'

const props = withDefaults(defineProps<FileUploadProps>(), {
  multiple: false,
  disabled: false,
})

const model = defineModel<FileWithPreview[]>({ default: () => [] })

const { files, addFiles, removeFile, clearFiles, isDragging, errors } = useFileUpload({
  accept: props.accept,
  maxSize: props.maxSize,
  maxFiles: props.maxFiles,
  multiple: props.multiple,
  onFilesAdded: (added) => {
    model.value = [...model.value, ...added]
  },
  onFileRemoved: (removed) => {
    model.value = model.value.filter(f => f.id !== removed.id)
  },
})

function handleRemove(id: string) {
  removeFile(id)
}

// Provide context to child components
provide('fileUpload', {
  files,
  addFiles,
  removeFile: handleRemove,
  clearFiles,
  isDragging,
  errors,
  accept: props.accept,
  maxSize: props.maxSize,
  maxFiles: props.maxFiles,
  multiple: props.multiple,
  disabled: props.disabled,
})
</script>

<template>
  <div :class="cn('flex flex-col gap-4', props.class)">
    <slot
      :files="files"
      :add-files="addFiles"
      :remove-file="handleRemove"
      :clear-files="clearFiles"
      :is-dragging="isDragging"
      :errors="errors"
      :disabled="disabled"
    />
  </div>
</template>
