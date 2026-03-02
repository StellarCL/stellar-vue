<script setup lang="ts">
import { Input } from '@stellar-vue-ui/core'
import { ref } from 'vue'

const value = ref('')
</script>
<template>
  <Input v-model="value" placeholder="Enter your name" class="max-w-sm" />
</template>
