<script setup lang="ts">
import type { AlertProps } from './alert.types'
import { computed } from 'vue'
import { cn } from '../../utils'
import { alertVariants } from './alert.variants'

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
