import { methodLine, milestones, stackBlocks } from "@/content/about";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import type { Platform, Project } from "@/content/types";

// Única capa entre el contenido y las páginas (abstracción declarada en plan.md):
// consultas de lectura + validación de las reglas de la spec y del Principio II.

// Modo estricto: producción en Vercel (o CONTENT_STRICT=1). Ahí cualquier regla rota
// hace fallar el build. En local y en previews el sitio funciona en "modo borrador":
// los datos faltantes se muestran como "Pendiente" y se listan en un banner (research.md R8).
export const isStrict = process.env.VERCEL_ENV === "production" || process.env.CONTENT_STRICT === "1";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// Marcadores típicos de texto de plantilla que nunca deben llegar a producción.
// Sin flag /i a propósito: "TODO" en mayúsculas es marcador, "todo" es español normal.
const PLACEHOLDER_PATTERN = /\bLorem\b|\bTODO\b|Descripci[oó]n\.\.\.|\[[^\]]*\]/;

/** Recorre recursivamente un objeto y devuelve [ruta, texto] por cada string. */
function collectStrings(value: unknown, path: string): [string, string][] {
  if (typeof value === "string") return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => collectStrings(v, `${path}[${i}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => collectStrings(v, `${path}.${k}`));
  }
  return [];
}

/** Devuelve la lista de reglas rotas del contenido (vacía si todo está bien). */
export function validateContent(): string[] {
  const errors: string[] = [];

  // Perfil: todos los textos obligatorios y al menos una fuente de video.
  // siteUrl es opcional: si falta, se usa el dominio de producción de Vercel (getSiteUrl).
  for (const [path, text] of collectStrings(profile, "profile")) {
    if (path !== "profile.siteUrl" && text.trim() === "") errors.push(`${path} está vacío`);
  }
  if (profile.heroVideo.sources.length === 0) errors.push("profile.heroVideo.sources está vacío");

  // Destacados: exactamente 3, con ≥ 2 Android y ≥ 1 Web, todos con caso de estudio
  const featured = projects.filter((p) => p.featured);
  if (featured.length !== 3) errors.push(`Debe haber exactamente 3 proyectos destacados (hay ${featured.length})`);
  if (featured.filter((p) => p.platform === "android").length < 2) errors.push("Entre los destacados debe haber al menos 2 Android");
  if (featured.filter((p) => p.platform === "web").length < 1) errors.push("Entre los destacados debe haber al menos 1 Web");

  const seen = new Set<string>();
  for (const p of projects) {
    const where = `proyecto "${p.slug}"`;
    if (!SLUG_PATTERN.test(p.slug)) errors.push(`${where}: el slug debe tener solo minúsculas, números y guiones`);
    if (seen.has(p.slug)) errors.push(`${where}: slug duplicado`);
    seen.add(p.slug);
    if (p.links.length < 1) errors.push(`${where}: necesita al menos 1 link real`);
    if (p.featured && !p.caseStudy) errors.push(`${where}: un destacado necesita caso de estudio`);
    if (p.caseStudy) {
      const { adrs, demo } = p.caseStudy;
      if (adrs.length < 2 || adrs.length > 4) errors.push(`${where}: el caso de estudio necesita entre 2 y 4 ADR (tiene ${adrs.length})`);
      if (demo.length < 1) errors.push(`${where}: el caso de estudio necesita al menos 1 demo real`);
    }
  }

  // Sobre mí: 4 hitos completos, los 3 bloques de stack exactos y la línea de método
  if (milestones.length !== 4) errors.push(`about.milestones debe tener 4 hitos (tiene ${milestones.length})`);
  const blockTitles = stackBlocks.map((b) => b.title).join(",");
  if (blockTitles !== "Android,Web,Backend/Datos") errors.push('about.stackBlocks debe ser exactamente "Android", "Web", "Backend/Datos" en ese orden');
  if (stackBlocks.some((b) => b.items.length === 0)) errors.push("about.stackBlocks tiene un bloque sin tecnologías");
  if (methodLine.trim() === "") errors.push("about.methodLine está vacío");
  for (const [path, text] of collectStrings(milestones, "about.milestones")) {
    if (text.trim() === "") errors.push(`${path} está vacío`);
  }

  // Proyectos: ningún texto vacío (campos pendientes del autor, rutas de medios, alt)
  for (const [path, text] of collectStrings(projects, "projects")) {
    if (text.trim() === "") errors.push(`${path} está vacío`);
  }

  // Textos de todo el contenido: sin marcadores de plantilla
  for (const [path, text] of collectStrings({ projects, milestones, stackBlocks, methodLine }, "content")) {
    if (PLACEHOLDER_PATTERN.test(text)) errors.push(`${path} contiene texto de plantilla: "${text}"`);
  }

  return errors;
}

/** Reglas rotas del contenido actual, para el banner del modo borrador. */
export const contentIssues = validateContent();

if (contentIssues.length > 0) {
  const report = `Contenido incompleto (ver specs/001-sitio-base-portafolio/data-model.md):\n- ${contentIssues.join("\n- ")}`;
  // Producción nunca se publica con datos faltantes (Principio II)
  if (isStrict) throw new Error(report);
}

/** URL pública del sitio: la del perfil, o el dominio de producción de Vercel, o localhost. */
export function getSiteUrl(): string {
  if (profile.siteUrl.trim()) return profile.siteUrl.replace(/\/$/, "");
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  return vercelHost ? `https://${vercelHost}` : "http://localhost:3000";
}

/** Los 3 destacados, Android primero. */
export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.platform === b.platform ? 0 : a.platform === "android" ? -1 : 1));
}

/** Todos los proyectos, o solo los de una plataforma. */
export function getProjects(platform?: Platform): Project[] {
  return platform ? projects.filter((p) => p.platform === platform) : projects;
}

/** Proyecto con caso de estudio por slug; undefined si no existe o no tiene caso de estudio. */
export function getProjectWithCaseStudy(slug: string): (Project & { caseStudy: NonNullable<Project["caseStudy"]> }) | undefined {
  const project = projects.find((p) => p.slug === slug);
  return project?.caseStudy ? (project as Project & { caseStudy: NonNullable<Project["caseStudy"]> }) : undefined;
}

/** Slugs con caso de estudio, para generateStaticParams y el sitemap. */
export function getCaseStudySlugs(): string[] {
  return projects.filter((p) => p.caseStudy).map((p) => p.slug);
}

/** Contenido de "Sobre mí". */
export function getAbout() {
  return { milestones, stackBlocks, methodLine };
}

/** Lee ?plataforma=; valor ausente, desconocido o repetido → undefined ("Todos"). */
export function parsePlatform(value: unknown): Platform | undefined {
  return value === "android" || value === "web" ? value : undefined;
}
