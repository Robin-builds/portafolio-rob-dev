# Feature Specification: Sitio base — Home, Proyectos y Sobre mí

**Feature Branch**: `001-sitio-base-portafolio`

**Created**: 2026-10-24

**Status**: Draft

**Input**: User description: "Feature 001 del documento 'Specs del portafolio v2': sitio base con Home, Proyectos (filtro, casos de estudio) y Sobre mí, posicionando a Robinson Arriagada como Software Engineer: Android y Web."

## Clarifications

### Session 2026-10-24

- Q: Mientras Contacto y "Cómo trabajo" no existan, ¿cómo debe verse el Home para quien quiera contactar a Robinson? → A: Ocultar "Cómo trabajo" hasta la Feature 003, pero mostrar desde ya contacto directo por correo (`mailto:`) y LinkedIn; el formulario se suma con la Feature 002.
- Q: ¿Todos los proyectos de la lista deben tener su propia página de caso de estudio completa, o solo los 3 destacados? → A: Solo los proyectos con caso de estudio completo enlazan a un detalle; los demás aparecen como tarjeta con sus links reales, sin página de detalle. Los 3 destacados del Home siempre tienen caso de estudio.
- Q: ¿Qué proyecto Web va como destacado en la Feature 001, si el caso de estudio del portafolio se profundiza en la Feature 003? → A: El propio portafolio es el destacado Web desde la 001, con un caso de estudio completo y honesto en estado "En desarrollo"; la 003 lo amplía con el proceso SDD y la trazabilidad.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Entender quién es y qué hace desde el Home (Priority: P1)

Un reclutador llega al sitio y, en la primera pantalla, ve el posicionamiento de Robinson, una prueba de producto en movimiento y proyectos destacados. Con eso decide rápido si sigue leyendo.

**Why this priority**: Es la puerta de entrada. Si el Home no comunica el posicionamiento en segundos, nada de lo demás se lee. Solo con el Home y los proyectos destacados ya existe un MVP presentable.

**Independent Test**: Abrir el Home en un teléfono de 360 px y en escritorio; verificar tagline, video, 3 proyectos destacados, línea de diferenciador y accesos de navegación, sin necesidad de ninguna otra página.

**Acceptance Scenarios**:

1. **Given** un visitante en el Home, **When** la página carga, **Then** ve el tagline "Software Engineer: Android y Web" y una línea que declara a Android como foco y a la web como complemento al mismo nivel.
2. **Given** el Home, **When** se muestra la primera pantalla, **Then** incluye un video corto (máximo 15 s, sin sonido) de una app Android real funcionando, dentro de un marco de teléfono.
3. **Given** un visitante con preferencia de movimiento reducido, **When** carga el Home, **Then** el video no se reproduce automáticamente y se muestra su imagen fija.
4. **Given** el Home, **When** el visitante baja a los proyectos destacados, **Then** ve exactamente 3 proyectos: al menos 2 Android y 1 Web.
5. **Given** el Home, **When** el visitante lo recorre, **Then** ve una línea con el diferenciador (publicidad, SaaS y CRM, más ingeniería).
6. **Given** el Home, **When** el visitante busca cómo seguir, **Then** hay un acceso visible a Proyectos y un contacto directo por correo (`mailto:`) y LinkedIn; el acceso a "Cómo trabajo" aparece solo cuando esa página exista (Feature 003) y el acceso al formulario de Contacto cuando exista la Feature 002.

---

### User Story 2 - Explorar proyectos y filtrar por plataforma (Priority: P1)

Un reclutador quiere ver la evidencia de la plataforma que le interesa (Android o Web) y filtra la lista de proyectos.

**Why this priority**: Es la evidencia principal del portafolio y materializa el posicionamiento "Android y Web al mismo nivel".

**Independent Test**: Abrir la página de proyectos, aplicar cada filtro y recargar con la URL copiada; verificar que la lista y el filtro se conservan.

**Acceptance Scenarios**:

1. **Given** la página de proyectos, **When** el visitante elige "Android", **Then** solo ve proyectos Android; igual con "Web"; "Todos" muestra todos.
2. **Given** un filtro activo, **When** el visitante copia la URL y la abre en otra pestaña, **Then** ve el mismo filtro aplicado.
3. **Given** una tarjeta de proyecto, **When** se muestra, **Then** incluye nombre, plataforma, estado (Publicado / En desarrollo / Prototipo), resumen de una línea y stack.
4. **Given** un proyecto "En desarrollo" o "Prototipo", **When** se muestra en cualquier lugar del sitio, **Then** nunca se presenta como terminado.
5. **Given** un proyecto sin caso de estudio completo, **When** se muestra su tarjeta, **Then** no enlaza a una página de detalle, indica el problema que resuelve y el rol del autor, y ofrece al menos un link real (Play Store, demo o repositorio).

