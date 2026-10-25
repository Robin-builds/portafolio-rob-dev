import { contentIssues, isStrict } from "@/lib/content";
import styles from "./DraftBanner.module.css";

// Banner del modo borrador: dice cuántos datos faltan y los lista. Sirve de lista de
// pendientes del autor. Nunca se renderiza en producción.
export default function DraftBanner() {
  if (isStrict || contentIssues.length === 0) return null;

  return (
    <aside className={styles.banner} aria-label="Modo borrador">
      <details>
        <summary>
          Modo borrador: {contentIssues.length} {contentIssues.length === 1 ? "dato pendiente" : "datos pendientes"}
        </summary>
        <ul className={styles.list}>
          {contentIssues.map((issue) => (
            <li key={issue}>{issue}</li>
          ))}
        </ul>
      </details>
    </aside>
  );
}
