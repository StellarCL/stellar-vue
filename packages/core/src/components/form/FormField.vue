<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed, toRef } from 'vue'
import { provideFormFieldContext } from '../../composables/useFormField'

const props = defineProps<{ name: string }>()

const { errorMessage, value, handleChange, handleBlur, meta } = useField(
  toRef(props, 'name'),
  undefined,
  { syncVModel: false }
)

let idCounter = 0
const id = `form-field-${props.name}-${idCounter++}`

provideFormFieldContext({
  name: toRef(props, 'name'),
  id,
  error: computed(() => errorMessage.value),
  formItemId: `${id}-item`,
  formDescriptionId: `${id}-description`,
  formMessageId: `${id}-message`,
})
</script>

<template>
  <slot
    :field="{ name: props.name, modelValue: value, 'onUpdate:modelValue': handleChange, onBlur: handleBlur }"
    :error="errorMessage"
    :meta="meta"
  />
</template>
