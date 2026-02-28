<script setup lang="ts">
import type { DrawerCloseProps } from './drawer.types'
import { DialogClose } from 'radix-vue'

const props = withDefaults(defineProps<DrawerCloseProps>(), {
  asChild: false,
})
</script>

<template>
  <DialogClose :as-child="props.asChild" :class="props.class">
    <slot />
  </DialogClose>
</template>
