<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useFormField } from '../../composables/useFormField'
import { cn } from '../../utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

let fieldContext: ReturnType<typeof useFormField> | null = null
try {
  fieldContext = useFormField()
} catch {
  // FormMessage can be used outside form context
}
</script>

<template>
  <p
    v-if="fieldContext?.error?.value"
    :id="fieldContext?.formMessageId"
    role="alert"
    :class="cn('text-sm font-medium text-destructive', props.class)"
  >
    {{ fieldContext.error.value }}
  </p>
</template>
