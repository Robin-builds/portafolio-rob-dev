# Implementation Plan: Sitio base — Home, Proyectos y Sobre mí

**Branch**: `001-sitio-base-portafolio` | **Date**: 2026-10-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-sitio-base-portafolio/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Sitio estático en español que posiciona a Robinson Arriagada como "Software Engineer: Android y Web":
Home con video Android en marco de teléfono y 3 destacados, lista de proyectos filtrable por
plataforma vía URL, casos de estudio de 7 secciones y página Sobre mí. Todo el contenido vive como
datos TypeScript tipados en `/content`; las páginas son Server Components y el único componente de
cliente es el reproductor del video (para respetar `prefers-reduced-motion`). Las reglas de contenido
de la spec y la constitución (3 destacados, ≥ 2 Android, ≥ 1 Web, 2–4 ADR, sin placeholders) se
verifican al compilar: si el contenido las rompe, el build falla. Esta feature no usa Supabase.

## Technical Context

**Language/Version**: TypeScript 5.x en modo `strict`; Node.js 22 LTS local (22.19.0 instalado), Node 24 en Vercel

**Primary Dependencies**: Next.js 16.4.x (App Router, `next/og`, `next/font`, `next/image`), React 19 (incluido con Next). Sin otras dependencias de runtime

**Storage**: N/A. Contenido como objetos TypeScript en `/content`; medios estáticos en `/public`

**Testing**: `tsc --noEmit` + `next build` (que ejecuta la validación de contenido) + ESLint del scaffold; verificación manual guiada en [quickstart.md](./quickstart.md) (teclado, contraste, Lighthouse móvil, links)

**Target Platform**: Navegadores modernos (móvil y escritorio); despliegue en Vercel

**Project Type**: Aplicación web (sitio de contenido, un solo proyecto Next.js)

**Performance Goals**: Lighthouse móvil ≥ 90 en Performance, Accessibility, Best Practices y SEO, con el video del Home

**Constraints**: Responsive desde 360 px; WCAG AA; video ≤ 15 s, sin audio, liviano; máximo 2 familias tipográficas; sin librerías de UI, CSS ni estado

**Scale/Scope**: 4 rutas de página + 404 + sitemap + robots + imágenes OG; del orden de 3–10 proyectos

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | Cumplimiento en este plan | Estado |
|---|---|---|
| I. Android primero, web al mismo nivel | Tagline y línea de foco en Home; filtro Todos / Android / Web; 3 destacados con ≥ 2 Android y ≥ 1 Web, verificado en build | PASS |
| II. Contenido honesto y verificable | Tipo `Project` exige problema, stack, rol, estado y ≥ 1 link; validación en build rechaza placeholders, destacados sin caso de estudio y ADR fuera de 2–4; métricas opcionales y solo manuales | PASS |
| III. Stack cerrado | Next.js App Router + TS strict, CSS Modules + CSS nativo, Vercel, GitHub. Supabase no se usa en esta feature (no hay caso real, Principio VI) | PASS |
| IV. Simplicidad | Server Components por defecto; un solo componente cliente (video). Sin librerías de estado. Única abstracción: `lib/content.ts` (consultas + validación del contenido), declarada abajo. Sin segmento `[lang]` | PASS (con 1 declaración) |
| V. Contenido separado del código | Proyectos, perfil, trayectoria y stack en `/content`; agregar un proyecto = agregar un objeto | PASS |
| VI. Seguridad de datos | Sin datos de usuario, sin secretos, sin tablas en esta feature | PASS (N/A) |
| VII. Calidad mínima medible | Mobile-first, WCAG AA, Lighthouse ≥ 90, `next/image`, metadata + OG por página, español | PASS |
| VIII. Spec-Driven Development | Rama `001-sitio-base-portafolio`, spec clarificada, este Constitution Check antes de tasks | PASS |

