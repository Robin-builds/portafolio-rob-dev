import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdrList from "@/components/AdrList";
import MediaView from "@/components/MediaView";
import Pending, { orPending } from "@/components/Pending";
import ProjectLinks from "@/components/ProjectLinks";
import StatusBadge from "@/components/StatusBadge";
import { getCaseStudySlugs, getProjectWithCaseStudy } from "@/lib/content";
import styles from "./page.module.css";

const PLATFORM_LABEL = { android: "Android", web: "Web" } as const;

// Solo se generan los proyectos con caso de estudio; cualquier otro slug da 404 (FR-013, FR-008a)
export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectWithCaseStudy(slug);
  if (!project) return {};
  const title = `${project.name} (${PLATFORM_LABEL[project.platform]})`;
  return {
    title,
    description: project.summary,
    openGraph: { title, description: project.summary, type: "article" },
  };
}

// Caso de estudio: las 7 secciones en el orden fijo de FR-009
export default async function CaseStudyPage({ params }: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const project = getProjectWithCaseStudy(slug);
  if (!project) notFound();
  const cs = project.caseStudy;

  return (
    <article className={`container ${styles.page}`}>
      <header className={styles.header}>
        <p className={styles.meta}>
          <span>{PLATFORM_LABEL[project.platform]}</span>
          <StatusBadge status={project.status} />
        </p>
        <h1>{project.name}</h1>
        <p className={styles.lead}>{project.summary}</p>
        <p className={styles.role}>
          <strong>Mi rol:</strong> {project.role}
        </p>
      </header>

      {/* 1. Problema y contexto de negocio */}
      <section aria-labelledby="problema">
        <h2 id="problema">Problema y contexto de negocio</h2>
        <dl className={styles.facts}>
          <dt>Para quién es</dt>
          <dd>{orPending(cs.businessContext.audience, "para quién es")}</dd>
          <dt>Qué dolor resuelve</dt>
          <dd>{orPending(cs.businessContext.pain, "qué dolor resuelve")}</dd>
          <dt>Por qué ahora</dt>
          <dd>{orPending(cs.businessContext.whyNow, "por qué ahora")}</dd>
        </dl>
      </section>

      {/* 2. Decisión de producto */}
      <section aria-labelledby="producto">
        <h2 id="producto">Decisión de producto</h2>
        <div className={styles.columns}>
          <div>
            <h3>Dentro del MVP</h3>
            <ul>
              {cs.productDecision.inScope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Fuera del MVP</h3>
            <ul>
              {cs.productDecision.outOfScope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <p>{cs.productDecision.rationale}</p>
      </section>

      {/* 3. Demo (siempre material real; validado en build) */}
      <section aria-labelledby="demo">
        <h2 id="demo">Demo</h2>
        <div className={styles.media}>
          {cs.demo.length > 0 ? (
            cs.demo.map((media, i) => <MediaView key={i} media={media} label="demo" />)
          ) : (
            <Pending label="al menos 1 captura o video real" block />
          )}
        </div>
      </section>

      {/* 4. Arquitectura */}
      <section aria-labelledby="arquitectura">
        <h2 id="arquitectura">Arquitectura</h2>
        <MediaView media={cs.architecture} label="diagrama de arquitectura" />
      </section>

      {/* 5. Decisiones técnicas */}
      <section aria-labelledby="decisiones">
        <h2 id="decisiones">Decisiones técnicas</h2>
        <AdrList adrs={cs.adrs} />
      </section>

      {/* 6. Qué haría distinto */}
      <section aria-labelledby="aprendizajes">
        <h2 id="aprendizajes">Qué haría distinto</h2>
        <ul>
          {cs.lessons.map((lesson) => (
            <li key={lesson}>{lesson}</li>
          ))}
        </ul>
      </section>

      {/* 7. Resultado y links (métricas solo si existen y tienen fuente) */}
      <section aria-labelledby="resultado">
        <h2 id="resultado">Resultado y links</h2>
        <p>
          Estado: <StatusBadge status={project.status} />
        </p>
        {cs.metrics && cs.metrics.length > 0 && (
          <dl className={styles.facts}>
            {cs.metrics.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>
                  {m.value} <span className={styles.source}>(fuente: {m.source})</span>
                </dd>
              </div>
            ))}
          </dl>
        )}
        <ProjectLinks links={project.links} />
        {cs.specUrl && (
          <p>
            <a href={cs.specUrl} target="_blank" rel="noopener">
              Ver la spec del proyecto<span className="visually-hidden"> (se abre en una pestaña nueva)</span>
            </a>
          </p>
        )}
      </section>
    </article>
  );
}
