import type { Adr } from "@/content/types";
import { orPending } from "./Pending";
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
            <dd>{orPending(adr.context, "contexto")}</dd>
            <dt>Decisión</dt>
            <dd>{orPending(adr.decision, "decisión")}</dd>
            <dt>Alternativa descartada</dt>
            <dd>{orPending(adr.rejectedAlternative, "alternativa descartada")}</dd>
            <dt>Consecuencia</dt>
            <dd>{orPending(adr.consequence, "consecuencia")}</dd>
          </dl>
        </li>
      ))}
    </ol>
  );
}
