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
    <div className="flex min-h-screen items-center justify-center bg-canvas grain px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="block text-center font-display text-2xl text-ink">
          HealthCloud
        </Link>
        <div className="mt-8 rounded-xl border border-line bg-surface p-8 shadow-card">
          <h1 className="font-display text-2xl text-ink">{title}</h1>
          <p className="mt-2 text-sm text-inkMuted">{description}</p>
          {children}
        </div>
        {footer && <div className="mt-6 text-center text-sm text-inkMuted">{footer}</div>}
      </div>
    </div>
  );
}
