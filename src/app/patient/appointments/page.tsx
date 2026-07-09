import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/session';
import { PlatformShell } from '@/components/platform/platform-shell';
import { requestAppointment } from '@/app/patient/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDateTime } from '@/utils/format';

export default async function PatientAppointmentsPage() {
  const user = await requireRole('PATIENT');

  const [appointments, organizations] = await Promise.all([
    prisma.appointment.findMany({
      where: { patientId: user.id },
      orderBy: { scheduledAt: 'desc' },
    }),
    prisma.organization.findMany({
      where: { status: 'ACTIVE' },
      select: { id: true, name: true },
    }),
  ]);

  return (
    <PlatformShell
      user={user}
      title="Solicitar hora de atención"
      description="Reserva una cita con un centro médico o especialista"
    >
      <form
        action={requestAppointment}
        className="mb-8 grid max-w-2xl gap-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
      >
        <Input name="scheduledAt" label="Fecha y hora" type="datetime-local" required />
        <Input name="reason" label="Motivo de consulta" required placeholder="Control rutinario" />
        <div>
          <label htmlFor="organizationId" className="mb-2 block text-sm font-medium">
            Centro médico (opcional)
          </label>
          <select
            id="organizationId"
            name="organizationId"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <option value="">Sin preferencia</option>
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>{org.name}</option>
            ))}
          </select>
        </div>
        <Button type="submit">Solicitar cita</Button>
      </form>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Mis citas</h2>
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
          >
            <p className="font-medium">{formatDateTime(appt.scheduledAt)}</p>
            <p className="text-sm text-gray-500">{appt.reason}</p>
            <span className="text-xs text-blue-600">{appt.status}</span>
          </div>
        ))}
        {appointments.length === 0 && (
          <p className="text-gray-500">No has solicitado citas aún.</p>
        )}
      </div>
    </PlatformShell>
  );
}
