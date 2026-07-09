import Link from 'next/link';
import { User, UserRole } from '@prisma/client';
import { getRoleLabel, getRoleNav } from '@/lib/auth/navigation';

interface PlatformNavProps {
  user: User;
}

export function PlatformNav({ user }: PlatformNavProps) {
  const navItems = getRoleNav(user.role);

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link href={navItems[0]?.href ?? '/'} className="text-lg font-semibold text-blue-600">
            HealthCloud
          </Link>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            {getRoleLabel(user.role)}
          </span>
          <nav className="flex flex-wrap gap-3 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user.fullName ?? user.email}
          </span>
          <Link
            href="/profile"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300"
          >
            Cuenta
          </Link>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-500"
            >
              Salir
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

interface PlatformShellProps {
  user: User;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function PlatformShell({ user, title, description, children }: PlatformShellProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PlatformNav user={user} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{title}</h1>
          {description && (
            <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
          )}
        </div>
        {children}
      </main>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
}

export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

interface RoleBadgeProps {
  role: UserRole;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const colors: Record<UserRole, string> = {
    ADMIN: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    ORGANIZATION: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    SPECIALIST: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    PATIENT: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  };

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium ${colors[role]}`}>
      {getRoleLabel(role)}
    </span>
  );
}
