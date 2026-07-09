# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/),
y este proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [0.1.0] - 2026-07-08

### Añadido

#### Infraestructura del Proyecto
- Inicialización del proyecto Next.js 15 con App Router
- Configuración de TypeScript con modo estricto
- Configuración de ESLint
- Configuración de Tailwind CSS con soporte para dark mode
- Configuración de PostCSS y Autoprefixer

#### Supabase
- Cliente Supabase para browser (`src/lib/supabase/client.ts`)
- Cliente Supabase para server (`src/lib/supabase/server.ts`)
- Middleware de Supabase para manejo de sesiones (`src/lib/supabase/middleware.ts`)
- Sistema de Storage con helpers (`src/lib/supabase/storage.ts`)
  - `uploadFile()` - Subir archivos
  - `getPublicUrl()` - Obtener URL pública
  - `getSignedUrl()` - Obtener URL firmada temporal
  - `deleteFile()` - Eliminar archivos
  - `listFiles()` - Listar archivos
- Migraciones SQL iniciales:
  - Tabla `profiles` con RLS
  - Bucket `avatars` privado con políticas RLS
  - Triggers automáticos para creación de perfiles
  - Función `handle_updated_at()` para timestamps automáticos

#### Autenticación
- Página de login (`src/app/login/page.tsx`)
- Formulario de login con email/password (`src/components/auth/login-form.tsx`)
- Soporte para OAuth con Google
- Callback de autenticación (`src/app/auth/callback/route.ts`)
- Ruta de logout (`src/app/auth/signout/route.ts`)
- Middleware de protección de rutas (`src/middleware.ts`)
- Página de dashboard protegida (`src/app/dashboard/page.tsx`)

#### Sentry
- Configuración de Sentry para client-side (`sentry.client.config.ts`)
- Configuración de Sentry para server-side (`sentry.server.config.ts`)
- Configuración de Sentry para Edge Runtime (`sentry.edge.config.ts`)
- Helpers de Sentry (`src/lib/sentry.ts`):
  - `captureException()` - Capturar errores
  - `captureMessage()` - Capturar mensajes
  - `setUser()` - Configurar usuario
  - `clearUser()` - Limpiar usuario
- Integración con Next.js config

#### Resend
- Cliente Resend configurado (`src/lib/resend.ts`)
- Template de email de bienvenida (`src/lib/email/templates/welcome.tsx`)
- Funciones de envío de emails (`src/lib/email/send.ts`):
  - `sendWelcomeEmail()` - Email de bienvenida
  - `sendPasswordResetEmail()` - Email de reset de contraseña
- Integración con Sentry para tracking de errores en emails

#### Componentes UI
- Componente Button reutilizable (`src/components/ui/button.tsx`)
  - Variantes: primary, secondary, danger, ghost
  - Tamaños: sm, md, lg
- Componente Input reutilizable (`src/components/ui/input.tsx`)
  - Con soporte para labels y mensajes de error
  - Estilos dark mode

#### API Routes
- Health check endpoint (`src/app/api/health/route.ts`)

#### Tipos TypeScript
- Tipos de base de datos (`src/types/database.ts`)
- Tipos helpers de Supabase (`src/types/supabase.ts`)
  - Type helpers: `Tables<>`, `Inserts<>`, `Updates<>`
  - Tipo `Profile`

#### Utilidades
- Funciones de formato (`src/utils/format.ts`):
  - `formatDate()` - Formatear fechas
  - `formatDateTime()` - Formatear fecha y hora
  - `formatFileSize()` - Formatear tamaños de archivo
- Esquemas de validación con Zod (`src/utils/validation.ts`):
  - `emailSchema` - Validar emails
  - `passwordSchema` - Validar contraseñas
  - `loginSchema` - Validar login
  - `signupSchema` - Validar registro
  - `profileSchema` - Validar perfil

#### Configuración de Vercel
- Archivo `vercel.json` con configuración de build y variables
- Archivo `.vercelignore` para excluir archivos del deployment

