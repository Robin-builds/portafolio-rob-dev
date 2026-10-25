import type { MetadataRoute } from "next";
import { getCaseStudySlugs, getSiteUrl } from "@/lib/content";

// Se mantiene solo: cada proyecto con caso de estudio entra automáticamente (Principio V)
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const staticRoutes = ["", "/proyectos", "/sobre-mi"];
  const caseStudies = getCaseStudySlugs().map((slug) => `/proyectos/${slug}`);

  return [...staticRoutes, ...caseStudies].map((path) => ({ url: `${base}${path}` }));
}
