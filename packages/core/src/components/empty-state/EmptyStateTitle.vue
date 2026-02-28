<script setup lang="ts">
import type { EmptyStateTitleProps } from './empty-state.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<EmptyStateTitleProps>()

const classes = computed(() =>
  cn('mb-2 text-lg font-semibold text-foreground', props.class),
)
</script>

<template>
  <h3 :class="classes">
    <slot />
  </h3>
</template>
