import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const fieldStyles =
  'w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-inkMuted/60 transition duration-200 ease-out-soft focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:bg-canvas disabled:opacity-70';

export const fieldErrorStyles = 'border-red-400 focus:border-red-500 focus:ring-red-500/20';

export function FieldLabel({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <FieldLabel htmlFor={props.id}>{label}</FieldLabel>}
        <input
          ref={ref}
          className={`${fieldStyles} ${error ? fieldErrorStyles : ''} ${className}`}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
