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
            className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold">{formatDateTime(appt.scheduledAt)}</h3>
              <span className="text-xs text-blue-600">{appt.status}</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">{appt.reason}</p>
            {appt.organization && (
              <p className="text-sm text-gray-400">Centro: {appt.organization.name}</p>
            )}
            {appt.specialist && (
              <p className="text-sm text-gray-400">
                Especialista: {appt.specialist.fullName ?? appt.specialist.email}
              </p>
            )}
            {appt.consultation && (
              <div className="mt-4 rounded-md bg-gray-50 p-4 text-sm dark:bg-gray-900">
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
          <p className="text-center text-gray-500">Tu historial médico aparecerá aquí tras tus primeras atenciones.</p>
        )}
      </div>
    </PlatformShell>
  );
}
