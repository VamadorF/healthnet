# 📚 Índice de Documentación - HealthNet

Esta es la guía de navegación para toda la documentación del proyecto.

## 🚀 Empezando

Si es tu primera vez aquí, sigue este orden:

1. **[QUICK_START.md](./QUICK_START.md)** ⚡ **(EMPIEZA AQUÍ)**
   - Setup en 5 minutos
   - Pasos mínimos para correr el proyecto
   - Comandos esenciales
   - **Ideal para**: Developers que quieren empezar YA

2. **[SETUP.md](./SETUP.md)** 📋
   - Guía completa paso a paso
   - Configuración de cada servicio (Supabase, Sentry, Resend)
   - Screenshots y ejemplos detallados
   - Troubleshooting completo
   - **Ideal para**: Configuración de producción

3. **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** 📊
   - Arquitectura del proyecto
   - Decisiones de diseño
   - Métricas y estadísticas
   - Roadmap futuro
   - **Ideal para**: Entender el proyecto completo

## 📖 Documentación Principal

### [README.md](./README.md)
El README principal del proyecto con:
- ✅ Descripción general del stack
- ✅ Lista de tecnologías
- ✅ Estructura del proyecto
- ✅ Características de seguridad
- ✅ Scripts disponibles
- ✅ Recursos y links

**Cuándo leer**: Para overview general del proyecto

---

### [QUICK_START.md](./QUICK_START.md) ⚡
Guía express para setup rápido:
- ✅ Setup en 5 minutos
- ✅ Variables de entorno mínimas
- ✅ Checklist de verificación
- ✅ Primeros pasos después del setup
- ✅ Problemas comunes

**Cuándo leer**: Primera vez que corres el proyecto

---

### [SETUP.md](./SETUP.md)
Guía detallada de configuración:
- ✅ Configuración de Supabase (Auth, DB, Storage)
- ✅ Configuración de Sentry (DSN, tokens, org)
- ✅ Configuración de Resend (API key, dominio)
- ✅ Variables de entorno completas
- ✅ Deploy en Vercel
- ✅ Troubleshooting avanzado

**Cuándo leer**: Setup de producción o problemas de configuración

---

### [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
Resumen visual del proyecto:
- ✅ Diagrama de arquitectura
- ✅ Stack completo con versiones
- ✅ Estructura de carpetas detallada
- ✅ Features implementadas
- ✅ Métricas del proyecto
- ✅ Próximos pasos sugeridos
- ✅ Tips de desarrollo

**Cuándo leer**: Para entender la arquitectura completa

---

### [CHANGELOG.md](./CHANGELOG.md)
Historial de cambios:
- ✅ Versión 0.1.0 inicial
- ✅ Todas las features agregadas
- ✅ Dependencias instaladas
- ✅ Roadmap futuro

**Cuándo leer**: Ver qué ha cambiado en cada versión

---

### [AGENTS.md](./AGENTS.md)
Contexto para agentes de IA:
- ✅ Stack tecnológico
- ✅ Estructura del proyecto
- ✅ Convenciones de código
- ✅ Guías de desarrollo
- ✅ Consideraciones de seguridad

**Cuándo leer**: Si eres un agente de IA o configuras uno

---

## 📁 Archivos de Configuración

### Variables de Entorno

- **[.env.example](./.env.example)**
  - Plantilla de todas las variables necesarias
  - Con comentarios explicativos
  - Para uso en producción

- **[.env.local.example](./.env.local.example)**
  - Plantilla para desarrollo local
  - Con valores de ejemplo
  - Para desarrollo

### Configuración del Proyecto

- **[package.json](./package.json)**
  - Todas las dependencias
  - Scripts disponibles
  - Metadata del proyecto

- **[tsconfig.json](./tsconfig.json)**
  - Configuración TypeScript
  - Paths aliases
  - Compiler options

- **[next.config.ts](./next.config.ts)**
  - Configuración Next.js
  - Integración Sentry
  - Image domains

- **[tailwind.config.ts](./tailwind.config.ts)**
  - Configuración Tailwind
  - Theme customization
  - Content paths

- **[vercel.json](./vercel.json)**
  - Configuración Vercel
  - Variables de entorno
  - Build settings

### Configuración de Herramientas

- **[.eslintrc.json](./.eslintrc.json)**
  - Reglas ESLint
  - Extends Next.js config

- **[.gitignore](./.gitignore)**
  - Archivos ignorados por Git
  - node_modules, .env, build files

- **[.vercelignore](./.vercelignore)**
  - Archivos ignorados por Vercel

- **[postcss.config.mjs](./postcss.config.mjs)**
  - Configuración PostCSS
  - Tailwind + Autoprefixer

### Configuración Sentry

- **[sentry.client.config.ts](./sentry.client.config.ts)**
  - Sentry para browser
  - Session replay

- **[sentry.server.config.ts](./sentry.server.config.ts)**
  - Sentry para server

- **[sentry.edge.config.ts](./sentry.edge.config.ts)**
  - Sentry para edge runtime

### Configuración Supabase

