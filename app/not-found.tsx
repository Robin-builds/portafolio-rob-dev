import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

// 404 global (FR-019). También atiende los slugs de proyecto inexistentes: con
// dynamicParams = false Next usa este archivo y no un not-found del segmento,
// por eso ofrece el camino de vuelta a Proyectos (FR-013).
export default function NotFound() {
  return (
    <section className="container" style={{ paddingBlock: "var(--space-16)" }}>
      <h1>Esta página no existe</h1>
      <p>Puede que el enlace esté mal escrito o que la página se haya movido.</p>
      <ul>
        <li>
          <Link href="/proyectos">Ver todos los proyectos</Link>
        </li>
        <li>
          <Link href="/">Volver al inicio</Link>
        </li>
      </ul>
    </section>
  );
}
