<script setup lang="ts">
import { computed } from 'vue'
import type { CardTitleProps } from './card.types'
import { cn } from '../../utils'

const props = withDefaults(defineProps<CardTitleProps>(), {
  as: 'h3',
})

const classes = computed(() =>
  cn('text-2xl font-semibold leading-none tracking-tight', props.class),
)
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
