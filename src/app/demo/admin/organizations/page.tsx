import { DemoShell, Panel, StatusPill } from '@/components/demo/demo-shell';
import { ADMIN_ORGS } from '@/lib/mock/demo-data';

export default function DemoAdminOrgsPage() {
  return (
    <DemoShell
      role="admin"
      title="Organizaciones"
      subtitle="Invita nuevas clínicas o gestiona el estado de las existentes"
    >
      <Panel title="Red de centros médicos">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-inkMuted">
                <th className="pb-3 pr-4">Organización</th>
                <th className="pb-3 pr-4">Ciudad</th>
                <th className="pb-3 pr-4">Especialistas</th>
                <th className="pb-3 pr-4">Desde</th>
                <th className="pb-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_ORGS.map((org) => (
                <tr key={org.name} className="border-b border-line/60 last:border-0">
                  <td className="py-4 pr-4 font-medium text-ink">{org.name}</td>
                  <td className="py-4 pr-4 text-inkMuted">{org.city}</td>
                  <td className="py-4 pr-4">{org.specialists}</td>
                  <td className="py-4 pr-4 text-inkMuted">{org.since}</td>
                  <td className="py-4"><StatusPill status={org.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </DemoShell>
  );
}
