<script setup lang="ts">
import type { CardTitleProps } from './card.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = withDefaults(defineProps<CardTitleProps>(), {
  as: 'h3',
})

const classes = computed(() =>
  cn(
    'text-base font-semibold leading-none tracking-tight text-slate-700 dark:text-navy-50',
    props.class,
  ),
)
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
