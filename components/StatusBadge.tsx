import type { ProjectStatus } from "@/content/types";
import styles from "./StatusBadge.module.css";

// Valor interno → etiqueta visible. "En desarrollo" y "Prototipo" nunca se rotulan
// como terminados (FR-008).
const LABELS: Record<ProjectStatus, string> = {
  publicado: "Publicado",
  "en-desarrollo": "En desarrollo",
  prototipo: "Prototipo",
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      <span className="visually-hidden">Estado: </span>
      {LABELS[status]}
    </span>
  );
}
