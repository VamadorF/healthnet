# HealthCloud

Aplicación web completa construida con Next.js 15, TypeScript, Supabase, Sentry y Resend.

## 🚀 Stack Tecnológico

- **Framework**: [Next.js 15](https://nextjs.org/) con App Router
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Base de datos**: [Supabase PostgreSQL](https://supabase.com/)
- **Autenticación**: [Supabase Auth](https://supabase.com/auth)
- **Almacenamiento**: [Supabase Storage](https://supabase.com/storage) (privado)
- **Monitoreo de errores**: [Sentry](https://sentry.io/)
- **Correos electrónicos**: [Resend](https://resend.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📋 Prerequisitos

- Node.js 18+ 
- npm o yarn
- Cuenta en Supabase
- Cuenta en Sentry
- Cuenta en Resend
- Cuenta en Vercel (para deployment)

## 🛠️ Configuración del Proyecto

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd healthcloud
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key

# Sentry
NEXT_PUBLIC_SENTRY_DSN=https://tu-sentry-dsn
SENTRY_ORG=tu-organizacion
SENTRY_PROJECT=tu-proyecto
SENTRY_AUTH_TOKEN=tu-auth-token

# Resend
RESEND_API_KEY=re_tu-api-key
RESEND_FROM_EMAIL=noreply@tudominio.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Configurar Supabase

#### a) Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com/) y crea un nuevo proyecto
2. Copia tu URL y las claves anon/service role key

#### b) Ejecutar migraciones

En el SQL Editor de Supabase, ejecuta el contenido de `supabase/migrations/001_initial_schema.sql`

#### c) Configurar autenticación

En Supabase Dashboard:
1. Ve a Authentication > Providers
2. Habilita Email (por defecto)
3. Opcionalmente, configura Google OAuth u otros proveedores
4. Configura la URL de redirección: `https://tudominio.com/auth/callback`

#### d) Configurar Storage

El script de migración ya crea el bucket `avatars`. Verifica en Storage que esté creado y sea privado.

### 5. Configurar Sentry

1. Crea un proyecto en [sentry.io](https://sentry.io/)
2. Obtén tu DSN y auth token
3. Configura las variables de entorno de Sentry

### 6. Configurar Resend

1. Crea una cuenta en [resend.com](https://resend.com/)
2. Verifica tu dominio (o usa el dominio de prueba para desarrollo)
3. Crea una API Key
4. Configura las variables de entorno de Resend

### 7. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
healthcloud/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── auth/              # Rutas de autenticación
│   │   ├── dashboard/         # Dashboard del usuario
│   │   ├── login/             # Página de login
│   │   ├── globals.css        # Estilos globales
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página de inicio
│   ├── components/            # Componentes React
│   │   └── auth/              # Componentes de autenticación
│   ├── lib/                   # Librerías y configuraciones
│   │   ├── email/             # Configuración de emails
│   │   ├── supabase/          # Cliente de Supabase
│   │   ├── resend.ts          # Cliente de Resend
│   │   └── sentry.ts          # Utilidades de Sentry
│   ├── types/                 # Tipos TypeScript
│   │   ├── database.ts        # Tipos de la base de datos
│   │   └── supabase.ts        # Tipos de Supabase
│   ├── utils/                 # Utilidades
│   │   ├── format.ts          # Funciones de formato
│   │   └── validation.ts      # Esquemas de validación
│   └── middleware.ts          # Middleware de Next.js
├── supabase/                  # Configuración de Supabase
│   ├── migrations/            # Migraciones SQL
│   └── config.toml            # Configuración local
├── sentry.*.config.ts         # Configuración de Sentry
├── next.config.ts             # Configuración de Next.js
├── tailwind.config.ts         # Configuración de Tailwind
└── package.json               # Dependencias
```

## 🔐 Características de Seguridad

### Row Level Security (RLS)

Todas las tablas tienen RLS habilitado para proteger los datos:

- Los usuarios solo pueden ver/editar sus propios perfiles
- El storage privado está protegido por políticas específicas por usuario

### Autenticación

- Email/Password con confirmación
- OAuth con Google (configurable)
- Tokens JWT seguros
- Refresh tokens automáticos

### Storage Privado

Los archivos en Supabase Storage son privados por defecto:
- Solo el propietario puede acceder a sus archivos
- URLs firmadas para acceso temporal

## 📧 Envío de Correos

El proyecto incluye templates de email:

- Email de bienvenida
- Email de restablecimiento de contraseña

Para agregar más templates, crea componentes React en `src/lib/email/templates/`

## 🐛 Monitoreo de Errores

Sentry está configurado para:

- Capturar errores del cliente y servidor
- Replay de sesiones (cuando hay errores)
- Performance monitoring
- Contexto de usuario automático

## 🚀 Deployment en Vercel

### 1. Instalar Vercel CLI (opcional)

```bash
npm i -g vercel
```

### 2. Conectar con GitHub

1. Ve a [vercel.com](https://vercel.com/)
2. Importa tu repositorio de GitHub
3. Vercel detectará automáticamente Next.js

### 3. Configurar variables de entorno

En Vercel Dashboard > Settings > Environment Variables, agrega todas las variables del archivo `.env.example`

### 4. Deploy

```bash
git push origin main
```

Vercel automáticamente desplegará tu aplicación.

## 📝 Scripts Disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Compilar para producción
npm run start        # Iniciar servidor de producción
npm run lint         # Ejecutar ESLint
npm run type-check   # Verificar tipos TypeScript
```

## 🔧 Configuración Adicional

### Supabase Local (Opcional)

Para desarrollo con Supabase local:

```bash
npm install -g supabase
supabase init
supabase start
```

### Tailwind CSS

Personaliza colores y estilos en `tailwind.config.ts`

### TypeScript

Ajusta la configuración en `tsconfig.json`

## 📚 Recursos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Sentry](https://docs.sentry.io/)
- [Documentación de Resend](https://resend.com/docs)
- [Documentación de Vercel](https://vercel.com/docs)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y confidencial.

## 👥 Soporte

Para soporte, contacta al equipo de desarrollo.

---

Desarrollado con ❤️ usando Next.js y TypeScript
