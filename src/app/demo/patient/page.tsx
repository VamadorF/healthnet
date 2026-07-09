import Link from 'next/link';
import { DemoShell, MetricGrid, Panel, StatusPill } from '@/components/demo/demo-shell';
import { PATIENT_APPOINTMENTS } from '@/lib/mock/demo-data';

export default function DemoPatientPage() {
  return (
    <DemoShell
      role="patient"
      title="Hola, Camila"
      subtitle="Tu salud, organizada en un solo lugar"
    >
      <MetricGrid
        items={[
          { label: 'Próxima cita', value: 'Hoy', delta: '09:00 con Dr. Figueroa' },
          { label: 'Consultas este año', value: '3', delta: 'Historial al día' },
          { label: 'Síntomas reportados', value: '2', delta: 'Último: ayer' },
          { label: 'Medicación activa', value: '1', delta: 'Losartán 50mg' },
        ]}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Panel
          title="Próximas citas"
          action={<Link href="/demo/patient/appointments" className="text-sm text-brand hover:underline">Ver todas</Link>}
        >
          {PATIENT_APPOINTMENTS.map((a) => (
            <div key={a.date} className="mb-4 flex justify-between border-b border-line pb-4 last:mb-0 last:border-0">
              <div>
                <p className="font-medium text-ink">{a.date}</p>
                <p className="text-sm text-inkMuted">{a.doctor} · {a.place}</p>
              </div>
              <StatusPill status={a.status} />
            </div>
          ))}
        </Panel>

        <Panel title="Acciones rápidas">
          <div className="grid gap-3">
            <Link href="/demo/patient/symptoms" className="rounded-xl bg-canvas px-4 py-3 text-sm font-medium text-ink transition hover:bg-brand-light">
              Registrar síntomas →
            </Link>
            <Link href="/demo/patient/history" className="rounded-xl bg-canvas px-4 py-3 text-sm font-medium text-ink transition hover:bg-brand-light">
              Ver historial médico →
            </Link>
            <Link href="/demo/patient/appointments" className="rounded-xl bg-canvas px-4 py-3 text-sm font-medium text-ink transition hover:bg-brand-light">
              Solicitar nueva hora →
            </Link>
          </div>
        </Panel>
      </div>
    </DemoShell>
  );
}
