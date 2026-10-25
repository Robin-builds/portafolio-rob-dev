import type { NextConfig } from "next";

// Sin Cache Components: el plan usa `dynamicParams = false` en /proyectos/[slug],
// que no está disponible con cacheComponents activado (research.md R3).
const nextConfig: NextConfig = {};

export default nextConfig;
