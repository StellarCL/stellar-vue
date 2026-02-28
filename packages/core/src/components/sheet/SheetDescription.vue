<script setup lang="ts">
import type { SheetDescriptionProps } from './sheet.types'
import { DialogDescription } from 'radix-vue'
import { computed } from 'vue'
import { cn } from '../../utils'

const props = defineProps<SheetDescriptionProps>()

const classes = computed(() =>
  cn('text-sm text-muted-foreground', props.class),
)
</script>

<template>
  <DialogDescription :class="classes">
    <slot />
  </DialogDescription>
</template>
