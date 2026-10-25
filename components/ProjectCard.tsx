import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { orPending } from "./Pending";
import ProjectLinks from "./ProjectLinks";
import StatusBadge from "./StatusBadge";
import styles from "./ProjectCard.module.css";

const PLATFORM_LABEL = { android: "Android", web: "Web" } as const;

type Props = {
  project: Project;
  headingLevel?: "h2" | "h3";
};

// Tarjeta de proyecto (FR-007). Con caso de estudio, el nombre enlaza al detalle;
// sin él, la tarjeta muestra problema, rol y links reales (FR-008a, Principio II).
export default function ProjectCard({ project, headingLevel = "h3" }: Props) {
  const Heading = headingLevel;
  const hasCaseStudy = Boolean(project.caseStudy);

  return (
    <article className={styles.card}>
      {project.cover?.kind === "image" && project.cover.src && (
        <Image
          className={styles.cover}
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          sizes="(min-width: 64rem) 22rem, (min-width: 40rem) 45vw, 100vw"
        />
      )}
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.platform}>{PLATFORM_LABEL[project.platform]}</span>
          <StatusBadge status={project.status} />
        </div>
        <Heading className={styles.title}>
          {hasCaseStudy ? <Link href={`/proyectos/${project.slug}`}>{project.name}</Link> : project.name}
        </Heading>
        <p className={styles.summary}>{orPending(project.summary, "resumen")}</p>
        {!hasCaseStudy && (
          <dl className={styles.facts}>
            <dt>Problema</dt>
            <dd>{orPending(project.problem, "problema")}</dd>
            <dt>Mi rol</dt>
            <dd>{orPending(project.role, "rol")}</dd>
          </dl>
        )}
        <ul className={styles.stack} aria-label="Stack">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        {!hasCaseStudy && <ProjectLinks links={project.links} />}
      </div>
    </article>
  );
}
