# Data Model: Sitio base — Home, Proyectos y Sobre mí

**Feature**: 001-sitio-base-portafolio | **Date**: 2026-10-24

Todo el modelo vive como objetos TypeScript en `/content` (sin base de datos). Los tipos exactos
están en [contracts/content-schema.md](./contracts/content-schema.md). Las reglas marcadas con
**[build]** las hace cumplir `validateContent()` (ver [research.md](./research.md#r8-validación-del-contenido-en-build)).

## Project

Obra mostrada en el portafolio.

| Campo | Tipo | Regla |
|---|---|---|
| `slug` | string | Único **[build]**; minúsculas, números y guiones; se usa en `/proyectos/[slug]` |
| `name` | string | Obligatorio |
| `platform` | `"android"` \| `"web"` | Obligatorio; alimenta el filtro |
| `status` | `"publicado"` \| `"en-desarrollo"` \| `"prototipo"` | Obligatorio; se muestra siempre (FR-008) |
| `summary` | string | Una línea |
| `problem` | string | Problema que resuelve (Principio II) |
| `role` | string | Rol del autor (Principio II) |
| `stack` | string[] | ≥ 1; solo tecnología dominada hoy (FR-017, revisión manual) |
| `links` | ProjectLink[] | ≥ 1 **[build]** |
| `featured` | boolean | Exactamente 3 en `true` **[build]** |
| `cover` | Media \| undefined | Opcional; si existe, imagen de la tarjeta con `alt` |
| `caseStudy` | CaseStudy \| undefined | Obligatorio si `featured` **[build]**; si falta, la tarjeta no enlaza a detalle |

**Reglas de conjunto [build]**: entre los destacados, ≥ 2 `android` y ≥ 1 `web`. Ningún texto
contiene marcadores de plantilla.

## CaseStudy

Las 7 secciones del caso de estudio, en orden fijo (FR-009).

| Campo | Tipo | Sección |
|---|---|---|
| `businessContext` | { audience, pain, whyNow } | 1. Problema y contexto de negocio |
| `productDecision` | { inScope: string[], outOfScope: string[], rationale } | 2. Decisión de producto |
| `demo` | Media[] (video o capturas reales) | 3. Demo; al menos 1 elemento **[build]** |
| `architecture` | Media (diagrama SVG con `alt` descriptivo) | 4. Arquitectura |
| `adrs` | Adr[] | 5. Decisiones técnicas; entre 2 y 4 **[build]** |
| `lessons` | string[] | 6. Qué haría distinto |
| `metrics` | { label, value, source }[] \| undefined | 7. Resultado; solo métricas reales con fuente |
| `specUrl` | string \| undefined | Link a la spec real, solo si el repo público contiene una (FR-010) |

## Adr

| Campo | Tipo |
|---|---|
| `title` | string |
| `context` | string |
| `decision` | string |
| `rejectedAlternative` | string |
| `consequence` | string |

## ProjectLink

| Campo | Tipo | Regla |
|---|---|---|
| `kind` | `"play-store"` \| `"demo"` \| `"repo"` | |
| `url` | string | URL absoluta `https://`; verificada en quickstart (FR-012) |
| `label` | string | Texto accesible del link |

## Media

| Campo | Tipo | Regla |
|---|---|---|
| `kind` | `"image"` \| `"video"` | |
| `src` | string | Ruta bajo `/public/media` |
| `alt` | string | Obligatorio y no vacío (WCAG) |
| `width`, `height` | number | Necesarios para `next/image` y evitar saltos de layout |
| `poster` | string \| undefined | Solo videos |
| `sources` | { src, type }[] \| undefined | Solo videos (WebM + MP4) |

## Profile (`content/profile.ts`)

Nombre, `tagline` ("Software Engineer: Android y Web"), `focusLine`, `differentiatorLine`,
`heroVideo` (Media de video ≤ 15 s), `email`, `linkedinUrl`, `githubUrl`, `cvPath`
(`/cv/...pdf`), `siteUrl`.

## Milestone (`content/about.ts`)

| Campo | Tipo |
|---|---|
| `role` | string (p. ej. "SDR de SaaS") |
| `period` | string |
| `tools` | string[] \| undefined (p. ej. Salesforce, HubSpot, Dynamics 365) |
| `contribution` | string — habilidad que aporta hoy al desarrollo |

Orden fijo: publicidad y brand strategy → SDR de SaaS → analista CRM → ingeniería de software.

## StackBlock (`content/about.ts`)

| Campo | Tipo | Regla |
|---|---|---|
| `title` | `"Android"` \| `"Web"` \| `"Backend/Datos"` | Exactamente estos 3 |
| `items` | string[] | Solo tecnología dominada hoy |

## Estados

`Project.status` no tiene transiciones automáticas: el autor lo edita a mano. Regla de
presentación: `en-desarrollo` y `prototipo` siempre muestran su etiqueta y nunca se rotulan como
terminados.
