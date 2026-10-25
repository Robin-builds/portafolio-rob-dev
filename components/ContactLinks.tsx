import { profile } from "@/content/profile";
import Pending from "./Pending";
import styles from "./ContactLinks.module.css";

type Props = {
  showGithub?: boolean;
};

// Contacto directo, siempre visible (Clarificación 1): correo + LinkedIn (+ GitHub opcional)
export default function ContactLinks({ showGithub = false }: Props) {
  return (
    <ul className={styles.list}>
      <li>
        {profile.email ? (
          <a href={`mailto:${profile.email}`}>Escríbeme a {profile.email}</a>
        ) : (
          <Pending label="email" />
        )}
      </li>
      <li>
        {profile.linkedinUrl ? (
          <a href={profile.linkedinUrl} rel="me noopener" target="_blank">
            LinkedIn<span className="visually-hidden"> (se abre en una pestaña nueva)</span>
          </a>
        ) : (
          <Pending label="LinkedIn" />
        )}
      </li>
      {showGithub && (
        <li>
          {profile.githubUrl ? (
            <a href={profile.githubUrl} rel="me noopener" target="_blank">
              GitHub<span className="visually-hidden"> (se abre en una pestaña nueva)</span>
            </a>
          ) : (
            <Pending label="GitHub" />
          )}
        </li>
      )}
    </ul>
  );
}
