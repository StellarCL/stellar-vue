<script setup lang="ts">
import { computed } from 'vue'
import { DialogDescription } from 'radix-vue'
import type { SheetDescriptionProps } from './sheet.types'
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
