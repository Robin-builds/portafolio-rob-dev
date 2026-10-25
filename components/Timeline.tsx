import type { Milestone } from "@/content/types";
import styles from "./Timeline.module.css";

// Trayectoria como lista ordenada: el orden importa y los lectores de pantalla lo anuncian
export default function Timeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <ol className={styles.timeline}>
      {milestones.map((m) => (
        <li key={m.role} className={styles.item}>
          <h3 className={styles.role}>{m.role}</h3>
          <p className={styles.period}>{m.period}</p>
          {m.tools && m.tools.length > 0 && <p className={styles.tools}>{m.tools.join(" · ")}</p>}
          <p>
            <strong>Lo que aporta hoy al desarrollo:</strong> {m.contribution}
          </p>
        </li>
      ))}
    </ol>
  );
}
