<script setup lang="ts">
import { Separator } from '@stellar-vue-ui/core'
</script>
<template>
  <div class="w-full max-w-sm">
    <div class="space-y-1">
      <h4 class="text-sm font-medium leading-none">Stellar Vue UI</h4>
      <p class="text-sm text-muted-foreground">An open-source component library.</p>
    </div>
    <Separator class="my-4" />
    <div class="flex h-5 items-center space-x-4 text-sm">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Source</span>
      <Separator orientation="vertical" />
      <span>License</span>
    </div>
  </div>
</template>
