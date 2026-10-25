import Link from "next/link";
import { profile } from "@/content/profile";
import styles from "./SiteHeader.module.css";

// Sin links a /como-trabajo ni al formulario hasta que existan (Clarificación 1).
// Es Server Component: no conoce la ruta activa, así que no marca aria-current
// (la spec no lo exige en la navegación principal; sí en el filtro de proyectos).
export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          {profile.name}
        </Link>
        <nav aria-label="Principal">
          <ul className={styles.nav}>
            <li>
              <Link href="/proyectos">Proyectos</Link>
            </li>
            <li>
              <Link href="/sobre-mi">Sobre mí</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
