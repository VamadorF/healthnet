import Link from 'next/link';
import { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}

const PRODUCT_POINTS = [
  'Espacios de trabajo separados para administradores, clínicas, especialistas y pacientes',
  'Agenda, consultas e historial clínico en un mismo flujo',
  'Datos clínicos en PostgreSQL y autenticación con Supabase',
];

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="flex min-h-screen bg-canvas grain">
      {/* Panel de marca */}
      <aside className="hidden w-[42%] flex-col justify-between bg-brand-dark p-10 text-white lg:flex">
        <Link href="/" className="font-display text-2xl tracking-tight text-white">
          HealthCloud
        </Link>
        <div>
          <h2 className="max-w-md font-display text-3xl leading-snug">
            Una plataforma donde cada actor sabe exactamente dónde está
          </h2>
          <ul className="mt-8 max-w-md space-y-4 text-sm leading-relaxed text-white/75">
            {PRODUCT_POINTS.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/60" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-white/50">HealthCloud · Gestión de servicios de salud</p>
      </aside>

      {/* Formulario */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="font-display text-2xl text-ink lg:hidden">
            HealthCloud
          </Link>
          <h1 className="mt-8 font-display text-3xl text-ink lg:mt-0">{title}</h1>
          <p className="mt-2 text-sm text-inkMuted">{description}</p>
          {children}
          {footer && <div className="mt-8 border-t border-line pt-6 text-sm text-inkMuted">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
