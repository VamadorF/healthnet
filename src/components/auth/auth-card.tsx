import Link from 'next/link';
import { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Link
            href="/"
            className="block text-center text-sm font-medium text-brand hover:text-brand-dark"
          >
            HealthCloud
          </Link>
          <h2 className="mt-4 text-center text-3xl font-bold tracking-tight">{title}</h2>
          <p className="mt-2 text-center text-sm text-inkMuted">
            {description}
          </p>
        </div>
        {children}
        {footer && <div className="text-center text-sm text-inkMuted">{footer}</div>}
      </div>
    </div>
  );
}
