# HealthCloud — Arquitectura de Plataforma

HealthCloud es una plataforma integral de gestión de servicios de salud que conecta organizaciones médicas, especialistas y pacientes bajo un entorno administrado centralmente.

## Roles y permisos

| Rol | Responsabilidades | Rutas |
|-----|-------------------|-------|
| **Administrador** | Invitar/bloquear organizaciones, reportes globales | `/admin/*` |
| **Organización** | Perfil corporativo, gestión de especialistas | `/organization/*` |
| **Especialista** | Agenda, consultas clínicas, pacientes | `/specialist/*` |
| **Paciente** | Solicitar horas, síntomas, historial médico | `/patient/*` |

Cada rol accede únicamente a sus módulos mediante layouts protegidos con `requireRole()`.

## Stack técnico

- **Frontend/Backend:** Next.js 15 (App Router) + Node.js
- **Base de datos:** PostgreSQL con Prisma ORM
- **Autenticación:** Supabase Auth (sincronizado con tabla `users` de Prisma)
- **Datos clínicos:** Campos JSON para síntomas, tratamientos, signos vitales y adjuntos
- **Emails:** Resend
- **Monitoreo:** Sentry
- **Despliegue:** Render (`render.yaml`)

## Modelos principales (Prisma)

- `User` — usuario con rol y estado
- `Organization` — clínica o centro médico
- `OrganizationSpecialist` — relación org ↔ especialista
- `Appointment` — citas solicitadas/confirmadas
- `Consultation` — registro clínico post-atención
- `SymptomReport` — reportes de síntomas/urgencia
- `Invitation` — invitaciones institucionales
- `UsageMetric` — métricas para reportes del administrador

## Configuración local

```bash
cp .env.example .env.local
# Configurar DATABASE_URL, Supabase y demás variables

npm install
npx prisma db push
npm run db:seed
npm run dev
```

## Despliegue en Render

1. Conecta el repositorio en [render.com](https://render.com)
2. Usa el blueprint `render.yaml` (crea web service + PostgreSQL)
3. Configura variables de Supabase, Resend y Sentry en el dashboard
4. Ejecuta migraciones: `npx prisma db push` desde shell de Render

## Usuarios demo (seed)

| Email | Rol |
|-------|-----|
| admin@healthcloud.demo | ADMIN |
| org@healthcloud.demo | ORGANIZATION |
| especialista@healthcloud.demo | SPECIALIST |
| paciente@healthcloud.demo | PATIENT |

> Los usuarios demo requieren cuentas Supabase vinculadas con el mismo email para autenticación completa.
