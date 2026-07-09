import Link from 'next/link';
import { User, UserRole } from '@prisma/client';
import { getRoleLabel, getRoleNav } from '@/lib/auth/navigation';

const ROLE_ACCENT: Record<UserRole, string> = {
  ADMIN: 'bg-role-admin',
  ORGANIZATION: 'bg-role-org',
  SPECIALIST: 'bg-role-spec',
  PATIENT: 'bg-role-patient',
};

interface PlatformNavProps {
  user: User;
}

export function PlatformNav({ user }: PlatformNavProps) {
  const navItems = getRoleNav(user.role);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-canvas/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href={navItems[0]?.href ?? '/'}
            className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-ink"
          >
            <span className={`h-4 w-1.5 rounded-full ${ROLE_ACCENT[user.role]}`} />
            HealthCloud
          </Link>
          <RoleBadge role={user.role} />
          <nav className="flex flex-wrap gap-1 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2.5 py-1.5 font-medium text-inkMuted transition-colors hover:bg-surfaceMuted hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-inkMuted sm:block">{user.fullName ?? user.email}</span>
          <Link
            href="/profile"
            className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-inkMuted transition-colors hover:bg-surfaceMuted hover:text-ink"
          >
            Cuenta
          </Link>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium text-danger transition-colors hover:border-danger/40 hover:bg-danger-soft"
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
    <div className="min-h-screen bg-canvas text-ink">
      <PlatformNav user={user} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-[28px] font-semibold tracking-tightest text-ink">{title}</h1>
          {description && <p className="mt-1.5 max-w-2xl text-inkMuted">{description}</p>}
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
    <div className="rounded-xl border border-line bg-surface p-5 shadow-card">
      <p className="eyebrow">{label}</p>
      <p className="mt-3 text-[28px] font-semibold leading-none tracking-tightest text-ink tabular">{value}</p>
      {hint && <p className="mt-2.5 text-xs font-medium text-inkMuted">{hint}</p>}
    </div>
  );
}

interface RoleBadgeProps {
  role: UserRole;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs font-medium text-inkMuted">
      <span className={`h-1.5 w-1.5 rounded-full ${ROLE_ACCENT[role]}`} />
      {getRoleLabel(role)}
    </span>
  );
}
