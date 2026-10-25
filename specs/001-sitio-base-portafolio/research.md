# Research: Sitio base — Home, Proyectos y Sobre mí

**Feature**: 001-sitio-base-portafolio | **Date**: 2026-10-24

Las firmas de API citadas se verificaron en la documentación vigente de Next.js (canary, v16) el
2026-10-24. Versión `latest` en npm a esa fecha: `next@16.4.3`.

## R1. Rutas y segmento `[lang]`

- **Decision**: No usar segmento `[lang]` en la 001. Rutas planas en español: `/`, `/proyectos`,
  `/proyectos/[slug]`, `/sobre-mi`.
- **Rationale**: La constitución vigente (Principio VII) define el sitio solo en español; un
  `[lang]` con un único valor posible es una abstracción que la spec no pide (Principio IV). Migrar
  después es mecánico: mover `app/*` a `app/[lang]/*` y redirigir las rutas actuales, dentro de la
  Feature 004 y tras la enmienda del Principio VII.
- **Alternatives considered**: `app/[lang]/` desde ya con `es` como único valor (evita mover archivos
  después, pero agrega params, `generateStaticParams` y redirección de `/` sin uso real hoy).
- **Estado**: confirmado por el autor el 2026-10-24.

## R2. Filtro por plataforma en la URL

- **Decision**: `/proyectos?plataforma=android|web`. La página lee `searchParams` (en Next 16 es una
  `Promise` y se hace `await`). Los botones del filtro son links `<a>` con `aria-current="page"` en el
  activo. Valor ausente o desconocido → "Todos".
- **Rationale**: Cero JavaScript en cliente, URL compartible (FR-006), funciona con teclado y sin JS.
- **Alternatives considered**: Estado en cliente con `useSearchParams` (agrega JS sin beneficio);
  rutas `/proyectos/android` (choca con `/proyectos/[slug]`).
- **Consecuencia**: `/proyectos` se renderiza por request (usa una API de request). Es una página
  liviana y sin datos externos, así que no afecta el objetivo de Lighthouse.

## R3. Casos de estudio y 404

- **Decision**: `app/proyectos/[slug]/page.tsx` con `generateStaticParams()` que devuelve solo los
  proyectos **con** caso de estudio, y `export const dynamicParams = false` para que cualquier otro
  slug responda 404. `not-found.tsx` en ese segmento ofrece el camino de vuelta a Proyectos.
- **Rationale**: Prerenderizado estático, 404 automático para slugs inexistentes (FR-013) y para
  proyectos sin caso de estudio (FR-008a).
- **Alternatives considered**: Llamar a `notFound()` manualmente con `dynamicParams` por defecto
  (funciona, pero genera páginas por request innecesarias).

## R4. Video del Home y movimiento reducido

- **Decision**: `<video muted playsInline loop preload="metadata" poster=...>` **sin** atributo
  `autoPlay`, con fuentes WebM y MP4. Un componente cliente mínimo (`PhoneVideo`) llama a `play()`
  solo si `matchMedia('(prefers-reduced-motion: no-preference)')` coincide, y pausa si cambia la
  preferencia. Si el video falla, queda el poster. El poster es una imagen liviana (WebP/AVIF) y se
  trata como candidato a LCP.
- **Rationale**: CSS no puede impedir el autoplay; con el atributo `autoPlay` el video arrancaría
  antes de consultar la preferencia (FR-003). Sin `autoPlay`, el estado por defecto ya es el seguro.
- **Alternatives considered**: `autoPlay` + pausar en JS (hay un parpadeo de movimiento antes de
  pausar); GIF (pesado y sin control).
- **Presupuesto de medios** (objetivo, a validar con Lighthouse): video ≤ 1,5 MB, poster ≤ 60 KB.

## R5. Imágenes Open Graph

