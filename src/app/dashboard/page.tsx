import { getCurrentUser, redirectToRoleDashboard } from '@/lib/auth/session';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return redirectToRoleDashboard(user);
}
