import { cva, type VariantProps } from '../../utils/variants'

export const timelineDotVariants = cva(
  'relative z-10 flex h-3 w-3 shrink-0 items-center justify-center rounded-full border-2',
  {
    variants: {
      variant: {
        default: 'border-primary bg-primary',
        success: 'border-green-500 bg-green-500',
        warning: 'border-yellow-500 bg-yellow-500',
        destructive: 'border-destructive bg-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type TimelineDotVariants = VariantProps<typeof timelineDotVariants>
