<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../utils'

interface FormProps {
  /** Additional CSS classes */
  class?: HTMLAttributes['class']
}

const props = defineProps<FormProps>()
</script>

<template>
  <form :class="cn('space-y-6', props.class)">
    <slot />
  </form>
</template>
