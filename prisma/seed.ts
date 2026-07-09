import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users: Array<{
    supabaseId: string;
    email: string;
    fullName: string;
    role: UserRole;
  }> = [
    {
      supabaseId: 'seed-admin-001',
      email: 'admin@healthcloud.demo',
      fullName: 'Administrador Demo',
      role: 'ADMIN',
    },
    {
      supabaseId: 'seed-org-001',
      email: 'org@healthcloud.demo',
      fullName: 'Clínica Central',
      role: 'ORGANIZATION',
    },
    {
      supabaseId: 'seed-spec-001',
      email: 'especialista@healthcloud.demo',
      fullName: 'Dr. Ana Martínez',
      role: 'SPECIALIST',
    },
    {
      supabaseId: 'seed-patient-001',
      email: 'paciente@healthcloud.demo',
      fullName: 'Carlos Pérez',
      role: 'PATIENT',
    },
  ];

  for (const data of users) {
    await prisma.user.upsert({
      where: { email: data.email },
      create: {
        ...data,
        status: 'ACTIVE',
        patientProfile: data.role === 'PATIENT' ? { create: {} } : undefined,
        specialistProfile: data.role === 'SPECIALIST' ? { create: { specialty: 'Medicina General' } } : undefined,
      },
      update: { fullName: data.fullName, role: data.role },
    });
  }

  const orgUser = await prisma.user.findUnique({ where: { email: 'org@healthcloud.demo' } });
  const specUser = await prisma.user.findUnique({ where: { email: 'especialista@healthcloud.demo' } });
  const patientUser = await prisma.user.findUnique({ where: { email: 'paciente@healthcloud.demo' } });

  if (orgUser) {
    await prisma.organization.upsert({
      where: { ownerId: orgUser.id },
      create: {
        name: 'Clínica Central',
        description: 'Centro médico de demostración',
        status: 'ACTIVE',
        ownerId: orgUser.id,
      },
      update: { status: 'ACTIVE' },
    });
  }

  const org = orgUser
    ? await prisma.organization.findUnique({ where: { ownerId: orgUser.id } })
    : null;

  if (org && specUser) {
    await prisma.organizationSpecialist.upsert({
      where: {
        organizationId_specialistId: {
          organizationId: org.id,
          specialistId: specUser.id,
        },
      },
      create: {
        organizationId: org.id,
        specialistId: specUser.id,
        status: 'ACTIVE',
        specialty: 'Medicina General',
        joinedAt: new Date(),
      },
      update: { status: 'ACTIVE' },
    });
  }

  if (patientUser && specUser) {
    const existingAppt = await prisma.appointment.findFirst({
      where: { patientId: patientUser.id },
    });

    if (!existingAppt) {
      const appt = await prisma.appointment.create({
        data: {
          patientId: patientUser.id,
          specialistId: specUser.id,
          organizationId: org?.id,
          scheduledAt: new Date(Date.now() + 86400000),
          status: 'CONFIRMED',
          reason: 'Control de rutina',
          symptoms: { type: 'general', severity: 'low' },
        },
      });

      await prisma.consultation.create({
        data: {
          appointmentId: appt.id,
          specialistId: specUser.id,
          diagnosis: 'Estado de salud estable',
          clinicalData: { notes: 'Paciente sin hallazgos relevantes' },
          treatment: { medicamentos: [], indicaciones: 'Hidratación y reposo' },
          vitals: { presion: '120/80', temperatura: '36.5' },
        },
      });
    }
  }

  console.log('Seed completado: usuarios demo por rol creados.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
