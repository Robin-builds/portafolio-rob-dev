import type { Media, Project } from "./types";

// Proyectos del portafolio (T020). Los campos marcados PENDIENTE están vacíos a propósito:
// el build falla y lista cada uno hasta que tengan dato real (Principio II).

// Medio pendiente: el autor aporta el archivo (demo o diagrama) en public/media/
const PENDING_MEDIA: Media = { kind: "image", src: "", alt: "", width: 1600, height: 900 };

export const projects: Project[] = [
  {
    slug: "storeflow",
    name: "StoreFlow",
    platform: "android",
    status: "en-desarrollo", // prueba cerrada en Play desde el 06/10/2026, no está en producción
    summary: "Inventario multi-bodega offline para pymes chilenas, con app Android y dashboard web.",
    problem:
      "Minimarkets, ferreterías, distribuidoras y bodegas llevan el stock en cuadernos, planillas Excel o sistemas antiguos que no se integran con nada.",
    role: "Diseño de producto, arquitectura y desarrollo de la app Android y del dashboard web.",
    stack: [
      "Kotlin",
      "Jetpack Compose",
      "Clean Architecture",
      "MVVM",
      "Hilt",
      "Room",
      "WorkManager",
      "Supabase (Auth, Postgres)",
      "Next.js",
      "TypeScript",
      "Vercel",
      "Firebase Crashlytics",
    ],
    links: [{ kind: "repo", url: "https://github.com/Robin-builds/storeflow", label: "Repositorio" }],
    featured: true,
    caseStudy: {
      businessContext: {
        audience:
          "Pymes chilenas (minimarkets, ferreterías, distribuidoras y bodegas), con contadores y distribuidores como canal de llegada.",
        pain: "El stock vive en cuadernos, planillas o sistemas antiguos sin integración, así que no hay una cifra confiable de lo que hay en bodega.",
        whyNow: "", // PENDIENTE: no está documentado
      },
      productDecision: {
        inScope: [
          "Login y registro de empresa con Supabase Auth",
          "Productos y movimientos de stock inmutables (el stock siempre se calcula desde los movimientos)",
          "Varias bodegas",
          "Roles ADMIN y OPERADOR, con gestión de usuarios por el ADMIN",
          "Funcionamiento sin conexión con sincronización al volver",
          "Atributos personalizados de producto (solo texto)",
          "Escáner QR y de código de barras",
          "Alertas de quiebre de stock e historial global de movimientos",
          "Dashboard web de solo lectura",
        ],
        outOfScope: [
          "Trazabilidad por lote con vencimiento (FEFO): diseñada, no implementada",
          "Órdenes de compra: en diseño",
          "Proveedores: se intentó y se revirtió porque falta definir su relación con los productos",
          "Importación CSV en la web: retirada",
          "Movimientos desde la web: la web es solo de lectura",
          "Atributos de tipo número y fecha: existen en el código, sin pantalla",
        ],
        rationale:
          "Se priorizó un ciclo de stock confiable (movimientos inmutables, offline, multi-bodega) y se dejó fuera lo que dependía de decisiones de modelo aún abiertas, como la relación producto–proveedor.",
      },
      demo: [], // PENDIENTE: al menos 1 captura o video real
      architecture: PENDING_MEDIA, // PENDIENTE: diagrama de capas/módulos
      adrs: [
        {
          title: "Room como fuente local y Supabase como remoto",
          context: "La app debe operar sin conexión y sincronizar al volver.",
          decision:
            "Toda escritura va primero a Room, se encola en sync_queue y WorkManager la sube; los conflictos se resuelven con última escritura gana.",
          rejectedAlternative: "", // PENDIENTE: no está documentada
          consequence:
            "Las llaves foráneas de Room van apagadas (PRAGMA foreign_keys = OFF) porque provocaban el error 787, y la integridad la garantiza Supabase. La cola reintenta hasta 3 veces y el stock nunca se guarda: se calcula sumando movimientos.",
        },
        {
          title: "Un solo proyecto Supabase para Android y web",
          context: "La app Android y el dashboard web leen los mismos datos.",
          decision:
            "Ambos clientes comparten un único proyecto Supabase; la web es de solo lectura para no romper la regla de movimientos inmutables.",
          rejectedAlternative: "", // PENDIENTE: no está documentada
          consequence:
            "El contrato compartido (PUENTE.md) se mantiene a mano y debe quedar idéntico en los dos repos. Con más de 1.000 productos, la web mostraba conteos truncados sin error por el límite por defecto de filas de Supabase; se resolvió con vistas y paginación en el servidor.",
        },
        {
          title: "Migración de Supabase a otra organización",
          context: "El proyecto se movió a otra organización el 08/08/2026.",
          decision:
            "Se copiaron tablas, RLS, políticas y funciones con postgres_fdw, y los usuarios de login (auth.users) se migraron después con sus contraseñas.",
          rejectedAlternative: "", // PENDIENTE: no está documentada
          consequence:
            "Se migraron 10 tablas, 3 funciones y unas 20.111 filas sin pérdida; una cuenta necesitó arreglo manual. Las variables de entorno de la web en Vercel siguieron apuntando al proyecto viejo unas dos semanas, hasta detectarlo el 22/08.",
        },
      ],
      lessons: [
        "Respaldaría el keystore desde el día 1: perderlo obligó a abandonar la ficha de Play y crear otra con un applicationId nuevo.",
        "Después de migrar la base, revisaría la configuración de todos los clientes, incluida la web en Vercel, el mismo día.",
        "Revisaría la configuración de Play antes de invitar testers: la app estaba como de pago, a los testers se les cobraba, y pasarla a gratuita no tiene vuelta atrás.",
      ],
      // metrics: sin dato vigente con fuente
      // specUrl: no hay spec pública
    },
  },
  {
    slug: "repartija",
    name: "Repartija",
    platform: "android",
    status: "en-desarrollo", // Fase 1 implementada; falta validación en calle con GPS real
    summary: "Detección automática de paradas y retorno en rutas de reparto, offline, para pymes.",
    problem:
      "En pymes con reparto propio, el dueño no sabe a qué hora llegó el repartidor a cada cliente ni cuándo volvió, y pedirle que marque cada paso no funciona.",
    role: "Diseño de producto, especificación, arquitectura y desarrollo Android.",
    stack: [
      "Kotlin",
      "Jetpack Compose",
      "Material 3",
      "Navigation Compose",
      "MVVM",
      "Hilt",
      "Room",
      "Fused Location Provider",
      "Maps Compose",
      "Coroutines y Flow",
      "WorkManager",
      "JUnit4",
      "Turbine",
    ],
    links: [], // PENDIENTE: repo público o video de la demo (al menos 1)
    featured: true,
    caseStudy: {
      businessContext: {
        audience: "Pymes que reparten con vehículos propios, sus dueños y sus repartidores.",
        pain: "El dueño no tiene registro de salida, llegada y retorno por cliente, porque el reporte manual del repartidor se olvida o llega tarde.",
        whyNow: "", // PENDIENTE: no está documentado
      },
      productDecision: {
        inScope: [
          "Configuración de la base y de paradas reutilizables",
          "Planificación de rutas por fecha, con edición y cancelación antes de iniciar",
          "Detección automática de salida, llegada y salida de cada parada (en cualquier orden) y retorno a la base",
          "Marcado manual, salto de parada con motivo y registro cronológico de eventos",
          "Recuperación tras cierre de la app, reinicio, GPS apagado o permisos revocados",
          "Funcionamiento completo sin conexión",
          "Consentimiento previo, notificación visible, sin ubicación en segundo plano y borrado de puntos GPS a los 30 días",
        ],
        outOfScope: [
          "Cuentas, organizaciones, roles y sincronización con Supabase (Fase 2)",
          "Avisos al administrador, mapa en vivo y reportes (Fase 3)",
          "Prueba de entrega y link de seguimiento para el cliente final (Fase 4)",
        ],
        rationale:
          "El riesgo principal era el detector: si no detecta bien llegada y salida, lo demás no sirve. La Fase 1 lo valida en un solo dispositivo, sin cuentas ni backend, y la constitución del proyecto no permite iniciar una fase sin cerrar la anterior.",
      },
      demo: [], // PENDIENTE: al menos 1 captura o video real
      architecture: PENDING_MEDIA, // PENDIENTE: diagrama de capas/módulos
      adrs: [
        {
          title: "Detector propio en vez de la Geofencing API",
          context:
            "La detección necesita permanencia mínima, histéresis, confirmación por varias muestras y paradas fuera de orden.",
          decision:
            "RouteStateMachine, una función pura sin dependencias de Android, probada en la JVM con trazas GPS simuladas.",
          rejectedAlternative:
            "Geofencing API de Google: no expresa esas reglas y suele exigir ubicación en segundo plano.",
          consequence:
            "Los 14 casos del contrato del detector se prueban sin salir a la calle. Radio de 50 m, permanencia de 60 s y precisión máxima de 30 m son hipótesis iniciales que aún hay que calibrar con rutas reales.",
        },
        {
          title: "Estado de la ruta y del detector en Room",
          context: "Android puede matar el proceso en mitad de una ruta.",
          decision: "El estado del detector se guarda junto con los eventos en una sola transacción.",
          rejectedAlternative:
            "Reconstruir el estado desde los eventos (lento y frágil) o mantenerlo solo en memoria (se pierde si matan el proceso).",
          consequence: "Cualquier cambio en DetectorState obliga a versionar su JSON o a migrar la base.",
        },
      ],
      lessons: [
        "Modelar la lógica sensible al ruido del GPS como una máquina de estados pura permite probar casos difíciles, como rebotes en el borde del radio o señal mala, sin salir a la calle.",
        "En Android, que el sistema mate el proceso es normal: guardar el estado en cada paso, de forma transaccional, es lo que hace fiable una app de tracking.",
        "Pedir permisos de ubicación de forma transparente y mínima es un requisito de producto y de Google Play, no un detalle técnico.",
      ],
      metrics: [
        { label: "Tests unitarios (JVM)", value: "85 de 85 pasan", source: "./gradlew testDebugUnitTest, 24 oct 2026" },
        {
          label: "Tests instrumentados",
          value: "22 de 22 pasan en moto g(60), Android 12",
          source:
            "specs/001-route-cycle-detection/validation.md, 16 oct 2026 (no re-ejecutados tras cambios posteriores)",
        },
      ],
      // specUrl: la spec existe solo en local; se agrega si se publica el repo
    },
  },
  {
    // BORRADOR PARA REVISIÓN DEL AUTOR: redactado desde specs/001-sitio-base-portafolio
    // (spec.md, research.md) y lo ocurrido al implementarlo. Ajustar la voz y confirmar.
    slug: "portafolio",
    name: "Este portafolio",
    platform: "web",
    status: "en-desarrollo",
    summary: "Portafolio hecho con Spec-Driven Development: cada decisión se puede seguir de la spec al código.",
    problem:
      "Un portafolio típico muestra capturas y logos, pero no deja evaluar cómo piensa quien lo hizo ni cómo toma decisiones técnicas.",
    role: "Especificación, diseño y desarrollo completo.",
    stack: ["Next.js (App Router)", "TypeScript", "CSS Modules", "Vercel", "Spec Kit"],
    // URL del repo que se crea en T006; responde una vez creado y publicado
    links: [{ kind: "repo", url: "https://github.com/Robin-builds/portafolio-rob-dev", label: "Repositorio" }],
    featured: true,
    caseStudy: {
      businessContext: {
        audience: "Reclutadores técnicos y equipos que contratan desarrolladores Android y web, en Chile y en remoto.",
        pain: "Evaluar a un candidato por su portafolio cuesta: se ven resultados, pero no el criterio, el proceso ni la honestidad sobre lo que está terminado.",
        whyNow: "La búsqueda profesional incluye el mercado remoto, donde el portafolio es la primera evidencia que se revisa.",
      },
      productDecision: {
        inScope: [
          "Home con posicionamiento, video de una app Android real y 3 proyectos destacados",
          "Lista de proyectos con filtro Todos / Android / Web que se conserva en la URL",
          "Casos de estudio con problema de negocio, decisiones técnicas (ADR) y aprendizajes",
          "Página Sobre mí con trayectoria, stack y CV",
          "Metadata, imágenes para compartir, sitemap y accesibilidad WCAG AA",
        ],
        outOfScope: [
          "Blog y gestor de contenidos",
          "Autenticación y panel de administración",
          "Modo oscuro",
          "Animaciones 3D y desplazamiento secuestrado",
        ],
        rationale:
          "La tesis del sitio es competir por evidencia de criterio, no por diseño llamativo: todo lo que cuesta accesibilidad o rendimiento sin probar nada sobre ingeniería quedó fuera.",
      },
      demo: [], // PENDIENTE: captura real del sitio (se puede tomar del preview en Vercel)
      architecture: {
        kind: "image",
        src: "/media/portafolio-arquitectura.svg",
        alt: "Diagrama de arquitectura: el navegador pide páginas a Vercel; Next.js renderiza en el servidor las rutas de app/, que usan components/ (solo el video es componente de cliente) y leen el contenido tipado de content/ a través de lib/content.ts, que lo valida.",
        width: 1600,
        height: 900,
      },
      adrs: [
        {
          title: "Filtro por plataforma en la URL",
          context: "Un reclutador debe poder compartir la vista filtrada de proyectos.",
          decision: "El filtro es un parámetro ?plataforma= que se lee en el servidor; las opciones son links sin JavaScript.",
          rejectedAlternative: "Estado en el cliente con useSearchParams: agrega JavaScript sin ningún beneficio para el visitante.",
          consequence: "La página de proyectos se renderiza por request; a cambio, funciona con teclado y sin JavaScript.",
        },
        {
          title: "Contenido tipado y validado al compilar",
          context: "Las reglas del contenido (3 destacados, 2 a 4 ADR, sin texto de relleno) tenían que cumplirse siempre.",
          decision: "Los proyectos son objetos TypeScript y una validación se ejecuta en cada build; si una regla se rompe, el build falla.",
          rejectedAlternative: "Un CMS o un framework de tests: suman dependencias para un sitio de pocas páginas.",
          consequence: "Agregar un proyecto no toca componentes, y es imposible publicar contenido incompleto.",
        },
        {
          title: "Video del Home sin autoplay",
          context: "El video debe respetar la preferencia de movimiento reducido del visitante.",
          decision: "El video no lleva autoPlay; un componente mínimo lo reproduce solo si el visitante no pidió reducir el movimiento.",
          rejectedAlternative: "autoPlay y pausarlo con JavaScript: el video alcanza a moverse antes de pausarse.",
          consequence: "Es el único componente de cliente del sitio; el resto se renderiza en el servidor.",
        },
      ],
      lessons: [
        "Revisaría la configuración que genera el scaffold antes de diseñar sobre ella: activó Cache Components por defecto, incompatible con una decisión ya tomada en el plan.",
        "Probaría temprano cómo el framework elige la página 404: con rutas estáticas cerradas usa la global, no la del segmento.",
      ],
      // specUrl: se agrega cuando la spec esté publicada en main
    },
  },
];
