import { DemoShell, Panel } from '@/components/demo/demo-shell';

const CONSULTATIONS = [
  {
    patient: 'Roberto Díaz',
    date: 'Hoy, 09:45',
    diagnosis: 'Diabetes tipo 2 · control trimestral',
    notes: 'HbA1c 6.8%. Mantener metformina 850mg. Reforzar plan alimentario.',
    vitals: 'PA 128/82 · FC 72',
  },
  {
    patient: 'María José Vera',
    date: 'Ayer, 16:30',
    diagnosis: 'Dislipidemia leve',
    notes: 'Perfil lipídico dentro de metas. Control en 4 meses.',
    vitals: 'PA 118/76 · FC 68',
  },
];

export default function DemoSpecialistConsultationsPage() {
  return (
    <DemoShell
      role="specialist"
      title="Consultas clínicas"
      subtitle="Registro de atenciones con datos estructurados"
    >
      <div className="space-y-6">
        {CONSULTATIONS.map((c) => (
          <Panel key={c.patient} title={`${c.patient} · ${c.date}`}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase text-inkMuted">Diagnóstico</p>
                <p className="mt-1 text-ink">{c.diagnosis}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-inkMuted">Signos vitales</p>
                <p className="mt-1 text-ink">{c.vitals}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs font-medium uppercase text-inkMuted">Notas clínicas</p>
                <p className="mt-1 text-sm leading-relaxed text-inkMuted">{c.notes}</p>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </DemoShell>
  );
}
