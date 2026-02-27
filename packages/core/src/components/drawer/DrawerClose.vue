<script setup lang="ts">
import { DialogClose } from 'radix-vue'
import type { DrawerCloseProps } from './drawer.types'

const props = withDefaults(defineProps<DrawerCloseProps>(), {
  asChild: false,
})
</script>

<template>
  <DialogClose :as-child="props.asChild" :class="props.class">
    <slot />
  </DialogClose>
</template>
