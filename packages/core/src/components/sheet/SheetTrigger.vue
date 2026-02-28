<script setup lang="ts">
import type { SheetTriggerProps } from './sheet.types'
import { DialogTrigger } from 'radix-vue'

const props = withDefaults(defineProps<SheetTriggerProps>(), {
  asChild: false,
})
</script>

<template>
  <DialogTrigger :as-child="props.asChild" :class="props.class">
    <slot />
  </DialogTrigger>
</template>
