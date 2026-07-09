import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/session';
import { PlatformShell, StatCard } from '@/components/platform/platform-shell';

export default async function PatientDashboardPage() {
  const user = await requireRole('PATIENT');

  const [appointments, symptomReports, consultations] = await Promise.all([
    prisma.appointment.count({ where: { patientId: user.id } }),
    prisma.symptomReport.count({ where: { patientId: user.id } }),
    prisma.consultation.count({
      where: { appointment: { patientId: user.id } },
    }),
  ]);

  return (
    <PlatformShell
      user={user}
      title="Panel del Paciente"
      description="Solicita atención, registra síntomas y consulta tu historial médico"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Citas solicitadas" value={appointments} />
        <StatCard label="Reportes de síntomas" value={symptomReports} />
        <StatCard label="Consultas completadas" value={consultations} />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <a href="/patient/appointments" className="rounded-lg border border-blue-200 bg-blue-50 p-5 dark:border-blue-800 dark:bg-blue-900/20">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300">Solicitar hora</h3>
          <p className="mt-1 text-sm text-blue-600 dark:text-blue-400">Agenda una cita de atención médica</p>
        </a>
        <a href="/patient/symptoms" className="rounded-lg border border-orange-200 bg-orange-50 p-5 dark:border-orange-800 dark:bg-orange-900/20">
          <h3 className="font-semibold text-orange-800 dark:text-orange-300">Registrar síntomas</h3>
          <p className="mt-1 text-sm text-orange-600 dark:text-orange-400">Reporta síntomas visuales o de urgencia</p>
        </a>
        <a href="/patient/history" className="rounded-lg border border-green-200 bg-green-50 p-5 dark:border-green-800 dark:bg-green-900/20">
          <h3 className="font-semibold text-green-800 dark:text-green-300">Historial médico</h3>
          <p className="mt-1 text-sm text-green-600 dark:text-green-400">Consulta tus atenciones previas</p>
        </a>
      </div>
    </PlatformShell>
  );
}
