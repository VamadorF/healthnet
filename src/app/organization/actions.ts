'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/session';

async function getOrganizationForUser(userId: string) {
  const org = await prisma.organization.findUnique({ where: { ownerId: userId } });
  if (!org) throw new Error('Organización no encontrada');
  return org;
}

export async function updateOrganizationProfile(formData: FormData) {
  const user = await requireRole('ORGANIZATION');
  const org = await getOrganizationForUser(user.id);

  const name = String(formData.get('name') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const address = String(formData.get('address') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();

  if (!name) return;

  await prisma.organization.update({
    where: { id: org.id },
    data: { name, description: description || null, address: address || null, phone: phone || null },
  });

  revalidatePath('/organization');
  revalidatePath('/organization/profile');
  return;
}

export async function inviteSpecialist(formData: FormData) {
  const user = await requireRole('ORGANIZATION');
  const org = await getOrganizationForUser(user.id);
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const specialty = String(formData.get('specialty') ?? '').trim();

  if (!email) return;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser?.role === 'SPECIALIST') {
    await prisma.organizationSpecialist.upsert({
      where: {
        organizationId_specialistId: {
          organizationId: org.id,
          specialistId: existingUser.id,
        },
      },
      create: {
        organizationId: org.id,
        specialistId: existingUser.id,
        specialty: specialty || null,
        status: 'PENDING',
      },
      update: {
        status: 'PENDING',
        specialty: specialty || null,
        removedAt: null,
      },
    });
  }

  await prisma.invitation.create({
    data: {
      email,
      role: 'SPECIALIST',
      organizationId: org.id,
      invitedById: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  revalidatePath('/organization/specialists');
  return;
}

export async function removeSpecialist(formData: FormData) {
  const user = await requireRole('ORGANIZATION');
  const org = await getOrganizationForUser(user.id);
  const specialistId = String(formData.get('specialistId') ?? '');
  if (!specialistId) return;

  await prisma.organizationSpecialist.updateMany({
    where: { organizationId: org.id, specialistId },
    data: { status: 'REMOVED', removedAt: new Date() },
  });

  revalidatePath('/organization/specialists');
  return;
}

export async function activateSpecialist(formData: FormData) {
  const user = await requireRole('ORGANIZATION');
  const org = await getOrganizationForUser(user.id);
  const specialistId = String(formData.get('specialistId') ?? '');
  if (!specialistId) return;

  await prisma.organizationSpecialist.updateMany({
    where: { organizationId: org.id, specialistId },
    data: { status: 'ACTIVE', joinedAt: new Date(), removedAt: null },
  });

  revalidatePath('/organization/specialists');
  return;
}
