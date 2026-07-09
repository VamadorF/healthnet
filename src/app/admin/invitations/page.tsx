import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/session';
import { PlatformShell, RoleBadge } from '@/components/platform/platform-shell';
import { formatDate } from '@/utils/format';

export default async function AdminInvitationsPage() {
  const user = await requireRole('ADMIN');

  const invitations = await prisma.invitation.findMany({
    include: { invitedBy: true, organization: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <PlatformShell
      user={user}
      title="Invitaciones"
      description="Seguimiento de invitaciones enviadas a organizaciones y especialistas"
    >
      <div className="space-y-4">
        {invitations.map((inv) => (
          <div
            key={inv.id}
            className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium">{inv.email}</p>
              <RoleBadge role={inv.role} />
              <span className="text-xs text-gray-400">{inv.status}</span>
            </div>
            {inv.organizationName && (
              <p className="mt-1 text-sm text-gray-500">Organización: {inv.organizationName}</p>
            )}
            <p className="mt-1 text-xs text-gray-400">
              Enviada el {formatDate(inv.createdAt)} · Expira {formatDate(inv.expiresAt)}
            </p>
          </div>
        ))}
        {invitations.length === 0 && (
          <p className="text-center text-gray-500">No hay invitaciones registradas.</p>
        )}
      </div>
    </PlatformShell>
  );
}
