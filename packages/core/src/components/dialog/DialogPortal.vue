<script setup lang="ts">
import { DialogPortal } from 'radix-vue'
import type { DialogPortalProps } from './dialog.types'

const props = defineProps<DialogPortalProps>()
</script>

<template>
  <DialogPortal :to="props.to">
    <slot />
  </DialogPortal>
</template>
