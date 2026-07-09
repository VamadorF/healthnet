import { requireRole } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole('ADMIN');
  return <>{children}</>;
}
