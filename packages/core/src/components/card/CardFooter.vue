<script setup lang="ts">
import { computed } from 'vue'
import type { CardFooterProps } from './card.types'
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
