'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { profileSchema } from '@/utils/validation';

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'No autenticado' };
  }

  const fullName = formData.get('full_name');
  const validation = profileSchema.safeParse({
    full_name: fullName,
    email: user.email,
  });

  if (!validation.success) {
    return { error: validation.error.errors[0]?.message ?? 'Datos inválidos' };
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: validation.data.full_name,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/profile');
  revalidatePath('/dashboard');

  return { success: true };
}

export async function updateAvatarPath(avatarPath: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'No autenticado' };
  }

  if (!avatarPath.startsWith(`${user.id}/`)) {
    return { error: 'Ruta de avatar inválida' };
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      avatar_url: avatarPath,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/profile');
  revalidatePath('/dashboard');

  return { success: true };
}
