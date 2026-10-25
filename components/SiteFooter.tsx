import ContactLinks from "./ContactLinks";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <h2 className={styles.title}>Contacto</h2>
        <ContactLinks showGithub />
      </div>
    </footer>
  );
}
