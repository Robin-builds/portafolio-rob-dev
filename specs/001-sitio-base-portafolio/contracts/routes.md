# Contract: Rutas públicas

**Feature**: 001-sitio-base-portafolio

Todas las rutas son de lectura, en español, sin autenticación.

| Ruta | Render | Contenido | 404 |
|---|---|---|---|
| `/` | Estático | Tagline, línea de foco, video en marco de teléfono, diferenciador, 3 destacados, acceso a Proyectos, contacto directo (correo + LinkedIn) | — |
| `/proyectos` | Por request (lee `searchParams`) | Filtro + tarjetas | — |
| `/proyectos/[slug]` | Estático (`generateStaticParams`) | Caso de estudio de 7 secciones | Slug inexistente o proyecto sin caso de estudio → `not-found` del segmento, con link a `/proyectos` |
| `/sobre-mi` | Estático | Trayectoria, 3 bloques de stack, CV, GitHub, LinkedIn | — |
| `/sitemap.xml` | Estático | Rutas fijas + cada `/proyectos/[slug]` con caso de estudio | — |
| `/robots.txt` | Estático | Permite todo; apunta al sitemap | — |
| `/opengraph-image` y `/proyectos/[slug]/opengraph-image` | Estático | PNG 1200×630; el de proyecto muestra nombre y plataforma | — |
| Cualquier otra | — | `not-found` global con link al Home | Sí |

## Query param `plataforma` (solo `/proyectos`)

| Valor | Resultado | Estado activo del filtro |
|---|---|---|
| ausente | Todos los proyectos | "Todos" |
| `android` | Solo `platform = "android"` | "Android" |
| `web` | Solo `platform = "web"` | "Web" |
| otro / repetido | Todos los proyectos (sin error) | "Todos" |

Los controles del filtro son links (`/proyectos`, `/proyectos?plataforma=android`,
`/proyectos?plataforma=web`); el activo lleva `aria-current="page"`. Si el filtro no tiene
resultados, se muestra un mensaje con link a "Todos".

## Links condicionales (Clarificación 1)

Los accesos a `/como-trabajo` (Feature 003) y al formulario de contacto (Feature 002) no se
renderizan en esta feature. El contacto directo (`mailto:` + LinkedIn) se muestra siempre en el Home
y en el footer.

## Metadata por página

Cada ruta de página define `title` y `description` propios y Open Graph; `metadataBase` en el
layout raíz. `<html lang="es">`.
