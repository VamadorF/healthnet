# Guía de Configuración Rápida - HealthCloud

Esta guía te ayudará a configurar el proyecto paso a paso.

## 1️⃣ Instalación Inicial

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd healthcloud

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local
```

## 2️⃣ Configurar Supabase

### Crear Proyecto

1. Ve a [supabase.com](https://supabase.com)
2. Click en "New Project"
3. Completa:
   - Nombre: `healthcloud`
   - Database Password: (guarda esta contraseña)
   - Region: elige la más cercana
4. Espera a que el proyecto se cree (2-3 minutos)

### Obtener Credenciales

1. En tu proyecto, ve a **Settings** → **API**
2. Copia estos valores a tu `.env.local`:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ (mantén esto secreto)

### Ejecutar Migraciones

1. En Supabase Dashboard, ve a **SQL Editor**
2. Click en "New Query"
3. Copia y pega el contenido completo de `supabase/migrations/001_initial_schema.sql`
4. Click en "Run" para ejecutar

Esto creará:
- ✅ Tabla `profiles`
- ✅ Políticas RLS
- ✅ Bucket de storage `avatars`
- ✅ Triggers automáticos

### Configurar Autenticación

1. Ve a **Authentication** → **Providers**
2. Email está habilitado por defecto ✅
3. (Opcional) Para Google OAuth:
   - Click en "Google"
   - Ingresa Client ID y Client Secret de Google Cloud Console
   - Agrega URL de redirección: `https://tu-proyecto.supabase.co/auth/v1/callback`

### Configurar URLs de Redirección

1. Ve a **Authentication** → **URL Configuration**
2. Agrega:
   - Site URL: `http://localhost:3000` (desarrollo)
   - Redirect URLs: `http://localhost:3000/auth/callback`
3. Para producción, agrega también: `https://tudominio.com/auth/callback`

## 3️⃣ Configurar Sentry

### Crear Proyecto

