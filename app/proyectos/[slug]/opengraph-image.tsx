import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { getCaseStudySlugs, getProjectWithCaseStudy } from "@/lib/content";

// Imagen Open Graph del caso de estudio: nombre del proyecto y plataforma (FR-018)
export const alt = "Caso de estudio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

// En Next 16 params llega como Promise
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectWithCaseStudy(slug);
  const name = project?.name ?? profile.name;
  const platform = project ? (project.platform === "android" ? "Android" : "Web") : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#18181b",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 36, opacity: 0.8 }}>{`Caso de estudio · ${platform}`}</div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 16 }}>{name}</div>
        <div style={{ fontSize: 32, opacity: 0.8, marginTop: 40 }}>{profile.name}</div>
      </div>
    ),
    { ...size },
  );
}
