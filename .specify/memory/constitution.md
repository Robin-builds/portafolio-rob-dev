# Constitución — Portafolio Robinson Arriagada

## Principios fundamentales

### I. Posicionamiento: Android primero, web al mismo nivel
El portafolio comunica "Software Engineer: Android y Web". Android nativo es el foco declarado; la
web se muestra como competencia equivalente, no como complemento. Toda sección (home, proyectos,
about) MUST reflejar ambas caras sin esconder la preferencia por Android.

### II. Contenido honesto y verificable
- Solo se lista tecnología que el autor domina hoy. Fuera: Flutter, Dart, Java, Spring Boot, JPA,
  Oracle/APEX, Bootstrap, salvo en una sección explícita de "experiencia previa".
- Cada proyecto publicado MUST tener: problema, stack, rol, estado y al menos un link real
  (Play Store, demo o repo).
- Prohibido en producción: placeholders ("Descripción..."), texto de plantilla, proyectos ficticios
  o ejemplos genéricos presentados como propios.
- Proyectos en desarrollo se marcan con estado "En desarrollo"; nunca se presentan como terminados.

### III. Stack cerrado (NON-NEGOTIABLE)
- Framework: Next.js (App Router) + TypeScript en modo `strict`.
- Datos: Supabase (Postgres).
- Despliegue: Vercel. Repositorio remoto en GitHub.
- Estilos: CSS Modules / CSS nativo. Sin librerías de UI ni frameworks CSS.
- Cualquier tecnología fuera de esta lista requiere una enmienda a esta constitución antes de
  entrar al plan.

### IV. Simplicidad
- Server Components por defecto; `"use client"` solo donde haya interactividad real (filtro,
  formulario, animaciones).
- Sin librerías de estado, sin capas, interfaces ni abstracciones que la spec no pida.
- Si algo parece necesitar una abstracción, se declara en una línea en el plan y se espera
  confirmación.

### V. Contenido separado del código
Los proyectos viven como datos tipados en `/content` (objetos TypeScript). Agregar o editar un
proyecto no toca componentes. Cada proyecto lleva una etiqueta de plataforma (`android` | `web`)
que alimenta el filtro Todos / Android / Web.

### VI. Seguridad de datos
- Supabase se usa solo donde aporta (formulario de contacto persistido). Si no hay un caso real,
  no hay tabla.
- RLS activado en toda tabla. El cliente usa únicamente la anon key; la service role key nunca
  llega al navegador ni al repo.
- El formulario valida en el servidor (Server Action o Route Handler) y tiene protección anti-spam
  simple (honeypot + límite de envíos).
- Secretos solo en variables de entorno de Vercel; `.env.local` en `.gitignore`.

### VII. Calidad mínima medible
- Mobile-first y responsive desde 360 px.
- Accesibilidad nivel WCAG AA: contraste, foco visible, navegación por teclado, HTML semántico,
  `alt` en imágenes.
- Lighthouse ≥ 90 en Performance, Accessibility, Best Practices y SEO (mobile).
- `next/image` para imágenes; metadata y Open Graph por página.
- Idioma del sitio: español.

### VIII. Spec-Driven Development
- Nada se implementa sin ciclo completo: spec → plan → tasks → implement (Spec Kit).
- Un cambio de alcance vuelve a la spec; no se resuelve parcheando código.
- Cada feature en su rama; commits pequeños y descriptivos (Conventional Commits) en GitHub.
- Todo plan MUST incluir un "Constitution Check" contra estos principios antes de generar tasks.

## Reglas de trabajo con el agente

- Archivos completos y pegables, nunca fragmentos con "…el resto igual".
- Comentarios inline en cada bloque no obvio, explicando qué hace y por qué.
- Antes de usar la API de una librería (Next.js, Supabase), verificarla en documentación vigente;
  no inventar firmas.
- No instalar dependencias ni ejecutar comandos con efectos (instalar, migrar, desplegar) sin
  confirmación previa.

## Gobernanza

- Esta constitución prevalece sobre cualquier plan o tarea que la contradiga.
- Las enmiendas se registran con versión, fecha y motivo; el cambio de stack (Principio III) exige
  enmienda explícita.
- Versionado semántico: MAJOR por eliminar o redefinir un principio de forma incompatible; MINOR
  por añadir un principio o ampliar materialmente una guía; PATCH por aclaraciones de redacción.
- Cumplimiento: cada plan verifica el "Constitution Check" (Principio VIII) y toda desviación se
  justifica por escrito o se resuelve con una enmienda.

**Versión**: 1.0.0 | **Ratificada**: 2026-10-24 | **Última enmienda**: 2026-10-24
