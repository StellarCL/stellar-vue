<script setup lang="ts">
import { computed } from 'vue'
import type { DrawerHeaderProps } from './drawer.types'
import { cn } from '../../utils'

const props = defineProps<DrawerHeaderProps>()

const classes = computed(() =>
  cn('flex flex-col space-y-1.5 p-6', props.class),
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