#### Documentación
- README completo con instrucciones de uso
- SETUP.md con guía paso a paso de configuración
- AGENTS.md con contexto para agentes de IA
- Archivos de ejemplo de variables de entorno:
  - `.env.example`
  - `.env.local.example`

#### Estilos
- Estilos globales con Tailwind (`src/app/globals.css`)
- Variables CSS para theming
- Soporte completo para dark mode

#### Configuración
- `.gitignore` completo
- `.eslintrc.json` con reglas de Next.js
- `tsconfig.json` con paths aliases (`@/*`)
- `tailwind.config.ts` personalizado
- `postcss.config.mjs`
- Configuración local de Supabase (`supabase/config.toml`)

### Dependencias Añadidas

#### Producción
- `next@^15.1.6` - Framework React
- `react@^19.0.0` - Biblioteca React
- `react-dom@^19.0.0` - React DOM
- `@supabase/supabase-js@^2.47.12` - Cliente Supabase
- `@supabase/ssr@^0.6.1` - Supabase SSR helpers
- `@sentry/nextjs@^8.48.0` - Monitoreo de errores
- `resend@^4.0.3` - Servicio de emails
- `zod@^3.24.1` - Validación de esquemas

#### Desarrollo
- `typescript@^5.7.3` - TypeScript
- `@types/node@^22.10.5` - Tipos de Node.js
- `@types/react@^19.0.6` - Tipos de React
- `@types/react-dom@^19.0.3` - Tipos de React DOM
- `eslint@^9.18.0` - Linter
- `eslint-config-next@^15.1.6` - Config ESLint para Next.js
- `tailwindcss@^3.4.17` - Framework CSS
- `postcss@^8.4.49` - Procesador CSS
- `autoprefixer@^10.4.20` - Autoprefixer

### Seguridad
- Row Level Security (RLS) habilitado en todas las tablas
- Storage privado por defecto con políticas por usuario
- Variables de entorno para credenciales sensibles
- Service role key solo en server-side
- Validación de inputs con Zod
- CSRF protection con Supabase

### Scripts
- `dev` - Iniciar servidor de desarrollo
- `build` - Build de producción
- `start` - Servidor de producción
- `lint` - Ejecutar ESLint
- `type-check` - Verificar tipos TypeScript

---

## [Unreleased]

### Añadido
- Arquitectura RBAC con 4 roles: Administrador, Organización, Especialista y Paciente
- Prisma ORM con modelos clínicos (citas, consultas, síntomas, invitaciones)
- Dashboards dedicados por rol con navegación y permisos escalonados
- Server actions para flujos operativos de cada actor
- Sincronización Supabase Auth → Prisma User
- Seed de datos demo por rol
- Configuración de despliegue en Render (`render.yaml`)
- Documentación de plataforma (`PLATFORM.md`)

### Cambiado
- Renombrar la aplicación de HealthNet a **HealthCloud** en toda la UI, emails, documentación y configuración

### Añadido
- Página de registro (`/signup`) con validación Zod
- Recuperación de contraseña (`/forgot-password`)
- Restablecimiento de contraseña (`/reset-password`)
- Página de perfil editable (`/profile`) con server actions
- Upload de avatar a Supabase Storage privado
- Navegación compartida (`AppNav`) para páginas autenticadas
- Componente `AuthCard` para páginas de autenticación
- Rutas públicas centralizadas en `public-routes.ts`
- Enlaces entre login, registro y recuperación de contraseña
- Landing page con CTAs de registro e inicio de sesión

### Por Hacer
- [ ] Agregar tests unitarios (Jest/Vitest)
- [ ] Agregar tests E2E (Playwright)
- [ ] Crear más templates de email
- [ ] Agregar internacionalización (i18n)
- [ ] Implementar notificaciones en tiempo real
- [ ] Agregar analytics
- [ ] Documentar API routes
- [ ] Agregar Storybook para componentes

---

[0.1.0]: https://github.com/VamadorF/HealthCloud/releases/tag/v0.1.0
