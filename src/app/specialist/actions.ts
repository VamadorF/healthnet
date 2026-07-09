'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth/session';

export async function updateSchedule(formData: FormData) {
  const user = await requireRole('SPECIALIST');
  const scheduleRaw = String(formData.get('schedule') ?? '{}');

  let scheduleConfig: object;
  try {
    scheduleConfig = JSON.parse(scheduleRaw);
  } catch {
    return;
  }

  await prisma.specialistProfile.upsert({
    where: { userId: user.id },
    create: { userId: user.id, scheduleConfig },
    update: { scheduleConfig },
  });

  revalidatePath('/specialist');
  return;
}

export async function confirmAppointment(formData: FormData) {
  const user = await requireRole('SPECIALIST');
  const appointmentId = String(formData.get('appointmentId') ?? '');
  if (!appointmentId) return;

  await prisma.appointment.updateMany({
    where: { id: appointmentId, specialistId: user.id },
    data: { status: 'CONFIRMED' },
  });

  revalidatePath('/specialist');
  revalidatePath('/specialist/consultations');
  return;
}

export async function recordConsultation(formData: FormData) {
  const user = await requireRole('SPECIALIST');
  const appointmentId = String(formData.get('appointmentId') ?? '');
  const diagnosis = String(formData.get('diagnosis') ?? '').trim();
  const clinicalNotes = String(formData.get('clinicalNotes') ?? '').trim();
  const treatment = String(formData.get('treatment') ?? '{}');
  const vitals = String(formData.get('vitals') ?? '{}');

  if (!appointmentId || !diagnosis) {
    return;
  }

  const appointment = await prisma.appointment.findFirst({
    where: { id: appointmentId, specialistId: user.id },
  });

  if (!appointment) return;

  let treatmentData: object;
  let vitalsData: object;
  try {
    treatmentData = JSON.parse(treatment);
    vitalsData = JSON.parse(vitals);
  } catch {
    return;
  }

  await prisma.$transaction([
    prisma.consultation.upsert({
      where: { appointmentId },
      create: {
        appointmentId,
        specialistId: user.id,
        diagnosis,
        clinicalData: { notes: clinicalNotes },
        treatment: treatmentData,
        vitals: vitalsData,
      },
      update: {
        diagnosis,
        clinicalData: { notes: clinicalNotes },
        treatment: treatmentData,
        vitals: vitalsData,
      },
    }),
    prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: 'COMPLETED' },
    }),
  ]);

  revalidatePath('/specialist/consultations');
  revalidatePath('/patient/history');
  return;
}
