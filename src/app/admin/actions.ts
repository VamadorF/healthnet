'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/session';

export async function inviteOrganization(formData: FormData) {
  const admin = await requireRole('ADMIN');
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const organizationName = String(formData.get('organizationName') ?? '').trim();

  if (!email || !organizationName) {
    return;
  }

  const existing = await prisma.invitation.findFirst({
    where: { email, role: 'ORGANIZATION', status: 'PENDING' },
  });

  if (existing) {
    return;
  }

  await prisma.invitation.create({
    data: {
      email,
      role: 'ORGANIZATION',
      organizationName,
      invitedById: admin.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  revalidatePath('/admin/organizations');
  revalidatePath('/admin/invitations');
  return;
}

export async function toggleOrganizationStatus(formData: FormData) {
  await requireRole('ADMIN');
  const organizationId = String(formData.get('organizationId') ?? '');
  const block = formData.get('block') === 'true';

  if (!organizationId) return;

  await prisma.organization.update({
    where: { id: organizationId },
    data: {
      status: block ? 'BLOCKED' : 'ACTIVE',
      blockedAt: block ? new Date() : null,
    },
  });

  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
    select: { ownerId: true },
  });

  if (org) {
    await prisma.user.update({
      where: { id: org.ownerId },
      data: { status: block ? 'BLOCKED' : 'ACTIVE' },
    });
  }

  revalidatePath('/admin/organizations');
  return;
}

export async function recordDailyMetrics() {
  await requireRole('ADMIN');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [totalUsers, activeUsers, appointments, consultations, organizations, symptomReports] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: 'ACTIVE' } }),
      prisma.appointment.count(),
      prisma.consultation.count(),
      prisma.organization.count({ where: { status: 'ACTIVE' } }),
      prisma.symptomReport.count(),
    ]);

  await prisma.usageMetric.upsert({
    where: { date: today },
    create: {
      date: today,
      totalUsers,
      activeUsers,
      appointments,
      consultations,
      organizations,
      symptomReports,
    },
    update: {
      totalUsers,
      activeUsers,
      appointments,
      consultations,
      organizations,
      symptomReports,
    },
  });

  revalidatePath('/admin/reports');
  return;
}
