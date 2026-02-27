<script setup lang="ts">
import { computed } from 'vue'
import { DialogOverlay } from 'radix-vue'
import type { DrawerOverlayProps } from './drawer.types'
import { cn } from '../../utils'

const props = defineProps<DrawerOverlayProps>()

const classes = computed(() =>
  cn(
    'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    props.class,
  ),
)
</script>

<template>
  <DialogOverlay :class="classes" />
</template>
