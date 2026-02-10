import { MediaFrame } from "@/app/museum/components/MediaFrame";
import { MUSEUM_CONTENT } from "@/app/museum/data/museum-content";

export function FutureScene() {
  const content = MUSEUM_CONTENT.future;
  const slot = content.mediaSlots[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
      <MediaFrame
        ratio={slot.ratio}
        label="NYC Reveal"
        alt={slot.alt}
        imageName={slot.key}
        animationAttr="frame"
      />

      <div className="space-y-4">
        <h2
          id="future-title"
          data-anim="heading"
          className="text-3xl md:text-5xl"
          style={{ fontFamily: "var(--font-display-premium)" }}
        >
          {content.title}
        </h2>
        <p data-anim="copy" className="text-sm uppercase tracking-[0.18em] text-[var(--color-ivory-soft)]">
          {content.subtitle}
        </p>
        <p data-anim="copy" className="text-base text-white/80 md:text-lg">
          {content.body}
        </p>
        <p data-anim="chip" className="museum-chip">
          P.S. Pack your bags. Ring-shopping chapter unlocks in New York City.
        </p>
      </div>
    </div>
  );
}
