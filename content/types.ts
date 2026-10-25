// Contrato del contenido del sitio (specs/001-sitio-base-portafolio/contracts/content-schema.md).
// Agregar o editar un proyecto = editar content/projects.ts; ningún componente cambia (Principio V).

export type Platform = "android" | "web";
export type ProjectStatus = "publicado" | "en-desarrollo" | "prototipo";

export type ImageMedia = {
  kind: "image";
  src: string; // ruta bajo /public/media
  alt: string;
  width: number;
  height: number;
};

export type VideoMedia = {
  kind: "video";
  sources: { src: string; type: "video/webm" | "video/mp4" }[];
  poster: string;
  alt: string;
  width: number;
  height: number;
};

export type Media = ImageMedia | VideoMedia;

export type ProjectLink = {
  kind: "play-store" | "demo" | "repo";
  url: string; // https:// absoluta
  label: string;
};

export type Adr = {
  title: string;
  context: string;
  decision: string;
  rejectedAlternative: string;
  consequence: string;
};

export type CaseStudy = {
  businessContext: { audience: string; pain: string; whyNow: string };
  productDecision: { inScope: string[]; outOfScope: string[]; rationale: string };
  demo: Media[]; // al menos 1, validado en build
  architecture: Media;
  adrs: Adr[]; // 2 a 4, validado en build
  lessons: string[];
  metrics?: { label: string; value: string; source: string }[];
  specUrl?: string; // solo si el repo público contiene una spec
};

export type Project = {
  slug: string;
  name: string;
  platform: Platform;
  status: ProjectStatus;
  summary: string;
  problem: string;
  role: string;
  stack: string[];
  links: ProjectLink[]; // al menos 1, validado en build
  featured: boolean;
  cover?: Media;
  caseStudy?: CaseStudy; // obligatorio si featured, validado en build
};

export type Milestone = {
  role: string;
  period: string;
  tools?: string[];
  contribution: string;
};

export type StackBlock = {
  title: "Android" | "Web" | "Backend/Datos";
  items: string[];
};

export type Profile = {
  name: string;
  tagline: string;
  focusLine: string;
  differentiatorLine: string;
  heroVideo: VideoMedia;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  cvPath: string;
  siteUrl: string;
};
