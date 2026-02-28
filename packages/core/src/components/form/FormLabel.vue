<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useFormField } from '../../composables/useFormField'
import { cn } from '../../utils'
import { Label } from '../label'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

let fieldContext: ReturnType<typeof useFormField> | null = null
try {
  fieldContext = useFormField()
}
catch {
  // FormLabel can be used outside form context
}
</script>

<template>
  <Label
    :for="fieldContext?.formItemId"
    :class="cn(fieldContext?.error?.value && 'text-destructive', props.class)"
  >
    <slot />
  </Label>
</template>
