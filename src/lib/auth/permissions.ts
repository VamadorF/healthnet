import { UserRole } from '@prisma/client';

export type Permission =
  | 'organizations:invite'
  | 'organizations:block'
  | 'organizations:view_all'
  | 'reports:view_global'
  | 'organization:manage_profile'
  | 'organization:invite_specialist'
  | 'organization:remove_specialist'
  | 'specialist:manage_schedule'
  | 'specialist:view_clinical'
  | 'specialist:attend_patients'
  | 'specialist:record_consultation'
  | 'patient:request_appointment'
  | 'patient:report_symptoms'
  | 'patient:view_history';

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  ADMIN: [
    'organizations:invite',
    'organizations:block',
    'organizations:view_all',
    'reports:view_global',
  ],
  ORGANIZATION: [
    'organization:manage_profile',
    'organization:invite_specialist',
    'organization:remove_specialist',
  ],
  SPECIALIST: [
    'specialist:manage_schedule',
    'specialist:view_clinical',
    'specialist:attend_patients',
    'specialist:record_consultation',
  ],
  PATIENT: [
    'patient:request_appointment',
    'patient:report_symptoms',
    'patient:view_history',
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function getPermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role];
}