---

### User Story 3 - Leer el caso de estudio de un proyecto (Priority: P1)

Un reclutador técnico abre el detalle de un proyecto para evaluar cómo piensa Robinson, no solo qué tecnologías usa.

**Why this priority**: Es el diferenciador central ("ingeniería con criterio de negocio"). Sin casos de estudio, el sitio es una lista de logos.

**Independent Test**: Abrir el detalle de un proyecto y comprobar que las 7 secciones aparecen en orden y que los links funcionan; abrir un slug inexistente y comprobar la página 404.

**Acceptance Scenarios**:

1. **Given** un proyecto con caso de estudio, **When** se abre su detalle, **Then** se organiza en este orden: (1) Problema y contexto de negocio (para quién es, qué dolor resuelve, por qué ahora); (2) Decisión de producto (qué quedó dentro del MVP, qué fuera y por qué); (3) Demo (video o capturas de la app real); (4) Arquitectura (diagrama de capas/módulos del proyecto real); (5) Decisiones técnicas (entre 2 y 4 ADR breves: contexto → decisión → alternativa descartada → consecuencia); (6) Qué haría distinto (aprendizajes honestos); (7) Resultado y links (estado, métricas solo si son reales, Play Store / demo / repositorio).
2. **Given** un proyecto con repositorio público que contiene una spec, **When** se lee su caso de estudio, **Then** enlaza a esa spec real en el repositorio.
3. **Given** cualquier link de un proyecto, **When** el visitante lo sigue, **Then** funciona y no es un placeholder; un link roto o placeholder es un defecto.
4. **Given** un slug de proyecto inexistente, **When** el visitante lo abre, **Then** ve una página 404 con camino de vuelta a Proyectos.

---

### User Story 4 - Conocer el perfil en Sobre mí (Priority: P2)

Un visitante quiere entender qué aporta Robinson además del código: su trayectoria, su stack y su método.

**Why this priority**: Refuerza el diferenciador de negocio, pero el visitante ya puede evaluar el trabajo con las historias 1–3.

**Independent Test**: Abrir Sobre mí y verificar línea de tiempo, 3 bloques de stack, línea de método, CV descargable y links externos.

**Acceptance Scenarios**:

1. **Given** la página Sobre mí, **When** se muestra, **Then** hay una línea de tiempo: publicidad y brand strategy → SDR de SaaS (Salesforce, HubSpot, Dynamics 365) → analista CRM → ingeniería de software, y cada hito indica qué habilidad aporta hoy al desarrollo.
2. **Given** la página, **When** se muestra el stack, **Then** está en 3 bloques: Android, Web, Backend/Datos.
3. **Given** la página, **When** se lee la sección de método, **Then** hay una línea sobre Spec-Driven Development y Clean Architecture, que enlaza a "Cómo trabajo" solo cuando esa página exista (Feature 003).
4. **Given** la página, **When** el visitante busca el CV, **Then** hay un CV en PDF descargable y links a GitHub y LinkedIn.
5. **Given** todo el contenido del sitio, **When** se revisa, **Then** no aparece tecnología que el autor no domine hoy.

---

### User Story 5 - Compartir y ser descubierto (Priority: P2)

El autor quiere que los links al sitio se vean bien al compartirlos y que los buscadores lo indexen.

**Why this priority**: Amplifica el alcance, pero no cambia lo que el visitante ve una vez dentro.

**Independent Test**: Inspeccionar la metadata de cada página, pegar el link de un caso de estudio en una vista previa de enlaces y abrir las rutas de índice para buscadores.

**Acceptance Scenarios**:

1. **Given** cualquier página, **When** se comparte su link, **Then** tiene título y descripción propios y metadata de vista previa.
2. **Given** un caso de estudio, **When** se comparte su link, **Then** la imagen de vista previa muestra el nombre del proyecto y su plataforma.
3. **Given** el sitio, **When** un buscador lo rastrea, **Then** encuentra mapa del sitio e instrucciones de rastreo, y una ruta inexistente muestra una página 404 propia.

---

### User Story 6 - Identidad visual propia (Priority: P3)

El autor, con trayectoria en brand strategy, quiere que el sitio no parezca plantilla, porque la coherencia visual es parte del argumento.

**Why this priority**: Aporta diferenciación, pero el sitio es funcional sin ella.

**Independent Test**: Revisar todas las páginas y confirmar que la paleta y la tipografía son consistentes, que hay como máximo 2 familias tipográficas y que las animaciones se desactivan con movimiento reducido.

**Acceptance Scenarios**:

1. **Given** el sitio, **When** se recorren sus páginas, **Then** usa una paleta y tipografía definidas como tokens, aplicadas de forma consistente.
2. **Given** el sitio, **When** se inspeccionan las fuentes, **Then** no hay más de 2 familias tipográficas.
3. **Given** el sitio, **When** hay animaciones, **Then** son sutiles y respetan la preferencia de movimiento reducido.

