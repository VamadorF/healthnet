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
        <a href="/patient/appointments" className="rounded-lg border border-brand-soft bg-brand-light p-5">
          <h3 className="font-semibold text-brand-dark">Solicitar hora</h3>
          <p className="mt-1 text-sm text-brand">Agenda una cita de atención médica</p>
        </a>
        <a href="/patient/symptoms" className="rounded-lg border border-role-patient/30 bg-role-patient/10 p-5">
          <h3 className="font-semibold text-role-patient">Registrar síntomas</h3>
          <p className="mt-1 text-sm text-role-patient">Reporta síntomas visuales o de urgencia</p>
        </a>
        <a href="/patient/history" className="rounded-lg border border-success/30 bg-success-soft p-5">
          <h3 className="font-semibold text-success">Historial médico</h3>
          <p className="mt-1 text-sm text-success">Consulta tus atenciones previas</p>
        </a>
      </div>
    </PlatformShell>
  );
}
