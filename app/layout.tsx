import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import DraftBanner from "@/components/DraftBanner";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { profile } from "@/content/profile";
import { getSiteUrl } from "@/lib/content";
import "./globals.css";

// Tipografía PROVISIONAL (2 familias, autoalojadas en build por next/font) hasta que el
// autor defina su identidad visual (T043): Space Grotesk para títulos, IBM Plex Sans para texto.
const heading = Space_Grotesk({
  variable: "--font-heading-family",
  subsets: ["latin"],
  display: "swap",
});

const body = IBM_Plex_Sans({
  variable: "--font-body-family",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  // Base para URLs absolutas de Open Graph: perfil, dominio de Vercel o localhost
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${profile.name} · ${profile.tagline}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.focusLine,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${heading.variable} ${body.variable}`}>
      <body>
        {/* Primer foco del teclado: salta la navegación */}
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <DraftBanner />
        <SiteHeader />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
