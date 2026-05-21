import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium leading-none whitespace-nowrap rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-monogram focus-visible:ring-offset-carta disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-caffe text-carta hover:bg-monogram active:bg-monogram-soft',
        accent:
          'bg-peperoncino text-carta hover:bg-peperoncino-soft active:bg-peperoncino',
        secondary:
          'bg-transparent text-caffe border border-caffe hover:bg-caffe hover:text-carta',
        ghost: 'bg-transparent text-caffe hover:text-peperoncino',
        link: 'bg-transparent text-caffe underline underline-offset-4 decoration-1 hover:decoration-peperoncino p-0 h-auto',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-5 text-[0.95rem]',
        lg: 'h-14 px-7 text-base',
        xl: 'h-16 px-9 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';
