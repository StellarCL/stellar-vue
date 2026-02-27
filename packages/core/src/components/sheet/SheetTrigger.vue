<script setup lang="ts">
import { DialogTrigger } from 'radix-vue'
import type { SheetTriggerProps } from './sheet.types'

const props = withDefaults(defineProps<SheetTriggerProps>(), {
  asChild: false,
})
</script>

<template>
  <DialogTrigger :as-child="props.asChild" :class="props.class">
    <slot />
  </DialogTrigger>
</template>
