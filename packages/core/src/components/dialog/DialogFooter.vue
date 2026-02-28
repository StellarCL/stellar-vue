<script setup lang="ts">
import type { DialogFooterProps } from './dialog.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<DialogFooterProps>()

const classes = computed(() =>
  cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
