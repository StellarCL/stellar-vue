# Stepper

A step-by-step indicator for multi-step workflows. Displays progress through a sequence of steps with visual indicators for completed, active, and upcoming states. Supports horizontal and vertical orientations.

## Installation

::: code-group

```bash [CLI]
npx stellar add stepper
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperSeparator,
  StepperContent,
} from '@stellar-vue-ui/core'
```

## Usage

### Basic

```vue
<script setup lang="ts">
import { Stepper, StepperItem, StepperTrigger, StepperSeparator, StepperContent } from '@stellar-vue-ui/core'
import { ref } from 'vue'

const currentStep = ref(1)

const steps = [
  { title: 'Account', description: 'Create your account' },
  { title: 'Profile', description: 'Set up your profile' },
  { title: 'Complete', description: 'Review and finish' },
]
</script>

<template>
  <Stepper v-model="currentStep" :steps="steps">
    <StepperItem v-for="(step, index) in steps" :key="index" :step="index + 1">
      <StepperTrigger :step="index + 1" />
      <StepperSeparator v-if="index < steps.length - 1" :step="index + 1" />
    </StepperItem>
  </Stepper>

  <StepperContent :step="1">
    <p>Step 1: Create your account.</p>
  </StepperContent>
  <StepperContent :step="2">
    <p>Step 2: Set up your profile.</p>
  </StepperContent>
  <StepperContent :step="3">
    <p>Step 3: Review and finish.</p>
  </StepperContent>
</template>
```

## Examples

### Horizontal (Default)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Stepper, StepperItem, StepperTrigger, StepperSeparator } from '@stellar-vue-ui/core'
import { Button } from '@stellar-vue-ui/core'

const currentStep = ref(2)

const steps = [
  { title: 'Details' },
  { title: 'Payment' },
  { title: 'Confirmation' },
]
</script>

<template>
  <Stepper v-model="currentStep" :steps="steps">
    <StepperItem v-for="(step, index) in steps" :key="index" :step="index + 1">
      <StepperTrigger :step="index + 1" />
      <StepperSeparator v-if="index < steps.length - 1" :step="index + 1" />
    </StepperItem>
  </Stepper>

  <div class="mt-4 flex gap-2">
    <Button variant="outline" :disabled="currentStep <= 1" @click="currentStep--">
      Previous
    </Button>
    <Button :disabled="currentStep >= steps.length" @click="currentStep++">
      Next
    </Button>
  </div>
</template>
```

### Vertical

Use the `orientation` prop for a vertical layout:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const currentStep = ref(1)

const steps = [
  { title: 'Step 1', description: 'First step description' },
  { title: 'Step 2', description: 'Second step description' },
  { title: 'Step 3', description: 'Third step description' },
]
</script>

<template>
  <Stepper v-model="currentStep" :steps="steps" orientation="vertical">
    <StepperItem v-for="(step, index) in steps" :key="index" :step="index + 1">
      <StepperTrigger :step="index + 1" />
      <StepperSeparator v-if="index < steps.length - 1" :step="index + 1" />
    </StepperItem>
  </Stepper>
</template>
```

### With Content Panels

Combine the stepper with content panels that show based on the current step:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Stepper, StepperItem, StepperTrigger, StepperSeparator, StepperContent } from '@stellar-vue-ui/core'
import { Button, Input, Label } from '@stellar-vue-ui/core'

const currentStep = ref(1)

const steps = [
  { title: 'Account' },
  { title: 'Profile' },
  { title: 'Done' },
]
</script>

<template>
  <Stepper v-model="currentStep" :steps="steps">
    <StepperItem v-for="(step, index) in steps" :key="index" :step="index + 1">
      <StepperTrigger :step="index + 1" />
      <StepperSeparator v-if="index < steps.length - 1" :step="index + 1" />
    </StepperItem>
  </Stepper>

  <div class="mt-6">
    <StepperContent :step="1">
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <Button @click="currentStep = 2">Continue</Button>
      </div>
    </StepperContent>

    <StepperContent :step="2">
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="name">Display Name</Label>
          <Input id="name" placeholder="Your name" />
        </div>
        <div class="flex gap-2">
          <Button variant="outline" @click="currentStep = 1">Back</Button>
          <Button @click="currentStep = 3">Continue</Button>
        </div>
      </div>
    </StepperContent>

    <StepperContent :step="3">
      <p class="text-center text-lg">All done! Your account is ready.</p>
    </StepperContent>
  </div>
</template>
```

## API Reference

### Stepper Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `StepConfig[]` | *required* | Array of step configuration objects |
| `modelValue` | `number` | `1` | Current active step, 1-based (v-model) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout orientation |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### StepConfig Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | `string` | Yes | Step title |
| `description` | `string` | No | Optional step description |
| `icon` | `Component` | No | Optional custom icon component |

### StepperItem Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `step` | `number` | *required* | The 1-based step number |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### StepperTrigger Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `step` | `number` | *required* | The 1-based step number |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### StepperSeparator Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `step` | `number` | *required* | Step number before this separator |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### StepperContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `step` | `number` | *required* | The step number this content belongs to |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `number` | Emitted when the active step changes |

### Slots

| Component | Slot | Description |
|-----------|------|-------------|
| `Stepper` | `default` | StepperItem elements |
| `StepperItem` | `default` | StepperTrigger and StepperSeparator |
| `StepperTrigger` | `default` | Custom trigger content (defaults to step number/check icon) |
| `StepperSeparator` | -- | No slots; renders a line indicator |
| `StepperContent` | `default` | Step content panel |

## Accessibility

- Step triggers are interactive and can be clicked to navigate to a step
- Completed steps are visually distinguished with a check icon
- The current step is highlighted with active styling
- Separators between steps change color to indicate completion
- Use descriptive step titles for screen reader context
- `StepperItem` includes a `data-step` attribute for testing and styling

## Related

- [Progress](/components/progress) -- For continuous progress indication
- [Tabs](/components/tabs) -- For non-sequential content switching
- [Form](/components/form) -- Steppers are commonly used for multi-step forms
