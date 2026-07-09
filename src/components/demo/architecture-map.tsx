import Link from 'next/link';
import { ARCHITECTURE_LAYERS } from '@/lib/mock/demo-data';

const ROLE_CARDS = [
  {
    role: 'admin',
    title: 'Administrador',
    desc: 'Invita organizaciones, supervisa el ecosistema y lee reportes de uso.',
    href: '/demo/admin',
    rail: 'bg-role-admin',
  },
  {
    role: 'organization',
    title: 'Organización',
    desc: 'Gestiona el perfil de la clínica y coordina su plantilla médica.',
    href: '/demo/organization',
    rail: 'bg-role-org',
  },
  {
    role: 'specialist',
    title: 'Especialista',
    desc: 'Agenda del día, consultas clínicas y seguimiento de pacientes.',
    href: '/demo/specialist',
    rail: 'bg-role-spec',
  },
  {
    role: 'patient',
    title: 'Paciente',
    desc: 'Solicita horas, registra síntomas y revisa su historial completo.',
    href: '/demo/patient',
    rail: 'bg-role-patient',
  },
];

export function ArchitectureMap() {
  return (
    <div className="space-y-6">
      {/* Flujo entre actores */}
      <div className="rounded-2xl border border-line bg-surface p-7 shadow-card">
        <h3 className="text-lg font-semibold text-ink">Flujo entre actores</h3>
        <p className="mt-1.5 text-sm text-inkMuted">
          Cada rol opera en su módulo. Los permisos suben en cascada institucional.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {ROLE_CARDS.map((card) => (
            <Link
              key={card.role}
              href={card.href}
              className="group flex flex-col rounded-xl border border-line bg-canvas p-4 transition-all hover:border-lineStrong hover:shadow-card"
            >
              <span className={`h-1 w-8 rounded-full ${card.rail}`} />
              <h4 className="mt-3 text-sm font-semibold text-ink">{card.title}</h4>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-inkMuted">{card.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand">
                Ver interfaz
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Capas técnicas */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ARCHITECTURE_LAYERS.map((layer, i) => (
          <div key={layer.title} className="rounded-xl border border-line bg-surface p-5 shadow-card">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-surfaceMuted font-mono text-2xs font-medium text-inkMuted tabular">
                {i + 1}
              </span>
              <h4 className="text-sm font-semibold text-ink">{layer.title}</h4>
            </div>
            <ul className="mt-3 space-y-1.5">
              {layer.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-inkMuted">
                  <span className="h-1 w-1 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-dashed border-lineStrong bg-canvas px-6 py-4 text-center text-sm text-inkMuted">
        Despliegue en <strong className="font-medium text-ink">Render</strong> · Base de datos{' '}
        <strong className="font-medium text-ink">PostgreSQL</strong> · Autenticación{' '}
        <strong className="font-medium text-ink">Supabase</strong>
      </div>
    </div>
  );
}
