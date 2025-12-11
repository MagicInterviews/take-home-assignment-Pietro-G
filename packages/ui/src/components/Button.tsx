import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export const buttonVariants = cva(
  'cursor-pointer border rounded-full px-4 py-1.5 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700',
        secondary: 'bg-blue-100 text-blue-600 border-blue-100 hover:bg-blue-200 hover:border-blue-200',
        text: 'border-transparent hover:bg-gray-100',
        success: 'bg-green-600 text-white border-green-600 hover:bg-green-700 hover:border-green-700',
        registered: 'bg-[#D1FAE5] text-emerald-700 border-[#D1FAE5] hover:bg-[#D1FAE5] hover:border-[#D1FAE5]',
      },
      size: {
        sm: 'h-11 text-base',
        md: 'h-12 text-base',
        lg: 'h-14 text-lg',
        register: 'h-[31px] text-sm',
        registered: 'h-[31px] text-xs',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';