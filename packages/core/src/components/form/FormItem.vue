<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div :class="cn('space-y-2', props.class)">
    <slot />
  </div>
</template>
