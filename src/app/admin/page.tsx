import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/session';
import { PlatformShell, StatCard, Panel, EmptyState } from '@/components/platform/platform-shell';
import { formatDate } from '@/utils/format';

export default async function AdminDashboardPage() {
  const user = await requireRole('ADMIN');

  const [organizations, users, appointments, reports] = await Promise.all([
    prisma.organization.count(),
    prisma.user.count(),
    prisma.appointment.count(),
    prisma.usageMetric.findMany({ orderBy: { date: 'desc' }, take: 5 }),
  ]);

  return (
    <PlatformShell
      user={user}
      title="Panel de Administración"
      description="Control global de la infraestructura, organizaciones y reportes de uso"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Organizaciones" value={organizations} />
        <StatCard label="Usuarios totales" value={users} />
        <StatCard label="Citas registradas" value={appointments} />
        <StatCard label="Reportes generados" value={reports.length} />
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
        <Panel title="Áreas de gestión">
          <div className="space-y-3">
            {[
              { href: '/admin/organizations', title: 'Organizaciones', desc: 'Invitar, supervisar o bloquear centros médicos' },
              { href: '/admin/reports', title: 'Reportes de uso', desc: 'Métricas generales de actividad de la plataforma' },
              { href: '/admin/invitations', title: 'Invitaciones', desc: 'Seguimiento de invitaciones institucionales' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between gap-4 rounded-lg bg-canvas px-4 py-3 transition duration-200 ease-out-soft hover:bg-brand-light"
              >
                <div>
                  <p className="text-sm font-medium text-ink group-hover:text-brand-dark">{item.title}</p>
                  <p className="mt-0.5 text-xs text-inkMuted">{item.desc}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="text-inkMuted/50 transition duration-200 ease-out-quart group-hover:translate-x-0.5 group-hover:text-brand"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </Panel>

        <Panel title="Últimos reportes">
          {reports.length > 0 ? (
            <ul className="space-y-3">
              {reports.map((metric) => (
                <li key={metric.id} className="flex items-center justify-between rounded-lg bg-canvas px-4 py-3 text-sm">
                  <span className="font-medium text-ink">{formatDate(metric.date)}</span>
                  <span className="text-inkMuted">
                    {metric.activeUsers} activos · {metric.consultations} consultas
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState>Aún no se han generado reportes de uso.</EmptyState>
          )}
        </Panel>
      </div>
    </PlatformShell>
  );
}
