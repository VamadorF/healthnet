import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { AppNav } from '@/components/layout/app-nav';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user.id)
    .single();

  const displayName = profile?.full_name || user.email;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AppNav email={user.email ?? ''} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h1 className="mb-2 text-3xl font-bold">Dashboard</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Bienvenido, {displayName}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/profile"
              className="rounded-lg border border-gray-200 p-4 transition hover:border-blue-500 dark:border-gray-700"
            >
              <h2 className="font-semibold">Mi perfil</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Edita tu nombre y sube tu avatar
              </p>
            </Link>
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <h2 className="font-semibold">Próximamente</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Métricas de salud y recordatorios
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
