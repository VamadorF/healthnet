import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/session';
import { PlatformShell } from '@/components/platform/platform-shell';
import { formatDateTime } from '@/utils/format';

export default async function PatientHistoryPage() {
  const user = await requireRole('PATIENT');

  const appointments = await prisma.appointment.findMany({
    where: { patientId: user.id },
    include: {
      consultation: true,
      specialist: true,
      organization: true,
    },
    orderBy: { scheduledAt: 'desc' },
  });

  return (
    <PlatformShell
      user={user}
      title="Historial médico"
      description="Consulta el registro completo de tus atenciones y diagnósticos"
    >
      <div className="space-y-6">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="rounded-lg border border-line bg-surface p-6"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold">{formatDateTime(appt.scheduledAt)}</h3>
              <span className="text-xs text-brand">{appt.status}</span>
            </div>
            <p className="mt-1 text-sm text-inkMuted">{appt.reason}</p>
            {appt.organization && (
              <p className="text-sm text-inkFaint">Centro: {appt.organization.name}</p>
            )}
            {appt.specialist && (
              <p className="text-sm text-inkFaint">
                Especialista: {appt.specialist.fullName ?? appt.specialist.email}
              </p>
            )}
            {appt.consultation && (
              <div className="mt-4 rounded-md bg-canvas p-4 text-sm">
                <p><strong>Diagnóstico:</strong> {appt.consultation.diagnosis}</p>
                <p className="mt-1">
                  <strong>Tratamiento:</strong>{' '}
                  {JSON.stringify(appt.consultation.treatment)}
                </p>
              </div>
            )}
          </div>
        ))}
        {appointments.length === 0 && (
          <p className="text-center text-inkMuted">Tu historial médico aparecerá aquí tras tus primeras atenciones.</p>
        )}
      </div>
    </PlatformShell>
  );
}
