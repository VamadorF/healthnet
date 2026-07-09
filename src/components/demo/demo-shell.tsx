import Link from 'next/link';
import { DemoRole, DEMO_NAV, DEMO_USERS } from '@/lib/mock/demo-data';

interface DemoShellProps {
  role: DemoRole;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const ROLE_COLORS: Record<DemoRole, string> = {
  admin: 'bg-role-admin',
  organization: 'bg-role-org',
  specialist: 'bg-role-spec',
  patient: 'bg-role-patient',
};

export function DemoShell({ role, title, subtitle, children }: DemoShellProps) {
  const user = DEMO_USERS[role];
  const nav = DEMO_NAV[role];

  return (
    <div className="min-h-screen bg-canvas grain">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className={`hidden w-64 flex-shrink-0 flex-col ${ROLE_COLORS[role]} text-white lg:flex`}>
          <div className="border-b border-white/10 px-5 py-6">
            <Link href="/" className="font-display text-xl tracking-tight text-white">
              HealthCloud
            </Link>
            <p className="mt-3 text-xs uppercase tracking-widest text-white/50">Vista {user.roleLabel}</p>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-5">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="demo-sidebar-link">
                <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-xs font-semibold">
                {user.initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{user.name}</p>
                <p className="truncate text-xs text-white/60">{user.context}</p>
              </div>
            </div>
            <Link
              href="/"
              className="mt-4 block text-center text-xs text-white/50 transition hover:text-white"
            >
              ← Volver al inicio
            </Link>
          </div>
        </aside>

        {/* Main */}
        <div className="flex flex-1 flex-col">
          <header className="border-b border-line bg-surface/80 px-6 py-4 backdrop-blur-sm lg:px-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-inkMuted">{user.roleLabel}</p>
                <h1 className="font-display text-2xl text-ink md:text-3xl">{title}</h1>
                {subtitle && <p className="mt-1 max-w-2xl text-sm text-inkMuted">{subtitle}</p>}
              </div>
              <RoleSwitcher current={role} />
            </div>
          </header>

          <main className="flex-1 px-6 py-8 lg:px-10">{children}</main>
        </div>
      </div>
    </div>
  );
}

function RoleSwitcher({ current }: { current: DemoRole }) {
  const roles: { key: DemoRole; label: string }[] = [
    { key: 'admin', label: 'Admin' },
    { key: 'organization', label: 'Org' },
    { key: 'specialist', label: 'Esp.' },
    { key: 'patient', label: 'Pac.' },
  ];

  return (
    <div className="flex shrink-0 gap-1 rounded-full border border-line bg-canvas p-1 text-xs">
      {roles.map((r) => (
        <Link
          key={r.key}
          href={`/demo/${r.key}`}
          className={`rounded-full px-3 py-1.5 transition duration-200 ease-out-soft ${
            current === r.key ? 'bg-brand text-white' : 'text-inkMuted hover:text-ink'
          }`}
        >
          {r.label}
        </Link>
      ))}
    </div>
  );
}

export function MetricGrid({ items }: { items: { label: string; value: string; delta?: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-line bg-surface p-5 shadow-card">
          <p className="text-sm text-inkMuted">{item.label}</p>
          <p className="mt-2 font-display text-3xl text-ink">{item.value}</p>
          {item.delta && <p className="mt-2 text-xs text-brand">{item.delta}</p>}
        </div>
      ))}
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

export function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Activa: 'bg-emerald-50 text-emerald-700',
    Activo: 'bg-emerald-50 text-emerald-700',
    Confirmada: 'bg-emerald-50 text-emerald-700',
    Pendiente: 'bg-amber-50 text-amber-700',
    Solicitada: 'bg-sky-50 text-sky-700',
    Revisión: 'bg-amber-50 text-amber-700',
    Invitada: 'bg-violet-50 text-violet-700',
    Invitado: 'bg-violet-50 text-violet-700',
    'En sala': 'bg-brand-light text-brand-dark',
    Media: 'bg-amber-50 text-amber-700',
    Baja: 'bg-sky-50 text-sky-700',
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] ?? 'bg-canvas text-inkMuted'}`}>
      {status}
    </span>
  );
}

export function BarChart({
  data,
  keys,
}: {
  data: Record<string, string | number>[];
  keys: { key: string; label: string; color: string }[];
}) {
  const max = Math.max(
    ...data.flatMap((row) => keys.map((k) => Number(row[k.key]) || 0))
  );

  return (
    <div className="space-y-4">
      {data.map((row) => (
        <div key={String(row.week)}>
          <div className="mb-2 flex justify-between text-xs text-inkMuted">
            <span>{row.week}</span>
          </div>
          <div className="flex h-8 gap-1">
            {keys.map((k) => {
              const val = Number(row[k.key]) || 0;
              const width = max ? (val / max) * 100 : 0;
              return (
                <div
                  key={k.key}
                  className={`${k.color} rounded-full transition-all duration-300 ease-out-quart`}
                  style={{ width: `${width}%` }}
                  title={`${k.label}: ${val}`}
                />
              );
            })}
          </div>
        </div>
      ))}
      <div className="flex gap-4 text-xs text-inkMuted">
        {keys.map((k) => (
          <span key={k.key} className="flex items-center gap-1.5">
            <span className={`inline-block h-2 w-2 rounded-full ${k.color}`} />
            {k.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TimelineItem({
  time,
  title,
  meta,
  status,
}: {
  time: string;
  title: string;
  meta: string;
  status?: string;
}) {
  return (
    <div className="flex gap-4 border-l-2 border-brand-soft pl-5 pb-6 last:pb-0">
      <div className="flex-1">
        <p className="text-xs font-medium text-brand">{time}</p>
        <p className="mt-1 font-medium text-ink">{title}</p>
        <p className="mt-0.5 text-sm text-inkMuted">{meta}</p>
      </div>
      {status && <StatusPill status={status} />}
    </div>
  );
}
