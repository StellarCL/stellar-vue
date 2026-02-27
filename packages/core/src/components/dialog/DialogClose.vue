<script setup lang="ts">
import { DialogClose } from 'radix-vue'
import type { DialogCloseProps } from './dialog.types'

const props = withDefaults(defineProps<DialogCloseProps>(), {
  asChild: false,
})
</script>

<template>
  <DialogClose :as-child="props.asChild" :class="props.class">
    <slot />
  </DialogClose>
</template>
