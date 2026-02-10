import Image from "next/image";
import type { MediaRatio } from "@/app/museum/data/museum-content";

interface MediaFrameProps {
  ratio: MediaRatio;
  label: string;
  alt: string;
  imageName?: string;
  animationAttr?: string;
  className?: string;
}

const ratioClasses: Record<MediaRatio, string> = {
  "4:5": "aspect-[4/5]",
  "16:9": "aspect-[16/9]",
  "1:1": "aspect-square",
};

export function MediaFrame({
  ratio,
  label,
  alt,
  imageName = "placeholder-frame",
  animationAttr,
  className = "",
}: MediaFrameProps) {
  return (
    <figure
      className={`museum-frame group relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-black/25 shadow-[var(--shadow-soft)] ${ratioClasses[ratio]} ${className}`}
      data-anim={animationAttr}
    >
      <Image
        src={`/museum/${imageName}.svg`}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.26),transparent_46%),linear-gradient(160deg,rgba(255,214,226,0.18),rgba(15,9,22,0.4)_55%,rgba(15,9,22,0.8))]" />
      <figcaption className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-ivory)]">
        {label}
      </figcaption>
    </figure>
  );
}
