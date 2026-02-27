<script setup lang="ts">
import { computed } from 'vue'
import type { BadgeProps } from './badge.types'
import { badgeVariants } from './badge.variants'
import { cn } from '../../utils'

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
