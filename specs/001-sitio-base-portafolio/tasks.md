---

description: "Task list for feature 001-sitio-base-portafolio"
---

# Tasks: Sitio base — Home, Proyectos y Sobre mí

**Input**: Design documents from `/specs/001-sitio-base-portafolio/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: La spec no pide tests automatizados. La verificación se hace con `tsc --noEmit`,
`npm run lint`, `npm run build` (que ejecuta `validateContent()`) y los recorridos manuales de
[quickstart.md](./quickstart.md).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- **(autor)**: la tarea requiere material o decisiones reales del autor; el agente no inventa
  contenido (Principio II)
- **(confirmar)**: requiere confirmación del autor antes de ejecutar (instala, publica o tiene
  efectos)

## Path Conventions

Un solo proyecto Next.js en la raíz del repositorio, sin `src/`: `app/`, `components/`, `content/`,
`lib/`, `public/` (ver [plan.md](./plan.md#project-structure)).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 (confirmar) Generar el scaffold de Next.js 16.4.x con `create-next-app` en una carpeta temporal fuera del repo (el directorio actual no está vacío: `.specify/`, `specs/`), con TypeScript, App Router, ESLint, sin Tailwind, sin `src/`, alias `@/*` y npm; verificar los flags vigentes con `npx create-next-app@16.4.3 --help` antes de ejecutar
- [X] T002 Mover el scaffold a la raíz del repo sin pisar `.specify/`, `specs/` ni `.gitignore`; fusionar el `.gitignore` generado con el existente en `.gitignore` (conservar `.claude/`, `.env.local`, `.next/`, `.vercel/`, `node_modules/`)
- [X] T003 Eliminar del scaffold el contenido de ejemplo (página demo, estilos y SVG de ejemplo) en `app/page.tsx`, `app/page.module.css`, `app/globals.css` y `public/`
- [X] T004 Confirmar `"strict": true` y el alias `@/*` en `tsconfig.json`; agregar el script `"typecheck": "tsc --noEmit"` en `package.json`
- [X] T005 [P] Crear las carpetas vacías del plan: `components/`, `content/`, `lib/`, `public/media/`, `public/cv/`
- [X] T006 (confirmar) Crear el repositorio público en GitHub, agregar el remote `origin` y hacer push de `main` y `001-sitio-base-portafolio`; su URL es el link real (`kind: "repo"`) y la base del `specUrl` del proyecto portafolio (Principios II, III y VIII)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

**Nota**: desde T056 (modo borrador) `validateContent()` solo hace fallar el build en producción
(`VERCEL_ENV=production` o `CONTENT_STRICT=1`); en local y previews los datos faltantes se ven
como "Pendiente" y se listan en un banner (research.md R8b).

- [X] T007 Crear los tipos del contenido en `content/types.ts` exactamente como en [contracts/content-schema.md](./contracts/content-schema.md): `Platform = "android" | "web"`, `ProjectStatus = "publicado" | "en-desarrollo" | "prototipo"`, `Media`, `ProjectLink` (`kind: "play-store" | "demo" | "repo"`), `Adr`, `CaseStudy` (con `demo: Media[]`), `Project` (con `cover?: Media` opcional y `caseStudy?: CaseStudy`), `Milestone`, `StackBlock` (`title: "Android" | "Web" | "Backend/Datos"`), `Profile`
- [ ] T008 (autor) Completar `content/profile.ts` con datos reales: nombre, `tagline` "Software Engineer: Android y Web", `focusLine`, `differentiatorLine`, `email`, `linkedinUrl`, `githubUrl`, `cvPath`, `siteUrl` (URL de Vercel mientras no haya dominio) y `heroVideo`
- [X] T009 Crear `content/projects.ts` que exporta `projects: Project[]` tipado con `Project` de `content/types.ts`; el autor lo completa en T020 y T027
- [X] T010 Implementar `lib/content.ts` con `getFeaturedProjects()` (Android primero), `getProjects(platform?)`, `getProjectWithCaseStudy(slug)`, `getCaseStudySlugs()` y `parsePlatform(value: unknown)` (valor ausente, desconocido o repetido → `undefined`), importando desde `content/projects.ts`
- [X] T011 Implementar `validateContent()` en `lib/content.ts` y ejecutarla al cargar el módulo; debe lanzar un error con mensaje claro si: no hay "Exactamente 3 en `true`" en `featured`; entre los destacados hay menos de 2 `android` o menos de 1 `web`; un destacado no tiene `caseStudy`; un caso de estudio tiene `adrs` fuera de "entre 2 y 4" o `demo` vacío ("al menos 1"); un proyecto no tiene `links` (≥ 1); un `slug` está duplicado o no cumple "minúsculas, números y guiones"; un `alt` está vacío; algún texto contiene marcadores de plantilla (`Lorem`, `TODO`, `Descripción...`, `[` … `]`)
- [X] T012 [P] Crear la estructura de tokens en `app/globals.css`: custom properties de color, tipografía (escala), espaciado, radios y duraciones; reset mínimo; `:focus-visible` con contorno visible; `@media (prefers-reduced-motion: reduce)` que anula transiciones y animaciones. Valores provisionales neutros; los definitivos llegan en US6 (T045)
- [X] T013 [P] Crear `components/ContactLinks.tsx` (+ `components/ContactLinks.module.css`): link `mailto:` y LinkedIn (y GitHub opcional por prop) leídos de `content/profile.ts`, con texto accesible
- [X] T014 [P] Crear `components/SiteHeader.tsx` (+ `.module.css`): nombre como link al Home y navegación a `/proyectos` y `/sobre-mi`; sin links a `/como-trabajo` ni a formulario de contacto (Clarificación 1); sin `aria-current` (Server Component sin ruta activa; la spec no lo exige aquí)
- [X] T015 [P] Crear `components/SiteFooter.tsx` (+ `.module.css`) con `ContactLinks`
- [X] T016 Crear `app/layout.tsx`: `<html lang="es">`, fuentes provisionales vía `next/font` (verificar la firma vigente en la documentación de Next.js antes de escribir) como variables CSS, `metadata` con `metadataBase` desde `profile.siteUrl` y plantilla de título, `SiteHeader`, `<main>` y `SiteFooter`, link "Saltar al contenido"
- [X] T017 [P] Crear `app/not-found.tsx`: 404 global en español con link al Home
- [X] T018 [P] Crear `components/StatusBadge.tsx`: mapea `publicado` → "Publicado", `en-desarrollo` → "En desarrollo", `prototipo` → "Prototipo"; `en-desarrollo` y `prototipo` nunca se rotulan como terminados (FR-008)
- [X] T056 Modo borrador (agregada el 2026-10-25, research.md R8b): `isStrict` y `contentIssues` en `lib/content.ts` (falla solo en producción), `getSiteUrl()` con respaldo `VERCEL_PROJECT_PRODUCTION_URL`, `components/Pending.tsx` (marca "Pendiente" y `orPending()`), `components/DraftBanner.tsx` en `app/layout.tsx`, y páginas/componentes que toleran campos vacíos

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Entender quién es y qué hace desde el Home (Priority: P1) 🎯 MVP

**Goal**: Home con posicionamiento, video Android en marco de teléfono, diferenciador, 3 destacados y contacto directo.

**Independent Test**: Abrir `/` a 360 px y en escritorio; verificar tagline, línea de foco, video (y poster con movimiento reducido), 3 destacados con ≥ 2 Android y ≥ 1 Web, diferenciador, acceso a Proyectos y correo + LinkedIn (quickstart §2, filas "Home" y "Movimiento reducido").

### Implementation for User Story 1

- [ ] T019 [US1] (autor) Aportar los medios del Home en `public/media/`: video de una app Android real de máximo 15 s, sin audio, en WebM y MP4 (objetivo ≤ 1,5 MB), y su poster WebP/AVIF (objetivo ≤ 60 KB)
- [ ] T020 [US1] (autor) Cargar en `content/projects.ts` los 3 proyectos destacados reales (≥ 2 `android`, 1 `web` = el propio portafolio en estado `en-desarrollo`, con el link del repo creado en T006), cada uno con `problem`, `role`, `stack`, ≥ 1 link real y `caseStudy` completo (7 secciones, 2 a 4 ADR, `demo` con al menos 1 video o captura real); `cover` opcional; medios en `public/media/`
- [X] T021 [P] [US1] Crear `components/PhoneVideo.tsx` (+ `.module.css`) con `"use client"`: `<video muted playsInline loop preload="metadata" poster>` sin `autoPlay`, fuentes WebM y MP4; llamar a `play()` solo si `matchMedia('(prefers-reduced-motion: no-preference)')` coincide y pausar si la preferencia cambia; marco de teléfono en CSS; si el video falla, queda el poster (FR-002, FR-003)
- [X] T022 [P] [US1] Crear `components/ProjectCard.tsx` (+ `.module.css`): nombre, plataforma, `StatusBadge`, resumen de una línea y stack; portada con `next/image` y `alt` solo si existe `cover`; si el proyecto tiene `caseStudy`, el nombre enlaza a `/proyectos/[slug]`; si no, muestra `problem`, `role` y sus links reales sin enlace a detalle (FR-007, FR-008a)
- [X] T023 [US1] Implementar el Home en `app/page.tsx` (+ `app/page.module.css`), mobile-first: tagline y `focusLine` en la primera pantalla junto a `PhoneVideo`, `differentiatorLine`, los 3 destacados de `getFeaturedProjects()` con `ProjectCard`, acceso visible a `/proyectos` y `ContactLinks` (FR-001–FR-005)
- [ ] T024 [US1] Ejecutar `npm run typecheck`, `npm run lint` y `npm run build`; probar el caso negativo de quickstart §1 (4.º destacado → build falla) y revertir

**Checkpoint**: Home funcional y validable por sí solo

---

## Phase 4: User Story 2 - Explorar proyectos y filtrar por plataforma (Priority: P1)

**Goal**: Lista de proyectos con filtro Todos / Android / Web reproducible desde la URL.

**Independent Test**: Quickstart §2, filas "Filtro", "URL compartida", "Valor inválido" y "Proyecto sin caso de estudio".

### Implementation for User Story 2

- [X] T025 [P] [US2] Crear `components/PlatformFilter.tsx` (+ `.module.css`) sin JS: tres links (`/proyectos`, `/proyectos?plataforma=android`, `/proyectos?plataforma=web`) con `aria-current="page"` en el activo y foco visible
- [X] T026 [US2] Implementar `app/proyectos/page.tsx` (+ `page.module.css`): `searchParams` como `Promise` con `await`, `parsePlatform()` (desconocido → Todos), `getProjects(platform)` y grilla de `ProjectCard`; estado vacío con mensaje y link a "Todos"; `metadata` propia (FR-006, FR-007)
- [ ] T027 [P] [US2] (autor, opcional) Agregar a `content/projects.ts` proyectos no destacados reales; los que no tengan caso de estudio deben tener `problem`, `role` y ≥ 1 link real

**Checkpoint**: Home + Proyectos funcionan de forma independiente

---

## Phase 5: User Story 3 - Leer el caso de estudio de un proyecto (Priority: P1)

**Goal**: Página de detalle con las 7 secciones en orden y 404 para slugs inexistentes.

**Independent Test**: Quickstart §2, filas "Caso de estudio" y "404 de proyecto".

### Implementation for User Story 3

- [X] T028 [P] [US3] Crear `components/AdrList.tsx` (+ `.module.css`): cada ADR con título, contexto, decisión, alternativa descartada y consecuencia
- [X] T029 [P] [US3] Crear `components/MediaView.tsx`: renderiza `Media` de tipo imagen con `next/image` (`width`, `height`, `alt`) o video con `<video controls muted playsInline preload="none" poster>`
- [X] T030 [US3] Implementar `app/proyectos/[slug]/page.tsx` (+ `page.module.css`): `params` como `Promise`, `generateStaticParams()` desde `getCaseStudySlugs()`, `export const dynamicParams = false`; secciones en este orden: 1) Problema y contexto de negocio, 2) Decisión de producto (dentro/fuera/por qué), 3) Demo (`MediaView` por cada elemento de `demo`), 4) Arquitectura (diagrama SVG con `alt`), 5) Decisiones técnicas (`AdrList`), 6) Qué haría distinto, 7) Resultado y links (estado, métricas solo si existen con fuente, links, `specUrl` solo si existe) (FR-009–FR-011)
- [X] T031 [US3] Agregar `generateMetadata` en `app/proyectos/[slug]/page.tsx` con título y descripción del proyecto
- [X] T032 [P] [US3] 404 de proyecto con link a `/proyectos` en `app/not-found.tsx` (con `dynamicParams = false` Next usa el 404 global, no uno del segmento) (FR-013)
- [ ] T033 [P] [US3] (autor) Aportar en `public/media/` los diagramas de arquitectura SVG y las demos o capturas reales de cada caso de estudio

**Checkpoint**: Las tres historias P1 funcionan; el sitio es presentable

---

## Phase 6: User Story 4 - Conocer el perfil en Sobre mí (Priority: P2)

**Goal**: Trayectoria, stack en 3 bloques, línea de método, CV y links.

**Independent Test**: Quickstart §2, fila "Sobre mí".

### Implementation for User Story 4

- [ ] T034 [US4] (autor) Completar `content/about.ts` con datos reales: 4 `Milestone` en orden fijo "publicidad y brand strategy → SDR de SaaS → analista CRM → ingeniería de software" (SDR con `tools`: Salesforce, HubSpot, Dynamics 365), cada uno con `contribution`; 3 `StackBlock` con `title` exactamente "Android", "Web", "Backend/Datos" y solo tecnología dominada hoy; línea de método (Spec-Driven Development, Clean Architecture)
- [ ] T035 [P] [US4] (autor) Copiar el CV real en PDF a `public/cv/` con el nombre de `profile.cvPath`
- [X] T036 [P] [US4] Crear `components/Timeline.tsx` (+ `.module.css`): lista ordenada semántica de hitos con rol, período, herramientas y habilidad que aporta
- [X] T037 [US4] Implementar `app/sobre-mi/page.tsx` (+ `page.module.css`): `Timeline`, 3 bloques de stack, línea de método **sin** link a `/como-trabajo` mientras no exista la Feature 003, link de descarga del CV, GitHub y LinkedIn; `metadata` propia (FR-014–FR-016)

**Checkpoint**: Sitio completo en contenido

---

## Phase 7: User Story 5 - Compartir y ser descubierto (Priority: P2)

**Goal**: Metadata propia, imágenes OG, sitemap, robots y 404.

**Independent Test**: Quickstart §3.

### Implementation for User Story 5

- [X] T038 [P] [US5] Revisar que `app/page.tsx`, `app/proyectos/page.tsx` y `app/sobre-mi/page.tsx` exportan `metadata` con `title`, `description` y `openGraph` propios
- [X] T039 [P] [US5] Crear `app/opengraph-image.tsx` con `ImageResponse` de `next/og`, `size = { width: 1200, height: 630 }`, `contentType = 'image/png'`, `alt`; muestra nombre y tagline
- [X] T040 [P] [US5] Crear `app/proyectos/[slug]/opengraph-image.tsx` con `ImageResponse`, mismo `size` y `contentType`, `params` como `Promise`; muestra nombre del proyecto y plataforma (FR-018)
- [X] T041 [P] [US5] Crear `app/sitemap.ts` (`MetadataRoute.Sitemap`) con `/`, `/proyectos`, `/sobre-mi` y cada slug de `getCaseStudySlugs()`, usando `profile.siteUrl`
- [X] T042 [P] [US5] Crear `app/robots.ts` (`MetadataRoute.Robots`): permite todo y apunta a `${siteUrl}/sitemap.xml` (FR-019)

**Checkpoint**: Sitio indexable y compartible

---

## Phase 8: User Story 6 - Identidad visual propia (Priority: P3)

**Goal**: Paleta y tipografía propias como tokens, máximo 2 familias, animaciones sutiles.

**Independent Test**: Revisar todas las páginas: consistencia de tokens, ≤ 2 familias, animaciones apagadas con movimiento reducido, contraste AA.

### Implementation for User Story 6

- [ ] T043 [US6] (autor) Definir la paleta de marca y las 2 familias tipográficas (máximo)
- [ ] T044 [US6] Aplicar las familias definitivas con `next/font/google` en `app/layout.tsx` (máximo 2, expuestas como variables CSS; verificar la firma vigente en la documentación)
- [ ] T045 [US6] Reemplazar los valores provisionales de color y tipografía en `app/globals.css` por los definitivos; verificar contraste AA de texto y controles en cada combinación usada
- [X] T046 [US6] Revisar los `*.module.css` de `app/` y `components/` para que usen solo tokens (sin colores ni tamaños sueltos)
- [X] T047 [US6] Agregar animaciones sutiles (p. ej. aparición de tarjetas, hover) solo dentro de `@media (prefers-reduced-motion: no-preference)` en los `*.module.css` correspondientes (FR-021)
- [ ] T048 [US6] Retirar el comentario de "valores provisionales" de `app/globals.css` una vez aplicada la identidad

**Checkpoint**: Todas las historias completas

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T049 Ejecutar `npm run typecheck`, `npm run lint` y `npm run build` sin errores
- [ ] T050 Revisión de contenido (SC-008): 0 placeholders, 0 texto de plantilla, 0 tecnologías fuera del stack del autor en `content/`
- [ ] T051 Verificar todos los links externos de `content/` (quickstart §4); corregir cualquier 4xx/5xx
- [ ] T052 Recorrido completo con teclado y verificación de contraste AA en todas las páginas (quickstart §5)
- [ ] T053 (confirmar) Conectar el repositorio de GitHub (T006) a Vercel y desplegar un preview de la rama
- [ ] T054 Medir Lighthouse móvil sobre el preview en `/`, `/proyectos`, un caso de estudio y `/sobre-mi`; ajustar medios o CSS hasta ≥ 90 en las 4 categorías (SC-005)
- [ ] T055 Ejecutar la validación completa de [quickstart.md](./quickstart.md) y registrar el resultado

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: sin dependencias; T001 y T006 requieren confirmación
- **Foundational (Phase 2)**: depende de Setup; bloquea todas las historias. T007–T011 en orden; T008 (perfil) antes de T013–T016
- **US1 (Phase 3)**: depende de Foundational y del contenido de T019–T020; el build completo pasa desde T020
- **US2 (Phase 4)**: depende de Foundational y de `ProjectCard` (T022)
- **US3 (Phase 5)**: depende de Foundational y de proyectos con `caseStudy` (T020)
- **US4 (Phase 6)**: depende solo de Foundational
- **US5 (Phase 7)**: depende de que existan las páginas de US1–US4 para revisar su metadata; T040 depende de T030
- **US6 (Phase 8)**: depende de Foundational; conviene después de US1–US4 para revisar todos los CSS
- **Polish (Phase 9)**: depende de todas las historias; T053 depende de T006

### Within Each User Story

- Contenido del autor antes de la página que lo muestra
- Componentes [P] antes de la página que los compone
- Validar con build al cerrar cada historia

### Parallel Opportunities

- Phase 2: T012, T013, T014, T015, T017, T018 en paralelo tras T007–T011
- US1: T021 y T022 en paralelo
- US3: T028, T029, T032 y T033 en paralelo
- US5: T038–T042 en paralelo
- US4 puede avanzar en paralelo con US2/US3 una vez cerrada la Phase 2

---

## Parallel Example: User Story 1

```bash
Task: "Crear components/PhoneVideo.tsx con reproducción condicionada a prefers-reduced-motion"
Task: "Crear components/ProjectCard.tsx con StatusBadge y enlace condicional a detalle"
```

## Parallel Example: User Story 5

```bash
Task: "Crear app/opengraph-image.tsx"
Task: "Crear app/proyectos/[slug]/opengraph-image.tsx"
Task: "Crear app/sitemap.ts"
Task: "Crear app/robots.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Completar Phase 1 (Setup) y Phase 2 (Foundational)
2. Completar Phase 3 (US1)
3. **STOP and VALIDATE**: quickstart §1 y filas "Home" y "Movimiento reducido"
4. Preview en Vercel si se quiere mostrar

### Incremental Delivery

1. Setup + Foundational → base lista
2. US1 → Home (MVP)
3. US2 + US3 → evidencia completa (las tres P1)
4. US4 + US5 → perfil y descubribilidad
5. US6 → identidad visual definitiva
6. Polish → Lighthouse ≥ 90 y validación completa

---

## Notes

- [P] = archivos distintos, sin dependencias pendientes
- Las tareas (autor) no las completa el agente: sin material real no se publica (Principio II)
- Las tareas (confirmar) esperan aprobación explícita (reglas de trabajo con el agente)
- Commits pequeños con Conventional Commits al cerrar cada tarea o grupo lógico
- Archivos completos y comentarios inline en bloques no obvios (reglas de trabajo con el agente)
