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
