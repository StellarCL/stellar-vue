import { cva, type VariantProps } from '../../utils/variants'

export const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground hover:border-slate-400 focus:border-primary focus:outline-none dark:border-navy-450 dark:focus:border-primary disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      error: {
        false: '',
        true: 'border-destructive focus:border-destructive',
      },
    },
    defaultVariants: {
      error: false,
    },
  },
)

export type TextareaVariants = VariantProps<typeof textareaVariants>
