import { cva, type VariantProps } from '../../utils/variants'

export const badgeVariants = cva(
  'inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium font-inter tracking-wide transition-colors focus:outline-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'border text-foreground',
        soft: 'bg-primary/10 text-primary border-transparent',
        success: 'bg-success text-success-foreground border-transparent',
        warning: 'bg-warning text-warning-foreground border-transparent',
        info: 'bg-info text-info-foreground border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
