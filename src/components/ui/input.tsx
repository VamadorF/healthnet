import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor={props.id}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full rounded-lg border px-3 py-2 text-sm
            bg-surfaceMuted text-ink placeholder:text-inkFaint
            transition-colors
            focus:outline-none focus:bg-surface focus:shadow-focus
            disabled:cursor-not-allowed disabled:opacity-50
            ${error ? 'border-danger focus:shadow-none focus:ring-2 focus:ring-danger/40' : 'border-line focus:border-brand'}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-danger">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
