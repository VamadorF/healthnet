import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/session';
import { PlatformShell } from '@/components/platform/platform-shell';
import { reportSymptoms } from '@/app/patient/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDateTime } from '@/utils/format';

export default async function PatientSymptomsPage() {
  const user = await requireRole('PATIENT');

  const reports = await prisma.symptomReport.findMany({
    where: { patientId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <PlatformShell
      user={user}
      title="Registrar síntomas"
      description="Reporta síntomas visuales, de urgencia o emergencias"
    >
      <form
        action={reportSymptoms}
        className="mb-8 grid max-w-2xl gap-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
      >
        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-medium">Descripción</label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
            placeholder="Describe tus síntomas..."
          />
        </div>
        <div>
          <label htmlFor="urgencyLevel" className="mb-2 block text-sm font-medium">Nivel de urgencia</label>
          <select
            id="urgencyLevel"
            name="urgencyLevel"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <option value="LOW">Baja</option>
            <option value="MEDIUM">Media</option>
            <option value="HIGH">Alta</option>
            <option value="EMERGENCY">Emergencia</option>
          </select>
        </div>
        <Input name="duration" label="Duración" placeholder="2 días" />
        <Input
          name="bodyAreas"
          label="Zonas afectadas (JSON)"
          defaultValue='["cabeza","torax"]'
        />
        <Input
          name="visualSymptoms"
          label="Síntomas visuales (JSON)"
          defaultValue='{"erupcion":false,"inflamacion":true}'
        />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isEmergency" value="true" />
          Marcar como emergencia
        </label>
        <Button type="submit">Enviar reporte</Button>
      </form>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Reportes anteriores</h2>
        {reports.map((report) => (
          <div
            key={report.id}
            className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                report.isEmergency ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {report.urgencyLevel}
              </span>
              <span className="text-xs text-gray-400">{formatDateTime(report.createdAt)}</span>
            </div>
            <p className="mt-2 text-sm">{report.description}</p>
          </div>
        ))}
        {reports.length === 0 && (
          <p className="text-gray-500">No has registrado síntomas aún.</p>
        )}
      </div>
    </PlatformShell>
  );
}
