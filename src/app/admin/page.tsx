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

      <div className="mt-8 rounded-lg border border-line bg-surface p-6">
        <h2 className="text-lg font-semibold">Responsabilidades del Administrador</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-inkMuted">
          <li>Invitar o bloquear organizaciones médicas</li>
          <li>Visualizar reportes generales de uso de la plataforma</li>
          <li>Gestionar invitaciones institucionales</li>
          <li>Supervisar el estado operativo del ecosistema</li>
        </ul>
      </div>
    </PlatformShell>
  );
}
