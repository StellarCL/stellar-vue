<script setup lang="ts">
import { computed } from 'vue'
import type { CardDescriptionProps } from './card.types'
import { cn } from '../../utils'

const props = defineProps<CardDescriptionProps>()

const classes = computed(() =>
  cn('text-sm text-muted-foreground', props.class),
)
</script>

<template>
  <p :class="classes">
    <slot />
  </p>
</template>