---

### Edge Cases

- Un visitante pide un filtro con un valor desconocido en la URL: se muestra la lista completa ("Todos"), sin error.
- El filtro elegido no tiene proyectos: se muestra un mensaje claro con camino a "Todos", no una página vacía.
- El video del Home no carga o el navegador no lo soporta: se muestra su imagen fija y el resto del Home sigue usable.
- Conexión lenta o móvil de gama baja: el contenido principal es legible antes de que cargue el video.
- Un proyecto no tiene repositorio público o Play Store: la sección de links muestra solo los que existen; nunca un link vacío o ficticio.
- Un proyecto "En desarrollo" no tiene aún video: la sección Demo usa capturas reales. Un proyecto sin ningún material de demo real no puede tener caso de estudio (se muestra solo como tarjeta).
- Navegación solo con teclado: todos los controles, incluido el filtro, son alcanzables y tienen foco visible.
- Las páginas "Cómo trabajo" y Contacto pertenecen a otras features: hasta que existan, el Home y Sobre mí no deben enlazar a páginas inexistentes; el visitante siempre conserva un canal de contacto directo (correo y LinkedIn).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El Home MUST mostrar el tagline "Software Engineer: Android y Web" y una línea que declare a Android como foco y a la web como complemento al mismo nivel.
- **FR-002**: La primera pantalla del Home MUST incluir un video de máximo 15 s, sin sonido, de una app Android real, dentro de un marco de teléfono.
- **FR-003**: El video MUST NOT reproducirse automáticamente para visitantes con preferencia de movimiento reducido; en ese caso MUST mostrarse su imagen fija.
- **FR-004**: El Home MUST mostrar exactamente 3 proyectos destacados, con al menos 2 Android y 1 Web.
- **FR-005**: El Home MUST incluir una línea de diferenciador (publicidad, SaaS y CRM, más ingeniería), un acceso visible a Proyectos y un contacto directo por correo (`mailto:`) y LinkedIn. Los accesos a "Cómo trabajo" y al formulario de Contacto MUST mostrarse solo cuando esas páginas existan.
- **FR-006**: La página de proyectos MUST permitir filtrar por Todos / Android / Web, y el filtro activo MUST reflejarse en la URL de modo que abrirla en otra pestaña reproduzca el mismo resultado.
- **FR-007**: Cada tarjeta de proyecto MUST mostrar nombre, plataforma, estado (Publicado / En desarrollo / Prototipo), resumen de una línea y stack.
- **FR-008**: Un proyecto en estado "En desarrollo" o "Prototipo" MUST NOT presentarse como terminado en ninguna parte del sitio.
- **FR-008a**: Solo los proyectos con caso de estudio completo MUST tener página de detalle; los 3 proyectos destacados del Home MUST tenerlo siempre. Un proyecto sin caso de estudio MUST mostrarse solo como tarjeta, con problema, rol del autor y al menos un link real, sin enlace a detalle.
- **FR-009**: Cada página de detalle de proyecto MUST contener las 7 secciones del caso de estudio en el orden definido: problema y contexto de negocio, decisión de producto, demo, arquitectura, decisiones técnicas (2 a 4 ADR con contexto, decisión, alternativa descartada y consecuencia), qué haría distinto, y resultado y links.
- **FR-010**: Si el repositorio público de un proyecto contiene una spec, su caso de estudio MUST enlazar a esa spec real.
- **FR-011**: Las métricas de un proyecto MUST mostrarse solo si son reales y verificables.
- **FR-012**: Todo link de proyecto MUST funcionar; el sitio MUST NOT publicar links rotos ni placeholders.
- **FR-013**: Un slug de proyecto inexistente MUST mostrar una página 404 con camino de vuelta a Proyectos.
- **FR-014**: Sobre mí MUST incluir una línea de tiempo de trayectoria (publicidad y brand strategy → SDR de SaaS con Salesforce, HubSpot y Dynamics 365 → analista CRM → ingeniería de software), indicando por hito la habilidad que aporta hoy al desarrollo.
- **FR-015**: Sobre mí MUST presentar el stack en 3 bloques (Android, Web, Backend/Datos) y una línea de método (Spec-Driven Development, Clean Architecture). El enlace de esa línea a "Cómo trabajo" MUST mostrarse solo cuando esa página exista (Feature 003).
- **FR-016**: Sobre mí MUST ofrecer un CV en PDF descargable y links a GitHub y LinkedIn.
- **FR-017**: El sitio MUST listar solo tecnología que el autor domina hoy (Principio II de la constitución); la tecnología previa solo puede aparecer en una sección explícita de "experiencia previa".
- **FR-018**: Cada página MUST tener título y descripción propios y metadata de vista previa al compartir; los casos de estudio MUST tener una imagen de vista previa con el nombre del proyecto y su plataforma.
- **FR-019**: El sitio MUST exponer un mapa del sitio, instrucciones de rastreo para buscadores y una página 404 propia.
- **FR-020**: El sitio MUST aplicar una paleta y tipografía definidas como tokens de diseño, con un máximo de 2 familias tipográficas.
- **FR-021**: Las animaciones MUST ser sutiles y MUST desactivarse o reducirse con la preferencia de movimiento reducido.
- **FR-022**: El sitio MUST ser usable desde 360 px de ancho, cumplir accesibilidad WCAG AA (contraste, foco visible, navegación por teclado, HTML semántico, texto alternativo en imágenes) y estar en español.
- **FR-023**: Ninguna página publicada MUST contener texto de plantilla, placeholders ni proyectos ficticios presentados como propios.

