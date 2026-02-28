<script setup lang="ts">
import type { DialogCloseProps } from './dialog.types'
import { DialogClose } from 'radix-vue'

const props = withDefaults(defineProps<DialogCloseProps>(), {
  asChild: false,
})
</script>

<template>
  <DialogClose :as-child="props.asChild" :class="props.class">
    <slot />
  </DialogClose>
</template>
