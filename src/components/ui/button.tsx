import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Shows an inline spinner, disables the control, and marks it busy. */
  loading?: boolean;
}

function Spinner() {
  return (
    <span
      aria-hidden
      className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent opacity-80"
    />
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', loading = false, disabled, children, ...props }, ref) => {
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
      lg: 'h-11 px-6 text-base',
    };

    return (
      <button
        ref={ref}
        aria-busy={loading || undefined}
        disabled={disabled || loading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading && <Spinner />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