- **Decision**: `app/opengraph-image.tsx` (OG del sitio) y `app/proyectos/[slug]/opengraph-image.tsx`
  usando `ImageResponse` de `next/og`, con `size = { width: 1200, height: 630 }`,
  `contentType = 'image/png'` y `alt`. En Next 16 la función recibe `params` como `Promise`.
  `metadataBase` se define en `app/layout.tsx` con la URL de producción.
- **Rationale**: Cada caso de estudio muestra nombre y plataforma (FR-018) sin mantener imágenes a
  mano; se generan en build porque no usan APIs de request.
- **Alternatives considered**: Imágenes OG estáticas por proyecto (trabajo manual, se desactualizan).
- **Abierto**: dominio de producción. Hasta tenerlo, `metadataBase` usa la URL de Vercel del
  proyecto; se reemplaza al configurar el dominio.

## R6. Sitemap y robots

- **Decision**: `app/sitemap.ts` (tipo `MetadataRoute.Sitemap`) generado desde el contenido: rutas
  fijas + cada caso de estudio. `app/robots.ts` (tipo `MetadataRoute.Robots`) permite todo y apunta al
  sitemap.
- **Rationale**: Se mantienen solos al agregar proyectos (Principio V).

## R7. Tipografía y tokens de diseño

- **Decision**: Máximo 2 familias vía `next/font/google` (se autoalojan en build, sin pedidos a
  Google en runtime), expuestas como variables CSS. Paleta, escala tipográfica, espaciado, radios y
  duraciones de animación como custom properties en `app/globals.css`. Animaciones envueltas en
  `@media (prefers-reduced-motion: no-preference)`. Las familias concretas y la paleta se definen en
  la tarea de identidad visual (decisión de marca del autor), validando contraste AA.
- **Rationale**: FR-020, FR-021 y HU-06 sin librerías de CSS ni UI (Principio III).

## R8. Validación del contenido en build

- **Decision**: `lib/content.ts` exporta `validateContent()`, que se ejecuta al importar el módulo en
  el servidor y lanza un error con mensaje claro si: no hay exactamente 3 destacados; hay menos de 2
  Android o menos de 1 Web entre ellos; un destacado no tiene caso de estudio; un caso de estudio
  tiene menos de 2 o más de 4 ADR o no tiene demo; un proyecto no tiene links; algún texto contiene marcadores de
  plantilla (p. ej. `Lorem`, `TODO`, `Descripción...`, `[`…`]`); hay slugs duplicados.
- **Rationale**: Convierte reglas de la spec y del Principio II en un fallo de `next build`, sin
  framework de tests ni dependencias nuevas.
- **Alternatives considered**: Tests con un runner (agrega dependencia); solo revisión manual (no se
  hace cumplir).

### R8b. Modo borrador (enmienda al plan, aprobada por el autor el 2026-10-25)

- **Decision**: La validación de R8 solo hace fallar el build en modo estricto: producción
  en Vercel (`VERCEL_ENV=production`) o `CONTENT_STRICT=1`. En local y en previews el sitio
  funciona en "modo borrador": cada dato faltante se muestra como una marca "Pendiente" y un
  banner lista todas las reglas rotas. `profile.siteUrl` pasa a ser opcional: si falta, se usa
  `VERCEL_PROJECT_PRODUCTION_URL`.
- **Rationale**: Con la validación siempre estricta, un solo dato faltante (p. ej. un `whyNow`)
  bloqueaba el desarrollo y los previews. Producción sigue protegida igual (Principio II).
- **Alternatives considered**: Datos de prueba en el repo (riesgo de publicarlos); campos
  opcionales en el esquema (relajaría las reglas también en producción).

## R9. Verificación de links y calidad

- **Decision**: Verificación manual documentada en [quickstart.md](./quickstart.md): recorrer los
  links externos de `/content` con un comando que reporte códigos HTTP, medir Lighthouse móvil sobre
  el deploy de preview de Vercel (PageSpeed Insights o DevTools), y pruebas de teclado y contraste.
- **Rationale**: No requiere instalar nada. Si más adelante se quiere automatizar (p. ej. Lighthouse
  CI), se propone como dependencia con confirmación previa.
