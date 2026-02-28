<script setup lang="ts">
import type { DialogHeaderProps } from './dialog.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<DialogHeaderProps>()

const classes = computed(() =>
  cn('flex flex-col space-y-1.5 text-center sm:text-left', props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
