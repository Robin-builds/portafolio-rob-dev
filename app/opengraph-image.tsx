import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

// Imagen Open Graph por defecto del sitio (FR-018); se genera en build
export const alt = `${profile.name} · ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
        <div style={{ fontSize: 40, opacity: 0.8 }}>{profile.name}</div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 16 }}>{profile.tagline}</div>
      </div>
    ),
    { ...size },
  );
}
