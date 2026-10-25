import type { Metadata } from "next";
import Link from "next/link";
import PlatformFilter from "@/components/PlatformFilter";
import ProjectCard from "@/components/ProjectCard";
import { getProjects, parsePlatform } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Proyectos Android y Web con su problema de negocio, decisiones técnicas y resultado.",
  openGraph: {
    title: "Proyectos",
    description: "Proyectos Android y Web con su problema de negocio, decisiones técnicas y resultado.",
  },
};

// En Next 16 searchParams es una Promise. Leerlo hace que la página se renderice
// por request, lo que permite que ?plataforma= funcione sin JS en el cliente.
export default async function ProjectsPage({ searchParams }: PageProps<"/proyectos">) {
  const { plataforma } = await searchParams;
  const platform = parsePlatform(plataforma); // desconocido o repetido → Todos
  const projects = getProjects(platform);

  return (
    <section className={`container ${styles.page}`}>
      <h1>Proyectos</h1>
      <PlatformFilter active={platform} />
      {projects.length > 0 ? (
        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} headingLevel="h2" />
          ))}
        </div>
      ) : (
        <p>
          Todavía no hay proyectos en esta plataforma. <Link href="/proyectos">Ver todos los proyectos</Link>
        </p>
      )}
    </section>
  );
}
