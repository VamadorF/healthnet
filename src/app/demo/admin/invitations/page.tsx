import { DemoShell, Panel, StatusPill } from '@/components/demo/demo-shell';

const INVITATIONS = [
  { email: 'direccion@hospitalcobre.cl', org: 'Hospital del Cobre', sent: '08 Abr 2025', status: 'Pendiente' },
  { email: 'contacto@redaustral.cl', org: 'Red Salud Austral', sent: '02 Abr 2025', status: 'Pendiente' },
  { email: 'admin@andesnorte.cl', org: 'Clínica Andes Norte', sent: '14 Mar 2024', status: 'Activa' },
];

export default function DemoAdminInvitationsPage() {
  return (
    <DemoShell
      role="admin"
      title="Invitaciones"
      subtitle="Seguimiento de organizaciones invitadas a la plataforma"
    >
      <Panel title="Invitaciones enviadas">
        <div className="space-y-4">
          {INVITATIONS.map((inv) => (
            <div key={inv.email} className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 last:border-0">
              <div>
                <p className="font-medium text-ink">{inv.org}</p>
                <p className="text-sm text-inkMuted">{inv.email} · {inv.sent}</p>
              </div>
              <StatusPill status={inv.status} />
            </div>
          ))}
        </div>
      </Panel>
    </DemoShell>
  );
}
