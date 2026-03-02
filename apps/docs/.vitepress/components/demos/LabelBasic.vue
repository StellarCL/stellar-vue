<script setup lang="ts">
import { Input, Label } from '@stellar-vue-ui/core'
</script>
<template>
  <div class="grid w-full max-w-sm items-center gap-1.5">
    <Label for="email">Email</Label>
    <Input type="email" id="email" placeholder="Email" />
  </div>
</template>
