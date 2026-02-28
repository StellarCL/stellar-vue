<script setup lang="ts">
import type { CardProps } from './card.types'
import { computed } from 'vue'
import { cn } from '../../utils'
import { cardVariants } from './card.variants'

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
