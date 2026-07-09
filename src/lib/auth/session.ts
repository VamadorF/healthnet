import { User, UserRole, UserStatus } from '@prisma/client';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { ROLE_DASHBOARD_PATH } from '@/lib/auth/roles';

export async function syncUserFromSupabase(): Promise<User | null> {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser?.email) return null;

  const existing = await prisma.user.findUnique({
    where: { supabaseId: authUser.id },
  });

  if (existing) {
    if (existing.fullName !== authUser.user_metadata?.full_name) {
      return prisma.user.update({
        where: { id: existing.id },
        data: {
          fullName: authUser.user_metadata?.full_name ?? existing.fullName,
          email: authUser.email!,
        },
      });
    }
    return existing;
  }

  const role = (authUser.user_metadata?.role as UserRole) ?? 'PATIENT';

  const user = await prisma.user.create({
    data: {
      supabaseId: authUser.id,
      email: authUser.email,
      fullName: authUser.user_metadata?.full_name ?? null,
      role,
      status: 'ACTIVE',
      patientProfile: role === 'PATIENT' ? { create: {} } : undefined,
      specialistProfile: role === 'SPECIALIST' ? { create: {} } : undefined,
    },
  });

  return user;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    return await syncUserFromSupabase();
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  if (user.status === 'BLOCKED') redirect('/login?error=blocked');
  return user;
}

export async function requireRole(...roles: UserRole[]): Promise<User> {
  const user = await requireAuth();
  if (!roles.includes(user.role)) {
    redirect(ROLE_DASHBOARD_PATH[user.role]);
  }
  return user;
}

export async function redirectToRoleDashboard(user: User): Promise<never> {
  redirect(ROLE_DASHBOARD_PATH[user.role]);
}

export function isUserActive(user: User): boolean {
  return user.status === UserStatus.ACTIVE;
}