1. Ve a [sentry.io](https://sentry.io)
2. Click en "Create Project"
3. Selecciona:
   - Platform: **Next.js**
   - Alert frequency: elige según preferencia
   - Nombre: `healthcloud`

### Obtener Credenciales

1. En la página del proyecto, copia el **DSN** → `NEXT_PUBLIC_SENTRY_DSN`
2. Ve a **Settings** → **Projects** → `healthcloud` → **Client Keys (DSN)**
3. Para deployment, necesitas un Auth Token:
   - Ve a **Settings** → **Account** → **Auth Tokens**
   - Click "Create New Token"
   - Scopes: `project:releases`, `org:read`
   - Copia el token → `SENTRY_AUTH_TOKEN`
4. Obtén tu org y project:
   - URL es `https://sentry.io/organizations/TU-ORG/projects/TU-PROJECT/`
   - `TU-ORG` → `SENTRY_ORG`
   - `TU-PROJECT` → `SENTRY_PROJECT`

## 4️⃣ Configurar Resend

### Crear Cuenta y API Key

1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta
3. Ve a **API Keys**
4. Click "Create API Key"
5. Nombre: `healthcloud`
6. Copia la key → `RESEND_API_KEY`

### Configurar Dominio

**Para Desarrollo (dominio de prueba):**
```env
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Para Producción:**
1. Ve a **Domains**
2. Click "Add Domain"
3. Ingresa tu dominio: `tudominio.com`
4. Agrega los registros DNS (TXT, MX, etc.) en tu proveedor de dominio
5. Espera verificación (puede tardar hasta 72 horas)
6. Usa: `RESEND_FROM_EMAIL=noreply@tudominio.com`

## 5️⃣ Verificar Configuración

Verifica que tu `.env.local` tenga todos estos valores:

```env
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SENTRY_DSN=https://...
SENTRY_ORG=tu-org
SENTRY_PROJECT=healthcloud
SENTRY_AUTH_TOKEN=sntrys_...
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@tudominio.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 6️⃣ Ejecutar Localmente

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 7️⃣ Probar Funcionalidades

### Autenticación
1. Ve a `/login`
2. Intenta crear una cuenta
3. Verifica que recibas email de confirmación (revisa spam)
4. Confirma email y accede a `/dashboard`

### Storage
```typescript
// Ejemplo de subir archivo
const { data, error } = await uploadFile('avatars', `${userId}/avatar.png`, file);
```

### Emails
```typescript
// Ejemplo de enviar email
await sendWelcomeEmail('usuario@email.com', 'Juan');
```

## 8️⃣ Deploy en Vercel

### Conectar Repositorio

1. Ve a [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Importa tu repositorio de GitHub
4. Vercel detectará Next.js automáticamente

### Configurar Variables de Entorno

1. En la página de configuración del proyecto
2. Ve a **Settings** → **Environment Variables**
3. Agrega TODAS las variables de `.env.example` (excepto `NODE_ENV`)
4. Valores de producción:
   - Supabase: mismas credenciales ✅
   - Sentry: mismas credenciales ✅
   - Resend: misma API key ✅
   - `NEXT_PUBLIC_APP_URL`: tu dominio de Vercel o custom
   - `RESEND_FROM_EMAIL`: tu dominio verificado

### Deploy

```bash
git push origin main
```

Vercel automáticamente:
- ✅ Detecta el push
- ✅ Instala dependencias
- ✅ Ejecuta build
- ✅ Despliega

### Configurar Dominio Custom (Opcional)

1. En Vercel, ve a **Settings** → **Domains**
2. Agrega tu dominio: `tudominio.com`
3. Configura DNS según instrucciones
4. Actualiza en Supabase:
   - Authentication → URL Configuration
   - Agrega `https://tudominio.com/auth/callback`

## ✅ Checklist de Configuración

- [ ] Proyecto Supabase creado
- [ ] Credenciales de Supabase en `.env.local`
- [ ] Migraciones SQL ejecutadas
- [ ] Tabla `profiles` creada
- [ ] Bucket `avatars` creado
- [ ] RLS habilitado
- [ ] Autenticación email configurada
- [ ] URLs de redirección agregadas
- [ ] Proyecto Sentry creado
- [ ] DSN y credenciales de Sentry configuradas
- [ ] Cuenta Resend creada
- [ ] API key de Resend obtenida
- [ ] Dominio verificado (o usando dominio de prueba)
- [ ] Todas las variables en `.env.local`
- [ ] `npm install` ejecutado exitosamente
- [ ] `npm run dev` funciona sin errores
- [ ] Login/registro funciona
- [ ] Dashboard accesible
- [ ] Repositorio conectado a Vercel
- [ ] Variables de entorno en Vercel configuradas
- [ ] Deploy exitoso

## 🆘 Problemas Comunes

### Error: "Invalid API key"
- Verifica que copiaste las keys completas
- Asegúrate de que no haya espacios al inicio/final
- Verifica que estés usando las keys correctas (anon vs service_role)

### Error: "Failed to fetch"
- Verifica que `NEXT_PUBLIC_SUPABASE_URL` sea correcto
- Asegúrate de incluir `https://`
- Verifica que el proyecto Supabase esté activo

### Email no llega
- Revisa carpeta de spam
- En desarrollo, usa el Inbucket de Supabase (localhost)
- Verifica que el dominio de Resend esté verificado

### Middleware redirige todo a /login
- Asegúrate de haber iniciado sesión
- Verifica que las cookies estén habilitadas
- Limpia cookies y vuelve a hacer login

### Build falla en Vercel
- Revisa los logs de build
- Verifica que todas las variables de entorno estén configuradas
- Ejecuta `npm run build` localmente para replicar el error

## 📚 Recursos

- [Documentación Next.js](https://nextjs.org/docs)
- [Documentación Supabase](https://supabase.com/docs)
- [Documentación Sentry](https://docs.sentry.io/)
- [Documentación Resend](https://resend.com/docs)
- [Documentación Vercel](https://vercel.com/docs)

## 💡 Siguientes Pasos

1. Personaliza el diseño en `src/app/page.tsx`
2. Agrega más tablas en Supabase según tu necesidad
3. Crea componentes UI en `src/components/ui/`
4. Agrega más templates de email en `src/lib/email/templates/`
5. Configura domain custom en Vercel
6. Agrega tests con Jest/Vitest

¡Todo listo! 🚀
