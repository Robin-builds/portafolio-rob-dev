import type { ReactNode } from "react";
import styles from "./Pending.module.css";

// Marca visible de un dato que el autor aún no entrega. Solo aparece en modo borrador
// (local y previews): en producción el build falla antes de llegar aquí.
export default function Pending({ label, block = false }: { label: string; block?: boolean }) {
  const Tag = block ? "div" : "span";
  return <Tag className={block ? styles.block : styles.inline}>Pendiente: {label}</Tag>;
}

/** Devuelve el texto, o una marca "Pendiente" si está vacío. */
export function orPending(value: string | undefined, label: string): ReactNode {
  return value && value.trim() ? value : <Pending label={label} />;
}
