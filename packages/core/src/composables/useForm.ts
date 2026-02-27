import { useForm as useVeeForm, type FormOptions } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

export function useForm<T extends Record<string, any>>(options: FormOptions<T> & { validationSchema?: any }) {
  // If schema has a _def property, it's a Zod schema - convert it
  const resolvedOptions = { ...options }
  if (options.validationSchema && typeof options.validationSchema === 'object' && '_def' in options.validationSchema) {
    resolvedOptions.validationSchema = toTypedSchema(options.validationSchema) as any
  }
  return useVeeForm<T>(resolvedOptions)
}

export type { FormOptions }
