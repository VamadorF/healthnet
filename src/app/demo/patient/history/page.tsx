import { DemoShell, Panel } from '@/components/demo/demo-shell';
import { PATIENT_HISTORY } from '@/lib/mock/demo-data';

export default function DemoPatientHistoryPage() {
  return (
    <DemoShell
      role="patient"
      title="Historial médico"
      subtitle="Todas tus atenciones y diagnósticos en orden cronológico"
    >
      <Panel title="Atenciones previas">
        <div className="relative space-y-0">
          {PATIENT_HISTORY.map((item, i) => (
            <div key={item.date} className="relative flex gap-6 pb-8 last:pb-0">
              {i < PATIENT_HISTORY.length - 1 && (
                <div className="absolute left-[7px] top-4 h-full w-px bg-line" />
              )}
              <div className="relative z-10 mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-brand bg-surface" />
              <div className="flex-1">
                <p className="font-mono text-xs font-medium text-brand tabular">{item.date}</p>
                <p className="mt-1 font-medium text-ink">{item.title}</p>
                <p className="text-sm text-inkMuted">{item.doctor}</p>
                <p className="mt-2 text-sm leading-relaxed text-inkMuted">{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </DemoShell>
  );
}
