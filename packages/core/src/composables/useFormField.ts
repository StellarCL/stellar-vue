import { inject, provide, type InjectionKey, type Ref, computed } from 'vue'

interface FormFieldContext {
  name: Ref<string>
  id: string
  error: Ref<string | undefined>
  formItemId: string
  formDescriptionId: string
  formMessageId: string
}

const FORM_FIELD_INJECTION_KEY: InjectionKey<FormFieldContext> = Symbol('FormField')

export function provideFormFieldContext(context: FormFieldContext) {
  provide(FORM_FIELD_INJECTION_KEY, context)
}

export function useFormField() {
  const fieldContext = inject(FORM_FIELD_INJECTION_KEY)
  if (!fieldContext) {
    throw new Error('useFormField must be used within a FormField')
  }
  return fieldContext
}
