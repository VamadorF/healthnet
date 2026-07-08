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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Link
            href="/"
            className="block text-center text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            HealthNet
          </Link>
          <h2 className="mt-4 text-center text-3xl font-bold tracking-tight">{title}</h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
        {children}
        {footer && <div className="text-center text-sm text-gray-600 dark:text-gray-400">{footer}</div>}
      </div>
    </div>
  );
}
