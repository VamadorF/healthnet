import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/session';
import { PlatformShell, StatCard } from '@/components/platform/platform-shell';
import { formatDateTime } from '@/utils/format';
import { confirmAppointment } from '@/app/specialist/actions';
import { Button } from '@/components/ui/button';

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
            className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium">{appt.patient.fullName ?? appt.patient.email}</p>
              <p className="text-sm text-inkMuted">{formatDateTime(appt.scheduledAt)}</p>
              <p className="text-sm text-inkFaint">{appt.reason}</p>
              <span className="mt-1 inline-block text-xs text-brand">{appt.status}</span>
            </div>
            {appt.status === 'REQUESTED' && (
              <form action={confirmAppointment}>
                <input type="hidden" name="appointmentId" value={appt.id} />
                <Button type="submit" size="sm">Confirmar</Button>
              </form>
            )}
          </div>
        ))}
        {appointments.length === 0 && (
          <p className="text-center text-inkMuted">No tienes citas programadas.</p>
        )}
      </div>
    </PlatformShell>
  );
}
