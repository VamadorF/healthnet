import { DemoShell, Panel, BarChart } from '@/components/demo/demo-shell';
import { ADMIN_REPORT_WEEKS } from '@/lib/mock/demo-data';

export default function DemoAdminReportsPage() {
  return (
    <DemoShell
      role="admin"
      title="Reportes de uso"
      subtitle="Métricas agregadas de actividad en la plataforma"
    >
      <Panel title="Actividad semanal">
        <BarChart
          data={ADMIN_REPORT_WEEKS}
          keys={[
            { key: 'users', label: 'Usuarios activos', color: 'bg-role-admin' },
            { key: 'appointments', label: 'Citas', color: 'bg-role-org' },
            { key: 'consultations', label: 'Consultas', color: 'bg-role-spec' },
          ]}
        />
      </Panel>
    </DemoShell>
  );
}
