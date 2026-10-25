import { profile } from "@/content/profile";
import styles from "./ContactLinks.module.css";

type Props = {
  showGithub?: boolean;
};

// Contacto directo, siempre visible (Clarificación 1): correo + LinkedIn (+ GitHub opcional)
export default function ContactLinks({ showGithub = false }: Props) {
  return (
    <ul className={styles.list}>
      <li>
        <a href={`mailto:${profile.email}`}>Escríbeme a {profile.email}</a>
      </li>
      <li>
        <a href={profile.linkedinUrl} rel="me noopener" target="_blank">
          LinkedIn<span className="visually-hidden"> (se abre en una pestaña nueva)</span>
        </a>
      </li>
      {showGithub && (
        <li>
          <a href={profile.githubUrl} rel="me noopener" target="_blank">
            GitHub<span className="visually-hidden"> (se abre en una pestaña nueva)</span>
          </a>
        </li>
      )}
    </ul>
  );
}
