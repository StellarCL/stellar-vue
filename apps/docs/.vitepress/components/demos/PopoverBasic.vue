<script setup lang="ts">
import { Button, Popover, PopoverContent, PopoverTrigger } from '@stellar-vue-ui/core'
</script>
<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">Open popover</Button>
    </PopoverTrigger>
    <PopoverContent>
      <p class="text-sm">This is the popover content.</p>
    </PopoverContent>
  </Popover>
</template>
