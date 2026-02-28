<script setup lang="ts">
import type { FileUploadTriggerProps } from './file-upload.types'
import { computed, inject, ref } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<FileUploadTriggerProps>(), {
  multiple: false,
  disabled: false,
})

const emit = defineEmits<{
  filesSelected: [files: File[]]
}>()

const context = inject<{
  addFiles: (files: File[]) => void
  accept?: string
  multiple?: boolean
  disabled?: boolean
} | null>('fileUpload', null)

const inputRef = ref<HTMLInputElement | null>(null)

const isDisabled = computed(() => props.disabled || context?.disabled)
const acceptValue = computed(() => props.accept ?? context?.accept)
const multipleValue = computed(() => props.multiple || context?.multiple)

function openFilePicker() {
  if (!isDisabled.value) {
    inputRef.value?.click()
  }
}

function handleChange(event: Event) {
  const input = event.target as HTMLInputElement
  const selected = Array.from(input.files ?? [])
  if (selected.length === 0)
    return

  if (context) {
    context.addFiles(selected)
  }
  else {
    emit('filesSelected', selected)
  }

  // Reset input so same file can be re-selected
  input.value = ''
}
</script>

<template>
  <div :class="cn('inline-flex', props.class)">
    <input
      ref="inputRef"
      type="file"
      class="sr-only"
      data-stellar-file-input
      :accept="acceptValue"
      :multiple="multipleValue"
      :disabled="isDisabled"
      @change="handleChange"
    >
    <slot :open="openFilePicker" :disabled="isDisabled">
      <button
        type="button"
        :disabled="isDisabled"
        class="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        @click="openFilePicker"
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
            d="M12 4v16m8-8H4"
          />
        </svg>
        Choose file{{ multipleValue ? 's' : '' }}
      </button>
    </slot>
  </div>
</template>
