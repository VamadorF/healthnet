import { UserRole } from '@prisma/client';

export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: 'Administrador',
  ORGANIZATION: 'Organización',
  SPECIALIST: 'Especialista',
  PATIENT: 'Paciente',
};

export const ROLE_DASHBOARD_PATH: Record<UserRole, string> = {
  ADMIN: '/admin',
  ORGANIZATION: '/organization',
  SPECIALIST: '/specialist',
  PATIENT: '/patient',
};

export const ROLE_ROUTE_PREFIX: Record<UserRole, string> = {
  ADMIN: '/admin',
  ORGANIZATION: '/organization',
  SPECIALIST: '/specialist',
  PATIENT: '/patient',
};

export function getRoleFromPath(pathname: string): UserRole | null {
  if (pathname.startsWith('/admin')) return 'ADMIN';
  if (pathname.startsWith('/organization')) return 'ORGANIZATION';
  if (pathname.startsWith('/specialist')) return 'SPECIALIST';
  if (pathname.startsWith('/patient')) return 'PATIENT';
  return null;
}
