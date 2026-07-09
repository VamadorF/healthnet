'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DemoRole, DEMO_NAV, DEMO_USERS } from '@/lib/mock/demo-data';

interface DemoShellProps {
  role: DemoRole;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/**
 * Role identity is a thin accent — a rail, a dot, a hairline — never a
 * repainted sidebar. The sidebar shares the canvas so the app reads as one
 * space; only "which of the four worlds am I in" is tinted.
 */
const ROLE = {
  admin: { text: 'text-role-admin', bg: 'bg-role-admin', label: 'Administración' },
  organization: { text: 'text-role-org', bg: 'bg-role-org', label: 'Organización' },
  specialist: { text: 'text-role-spec', bg: 'bg-role-spec', label: 'Especialista' },
  patient: { text: 'text-role-patient', bg: 'bg-role-patient', label: 'Paciente' },
} as const;

export function DemoShell({ role, title, subtitle, children }: DemoShellProps) {
  const user = DEMO_USERS[role];
  const nav = DEMO_NAV[role];
  const pathname = usePathname();
  const accent = ROLE[role];

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <div className="flex min-h-screen">
        {/* Sidebar — on the canvas, hairline separator, role rail on active */}
        <aside className="hidden w-[248px] flex-shrink-0 flex-col border-r border-line bg-canvas lg:flex">
          <div className="flex items-center gap-2.5 px-5 py-5">
            <span className={`h-5 w-1.5 rounded-full ${accent.bg}`} />
            <Link href="/" className="text-base font-semibold tracking-tight text-ink">
              HealthCloud
            </Link>
          </div>

          <div className="px-5 pb-2">
            <span className="eyebrow">{accent.label}</span>
          </div>

          <nav className="flex-1 space-y-0.5 px-3 py-2">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`side-link ${active ? 'side-link-active' : ''}`}
                >
                  <span
                    className={`h-4 w-[3px] rounded-full transition-colors ${
                      active ? accent.bg : 'bg-transparent'
                    }`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-line p-4">
            <div className="flex items-center gap-3">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${accent.bg} text-xs font-semibold text-white`}>
                {user.initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{user.name}</p>
                <p className="truncate text-xs text-inkMuted">{user.context}</p>
              </div>
            </div>
            <Link
              href="/"
              className="mt-3 flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-inkMuted transition-colors hover:bg-surfaceMuted hover:text-ink"
            >
              <span aria-hidden>←</span> Volver al inicio
            </Link>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 border-b border-line bg-canvas/85 px-6 py-4 backdrop-blur lg:px-9">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${accent.bg}`} />
                  <span className="eyebrow">{accent.label}</span>
                </div>
                <h1 className="mt-1.5 text-3xl font-semibold tracking-tightest text-ink">
                  {title}
                </h1>
                {subtitle && <p className="mt-1 max-w-2xl text-sm text-inkMuted">{subtitle}</p>}
              </div>
              <RoleSwitcher current={role} />
            </div>
          </header>

          <main className="flex-1 px-6 py-7 lg:px-9">{children}</main>
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
    <div
      role="tablist"
      aria-label="Cambiar de rol"
      className="flex shrink-0 gap-0.5 rounded-lg border border-line bg-surfaceMuted p-0.5 text-xs"
    >
      {roles.map((r) => {
        const active = current === r.key;
        return (
          <Link
            key={r.key}
            href={`/demo/${r.key}`}
            role="tab"
            aria-selected={active}
            className={`rounded-md px-2.5 py-1.5 font-medium transition-colors ${
              active ? 'bg-surface text-ink shadow-xs' : 'text-inkMuted hover:text-ink'
            }`}
          >
            {r.label}
          </Link>
        );
      })}
    </div>
  );
}

export function MetricGrid({ items }: { items: { label: string; value: string; delta?: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-line bg-surface p-5 shadow-card">
          <p className="eyebrow">{item.label}</p>
          <p className="mt-3 text-3xl font-semibold leading-none tracking-tightest text-ink tabular">
            {item.value}
          </p>
          {item.delta && <p className="mt-2.5 text-xs font-medium text-inkMuted">{item.delta}</p>}
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
    <section className="overflow-hidden rounded-xl border border-line bg-surface shadow-card">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
        <h2 className="text-base font-semibold text-ink">{title}</h2>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

const STATUS_STYLES: Record<string, { chip: string; dot: string }> = {
  Activa: { chip: 'bg-success-soft text-success', dot: 'bg-success' },
  Activo: { chip: 'bg-success-soft text-success', dot: 'bg-success' },
  Confirmada: { chip: 'bg-success-soft text-success', dot: 'bg-success' },
  Pendiente: { chip: 'bg-warning-soft text-warning', dot: 'bg-warning' },
  Revisión: { chip: 'bg-warning-soft text-warning', dot: 'bg-warning' },
  Media: { chip: 'bg-warning-soft text-warning', dot: 'bg-warning' },
  Solicitada: { chip: 'bg-info-soft text-info', dot: 'bg-info' },
  Baja: { chip: 'bg-info-soft text-info', dot: 'bg-info' },
  Invitada: { chip: 'bg-role-admin/10 text-role-admin', dot: 'bg-role-admin' },
  Invitado: { chip: 'bg-role-admin/10 text-role-admin', dot: 'bg-role-admin' },
  'En sala': { chip: 'bg-brand-light text-brand-dark', dot: 'bg-brand' },
};

export function StatusPill({ status }: { status: string }) {
  const s = STATUS_STYLES[status] ?? { chip: 'bg-surfaceMuted text-inkMuted', dot: 'bg-inkFaint' };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${s.chip}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
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
  const max = Math.max(1, ...data.flatMap((row) => keys.map((k) => Number(row[k.key]) || 0)));

  return (
    <div className="space-y-5">
      {data.map((row) => (
        <div key={String(row.week)}>
          <div className="mb-1.5 flex items-baseline justify-between text-xs">
            <span className="font-medium text-inkMuted">{String(row.week)}</span>
            <span className="tabular text-inkFaint">
              {keys.map((k) => Number(row[k.key]) || 0).reduce((a, b) => a + b, 0)}
            </span>
          </div>
          <div className="flex h-2.5 gap-1">
            {keys.map((k) => {
              const val = Number(row[k.key]) || 0;
              const width = (val / max) * 100;
              return (
                <div
                  key={k.key}
                  className={`${k.color} rounded-full transition-all`}
                  style={{ width: `${Math.max(width, val ? 3 : 0)}%` }}
                  title={`${k.label}: ${val}`}
                />
              );
            })}
          </div>
        </div>
      ))}
      <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-xs text-inkMuted">
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
    <div className="relative flex items-start gap-4 pb-6 pl-6 last:pb-0">
      {/* Rail + node */}
      <span className="absolute left-[3px] top-1.5 bottom-0 w-px bg-line" aria-hidden />
      <span className="absolute left-0 top-1 h-2 w-2 rounded-full border-2 border-surface bg-brand" aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="font-mono text-xs font-medium text-brand tabular">{time}</p>
        <p className="mt-1 text-sm font-medium text-ink">{title}</p>
        <p className="mt-0.5 text-sm text-inkMuted">{meta}</p>
      </div>
      {status && <StatusPill status={status} />}
    </div>
  );
}
