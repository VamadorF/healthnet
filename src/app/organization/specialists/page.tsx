import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/session';
import { PlatformShell } from '@/components/platform/platform-shell';
import { inviteSpecialist, removeSpecialist, activateSpecialist } from '@/app/organization/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default async function OrganizationSpecialistsPage() {
  const user = await requireRole('ORGANIZATION');

  const organization = await prisma.organization.findUnique({
    where: { ownerId: user.id },
    include: {
      specialists: { include: { specialist: true } },
    },
  });

  const specialists = organization?.specialists ?? [];

  return (
    <PlatformShell
      user={user}
      title="Plantilla médica"
      description="Invita o remueve especialistas de tu red institucional"
    >
      <form
        action={inviteSpecialist}
        className="mb-8 grid gap-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 sm:grid-cols-3"
      >
        <Input name="email" label="Email del especialista" type="email" required />
        <Input name="specialty" label="Especialidad" placeholder="Cardiología" />
        <div className="flex items-end">
          <Button type="submit" className="w-full">Invitar especialista</Button>
        </div>
      </form>

      <div className="space-y-4">
        {specialists.map((member) => (
          <div
            key={member.id}
            className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium">{member.specialist.fullName ?? member.specialist.email}</p>
              <p className="text-sm text-gray-500">{member.specialty ?? 'Sin especialidad'}</p>
              <p className="text-xs text-gray-400">Estado: {member.status}</p>
            </div>
            <div className="flex gap-2">
              {member.status !== 'ACTIVE' && (
                <form action={activateSpecialist}>
                  <input type="hidden" name="specialistId" value={member.specialistId} />
                  <Button type="submit" size="sm">Activar</Button>
                </form>
              )}
              {member.status !== 'REMOVED' && (
                <form action={removeSpecialist}>
                  <input type="hidden" name="specialistId" value={member.specialistId} />
                  <Button type="submit" variant="danger" size="sm">Remover</Button>
                </form>
              )}
            </div>
          </div>
        ))}
        {specialists.length === 0 && (
          <p className="text-center text-gray-500">Aún no tienes especialistas en tu red.</p>
        )}
      </div>
    </PlatformShell>
  );
}
