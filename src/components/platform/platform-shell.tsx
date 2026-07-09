import Link from 'next/link';
import { User, UserRole } from '@prisma/client';
import { getRoleLabel, getRoleNav } from '@/lib/auth/navigation';

interface PlatformNavProps {
  user: User;
}

export function PlatformNav({ user }: PlatformNavProps) {
  const navItems = getRoleNav(user.role);

  return (
    <header className="border-b border-line bg-surface/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link href={navItems[0]?.href ?? '/'} className="font-display text-xl text-ink">
            HealthCloud
          </Link>
          <RoleBadge role={user.role} />
          <nav className="flex flex-wrap gap-4 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-inkMuted transition duration-200 ease-out-soft hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-inkMuted">{user.fullName ?? user.email}</span>
          <Link
            href="/profile"
            className="text-inkMuted transition duration-200 ease-out-soft hover:text-ink"
          >
            Cuenta
          </Link>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-medium text-inkMuted transition duration-200 ease-out-soft hover:border-accent/40 hover:text-accent-dark"
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
    <div className="min-h-screen bg-canvas grain">
      <PlatformNav user={user} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-inkMuted">
            {getRoleLabel(user.role)}
          </p>
          <h1 className="mt-1 font-display text-3xl text-ink">{title}</h1>
          {description && <p className="mt-2 max-w-2xl text-inkMuted">{description}</p>}
        </div>
        {children}
      </main>
    </div>
  );
}

export function Card({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border border-line bg-surface shadow-card ${className}`}>
      {children}
    </div>
  );
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-surface/50 px-6 py-10 text-center text-sm text-inkMuted">
      {children}
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
    <Card className="p-5">
      <p className="text-sm text-inkMuted">{label}</p>
      <p className="mt-2 font-display text-3xl text-ink">{value}</p>
      {hint && <p className="mt-2 text-xs text-inkMuted">{hint}</p>}
    </Card>
  );
}

interface RoleBadgeProps {
  role: UserRole;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const colors: Record<UserRole, string> = {
    ADMIN: 'bg-role-admin/10 text-role-admin',
    ORGANIZATION: 'bg-role-org/10 text-role-org',
    SPECIALIST: 'bg-role-spec/10 text-role-spec',
    PATIENT: 'bg-role-patient/10 text-role-patient',
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[role]}`}>
      {getRoleLabel(role)}
    </span>
  );
}

const STATUS_STYLES: Record<string, string> = {
  // Positivos
  ACTIVE: 'bg-emerald-50 text-emerald-700',
  CONFIRMED: 'bg-emerald-50 text-emerald-700',
  COMPLETED: 'bg-emerald-50 text-emerald-700',
  ACCEPTED: 'bg-emerald-50 text-emerald-700',
  // En espera
  PENDING: 'bg-amber-50 text-amber-700',
  REQUESTED: 'bg-sky-50 text-sky-700',
  IN_PROGRESS: 'bg-brand-light text-brand-dark',
  // Negativos
  BLOCKED: 'bg-red-50 text-red-700',
  CANCELLED: 'bg-red-50 text-red-700',
  REMOVED: 'bg-red-50 text-red-700',
  EXPIRED: 'bg-red-50 text-red-700',
  REVOKED: 'bg-red-50 text-red-700',
  // Urgencia
  LOW: 'bg-sky-50 text-sky-700',
  MEDIUM: 'bg-amber-50 text-amber-700',
  HIGH: 'bg-orange-50 text-orange-700',
  EMERGENCY: 'bg-red-50 text-red-700',
};

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: 'Activa',
  CONFIRMED: 'Confirmada',
  COMPLETED: 'Completada',
  ACCEPTED: 'Aceptada',
  PENDING: 'Pendiente',
  REQUESTED: 'Solicitada',
  IN_PROGRESS: 'En curso',
  BLOCKED: 'Bloqueada',
  CANCELLED: 'Cancelada',
  REMOVED: 'Removido',
  EXPIRED: 'Expirada',
  REVOKED: 'Revocada',
  LOW: 'Baja',
  MEDIUM: 'Media',
  HIGH: 'Alta',
  EMERGENCY: 'Emergencia',
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
        STATUS_STYLES[status] ?? 'bg-canvas text-inkMuted'
      }`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}
