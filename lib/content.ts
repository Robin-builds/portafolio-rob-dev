import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import type { Platform, Project } from "@/content/types";

// Única capa entre el contenido y las páginas (abstracción declarada en plan.md):
// consultas de lectura + validación de las reglas de la spec y del Principio II.

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// Marcadores típicos de texto de plantilla que nunca deben llegar a producción
const PLACEHOLDER_PATTERN = /\bLorem\b|\bTODO\b|Descripci[oó]n\.\.\.|\[[^\]]*\]/i;

/** Recorre recursivamente un objeto y devuelve [ruta, texto] por cada string. */
function collectStrings(value: unknown, path: string): [string, string][] {
  if (typeof value === "string") return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => collectStrings(v, `${path}[${i}]`));
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => collectStrings(v, `${path}.${k}`));
  }
  return [];
}

/** Lanza un error con todas las reglas rotas; se ejecuta al cargar el módulo (build y dev). */
export function validateContent(): void {
  const errors: string[] = [];

  // Perfil: todos los textos obligatorios y al menos una fuente de video
  for (const [path, text] of collectStrings(profile, "profile")) {
    if (text.trim() === "") errors.push(`${path} está vacío`);
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

  // Textos de todo el contenido: sin alt vacíos ni marcadores de plantilla
  for (const [path, text] of collectStrings(projects, "projects")) {
    if (path.endsWith(".alt") && text.trim() === "") errors.push(`${path} está vacío`);
    if (PLACEHOLDER_PATTERN.test(text)) errors.push(`${path} contiene texto de plantilla: "${text}"`);
  }

  if (errors.length > 0) {
    throw new Error(`Contenido inválido (ver specs/001-sitio-base-portafolio/data-model.md):\n- ${errors.join("\n- ")}`);
  }
}

validateContent();

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

/** Lee ?plataforma=; valor ausente, desconocido o repetido → undefined ("Todos"). */
export function parsePlatform(value: unknown): Platform | undefined {
  return value === "android" || value === "web" ? value : undefined;
}
