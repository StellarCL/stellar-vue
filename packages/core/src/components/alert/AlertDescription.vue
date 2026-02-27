<script setup lang="ts">
import { computed } from 'vue'
import type { AlertDescriptionProps } from './alert.types'
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
