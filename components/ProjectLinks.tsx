import type { ProjectLink } from "@/content/types";
import Pending from "./Pending";
import styles from "./ProjectLinks.module.css";

// Links reales de un proyecto (Play Store, demo, repo). Compartido por la tarjeta
// sin caso de estudio y por la sección "Resultado y links" del detalle.
export default function ProjectLinks({ links }: { links: ProjectLink[] }) {
  if (links.length === 0) return <Pending label="al menos 1 link real (repo, demo o Play Store)" />;

  return (
    <ul className={styles.list}>
      {links.map((link) => (
        <li key={link.url}>
          <a href={link.url} target="_blank" rel="noopener">
            {link.label}
            <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
