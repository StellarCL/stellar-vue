<script setup lang="ts">
import type { CardFooterProps } from './card.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<CardFooterProps>()

const classes = computed(() =>
  cn('flex items-center p-6 pt-0', props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
