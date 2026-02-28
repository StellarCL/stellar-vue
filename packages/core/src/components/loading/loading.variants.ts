import { cva, type VariantProps } from '../../utils/variants'

export const loadingSpinnerVariants = cva(
  'animate-spin text-primary',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-10 w-10',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export const loadingDotVariants = cva(
  'rounded-full bg-primary animate-bounce',
  {
    variants: {
      size: {
        sm: 'h-1.5 w-1.5',
        md: 'h-2.5 w-2.5',
        lg: 'h-4 w-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export const loadingWrapperVariants = cva(
  'flex flex-col items-center justify-center gap-2',
  {
    variants: {
      size: {
        sm: 'gap-1',
        md: 'gap-2',
        lg: 'gap-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export type LoadingSpinnerVariants = VariantProps<typeof loadingSpinnerVariants>
export type LoadingDotVariants = VariantProps<typeof loadingDotVariants>
export type LoadingWrapperVariants = VariantProps<typeof loadingWrapperVariants>
