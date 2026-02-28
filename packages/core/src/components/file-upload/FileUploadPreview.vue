<script setup lang="ts">
import type { FileUploadPreviewProps } from './file-upload.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<FileUploadPreviewProps>(), {})

const isImage = computed(() => props.file.file.type.startsWith('image/'))

const fileSizeLabel = computed(() => {
  const bytes = props.file.file.size
  if (bytes < 1024)
    return `${bytes} B`
  if (bytes < 1024 * 1024)
    return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
})
</script>

<template>
  <div :class="cn('relative flex items-center gap-3 rounded-md border bg-background p-2', props.class)">
    <!-- Image thumbnail -->
    <div class="flex-shrink-0">
      <img
        v-if="isImage && file.previewUrl"
        :src="file.previewUrl"
        :alt="file.file.name"
        class="h-12 w-12 rounded object-cover"
      >
      <div
        v-else
        class="flex h-12 w-12 items-center justify-center rounded bg-muted text-muted-foreground"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </div>
    </div>

    <!-- File info -->
    <div class="min-w-0 flex-1">
      <p class="truncate text-sm font-medium text-foreground">
        {{ file.file.name }}
      </p>
      <p class="text-xs text-muted-foreground">
        {{ fileSizeLabel }}
      </p>
      <p v-if="file.error" class="text-xs text-destructive" role="alert">
        {{ file.error }}
      </p>
    </div>

    <!-- Slot for additional actions (e.g. remove button) -->
    <slot :file="file" />
  </div>
</template>
