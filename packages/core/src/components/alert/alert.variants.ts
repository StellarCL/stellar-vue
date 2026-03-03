import { cva, type VariantProps } from '../../utils/variants'

export const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'bg-destructive/10 text-destructive border-destructive/20 [&>svg]:text-destructive',
        success: 'bg-success/10 text-success border-success/20 [&>svg]:text-success',
        warning: 'bg-warning/10 text-warning border-warning/20 [&>svg]:text-warning',
        info: 'bg-info/10 text-info border-info/20 [&>svg]:text-info',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type AlertVariants = VariantProps<typeof alertVariants>
