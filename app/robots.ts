import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

// Permite todo y apunta al sitemap (FR-019)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${profile.siteUrl.replace(/\/$/, "")}/sitemap.xml`,
  };
}
