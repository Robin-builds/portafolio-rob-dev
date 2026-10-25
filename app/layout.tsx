import type { Metadata } from "next";
import { Geist } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { profile } from "@/content/profile";
import "./globals.css";

// Fuente PROVISIONAL (autoalojada en build por next/font); la definitiva llega en US6 (T044).
const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Base para URLs absolutas de Open Graph; URL de Vercel mientras no haya dominio
  metadataBase: profile.siteUrl ? new URL(profile.siteUrl) : undefined,
  title: {
    default: `${profile.name} · ${profile.tagline}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.focusLine,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={sans.variable}>
      <body>
        {/* Primer foco del teclado: salta la navegación */}
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
