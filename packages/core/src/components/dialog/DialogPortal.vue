<script setup lang="ts">
import type { DialogPortalProps } from './dialog.types'
import { DialogPortal } from 'radix-vue'

const props = defineProps<DialogPortalProps>()
</script>

<template>
  <DialogPortal :to="props.to">
    <slot />
  </DialogPortal>
</template>
