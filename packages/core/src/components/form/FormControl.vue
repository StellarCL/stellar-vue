<script setup lang="ts">
import { useFormField } from '../../composables/useFormField'
import { computed } from 'vue'

let fieldContext: ReturnType<typeof useFormField> | null = null
try {
  fieldContext = useFormField()
} catch {
  // Can be used outside form context
}

const ariaDescribedBy = computed(() => {
  if (!fieldContext) return undefined
  const parts: string[] = []
  parts.push(fieldContext.formDescriptionId)
  if (fieldContext.error.value) {
    parts.push(fieldContext.formMessageId)
  }
  return parts.join(' ') || undefined
})
</script>

<template>
  <slot
    :id="fieldContext?.formItemId"
    :aria-describedby="ariaDescribedBy"
    :aria-invalid="fieldContext?.error?.value ? true : undefined"
  />
</template>