### Key Entities

- **Proyecto**: Obra mostrada en el portafolio. Atributos: nombre, identificador legible en URL, plataforma (Android o Web), estado (Publicado / En desarrollo / Prototipo), resumen de una línea, problema, rol del autor, stack, links reales, indicador de destacado y, opcionalmente, su caso de estudio (obligatorio si es destacado).
- **Caso de estudio**: Contenido de detalle de un Proyecto (solo existe si está completo) con las 7 secciones ordenadas; incluye demo (video o capturas), diagrama de arquitectura, links (Play Store, demo, repositorio, spec) y una lista de ADR.
- **Decisión técnica (ADR)**: Registro breve dentro de un caso de estudio: contexto, decisión, alternativa descartada y consecuencia.
- **Hito de trayectoria**: Etapa de la línea de tiempo de Sobre mí: nombre del rol o etapa, período y habilidad que aporta hoy al desarrollo.
- **Bloque de stack**: Agrupación de tecnologías dominadas por el autor (Android, Web, Backend/Datos).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un reclutador técnico puede evaluar el trabajo real de Robinson (posicionamiento, un proyecto y su caso de estudio) en menos de 2 minutos desde que abre el Home.
- **SC-002**: Un visitante identifica en menos de 5 segundos, en la primera pantalla del Home, que el perfil es "Android y Web" con Android como foco.
- **SC-003**: Un visitante aplica el filtro por plataforma y ve el resultado en un solo paso, y el 100% de las URLs filtradas reproducen el mismo resultado al abrirse en otra pestaña.
- **SC-004**: El 100% de los casos de estudio publicados tiene las 7 secciones, al menos 2 ADR, un diagrama de arquitectura y una demo; el 100% de los links verificados funciona.
- **SC-005**: El sitio obtiene 90 o más en Rendimiento, Accesibilidad, Buenas prácticas y SEO en medición móvil, incluso con el video del Home.
- **SC-006**: Todo el sitio se puede recorrer solo con teclado y cumple contraste AA, verificado en todas las páginas.
- **SC-007**: Cada página compartida en una vista previa de enlaces muestra título, descripción e imagen propios; los casos de estudio muestran nombre y plataforma del proyecto.
- **SC-008**: Una revisión de contenido encuentra 0 placeholders, 0 textos de plantilla y 0 tecnologías fuera del stack declarado del autor.

## Assumptions

- El alcance de esta spec es solo la Feature 001; Contacto (002), "Cómo trabajo" (003), versión en inglés (004) y "Ahora construyendo" (005) tendrán sus propias specs.
- El proyecto Web destacado es el propio portafolio. Desde esta feature tiene un caso de estudio completo (las 7 secciones, al menos 2 ADR) en estado "En desarrollo", con contenido real. La Feature 003 lo amplía con el proceso SDD y la trazabilidad, sin reemplazarlo.
- Los accesos a "Cómo trabajo" y al formulario de Contacto del Home, y el enlace de método en Sobre mí, solo se publican cuando esas páginas existan; mientras tanto no se muestran, para no publicar links rotos (FR-012). Entre tanto, el contacto directo por correo y LinkedIn cubre la necesidad de contacto.
- El autor aporta el contenido real: al menos 2 proyectos Android y 1 Web con sus casos de estudio, el video de máximo 15 s, las capturas, el diagrama de arquitectura y el CV en PDF.
- El sitio está solo en español en esta feature; el idioma inglés llega con la Feature 004.
- Fuera de alcance: blog, gestor de contenidos, autenticación, panel de administración, modo oscuro, efecto de arrastrar tarjetas, animaciones 3D y desplazamiento secuestrado.
- Las decisiones técnicas (framework, almacenamiento del contenido, generación de imágenes de vista previa, formato de video) se resuelven en `/speckit-plan` contra la constitución.
