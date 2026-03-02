<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@stellar-vue-ui/core'
</script>
<template>
  <div class="w-full max-w-lg space-y-4">
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  </div>
</template>
