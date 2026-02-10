import { MediaFrame } from "@/app/museum/components/MediaFrame";
import { MUSEUM_CONTENT } from "@/app/museum/data/museum-content";

export function BeginningScene() {
  const content = MUSEUM_CONTENT.beginning;
  const slot = content.mediaSlots[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
      <div className="space-y-5">
        <h2
          id="beginning-title"
          data-anim="heading"
          className="text-3xl md:text-5xl"
          style={{ fontFamily: "var(--font-display-premium)" }}
        >
          {content.title}
        </h2>
        <p data-anim="copy" className="text-sm uppercase tracking-[0.18em] text-[var(--color-ivory-soft)]">
          {content.subtitle}
        </p>
        <p data-anim="copy" className="max-w-xl text-base text-white/80 md:text-lg">
          {content.body}
        </p>
      </div>

      <MediaFrame
        ratio={slot.ratio}
        label="Cabot Hall"
        alt={slot.alt}
        imageName={slot.key}
        animationAttr="frame"
        className="mx-auto w-full max-w-md"
      />
    </div>
  );
}
