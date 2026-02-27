<script setup lang="ts">
import { computed } from 'vue'
import type { CardProps } from './card.types'
import { cardVariants } from './card.variants'
import { cn } from '../../utils'

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
})

const classes = computed(() =>
  cn(
    cardVariants({ variant: props.variant }),
    props.class,
  ),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
