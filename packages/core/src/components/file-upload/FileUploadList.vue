<script setup lang="ts">
import type { FileUploadListProps } from './file-upload.types'
import { computed, inject } from 'vue'
import { cn } from '../../utils'
import FileUploadPreview from './FileUploadPreview.vue'
import FileUploadProgress from './FileUploadProgress.vue'

const props = withDefaults(defineProps<FileUploadListProps>(), {
  files: () => [],
})

const emit = defineEmits<{
  remove: [id: string]
}>()

const context = inject<{
  removeFile: (id: string) => void
} | null>('fileUpload', null)

const displayFiles = computed(() => {
  return props.files
})

function handleRemove(id: string) {
  if (context) {
    context.removeFile(id)
  }
  else {
    emit('remove', id)
  }
}
</script>

<template>
  <ul
    v-if="displayFiles.length > 0"
    :class="cn('flex flex-col gap-2', props.class)"
    role="list"
    aria-label="Uploaded files"
  >
    <li v-for="file in displayFiles" :key="file.id" class="list-none">
      <FileUploadPreview :file="file">
        <template #default>
          <slot name="item" :file="file" :remove="() => handleRemove(file.id)">
            <button
              type="button"
              class="ml-auto flex-shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              :aria-label="`Remove ${file.file.name}`"
              @click="handleRemove(file.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </slot>
        </template>
      </FileUploadPreview>

      <!-- Progress bar (shown when uploading) -->
      <FileUploadProgress
        v-if="file.progress > 0 && file.progress < 100"
        :progress="file.progress"
        class="mt-1"
      />

      <!-- Error message -->
      <p v-if="file.error" class="mt-1 text-xs text-destructive" role="alert">
        {{ file.error }}
      </p>
    </li>
  </ul>

  <slot v-else name="empty">
    <!-- Empty state — rendered by default if no files -->
  </slot>
</template>
