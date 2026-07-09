import Link from 'next/link';
import { ArchitectureMap } from '@/components/demo/architecture-map';

const AGENDA_PREVIEW = [
  { t: '09:00', p: 'Camila Soto', s: 'Confirmada', tone: 'bg-success-soft text-success', dot: 'bg-success' },
  { t: '09:45', p: 'Roberto Díaz', s: 'En sala', tone: 'bg-brand-light text-brand-dark', dot: 'bg-brand' },
  { t: '10:30', p: 'María José Vera', s: 'Confirmada', tone: 'bg-success-soft text-success', dot: 'bg-success' },
];

const ROLE_CARDS = [
  { href: '/demo/admin', title: 'Administrador', sub: '24 organizaciones · reportes globales', rail: 'bg-role-admin' },
  { href: '/demo/organization', title: 'Organización', sub: 'Clínica Andes Norte · 18 especialistas', rail: 'bg-role-org' },
  { href: '/demo/specialist', title: 'Especialista', sub: '4 citas hoy · 3 consultas pendientes', rail: 'bg-role-spec' },
  { href: '/demo/patient', title: 'Paciente', sub: 'Próxima cita hoy 09:00', rail: 'bg-role-patient' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-line bg-canvas/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <span className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
            <span className="h-4 w-1.5 rounded-full bg-brand" />
            HealthCloud
          </span>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#arquitectura" className="hidden text-inkMuted transition-colors hover:text-ink sm:block">Arquitectura</a>
            <a href="#roles" className="hidden text-inkMuted transition-colors hover:text-ink sm:block">Roles</a>
            <Link href="/login" className="text-inkMuted transition-colors hover:text-ink">Acceso</Link>
            <Link
              href="/demo/admin"
              className="rounded-lg bg-brand px-3.5 py-2 text-sm font-medium text-white shadow-xs transition-colors hover:bg-brand-dark"
            >
              Explorar plataforma
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="eyebrow">Gestión de servicios de salud</span>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tightest text-ink md:text-5xl">
              Cada actor sabe exactamente dónde está
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-inkMuted">
              HealthCloud conecta administradores, clínicas, especialistas y pacientes
              en flujos separados pero coordinados. Sin ruido, sin pantallas genéricas.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/demo/patient"
                className="rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-card transition-colors hover:bg-brand-dark"
              >
                Entrar como paciente
              </Link>
              <Link
                href="/demo/admin"
                className="rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-lineStrong"
              >
                Ver panel administrativo
              </Link>
            </div>
          </div>

          {/* Live specimen — the product's most characteristic view */}
          <div className="rounded-2xl border border-line bg-surface p-2 shadow-lift">
            <div className="rounded-xl bg-canvas p-4">
              <div className="flex items-center gap-2.5 pb-3">
                <span className="h-4 w-1.5 rounded-full bg-role-spec" />
                <span className="text-sm font-medium text-ink">Agenda · Dr. Tomás Figueroa</span>
                <span className="ml-auto font-mono text-xs text-inkFaint tabular">Mié 9 Abr</span>
              </div>
              <div className="space-y-2">
                {AGENDA_PREVIEW.map((row) => (
                  <div
                    key={row.t}
                    className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3.5 py-2.5"
                  >
                    <span className="font-mono text-xs font-medium text-brand tabular">{row.t}</span>
                    <span className="text-sm font-medium text-ink">{row.p}</span>
                    <span className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${row.tone}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${row.dot}`} />
                      {row.s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles quick access */}
      <section id="roles" className="border-t border-line bg-surface py-20">
        <div className="mx-auto max-w-6xl px-6">
          <span className="eyebrow">Cuatro interfaces, un sistema</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tightest text-ink">
            Cada rol tiene su propio espacio de trabajo
          </h2>
          <p className="mt-3 max-w-2xl text-inkMuted">
            Navega entre ellos para ver cómo se organiza la información en la
            arquitectura real del producto.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {ROLE_CARDS.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex items-center gap-4 rounded-xl border border-line bg-canvas p-5 transition-all hover:border-lineStrong hover:shadow-card"
              >
                <span className={`h-10 w-1 rounded-full ${card.rail}`} />
                <div className="flex-1">
                  <h3 className="text-[15px] font-semibold text-ink">{card.title}</h3>
                  <p className="mt-0.5 text-sm text-inkMuted">{card.sub}</p>
                </div>
                <span className="text-inkFaint transition-transform group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section id="arquitectura" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <span className="eyebrow">Arquitectura</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tightest text-ink">Dónde vive cada cosa</h2>
          <p className="mt-3 max-w-2xl text-inkMuted">
            La misma estructura que verás en producción: capas claras, roles aislados,
            datos clínicos en PostgreSQL y autenticación en Supabase.
          </p>
          <div className="mt-10">
            <ArchitectureMap />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line bg-surface py-9">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-inkMuted md:flex-row">
          <span>HealthCloud · Next.js · Prisma · Supabase · Render</span>
          <div className="flex gap-6">
            <Link href="/login" className="transition-colors hover:text-ink">Iniciar sesión</Link>
            <Link href="/signup" className="transition-colors hover:text-ink">Registrarse</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
