import Link from "next/link";
import type { Platform } from "@/content/types";
import styles from "./PlatformFilter.module.css";

const OPTIONS: { label: string; href: string; value: Platform | undefined }[] = [
  { label: "Todos", href: "/proyectos", value: undefined },
  { label: "Android", href: "/proyectos?plataforma=android", value: "android" },
  { label: "Web", href: "/proyectos?plataforma=web", value: "web" },
];

// Filtro sin JavaScript: cada opción es un link, así la URL es compartible (FR-006)
export default function PlatformFilter({ active }: { active: Platform | undefined }) {
  return (
    <nav aria-label="Filtrar por plataforma">
      <ul className={styles.list}>
        {OPTIONS.map((option) => (
          <li key={option.label}>
            <Link
              href={option.href}
              className={styles.option}
              aria-current={option.value === active ? "page" : undefined}
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
