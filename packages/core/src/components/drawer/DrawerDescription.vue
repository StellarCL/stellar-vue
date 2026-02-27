<script setup lang="ts">
import { computed } from 'vue'
import { DialogDescription } from 'radix-vue'
import type { DrawerDescriptionProps } from './drawer.types'
import { cn } from '../../utils'

const props = defineProps<DrawerDescriptionProps>()

const classes = computed(() =>
  cn('text-sm text-muted-foreground', props.class),
)
</script>

<template>
  <DialogDescription :class="classes">
    <slot />
  </DialogDescription>
</template>
