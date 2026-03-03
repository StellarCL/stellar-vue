import { cva, type VariantProps } from '../../utils/variants'

export const inputVariants = cva(
  'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:border-ring focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
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

export type InputVariants = VariantProps<typeof inputVariants>
