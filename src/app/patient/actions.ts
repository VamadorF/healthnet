'use server';

import { revalidatePath } from 'next/cache';
import { UrgencyLevel } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/session';

export async function requestAppointment(formData: FormData) {
  const user = await requireRole('PATIENT');
  const scheduledAt = String(formData.get('scheduledAt') ?? '');
  const reason = String(formData.get('reason') ?? '').trim();
  const organizationId = String(formData.get('organizationId') ?? '').trim() || null;

  if (!scheduledAt || !reason) {
    return;
  }

  await prisma.appointment.create({
    data: {
      patientId: user.id,
      organizationId,
      scheduledAt: new Date(scheduledAt),
      reason,
      status: 'REQUESTED',
      symptoms: { reportedAt: new Date().toISOString(), reason },
    },
  });

  revalidatePath('/patient');
  revalidatePath('/patient/appointments');
  revalidatePath('/patient/history');
  return;
}

export async function reportSymptoms(formData: FormData) {
  const user = await requireRole('PATIENT');
  const description = String(formData.get('description') ?? '').trim();
  const urgencyLevel = String(formData.get('urgencyLevel') ?? 'MEDIUM') as UrgencyLevel;
  const bodyAreas = String(formData.get('bodyAreas') ?? '[]');
  const visualSymptoms = String(formData.get('visualSymptoms') ?? '{}');
  const duration = String(formData.get('duration') ?? '').trim();
  const isEmergency = formData.get('isEmergency') === 'true';

  if (!description) return;

  let bodyAreasData: object;
  let visualSymptomsData: object;
  try {
    bodyAreasData = JSON.parse(bodyAreas);
    visualSymptomsData = JSON.parse(visualSymptoms);
  } catch {
    return;
  }

  await prisma.symptomReport.create({
    data: {
      patientId: user.id,
      description,
      urgencyLevel,
      bodyAreas: bodyAreasData,
      visualSymptoms: visualSymptomsData,
      duration: duration || null,
      isEmergency,
    },
  });

  revalidatePath('/patient/symptoms');
  return;
}
