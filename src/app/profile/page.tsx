import { createClient } from '@/lib/supabase/server';
import { getSignedUrl } from '@/lib/supabase/storage';
import { redirect } from 'next/navigation';
import { AppNav } from '@/components/layout/app-nav';
import { ProfileForm } from '@/components/profile/profile-form';

export default async function ProfilePage() {
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

  let avatarUrl: string | null = null;
  if (profile?.avatar_url) {
    try {
      avatarUrl = await getSignedUrl('avatars', profile.avatar_url);
    } catch {
      avatarUrl = null;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AppNav email={user.email ?? ''} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h1 className="mb-2 text-3xl font-bold">Mi perfil</h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            Administra tu información personal y tu avatar
          </p>
          <ProfileForm
            userId={user.id}
            email={user.email ?? ''}
            fullName={profile?.full_name ?? ''}
            avatarUrl={avatarUrl}
          />
        </div>
      </div>
    </div>
  );
}
