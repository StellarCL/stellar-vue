<script setup lang="ts">
import { Button } from '@stellar-vue-ui/core'
</script>
<template>
  <div class="flex gap-4">
    <Button :loading="true">Submitting</Button>
    <Button variant="outline" :loading="true">Loading</Button>
  </div>
</template>
