import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/session';
import { PlatformShell } from '@/components/platform/platform-shell';
import { recordConsultation } from '@/app/specialist/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDateTime } from '@/utils/format';

export default async function SpecialistConsultationsPage() {
  const user = await requireRole('SPECIALIST');

  const appointments = await prisma.appointment.findMany({
    where: {
      specialistId: user.id,
      status: { in: ['CONFIRMED', 'IN_PROGRESS', 'COMPLETED'] },
    },
    include: { patient: true, consultation: true },
    orderBy: { scheduledAt: 'desc' },
  });

  return (
    <PlatformShell
      user={user}
      title="Consultas clínicas"
      description="Registra diagnósticos, tratamientos y datos clínicos complejos"
    >
      <div className="space-y-8">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-4">
              <h3 className="font-semibold">{appt.patient.fullName ?? appt.patient.email}</h3>
              <p className="text-sm text-gray-500">{formatDateTime(appt.scheduledAt)} · {appt.status}</p>
            </div>

            {appt.consultation ? (
              <div className="rounded-md bg-gray-50 p-4 text-sm dark:bg-gray-900">
                <p><strong>Diagnóstico:</strong> {appt.consultation.diagnosis}</p>
                <p className="mt-2"><strong>Notas:</strong> {(appt.consultation.clinicalData as { notes?: string })?.notes}</p>
              </div>
            ) : (
              <form action={recordConsultation} className="grid gap-4 sm:grid-cols-2">
                <input type="hidden" name="appointmentId" value={appt.id} />
                <Input name="diagnosis" label="Diagnóstico" required />
                <Input name="clinicalNotes" label="Notas clínicas" />
                <Input
                  name="vitals"
                  label="Signos vitales (JSON)"
                  defaultValue='{"presion":"120/80","temperatura":"36.5"}'
                />
                <Input
                  name="treatment"
                  label="Tratamiento (JSON)"
                  defaultValue='{"medicamentos":[],"indicaciones":""}'
                />
                <div className="sm:col-span-2">
                  <Button type="submit">Registrar consulta</Button>
                </div>
              </form>
            )}
          </div>
        ))}
        {appointments.length === 0 && (
          <p className="text-center text-gray-500">No hay consultas para registrar.</p>
        )}
      </div>
    </PlatformShell>
  );
}
