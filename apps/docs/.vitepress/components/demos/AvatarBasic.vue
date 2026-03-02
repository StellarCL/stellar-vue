<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@stellar-vue-ui/core'
</script>
<template>
  <div class="flex gap-4">
    <Avatar>
      <AvatarImage src="https://github.com/radix-vue.png" alt="Radix Vue" />
      <AvatarFallback>RV</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>
</template>
