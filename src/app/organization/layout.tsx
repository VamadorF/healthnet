import { requireRole } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export default async function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole('ORGANIZATION');
  return <>{children}</>;
}
