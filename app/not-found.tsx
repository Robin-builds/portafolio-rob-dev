import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

// 404 global (FR-019)
export default function NotFound() {
  return (
    <section className="container" style={{ paddingBlock: "var(--space-16)" }}>
      <h1>Esta página no existe</h1>
      <p>Puede que el enlace esté mal escrito o que la página se haya movido.</p>
      <p>
        <Link href="/">Volver al inicio</Link>
      </p>
    </section>
  );
}
