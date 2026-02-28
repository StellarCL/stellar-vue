<script setup lang="ts">
import type { BadgeProps } from './badge.types'
import { computed } from 'vue'
import { cn } from '../../utils'
import { badgeVariants } from './badge.variants'

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
})

const classes = computed(() =>
  cn(
    badgeVariants({ variant: props.variant }),
    props.class,
  ),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
