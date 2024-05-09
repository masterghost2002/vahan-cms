import React from 'react';
import { cn } from './utils';
import { cva, type VariantProps } from 'class-variance-authority';
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap transition duration-300 ease-in-out rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        filled: 'bg-[#1C1C1C] text-white hover:bg-[#4E4E4E]',
        outlined: 'border-2  hover:bg-[#EAEAEA] '
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'px-[50px] py-[26px] text-[18px] font-[600] h-[77px]',
        icon: 'h-[64px] w-[64px]'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };