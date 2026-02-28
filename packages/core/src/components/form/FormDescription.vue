<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useFormField } from '../../composables/useFormField'
import { cn } from '../../utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

let fieldContext: ReturnType<typeof useFormField> | null = null
try {
  fieldContext = useFormField()
}
catch {
  // FormDescription can be used outside form context
}
</script>

<template>
  <p :id="fieldContext?.formDescriptionId" :class="cn('text-sm text-muted-foreground', props.class)">
    <slot />
  </p>
</template>
