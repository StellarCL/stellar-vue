<script setup lang="ts">
import type { DrawerDescriptionProps } from './drawer.types'
import { DialogDescription } from 'radix-vue'
import { computed } from 'vue'
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
