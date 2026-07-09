import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-[colors,transform] duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:shadow-focus disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
      primary: 'bg-brand text-white shadow-xs hover:bg-brand-dark',
      secondary: 'border border-line bg-surface text-ink hover:border-lineStrong hover:bg-surfaceMuted',
      danger: 'bg-danger text-white shadow-xs hover:brightness-95',
      ghost: 'text-inkMuted hover:bg-surfaceMuted hover:text-ink',
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-11 px-6 text-[15px]',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
