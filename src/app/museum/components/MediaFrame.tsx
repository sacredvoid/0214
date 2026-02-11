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
      className={`museum-frame group relative ${ratioClasses[ratio]} ${className}`}
      data-anim={animationAttr}
    >
      <span aria-hidden="true" className="museum-frame-wire" />
      <div className="museum-frame-ornate">
        <div className="museum-frame-mat">
          <div className="museum-frame-art">
            <Image
              src={`/museum/${imageName}.svg`}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.24),transparent_48%),linear-gradient(150deg,rgba(255,240,227,0.12),rgba(14,10,20,0.52)_62%,rgba(14,10,20,0.78))]" />
          </div>
        </div>
      </div>
      <figcaption className="museum-frame-plaque">
        {label}
      </figcaption>
    </figure>
  );
}
