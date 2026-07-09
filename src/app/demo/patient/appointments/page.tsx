import { DemoShell, Panel, StatusPill } from '@/components/demo/demo-shell';
import { PATIENT_APPOINTMENTS } from '@/lib/mock/demo-data';

export default function DemoPatientAppointmentsPage() {
  return (
    <DemoShell
      role="patient"
      title="Mis citas"
      subtitle="Solicita y revisa tus horas de atención"
    >
      <Panel title="Citas programadas">
        <div className="space-y-4">
          {PATIENT_APPOINTMENTS.map((a) => (
            <div key={a.date} className="flex items-center justify-between rounded-xl border border-line bg-canvas p-5">
              <div>
                <p className="font-medium text-ink">{a.date}</p>
                <p className="mt-0.5 text-sm text-inkMuted">{a.doctor}</p>
                <p className="text-xs text-inkFaint">{a.place}</p>
              </div>
              <StatusPill status={a.status} />
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-dashed border-brand-soft bg-brand-light/60 p-5">
          <p className="text-sm font-medium text-ink">Solicitar nueva hora</p>
          <p className="mt-1 text-xs text-inkMuted">Medicina general · Clínica Andes Norte · Disponibilidad esta semana</p>
          <button className="mt-4 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white shadow-xs transition-[colors,transform] duration-150 hover:bg-brand-dark active:scale-[0.98]">
            Buscar horario
          </button>
        </div>
      </Panel>
    </DemoShell>
  );
}
