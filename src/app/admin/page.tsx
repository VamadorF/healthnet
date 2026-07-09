import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/session';
import { PlatformShell, StatCard } from '@/components/platform/platform-shell';

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

      <div className="mt-8 rounded-xl border border-line bg-surface p-6 shadow-card">
        <h2 className="text-lg font-medium text-ink">Responsabilidades del Administrador</h2>
        <ul className="mt-4 space-y-2 text-sm text-inkMuted">
          {[
            'Invitar o bloquear organizaciones médicas',
            'Visualizar reportes generales de uso de la plataforma',
            'Gestionar invitaciones institucionales',
            'Supervisar el estado operativo del ecosistema',
          ].map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <span className="h-1 w-1 shrink-0 rounded-full bg-brand" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </PlatformShell>
  );
}
