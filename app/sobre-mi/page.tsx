import type { Metadata } from "next";
import ContactLinks from "@/components/ContactLinks";
import Timeline from "@/components/Timeline";
import { profile } from "@/content/profile";
import { getAbout } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Trayectoria en publicidad, ventas de SaaS y CRM, y cómo eso se convierte en criterio de ingeniería.",
  openGraph: {
    title: "Sobre mí",
    description: "Trayectoria en publicidad, ventas de SaaS y CRM, y cómo eso se convierte en criterio de ingeniería.",
  },
};

// Sobre mí (US4). La línea de método no enlaza a /como-trabajo hasta que exista (Feature 003).
export default function AboutPage() {
  const { milestones, stackBlocks, methodLine } = getAbout();

  return (
    <div className={`container ${styles.page}`}>
      <h1>Sobre mí</h1>

      <section aria-labelledby="trayectoria">
        <h2 id="trayectoria">Trayectoria</h2>
        <Timeline milestones={milestones} />
      </section>

      <section aria-labelledby="stack">
        <h2 id="stack">Stack</h2>
        <div className={styles.blocks}>
          {stackBlocks.map((block) => (
            <div key={block.title} className={styles.block}>
              <h3>{block.title}</h3>
              <ul>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="metodo">
        <h2 id="metodo">Cómo trabajo</h2>
        <p>{methodLine}</p>
      </section>

      <section aria-labelledby="cv">
        <h2 id="cv">CV y perfiles</h2>
        <p>
          <a href={profile.cvPath} download className={styles.cv}>
            Descargar CV (PDF)
          </a>
        </p>
        <ContactLinks showGithub />
      </section>
    </div>
  );
}
