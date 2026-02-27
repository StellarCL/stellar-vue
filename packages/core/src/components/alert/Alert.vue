<script setup lang="ts">
import { computed } from 'vue'
import type { AlertProps } from './alert.types'
import { alertVariants } from './alert.variants'
import { cn } from '../../utils'

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'default',
})

const classes = computed(() =>
  cn(
    alertVariants({ variant: props.variant }),
    props.class,
  ),
)
</script>

<template>
  <div
    :class="classes"
    role="alert"
  >
    <slot />
  </div>
</template>
