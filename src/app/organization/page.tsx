import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/session';
import { PlatformShell, StatCard } from '@/components/platform/platform-shell';

export default async function OrganizationDashboardPage() {
  const user = await requireRole('ORGANIZATION');

  const organization = await prisma.organization.findUnique({
    where: { ownerId: user.id },
    include: {
      specialists: { include: { specialist: true } },
      appointments: true,
    },
  });

  const activeSpecialists = organization?.specialists.filter((s) => s.status === 'ACTIVE').length ?? 0;

  return (
    <PlatformShell
      user={user}
      title="Panel de Organización"
      description="Gestiona tu perfil corporativo y la plantilla médica de tu centro"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Especialistas activos" value={activeSpecialists} />
        <StatCard label="Citas asociadas" value={organization?.appointments.length ?? 0} />
        <StatCard
          label="Estado institucional"
          value={organization?.status ?? 'PENDING'}
        />
      </div>

      <div className="mt-8 rounded-lg border border-line bg-surface p-6">
        <h2 className="text-lg font-semibold">{organization?.name ?? 'Organización pendiente'}</h2>
        <p className="mt-2 text-sm text-inkMuted">
          {organization?.description ?? 'Completa tu perfil corporativo para activar tu red médica.'}
        </p>
      </div>
    </PlatformShell>
  );
}
