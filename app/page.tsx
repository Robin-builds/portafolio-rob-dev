import type { Metadata } from "next";
import Link from "next/link";
import ContactLinks from "@/components/ContactLinks";
import { orPending } from "@/components/Pending";
import PhoneVideo from "@/components/PhoneVideo";
import ProjectCard from "@/components/ProjectCard";
import { profile } from "@/content/profile";
import { getFeaturedProjects } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: { absolute: `${profile.name} · ${profile.tagline}` },
  description: profile.focusLine,
  openGraph: {
    title: `${profile.name} · ${profile.tagline}`,
    description: profile.focusLine,
    type: "website",
    locale: "es_CL",
  },
};

// Home (US1): posicionamiento + producto en movimiento + 3 destacados + contacto directo
export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
        <div className={styles.heroText}>
          <h1 id="hero-title" className={styles.tagline}>
            {profile.tagline}
          </h1>
          <p className={styles.focus}>{orPending(profile.focusLine, "línea de foco")}</p>
          <p className={styles.differentiator}>{orPending(profile.differentiatorLine, "línea de diferenciador")}</p>
          <p>
            <Link href="/proyectos" className={styles.cta}>
              Ver proyectos
            </Link>
          </p>
        </div>
        <PhoneVideo video={profile.heroVideo} />
      </section>

      <section className="container" aria-labelledby="destacados">
        <h2 id="destacados">Proyectos destacados</h2>
        <div className={styles.grid}>
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className={`container ${styles.contact}`} aria-labelledby="contacto">
        <h2 id="contacto">¿Conversamos?</h2>
        <ContactLinks />
      </section>
    </>
  );
}
