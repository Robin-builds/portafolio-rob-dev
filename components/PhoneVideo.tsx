"use client";

import { useEffect, useRef } from "react";
import type { VideoMedia } from "@/content/types";
import styles from "./PhoneVideo.module.css";

// Único componente de cliente de la feature (plan.md, Principio IV).
// El <video> NO lleva autoPlay: por defecto queda quieto mostrando el poster, y solo
// se reproduce si el visitante no pidió movimiento reducido (FR-003, research.md R4).
export default function PhoneVideo({ video }: { video: VideoMedia }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");

    // Reproduce o pausa según la preferencia actual; un fallo de play() deja el poster
    const sync = () => {
      if (motionOk.matches) {
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    };

    sync();
    // Si el visitante cambia la preferencia con la página abierta, se respeta al instante
    motionOk.addEventListener("change", sync);
    return () => motionOk.removeEventListener("change", sync);
  }, []);

  return (
    <div className={styles.frame}>
      <video
        ref={ref}
        className={styles.video}
        muted
        playsInline
        loop
        preload="metadata"
        poster={video.poster}
        width={video.width}
        height={video.height}
        aria-label={video.alt}
      >
        {video.sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
    </div>
  );
}
