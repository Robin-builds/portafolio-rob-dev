# Quickstart: validar la Feature 001

**Feature**: 001-sitio-base-portafolio

Guía para comprobar de punta a punta que la feature cumple la spec. No incluye código de
implementación.

## Prerrequisitos

- Node.js 22 LTS o superior y npm.
- Dependencias instaladas (`npm install`), **previa confirmación del autor** (constitución).
- Contenido real cargado en `/content` y medios en `/public` (video ≤ 15 s, posters, capturas,
  diagramas, CV en PDF).

## 1. Compilación y reglas de contenido

```bash
npm run typecheck                 # rutas tipadas + TypeScript strict sin errores
npm run lint                      # ESLint del scaffold
npm run build                     # modo borrador: compila y lista los pendientes en el banner
CONTENT_STRICT=1 npm run build    # como producción: falla si validateContent() detecta una regla rota
```

**Esperado**: los cuatro comandos terminan sin errores cuando el contenido está completo. Prueba
negativa: marcar un 4.º proyecto como `featured` o dejar un caso de estudio con 1 ADR debe hacer
fallar el build estricto con un mensaje claro, y en modo borrador debe aparecer en el banner.
Revertir después.

## 2. Recorrido funcional (`npm run start`, http://localhost:3000)

| Escenario | Acción | Esperado | Spec |
|---|---|---|---|
| Home | Abrir `/` a 360 px | Tagline, línea de foco, video en marco de teléfono, diferenciador, 3 destacados (≥ 2 Android, ≥ 1 Web), acceso a Proyectos, correo + LinkedIn | US1, FR-001–005 |
| Movimiento reducido | Activar "reducir movimiento" en el SO o en DevTools (Rendering → Emulate prefers-reduced-motion) y recargar | El video no se reproduce; se ve el poster | FR-003 |
| Filtro | Clic en Android, Web, Todos | La lista cambia y la URL refleja `?plataforma=` | FR-006 |
| URL compartida | Abrir `/proyectos?plataforma=web` en otra pestaña | Mismo filtro activo | FR-006 |
| Valor inválido | Abrir `/proyectos?plataforma=ios` | Lista completa, "Todos" activo | Edge case |
| Caso de estudio | Abrir un destacado | 7 secciones en orden, 2–4 ADR, links funcionando | FR-009 |
| Proyecto sin caso de estudio | Ver su tarjeta | Sin link a detalle; problema, rol y ≥ 1 link real | FR-008a |
| 404 de proyecto | Abrir `/proyectos/no-existe` | 404 con link a Proyectos | FR-013 |
| 404 global | Abrir `/xyz` | 404 propia | FR-019 |
| Sobre mí | Abrir `/sobre-mi` | Trayectoria de 4 hitos, 3 bloques de stack, CV descarga, GitHub y LinkedIn | US4 |
| Sin links rotos a otras features | Buscar links a `/como-trabajo` o a un formulario | No existen todavía | Clarificación 1 |

## 3. SEO y vista previa

- Abrir `/sitemap.xml` y `/robots.txt`: existen y listan las rutas y casos de estudio.
- Abrir `/proyectos/<slug>/opengraph-image`: PNG 1200×630 con nombre y plataforma.
- Inspeccionar `<head>` de cada página: `title`, `description` y `og:*` propios.

## 4. Links externos

Revisar cada URL de `/content` (Play Store, demo, repo, spec, LinkedIn, GitHub) y confirmar respuesta
200 (o redirección final a 200). Cualquier 4xx/5xx es un defecto (FR-012).

## 5. Accesibilidad y calidad (sobre el deploy de preview en Vercel)

- Recorrer todas las páginas solo con teclado: foco visible en cada control, orden lógico.
- Contraste AA de texto y controles (DevTools → inspector de contraste).
- Lighthouse móvil (DevTools o PageSpeed Insights) en `/`, `/proyectos`, un caso de estudio y
  `/sobre-mi`: ≥ 90 en las 4 categorías (SC-005).
- Revisión de contenido: 0 placeholders, 0 texto de plantilla, 0 tecnologías fuera del stack
  declarado (SC-008).
