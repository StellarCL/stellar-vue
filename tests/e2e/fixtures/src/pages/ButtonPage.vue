<script setup lang="ts">
import { Button } from '@stellar-vue-ui/core'
import { ref } from 'vue'

const clicked = ref(false)

function handleClick() {
  clicked.value = true
}
</script>

<template>
  <div style="padding: 2rem; display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
    <Button @click="handleClick">
      Click me
    </Button>
    <span v-if="clicked">Clicked!</span>

    <Button disabled>
      Disabled
    </Button>

    <Button data-testid="loading-button" :loading="true">
      Loading
    </Button>

    <Button variant="default">
      Default
    </Button>
    <Button variant="secondary">
      Secondary
    </Button>
    <Button variant="destructive">
      Destructive
    </Button>
    <Button variant="outline">
      Outline
    </Button>
    <Button variant="ghost">
      Ghost
    </Button>
    <Button variant="link">
      Link
    </Button>
  </div>
</template>
