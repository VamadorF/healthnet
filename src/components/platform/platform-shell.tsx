import Link from 'next/link';
import { User, UserRole } from '@prisma/client';
import { getRoleLabel, getRoleNav } from '@/lib/auth/navigation';
import { SidebarNav, MobileNav } from '@/components/platform/sidebar-nav';

const ROLE_COLORS: Record<UserRole, string> = {
  ADMIN: 'bg-role-admin',
  ORGANIZATION: 'bg-role-org',
  SPECIALIST: 'bg-role-spec',
  PATIENT: 'bg-role-patient',
};

function getInitials(user: User) {
  const source = user.fullName?.trim() || user.email;
  return source
    .split(/[\s@]+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

interface PlatformShellProps {
  user: User;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function PlatformShell({ user, title, description, children }: PlatformShellProps) {
  const nav = getRoleNav(user.role);
  const roleColor = ROLE_COLORS[user.role];

  return (
    <div className="min-h-screen bg-canvas grain">
      <div className="flex min-h-screen">
        {/* Sidebar por rol (misma estructura que las vistas demo) */}
        <aside className={`hidden w-64 flex-shrink-0 flex-col ${roleColor} text-white lg:flex`}>
          <div className="border-b border-white/10 px-5 py-6">
            <Link href="/" className="font-display text-xl tracking-tight text-white">
              HealthCloud
            </Link>
            <p className="mt-3 text-xs uppercase tracking-widest text-white/50">
              {getRoleLabel(user.role)}
            </p>
          </div>

          <SidebarNav items={nav} />

          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-semibold">
                {getInitials(user)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{user.fullName ?? user.email}</p>
                <p className="truncate text-xs text-white/60">{user.email}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <Link
                href="/profile"
                className="text-white/60 transition duration-200 ease-out-soft hover:text-white"
              >
                Mi cuenta
              </Link>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="text-white/60 transition duration-200 ease-out-soft hover:text-white"
                >
                  Cerrar sesión
                </button>
              </form>
            </div>
          </div>
        </aside>

        {/* Área de contenido */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Barra superior solo en móvil */}
          <div className={`flex flex-col gap-3 px-4 py-3 text-white lg:hidden ${roleColor}`}>
            <div className="flex items-center justify-between">
              <Link href="/" className="font-display text-lg text-white">
                HealthCloud
              </Link>
              <div className="flex items-center gap-4 text-xs">
                <Link href="/profile" className="text-white/75 hover:text-white">
                  Mi cuenta
                </Link>
                <form action="/auth/signout" method="post">
                  <button type="submit" className="text-white/75 hover:text-white">
                    Cerrar sesión
                  </button>
                </form>
              </div>
            </div>
            <MobileNav items={nav} />
          </div>

          <header className="border-b border-line bg-surface/80 px-6 py-5 backdrop-blur-sm lg:px-10">
            <p className="text-xs font-medium uppercase tracking-wider text-inkMuted">
              {getRoleLabel(user.role)}
            </p>
            <h1 className="mt-1 font-display text-2xl text-ink md:text-3xl">{title}</h1>
            {description && <p className="mt-1 max-w-2xl text-sm text-inkMuted">{description}</p>}
          </header>

          <main className="flex-1 px-6 py-8 lg:px-10">{children}</main>
        </div>
      </div>
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

export function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-line bg-surface shadow-card">
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <h2 className="font-medium text-ink">{title}</h2>
        {action}
      </div>
      <div className="p-6">{children}</div>
    </section>
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
