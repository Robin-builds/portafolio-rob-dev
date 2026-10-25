import Image from "next/image";
import type { Media } from "@/content/types";
import Pending from "./Pending";

type Props = {
  media: Media;
  label?: string; // qué es, para la marca "Pendiente" si falta el archivo
  sizes?: string;
};

// Imagen con next/image (Principio VII) o video con controles. El video de los casos
// de estudio no se reproduce solo: preload="none" para no pesar en la carga inicial.
export default function MediaView({ media, label = "imagen", sizes = "(min-width: 48rem) 45rem, 100vw" }: Props) {
  if (media.kind === "image") {
    if (!media.src) return <Pending label={label} block />;
    return <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes={sizes} />;
  }

  if (media.sources.length === 0) return <Pending label={label} block />;

  return (
    <video
      controls
      muted
      playsInline
      preload="none"
      poster={media.poster || undefined}
      width={media.width}
      height={media.height}
      aria-label={media.alt}
    >
      {media.sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
