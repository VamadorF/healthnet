# 🚀 Quick Start - HealthCloud

Esta es la guía más rápida para poner en marcha el proyecto.

## ⚡ Setup en 5 Minutos

### 1. Instalar Dependencias (1 min)
```bash
npm install
```

### 2. Configurar Variables de Entorno (2 min)
```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar con tus credenciales
nano .env.local  # o tu editor preferido
```

Necesitas obtener:
- **Supabase**: URL + anon key desde [supabase.com](https://supabase.com)
- **Sentry**: DSN desde [sentry.io](https://sentry.io)
- **Resend**: API key desde [resend.com](https://resend.com)

### 3. Configurar Base de Datos (2 min)
1. Ve a tu proyecto Supabase
2. Abre SQL Editor
3. Ejecuta el contenido de `supabase/migrations/001_initial_schema.sql`

### 4. Iniciar Servidor de Desarrollo (10 seg)
```bash
npm run dev
```

Abre http://localhost:3000 🎉

---

## 📋 Checklist Mínimo

Para desarrollo local, necesitas **como mínimo**:

- [x] `npm install` ejecutado
- [x] `.env.local` creado con:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [x] Migración SQL ejecutada en Supabase
- [x] `npm run dev` corriendo

Lo demás (Sentry, Resend) es **opcional** para empezar.

---

## 🔑 Variables de Entorno Mínimas

```env
# REQUERIDO para que funcione
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...

# OPCIONAL (la app funcionará sin estos)
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
SENTRY_ORG=tu-org
SENTRY_PROJECT=tu-project
SENTRY_AUTH_TOKEN=sntrys_xxx
RESEND_API_KEY=re_xxx
RESEND_FROM_EMAIL=noreply@tudominio.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🎯 Primeros Pasos Después del Setup

### 1. Probar Autenticación
```
1. Ve a http://localhost:3000/login
2. Intenta registrarte (fallará porque falta registro page)
3. Crea usuario manualmente en Supabase Dashboard > Authentication
4. Usa esas credenciales para login
5. Serás redirigido a /dashboard
```

### 2. Explorar el Código
```typescript
// Página principal
src/app/page.tsx

// Login
src/app/login/page.tsx

// Dashboard (protegido)
src/app/dashboard/page.tsx

// Cliente Supabase
src/lib/supabase/client.ts
src/lib/supabase/server.ts
```

### 3. Agregar Nueva Página
```typescript
// 1. Crear archivo
src/app/nueva-pagina/page.tsx

// 2. Agregar contenido
export default function NuevaPagina() {
  return <div>Mi nueva página</div>
}

// 3. Navegar a http://localhost:3000/nueva-pagina
```

---

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev           # Puerto 3000

# Build
npm run build         # Compilar producción
npm run start         # Servidor producción

# Calidad
npm run lint          # Linter
npm run type-check    # Verificar tipos

# Git
git status            # Ver cambios
git log --oneline     # Ver commits
```

---

## 🆘 Problemas Comunes

### "Invalid API key"
```bash
# Verifica que no haya espacios en .env.local
# Copia la key completa desde Supabase
```

### "Failed to fetch"
```bash
# Verifica que NEXT_PUBLIC_SUPABASE_URL incluya https://
# Asegúrate que el proyecto Supabase esté activo
```

### Puerto 3000 ocupado
```bash
# Usa otro puerto
PORT=3001 npm run dev
```

### Cambios no se reflejan
```bash
# Reinicia el servidor
# Ctrl+C y luego npm run dev de nuevo
```

---

## 📚 Documentación Completa

Para instrucciones detalladas ver:
- `SETUP.md` - Setup completo paso a paso
- `README.md` - Documentación general
- `PROJECT_SUMMARY.md` - Resumen del proyecto
- `AGENTS.md` - Contexto para IA

---

## ✅ Verificación Rápida

Todo está bien si ves:

```
✓ Compiled in XXms
✓ Ready in XXXms
○ Compiling / ...
✓ Compiled / in XXms
```

Y puedes acceder a:
- ✅ http://localhost:3000 (home)
- ✅ http://localhost:3000/login (login)
- ✅ http://localhost:3000/api/health (API)

---

**¿Todo listo?** 🚀

Siguiente paso → Ver `PROJECT_SUMMARY.md` sección "Próximos Pasos Sugeridos"
