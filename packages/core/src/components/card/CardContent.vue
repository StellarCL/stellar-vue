<script setup lang="ts">
import type { CardContentProps } from './card.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<CardContentProps>()

const classes = computed(() =>
  cn('p-6 pt-0', props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
