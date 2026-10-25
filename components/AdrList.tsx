import type { Adr } from "@/content/types";
import styles from "./AdrList.module.css";

// Decisiones técnicas en formato ADR breve: contexto → decisión → alternativa → consecuencia
export default function AdrList({ adrs }: { adrs: Adr[] }) {
  return (
    <ol className={styles.list}>
      {adrs.map((adr) => (
        <li key={adr.title} className={styles.adr}>
          <h3 className={styles.title}>{adr.title}</h3>
          <dl className={styles.fields}>
            <dt>Contexto</dt>
            <dd>{adr.context}</dd>
            <dt>Decisión</dt>
            <dd>{adr.decision}</dd>
            <dt>Alternativa descartada</dt>
            <dd>{adr.rejectedAlternative}</dd>
            <dt>Consecuencia</dt>
            <dd>{adr.consequence}</dd>
          </dl>
        </li>
      ))}
    </ol>
  );
}
