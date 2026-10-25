import Image from "next/image";
import type { Media } from "@/content/types";

type Props = {
  media: Media;
  sizes?: string;
};

// Imagen con next/image (Principio VII) o video con controles. El video de los casos
// de estudio no se reproduce solo: preload="none" para no pesar en la carga inicial.
export default function MediaView({ media, sizes = "(min-width: 48rem) 45rem, 100vw" }: Props) {
  if (media.kind === "image") {
    return <Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes={sizes} />;
  }

  return (
    <video
      controls
      muted
      playsInline
      preload="none"
      poster={media.poster}
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
