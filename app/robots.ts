import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/content";

// Permite todo y apunta al sitemap (FR-019). Los previews de Vercel ya llevan noindex.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
