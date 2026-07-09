import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/session';
import { PlatformShell, StatCard, Panel } from '@/components/platform/platform-shell';

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
          value={{ ACTIVE: 'Activa', BLOCKED: 'Bloqueada', PENDING: 'Pendiente' }[organization?.status ?? 'PENDING']}
        />
      </div>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
        <Panel title={organization?.name ?? 'Organización pendiente'}>
          <p className="text-sm text-inkMuted">
            {organization?.description ?? 'Completa tu perfil corporativo para activar tu red médica.'}
          </p>
        </Panel>

        <Panel title="Áreas de gestión">
          <div className="space-y-3">
            {[
              { href: '/organization/profile', title: 'Perfil corporativo', desc: 'Información institucional visible para tu red' },
              { href: '/organization/specialists', title: 'Plantilla médica', desc: 'Invita o remueve especialistas de tu red' },
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
      </div>
    </PlatformShell>
  );
}