**Abstracción declarada (Principio IV)**: `lib/content.ts` agrupa las consultas al contenido
(destacados, filtro por plataforma, búsqueda por slug) y una función de validación que se ejecuta en
build. Motivo: es el único lugar donde se puede hacer cumplir la spec sobre el contenido sin tests ni
dependencias extra. Desde el 2026-10-25 (aprobado por el autor) la validación solo bloquea el
build en producción; en local y previews opera en "modo borrador" con marcas "Pendiente" y un
banner de pendientes (componentes `Pending` y `DraftBanner`; ver research.md R8b).

**Decisión confirmada (Principio IV, 2026-10-24)**: sin segmento `[lang]` en la 001; rutas planas
solo en español (ver [research.md](./research.md#r1-rutas-y-segmento-lang)).

**Herramientas de desarrollo (confirmado 2026-10-24)**: ESLint con la configuración que trae
`create-next-app` se considera parte del scaffold de Next.js, no una tecnología nueva del stack: no
llega al navegador ni al runtime. No se agregan plugins ni reglas extra sin pasar por el plan.

## Project Structure

### Documentation (this feature)

```text
specs/001-sitio-base-portafolio/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
│   ├── routes.md
│   └── content-schema.md
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
app/
├── layout.tsx               # <html lang="es">, fuentes (next/font), metadataBase, header/footer
├── globals.css              # Tokens de diseño (custom properties), reset, foco visible, reduced-motion
├── page.tsx                 # Home
├── page.module.css
├── not-found.tsx            # 404 global
├── opengraph-image.tsx      # OG por defecto del sitio
├── sitemap.ts
├── robots.ts
├── proyectos/
│   ├── page.tsx             # Lista + filtro por ?plataforma=
│   ├── page.module.css
│   └── [slug]/
│       ├── page.tsx         # Caso de estudio (generateStaticParams + dynamicParams = false)
│       ├── page.module.css
│       ├── not-found.tsx    # 404 con camino de vuelta a Proyectos
│       └── opengraph-image.tsx  # OG con nombre y plataforma del proyecto
└── sobre-mi/
    ├── page.tsx
    └── page.module.css

components/
├── SiteHeader.tsx (+ .module.css)
├── SiteFooter.tsx (+ .module.css)
├── ContactLinks.tsx         # mailto + LinkedIn (+ GitHub)
├── ProjectCard.tsx (+ .module.css)
├── PlatformFilter.tsx (+ .module.css)   # Links, sin JS
├── StatusBadge.tsx
└── PhoneVideo.tsx (+ .module.css)       # "use client": play() solo sin reduced-motion

content/
├── types.ts                 # Project, CaseStudy, Adr, ProjectLink, Milestone, StackBlock, Profile
├── profile.ts               # Nombre, tagline, línea de foco, diferenciador, contacto, CV, hero video
├── projects.ts              # Lista de proyectos (incluye el propio portafolio)
└── about.ts                 # Trayectoria, bloques de stack, línea de método

lib/
└── content.ts               # Consultas + validateContent() ejecutada en build

public/
├── media/                   # Videos (mp4/webm), posters, capturas, diagramas SVG
└── cv/                      # CV en PDF
```

**Structure Decision**: Un solo proyecto Next.js en la raíz del repositorio (sin `src/`), con
`app/` para rutas, `components/` para UI compartida, `content/` para datos tipados (Principio V) y
`lib/` solo para el acceso y la validación del contenido. No hay backend separado.

## Complexity Tracking

Sin violaciones de la constitución. La única abstracción (`lib/content.ts`) está declarada en el
Constitution Check.

## Post-Design Constitution Check (re-evaluación tras Phase 1)

- El modelo de datos ([data-model.md](./data-model.md)) codifica los Principios II y V en tipos y
  reglas de validación; ningún dato de proyecto vive en componentes.
- Los contratos ([contracts/](./contracts/)) solo exponen rutas públicas de lectura y un query param;
  no hay superficie de datos de usuario (VI N/A).
- El único `"use client"` sigue siendo `PhoneVideo` (IV).
- Resultado: **PASS**.
