import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/session';
import { PlatformShell, StatCard, StatusBadge, EmptyState } from '@/components/platform/platform-shell';
import { formatDateTime } from '@/utils/format';
import { confirmAppointment } from '@/app/specialist/actions';
import { SubmitButton } from '@/components/ui/submit-button';

export default async function SpecialistDashboardPage() {
  const user = await requireRole('SPECIALIST');

  const appointments = await prisma.appointment.findMany({
    where: { specialistId: user.id },
    include: { patient: true },
    orderBy: { scheduledAt: 'asc' },
    take: 10,
  });

  const pending = appointments.filter((a) => a.status === 'REQUESTED').length;
  const today = appointments.filter((a) => {
    const d = new Date(a.scheduledAt);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  }).length;

  return (
    <PlatformShell
      user={user}
      title="Agenda operativa"
      description="Revisa tu agenda, atiende pacientes y registra consultas"
    >
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Citas pendientes" value={pending} />
        <StatCard label="Citas hoy" value={today} />
        <StatCard label="Total en agenda" value={appointments.length} />
      </div>

      <div className="space-y-4">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-5 shadow-card sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-ink">{appt.patient.fullName ?? appt.patient.email}</p>
                <StatusBadge status={appt.status} />
              </div>
              <p className="mt-1 text-sm text-inkMuted">{formatDateTime(appt.scheduledAt)}</p>
              <p className="text-sm text-inkMuted">{appt.reason}</p>
            </div>
            {appt.status === 'REQUESTED' && (
              <form action={confirmAppointment}>
                <input type="hidden" name="appointmentId" value={appt.id} />
                <SubmitButton size="sm">Confirmar</SubmitButton>
              </form>
            )}
          </div>
        ))}
        {appointments.length === 0 && (
          <EmptyState>No tienes citas programadas.</EmptyState>
        )}
      </div>
    </PlatformShell>
  );
}
