import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ROLES = [
  {
    title: 'Administrador',
    description: 'Control global: invita o bloquea organizaciones y visualiza reportes de uso.',
    color: 'border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20',
  },
  {
    title: 'Organización',
    description: 'Gestiona el perfil corporativo e invita o remueve especialistas de tu red.',
    color: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20',
  },
  {
    title: 'Especialista',
    description: 'Administra tu agenda, atiende pacientes y registra consultas clínicas.',
    color: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20',
  },
  {
    title: 'Paciente',
    description: 'Solicita horas, registra síntomas y consulta tu historial médico completo.',
    color: 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="max-w-4xl text-4xl font-bold sm:text-5xl">
          HealthCloud
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
          Plataforma integral de gestión de servicios de salud que conecta organizaciones
          médicas, especialistas y pacientes bajo un entorno administrado centralmente.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link href="/signup">
            <Button size="lg">Crear cuenta</Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" size="lg">Iniciar sesión</Button>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="mb-8 text-center text-2xl font-semibold">Cuatro roles, flujos dedicados</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {ROLES.map((role) => (
            <div key={role.title} className={`rounded-xl border p-6 ${role.color}`}>
              <h3 className="text-lg font-semibold">{role.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{role.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-gray-200 bg-gray-50 px-4 py-12 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-xl font-semibold">Arquitectura técnica</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Next.js · Node.js · Prisma · PostgreSQL · Supabase Auth · Render
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Diseñada para manejar formatos de datos clínicos complejos con permisos escalonados por rol.
          </p>
        </div>
      </section>
    </main>
  );
}
