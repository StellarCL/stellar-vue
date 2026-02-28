<script setup lang="ts">
import type { SheetCloseProps } from './sheet.types'
import { DialogClose } from 'radix-vue'

const props = withDefaults(defineProps<SheetCloseProps>(), {
  asChild: false,
})
</script>

<template>
  <DialogClose :as-child="props.asChild" :class="props.class">
    <slot />
  </DialogClose>
</template>
