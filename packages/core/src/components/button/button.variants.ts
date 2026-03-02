import { cva, type VariantProps } from '../../utils/variants'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium tracking-wide transition-all duration-200 focus:outline-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-focus',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-error-focus',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        soft: 'bg-primary/10 text-primary hover:bg-primary/20',
      },
      size: {
        sm: 'h-8 rounded-lg px-3',
        md: 'h-9 px-5 py-2',
        lg: 'h-10 rounded-lg px-6',
        xl: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
