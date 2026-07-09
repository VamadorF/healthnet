import { DemoShell, Panel, StatusPill } from '@/components/demo/demo-shell';
import { ORG_SPECIALISTS } from '@/lib/mock/demo-data';

export default function DemoOrgSpecialistsPage() {
  return (
    <DemoShell
      role="organization"
      title="Especialistas"
      subtitle="Invita o gestiona los profesionales de tu red médica"
    >
      <Panel title="Plantilla actual">
        <div className="space-y-4">
          {ORG_SPECIALISTS.map((s) => (
            <div key={s.name} className="flex items-center justify-between rounded-xl bg-canvas px-5 py-4">
              <div>
                <p className="font-medium text-ink">{s.name}</p>
                <p className="text-sm text-inkMuted">{s.specialty} · {s.patients} pacientes asignados</p>
              </div>
              <StatusPill status={s.status} />
            </div>
          ))}
        </div>
      </Panel>
    </DemoShell>
  );
}
