<script setup lang="ts">
import { DialogClose } from 'radix-vue'
import type { SheetCloseProps } from './sheet.types'

const props = withDefaults(defineProps<SheetCloseProps>(), {
  asChild: false,
})
</script>

<template>
  <DialogClose :as-child="props.asChild" :class="props.class">
    <slot />
  </DialogClose>
</template>