- **[supabase/config.toml](./supabase/config.toml)**
  - Configuración Supabase local
  - Ports y settings

- **[supabase/migrations/001_initial_schema.sql](./supabase/migrations/001_initial_schema.sql)**
  - Migración inicial
  - Tablas, RLS, triggers
  - Storage buckets

---

## 🗂️ Estructura del Código

### Aplicación (`src/app/`)

```
src/app/
├── layout.tsx          # Layout principal
├── page.tsx            # Página home
├── globals.css         # Estilos globales
├── login/
│   └── page.tsx        # Página de login
├── dashboard/
│   └── page.tsx        # Dashboard (protegido)
├── auth/
│   ├── callback/
│   │   └── route.ts    # OAuth callback
│   └── signout/
│       └── route.ts    # Logout route
└── api/
    └── health/
        └── route.ts    # Health check API
```

### Componentes (`src/components/`)

```
src/components/
├── auth/
│   └── login-form.tsx  # Formulario de login
└── ui/
    ├── button.tsx      # Componente Button
    └── input.tsx       # Componente Input
```

### Librerías (`src/lib/`)

```
src/lib/
├── supabase/
│   ├── client.ts       # Cliente browser
│   ├── server.ts       # Cliente server
│   ├── middleware.ts   # Session middleware
│   └── storage.ts      # Storage helpers
├── email/
│   ├── send.ts         # Email functions
│   └── templates/
│       └── welcome.tsx # Welcome email
├── resend.ts           # Resend client
└── sentry.ts           # Sentry helpers
```

### Tipos (`src/types/`)

```
src/types/
├── database.ts         # DB types
└── supabase.ts         # Supabase helpers
```

### Utilidades (`src/utils/`)

```
src/utils/
├── format.ts           # Formatting functions
└── validation.ts       # Zod schemas
```

---

## 🎯 Guías por Tarea

### Quiero empezar a desarrollar
1. ✅ Lee [QUICK_START.md](./QUICK_START.md)
2. ✅ Corre `npm install && npm run dev`
3. ✅ Explora el código en `src/`

### Quiero configurar para producción
1. ✅ Lee [SETUP.md](./SETUP.md)
2. ✅ Configura cada servicio
3. ✅ Deploy en Vercel

### Quiero entender la arquitectura
1. ✅ Lee [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
2. ✅ Revisa los diagramas
3. ✅ Explora el código

### Tengo un problema
1. ✅ Revisa [QUICK_START.md](./QUICK_START.md) sección "Problemas Comunes"
2. ✅ Revisa [SETUP.md](./SETUP.md) sección "Problemas Comunes"
3. ✅ Verifica que todas las variables de entorno estén configuradas

### Quiero agregar una feature
1. ✅ Lee [AGENTS.md](./AGENTS.md) para convenciones
2. ✅ Revisa código existente como ejemplo
3. ✅ Actualiza [CHANGELOG.md](./CHANGELOG.md)

### Soy un agente de IA
1. ✅ Lee [AGENTS.md](./AGENTS.md) primero
2. ✅ Revisa [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
3. ✅ Sigue las convenciones del proyecto

---

## 📊 Estadísticas de Documentación

```
Total de archivos de documentación: 6
Total de palabras: ~15,000+
Total de líneas: ~1,500+

Archivos:
- README.md           (350 líneas)
- SETUP.md            (280 líneas)
- PROJECT_SUMMARY.md  (400 líneas)
- QUICK_START.md      (200 líneas)
- CHANGELOG.md        (180 líneas)
- AGENTS.md           (120 líneas)
```

---

## 🔗 Links Rápidos

### Documentación Externa
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Sentry Docs](https://docs.sentry.io/)
- [Resend Docs](https://resend.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind Docs](https://tailwindcss.com/docs)

### Repositorio
- [GitHub Repo](https://github.com/VamadorF/healthnet)
- [Pull Request #1](https://github.com/VamadorF/healthnet/pull/1)

---

## 💡 Tips de Navegación

1. **Búsqueda rápida**: Usa `Ctrl+F` / `Cmd+F` para buscar en cualquier archivo MD
2. **Archivos grandes**: Los archivos MD más completos son PROJECT_SUMMARY.md y SETUP.md
3. **Orden recomendado**: QUICK_START → README → PROJECT_SUMMARY → SETUP
4. **Para debugging**: QUICK_START "Problemas Comunes" → SETUP "Problemas Comunes"

---

## ✅ Checklist de Lectura

Para conocer completamente el proyecto, lee en orden:

- [ ] QUICK_START.md (5 min)
- [ ] README.md (10 min)
- [ ] PROJECT_SUMMARY.md (15 min)
- [ ] SETUP.md (20 min) - solo si vas a configurar prod
- [ ] AGENTS.md (5 min) - solo si eres IA
- [ ] CHANGELOG.md (3 min) - revisar cambios

**Tiempo total**: ~30-60 minutos para leer todo

---

**Última actualización**: 2026-07-08  
**Versión del proyecto**: 0.1.0

📚 Happy reading!
