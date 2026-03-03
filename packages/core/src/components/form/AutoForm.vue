<script setup lang="ts">
import type { FormFieldConfig } from '../../utils/form-fields'
import type { AutoFormProps } from './auto-form.types'
import { computed, reactive, watch } from 'vue'
import { cn } from '../../utils'
import { toFormFields } from '../../utils/form-fields'
import { Button } from '../button'
import { Checkbox } from '../checkbox'
import { Input } from '../input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select'
import { Textarea } from '../textarea'
import FormControl from './FormControl.vue'
import FormField from './FormField.vue'
import FormItem from './FormItem.vue'
import FormLabel from './FormLabel.vue'
import FormMessage from './FormMessage.vue'

const props = withDefaults(defineProps<AutoFormProps>(), {
  submitLabel: 'Submit',
})

const emit = defineEmits<{
  submit: [values: Record<string, any>]
}>()

const slots = defineSlots<{
  /** Override rendering for a specific field */
  [key: `field-${string}`]: (props: {
    field: FormFieldConfig
    value: any
    onChange: (val: any) => void
  }) => any
  /** Custom submit button slot */
  submit?: (props: { submitLabel: string }) => any
}>()

const fields = computed(() => toFormFields(props.schema))

// Reactive form values, initialized from defaults
const formValues = reactive<Record<string, any>>({})

// Initialize values from defaults and field configs
function initializeValues() {
  for (const field of fields.value) {
    if (props.defaults && field.name in props.defaults) {
      formValues[field.name] = props.defaults[field.name]
    }
    else if (field.type === 'checkbox') {
      formValues[field.name] = false
    }
    else if (field.type === 'number') {
      formValues[field.name] = undefined
    }
    else {
      formValues[field.name] = ''
    }
  }
}

initializeValues()

// Re-initialize when schema changes
watch(
  () => props.schema,
  () => {
    initializeValues()
  },
)

// Re-initialize when defaults change
watch(
  () => props.defaults,
  () => {
    if (props.defaults) {
      for (const [key, value] of Object.entries(props.defaults)) {
        formValues[key] = value
      }
    }
  },
  { deep: true },
)

function handleSubmit(e: Event) {
  e.preventDefault()

  if (!props.schema) {
    emit('submit', { ...formValues })
    return
  }

  // Use safeParse if available, otherwise parse
  if (typeof props.schema.safeParse === 'function') {
    const result = props.schema.safeParse(formValues)
    if (result.success) {
      emit('submit', result.data)
    }
    // Errors are handled by vee-validate through the form field wiring
  }
  else if (typeof props.schema.parse === 'function') {
    try {
      const data = props.schema.parse(formValues)
      emit('submit', data)
    }
    catch {
      // Validation errors - let vee-validate handle display
    }
  }
  else {
    emit('submit', { ...formValues })
  }
}

function getSlotName(fieldName: string): `field-${string}` {
  return `field-${fieldName}`
}

function hasFieldSlot(fieldName: string): boolean {
  return !!slots[getSlotName(fieldName)]
}

type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'

function getInputType(fieldType: string): InputType {
  if (fieldType === 'date')
    return 'text'
  return fieldType as InputType
}
</script>

<template>
  <form :class="cn('space-y-6', props.class)" @submit="handleSubmit">
    <template v-for="fieldConfig in fields" :key="fieldConfig.name">
      <!-- Custom field slot override -->
      <slot
        v-if="hasFieldSlot(fieldConfig.name)"
        :name="getSlotName(fieldConfig.name)"
        :field="fieldConfig"
        :value="formValues[fieldConfig.name]"
        :on-change="(val: any) => (formValues[fieldConfig.name] = val)"
      />

      <!-- Auto-generated field -->
      <FormField v-else v-slot="{ field }" :name="fieldConfig.name">
        <FormItem>
          <!-- Checkbox has label inline, not above -->
          <template v-if="fieldConfig.type === 'checkbox'">
            <div class="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  :name="field.name"
                  :checked="formValues[fieldConfig.name]"
                  @update:checked="
                    (val: boolean | 'indeterminate') => {
                      formValues[fieldConfig.name] = val
                      if (typeof field.onBlur === 'function') field.onBlur()
                    }
                  "
                />
              </FormControl>
              <FormLabel>{{ fieldConfig.label }}</FormLabel>
            </div>
          </template>

          <template v-else>
            <FormLabel>{{ fieldConfig.label }}</FormLabel>
            <FormControl>
              <!-- Text / Email / Password / Date inputs -->
              <Input
                v-if="
                  fieldConfig.type === 'text'
                    || fieldConfig.type === 'email'
                    || fieldConfig.type === 'password'
                    || fieldConfig.type === 'date'
                "
                v-bind="field"
                :type="getInputType(fieldConfig.type)"
                :placeholder="fieldConfig.placeholder"
                :model-value="formValues[fieldConfig.name]"
                @update:model-value="formValues[fieldConfig.name] = $event"
              />

              <!-- Number input -->
              <Input
                v-else-if="fieldConfig.type === 'number'"
                v-bind="field"
                type="number"
                :placeholder="fieldConfig.placeholder"
                :model-value="formValues[fieldConfig.name]"
                @update:model-value="
                  formValues[fieldConfig.name] = $event !== '' ? Number($event) : undefined
                "
              />

              <!-- Textarea -->
              <Textarea
                v-else-if="fieldConfig.type === 'textarea'"
                v-bind="field"
                :placeholder="fieldConfig.placeholder"
                :model-value="formValues[fieldConfig.name]"
                @update:model-value="formValues[fieldConfig.name] = $event"
              />

              <!-- Select -->
              <Select
                v-else-if="fieldConfig.type === 'select'"
                :model-value="formValues[fieldConfig.name]"
                @update:model-value="formValues[fieldConfig.name] = $event"
              >
                <SelectTrigger>
                  <SelectValue :placeholder="`Select ${fieldConfig.label.toLowerCase()}`" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="option in fieldConfig.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </template>

          <FormMessage />
        </FormItem>
      </FormField>
    </template>

    <!-- Submit button -->
    <slot v-if="$slots.submit" name="submit" :submit-label="submitLabel" />
    <Button v-else type="submit">
      {{ submitLabel }}
    </Button>
  </form>
</template>
