# Agentes de IA - HealthNet

Este archivo proporciona contexto para los agentes de IA que trabajen en este proyecto.

## Contexto del Proyecto

HealthNet es una aplicación web completa construida con tecnologías modernas para gestión de salud.

## Stack Tecnológico

- **Frontend/Backend**: Next.js 15 (App Router) con TypeScript
- **Base de datos**: Supabase PostgreSQL
- **Autenticación**: Supabase Auth (Email/Password + OAuth)
- **Storage**: Supabase Storage (privado, con RLS)
- **Estilos**: Tailwind CSS
- **Monitoreo**: Sentry
- **Emails**: Resend
- **Deploy**: Vercel

## Estructura del Proyecto

```
src/
├── app/              # App Router (páginas y rutas API)
├── components/       # Componentes React reutilizables
├── lib/              # Configuraciones y clientes (Supabase, Sentry, Resend)
├── types/            # Tipos TypeScript
├── utils/            # Funciones utilitarias
└── middleware.ts     # Middleware de autenticación
```

## Guías de Desarrollo

### Autenticación
- Usa `createClient()` de `@/lib/supabase/client` en componentes cliente
- Usa `createClient()` de `@/lib/supabase/server` en Server Components y Server Actions
- El middleware protege rutas automáticamente

### Base de Datos
- Tipos generados en `src/types/database.ts`
- RLS habilitado en todas las tablas
- Migraciones en `supabase/migrations/`

### Storage
- Bucket `avatars` privado
- Políticas RLS por usuario
- Funciones helper en `src/lib/supabase/storage.ts`

### Emails
- Templates React en `src/lib/email/templates/`
- Funciones de envío en `src/lib/email/send.ts`

### Monitoreo
- Sentry configurado para client, server y edge
- Helpers en `src/lib/sentry.ts`

### Estilos
- Tailwind CSS con dark mode
- Componentes UI en `src/components/ui/`
- Clases utilitarias personalizadas en `globals.css`

## Convenciones de Código

1. **TypeScript**: Siempre tipar correctamente
2. **Server Components por defecto**: Usar 'use client' solo cuando sea necesario
3. **Nombres de archivos**: kebab-case para archivos, PascalCase para componentes
4. **Importaciones**: Usar alias `@/` para imports absolutos
5. **Validación**: Usar Zod para validación de datos

## Variables de Entorno Requeridas

Ver `.env.example` para la lista completa.

## Comandos Útiles

```bash
npm run dev         # Desarrollo
npm run build       # Build producción
npm run lint        # Linter
npm run type-check  # Verificar tipos
```

## Consideraciones de Seguridad

- NUNCA commitear `.env` o `.env.local`
- Todas las tablas deben tener RLS
- Validar inputs en server actions
- Storage privado por defecto
- Usar service role key solo en server

## Testing

Cuando agregues features:
1. Validar tipos TypeScript
2. Verificar que el linter pase
3. Probar en desarrollo local
4. Verificar RLS en Supabase

## Deployment

- Push a `main` deploya automáticamente en Vercel
- Variables de entorno configuradas en Vercel Dashboard
- Migraciones se aplican manualmente en Supabase Dashboard

## Cursor Cloud specific instructions

El entorno de desarrollo usa un **Supabase local** (CLI + Docker) para no depender de un
proyecto hosted ni de secretos externos. Docker y la CLI de Supabase ya vienen instalados
en el snapshot; el update script solo corre `npm install`. Servicios y caveats no obvios:

### Levantar los servicios (no se auto-inician en el arranque de la VM)
1. **Docker daemon**: `sudo dockerd` (dejar corriendo en background, p.ej. en una sesión tmux).
   No hay systemd en la VM, así que el daemon no arranca solo.
2. **Supabase local**: desde `/workspace`, ejecutar `supabase start -x inbucket`.
   - El flag `-x inbucket` es **necesario**: el puerto POP3 de inbucket (54327) no logra
     bindear en este entorno y hace fallar todo el arranque. Inbucket (captura de emails)
     no se usa en el flujo login/dashboard.
   - Al terminar imprime `anon key` y `service_role key` (son las claves de demo fijas de
     Supabase local, siempre iguales). API en `http://127.0.0.1:54321`, Studio en `:54324`,
     Postgres en `:54322`. La migración `supabase/migrations/001_initial_schema.sql` se
     aplica automáticamente.
3. **App Next.js**: `npm run dev` (puerto 3000). Requiere `.env.local` (ver abajo).

### Versión de la CLI de Supabase (IMPORTANTE)
`supabase/config.toml` solo es compatible con la CLI **v1.x** (fijada `v1.226.4`). La CLI v2
rechaza el arranque con `'realtime' has invalid keys: port`. Si se actualiza la CLI a v2 hay
que actualizar también `config.toml` (quitar `realtime.port` y renombrar `[inbucket]`).

### `.env.local` (git-ignored, recrear si falta)
```
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key impresa por "supabase start">
SUPABASE_SERVICE_ROLE_KEY=<service_role key impresa por "supabase start">
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
Sentry y Resend son opcionales: sin sus vars la app funciona igual (Sentry se desactiva solo;
el módulo de email no se importa en el flujo actual).

### Usuarios de prueba
No existe página de registro. Crear usuarios vía la API admin de GoTrue con la service_role key:
```
curl -X POST http://127.0.0.1:54321/auth/v1/admin/users \
  -H "apikey: $SERVICE_ROLE" -H "Authorization: Bearer $SERVICE_ROLE" \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@healthnet.test","password":"HealthNet123!","email_confirm":true}'
```
El trigger de la migración crea automáticamente la fila correspondiente en `public.profiles`.
Credencial de prueba usada en setup: `demo@healthnet.test` / `HealthNet123!`.

### Middleware
`src/middleware.ts` redirige a `/login` **cualquier** ruta que no empiece por `/login` o
`/auth` cuando no hay sesión (incluye `/` y `/api/health`). Esto es comportamiento esperado.
