import type { Profile } from "./types";

// Datos reales del autor (tarea T008). Los campos vacíos hacen fallar el build
// a propósito: el sitio no se publica con datos incompletos (Principio II).
export const profile: Profile = {
  name: "Robinson Arriagada",
  tagline: "Software Engineer: Android y Web",
  focusLine: "",
  differentiatorLine: "",
  heroVideo: {
    kind: "video",
    sources: [],
    poster: "",
    alt: "",
    width: 1080,
    height: 2340,
  },
  email: "",
  linkedinUrl: "",
  githubUrl: "",
  cvPath: "",
  siteUrl: "",
};
