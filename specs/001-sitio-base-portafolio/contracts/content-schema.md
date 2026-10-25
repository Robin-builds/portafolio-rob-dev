# Contract: Esquema del contenido (`content/types.ts`)

**Feature**: 001-sitio-base-portafolio

Contrato entre el contenido que edita el autor y las páginas. Agregar un proyecto = agregar un objeto
`Project` a `content/projects.ts`; ningún componente cambia (Principio V). Reglas de validación en
[data-model.md](../data-model.md).

```ts
export type Platform = "android" | "web";
export type ProjectStatus = "publicado" | "en-desarrollo" | "prototipo";

export type Media =
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  | {
      kind: "video";
      sources: { src: string; type: "video/webm" | "video/mp4" }[];
      poster: string;
      alt: string;
      width: number;
      height: number;
    };

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
  heroVideo: Extract<Media, { kind: "video" }>;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  cvPath: string;
  siteUrl: string;
};
```

## Funciones expuestas por `lib/content.ts`

| Función | Devuelve |
|---|---|
| `getFeaturedProjects()` | Los 3 destacados, Android primero |
| `getProjects(platform?: Platform)` | Todos o filtrados |
| `getProjectWithCaseStudy(slug)` | Proyecto con `caseStudy` o `undefined` |
| `getCaseStudySlugs()` | Slugs para `generateStaticParams` y sitemap |
| `parsePlatform(value: unknown)` | `Platform` \| `undefined` (valor desconocido → `undefined`) |
| `validateContent()` | `void`; lanza error si se rompe una regla **[build]** |
