<script setup lang="ts">
import type { AlertDescriptionProps } from './alert.types'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<AlertDescriptionProps>()

const classes = computed(() =>
  cn('text-sm [&_p]:leading-relaxed', props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
