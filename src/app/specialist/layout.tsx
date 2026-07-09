import { requireRole } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export default async function SpecialistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole('SPECIALIST');
  return <>{children}</>;
}
