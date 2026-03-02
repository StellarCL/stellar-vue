# @stellar-vue-ui/animations

Animation primitives and transition presets for Stellar Vue UI.

## Installation

```bash
npm install @stellar-vue-ui/animations
```

## Usage

```vue
<script setup>
import { StellarTransition } from '@stellar-vue-ui/animations'
</script>

<template>
  <StellarTransition name="fade">
    <div v-if="show">Animated content</div>
  </StellarTransition>
</template>
```

## Features

- 17 transition presets (fade, slide, scale, rotate, and more)
- `StellarTransition` and `StellarTransitionGroup` components
- `usePresence` and `useMotion` composables
- Works with Vue's built-in transition system

## License

[MIT](./LICENSE)
