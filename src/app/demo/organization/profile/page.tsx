import { DemoShell, Panel } from '@/components/demo/demo-shell';

export default function DemoOrgProfilePage() {
  return (
    <DemoShell
      role="organization"
      title="Perfil corporativo"
      subtitle="Información institucional visible para pacientes y especialistas"
    >
      <Panel title="Datos de la clínica">
        <dl className="grid gap-6 sm:grid-cols-2">
          {[
            ['Nombre', 'Clínica Andes Norte'],
            ['Dirección', 'Av. Providencia 2145, Providencia'],
            ['Teléfono', '+56 2 2345 6789'],
            ['Horario', 'Lun–Vie 08:00–20:00 · Sáb 09:00–13:00'],
            ['Descripción', 'Centro médico integral con especialidades de medicina interna, cardiología y dermatología.'],
            ['Convenios', 'Fonasa · Isapres principales · Empresas'],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-medium uppercase tracking-wider text-inkMuted">{label}</dt>
              <dd className="mt-1 text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </Panel>
    </DemoShell>
  );
}
