<script setup lang="ts">
import { Slider } from '@stellar-vue-ui/core'
</script>
<template>
  <Slider :default-value="[50]" :max="100" :step="1" class="max-w-sm" />
</template>
