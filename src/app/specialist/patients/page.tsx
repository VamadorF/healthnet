import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/session';
import { PlatformShell } from '@/components/platform/platform-shell';

export default async function SpecialistPatientsPage() {
  const user = await requireRole('SPECIALIST');

  const appointments = await prisma.appointment.findMany({
    where: { specialistId: user.id },
    include: { patient: { include: { patientProfile: true } } },
    distinct: ['patientId'],
  });

  const patients = appointments.map((a) => a.patient);

  return (
    <PlatformShell
      user={user}
      title="Pacientes"
      description="Información clínica de los pacientes en tu agenda"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
          >
            <h3 className="font-semibold">{patient.fullName ?? patient.email}</h3>
            <p className="mt-1 text-sm text-gray-500">{patient.email}</p>
            {patient.patientProfile?.bloodType && (
              <p className="mt-2 text-sm">Tipo de sangre: {patient.patientProfile.bloodType}</p>
            )}
          </div>
        ))}
        {patients.length === 0 && (
          <p className="col-span-2 text-center text-gray-500">Aún no tienes pacientes asignados.</p>
        )}
      </div>
    </PlatformShell>
  );
}
