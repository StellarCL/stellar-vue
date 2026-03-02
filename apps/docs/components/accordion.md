# Accordion

A vertically stacked set of interactive headings that each reveal a section of content. Supports single or multiple expanded items, collapsible behavior, and animated transitions. Built on Radix Vue's Accordion primitives.

## Installation

::: code-group

```bash [CLI]
npx stellar add accordion
```

```bash [Package]
pnpm add @stellar-vue-ui/core
```

:::

## Import

```typescript
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@stellar-vue-ui/core'
```

## Usage

### Basic

<ComponentPreview title="Basic">
  <AccordionBasic />
  <template #code>

```vue
<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@stellar-vue-ui/core'
</script>

<template>
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent> Yes. It adheres to the WAI-ARIA design pattern. </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Is it styled?</AccordionTrigger>
      <AccordionContent>
        Yes. It comes with default styles that match your theme.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>Is it animated?</AccordionTrigger>
      <AccordionContent>
        Yes. It uses CSS animations for smooth open/close transitions.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
```

  </template>
</ComponentPreview>

## Examples

### Single (Default)

Only one item can be open at a time. Set `collapsible` to allow closing all items:

```vue
<template>
  <Accordion type="single" collapsible>
    <AccordionItem value="faq-1">
      <AccordionTrigger>What is Stellar Vue UI?</AccordionTrigger>
      <AccordionContent>
        Stellar Vue UI is a modern, accessible component library for Vue 3.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="faq-2">
      <AccordionTrigger>How do I install it?</AccordionTrigger>
      <AccordionContent> Use the CLI: npx stellar add [component-name] </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
```

### Multiple

Allow multiple items to be open simultaneously:

```vue
<template>
  <Accordion type="multiple">
    <AccordionItem value="section-1">
      <AccordionTrigger>Section 1</AccordionTrigger>
      <AccordionContent>Content for section 1.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="section-2">
      <AccordionTrigger>Section 2</AccordionTrigger>
      <AccordionContent>Content for section 2.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="section-3">
      <AccordionTrigger>Section 3</AccordionTrigger>
      <AccordionContent>Content for section 3.</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
```

### Controlled

Use `v-model` to control which items are open:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const openItem = ref('item-1')
</script>

<template>
  <Accordion v-model="openItem" type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>First item</AccordionTrigger>
      <AccordionContent>First content.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Second item</AccordionTrigger>
      <AccordionContent>Second content.</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
```

### Disabled Item

```vue
<template>
  <Accordion type="single" collapsible>
    <AccordionItem value="active">
      <AccordionTrigger>Active item</AccordionTrigger>
      <AccordionContent>This item works normally.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="disabled" disabled>
      <AccordionTrigger>Disabled item</AccordionTrigger>
      <AccordionContent>This content is not accessible.</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
```

## API Reference

### Accordion Props

| Prop          | Type                      | Default     | Description                                       |
| ------------- | ------------------------- | ----------- | ------------------------------------------------- |
| `type`        | `'single' \| 'multiple'`  | `'single'`  | Whether one or multiple items can be open at once |
| `modelValue`  | `string \| string[]`      | `undefined` | Controlled expanded item(s) (v-model)             |
| `collapsible` | `boolean`                 | `false`     | When type is single, allows closing the open item |
| `disabled`    | `boolean`                 | `false`     | Disables all accordion items                      |
| `class`       | `HTMLAttributes['class']` | `undefined` | Additional CSS classes                            |

### AccordionItem Props

| Prop       | Type                      | Default     | Description                          |
| ---------- | ------------------------- | ----------- | ------------------------------------ |
| `value`    | `string`                  | _required_  | Unique value for this accordion item |
| `disabled` | `boolean`                 | `false`     | Disables this specific item          |
| `class`    | `HTMLAttributes['class']` | `undefined` | Additional CSS classes               |

### AccordionTrigger Props

| Prop    | Type                      | Default     | Description            |
| ------- | ------------------------- | ----------- | ---------------------- |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### AccordionContent Props

| Prop    | Type                      | Default     | Description            |
| ------- | ------------------------- | ----------- | ---------------------- |
| `class` | `HTMLAttributes['class']` | `undefined` | Additional CSS classes |

### Events

| Event               | Payload                           | Description                              |
| ------------------- | --------------------------------- | ---------------------------------------- |
| `update:modelValue` | `string \| string[] \| undefined` | Emitted when the expanded item(s) change |

### Slots

| Component          | Slot      | Description                                             |
| ------------------ | --------- | ------------------------------------------------------- |
| `Accordion`        | `default` | AccordionItem elements                                  |
| `AccordionItem`    | `default` | AccordionTrigger and AccordionContent                   |
| `AccordionTrigger` | `default` | Trigger text. A chevron icon is appended automatically. |
| `AccordionContent` | `default` | Content revealed when the item is expanded              |

## Accessibility

### Keyboard Interaction

| Key               | Action                             |
| ----------------- | ---------------------------------- |
| `Enter` / `Space` | Toggles the focused accordion item |
| `ArrowDown`       | Moves focus to next trigger        |
| `ArrowUp`         | Moves focus to previous trigger    |
| `Home`            | Moves focus to first trigger       |
| `End`             | Moves focus to last trigger        |

### ARIA Attributes

- Each trigger has `aria-expanded` reflecting its open/closed state
- Each trigger has `aria-controls` pointing to its content panel
- Content panels have `role="region"` with `aria-labelledby` pointing to their trigger
- Disabled items have `aria-disabled="true"`
- The chevron icon rotates 180 degrees when expanded

## Related

- [Tabs](/components/tabs) -- For horizontal content switching
- [Card](/components/card) -- For non-collapsible content sections
- [Dialog](/components/dialog) -- For content that overlays the page
