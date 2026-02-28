<script setup lang="ts">
import type { AlertTitleProps } from './alert.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<AlertTitleProps>()

const classes = computed(() =>
  cn('mb-1 font-medium leading-none tracking-tight', props.class),
)
</script>

<template>
  <h5 :class="classes">
    <slot />
  </h5>
</template>
