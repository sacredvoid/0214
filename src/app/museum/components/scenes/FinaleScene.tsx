import { MediaFrame } from "@/app/museum/components/MediaFrame";
import { MUSEUM_CONTENT } from "@/app/museum/data/museum-content";

interface FinaleSceneProps {
  accepted: boolean;
}

export function FinaleScene({ accepted }: FinaleSceneProps) {
  const content = MUSEUM_CONTENT.finale;
  const slot = content.mediaSlots[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
      <div className="space-y-5">
        <h2
          id="finale-title"
          data-anim="heading"
          className="text-3xl md:text-5xl"
          style={{ fontFamily: "var(--font-display-premium)" }}
        >
          {accepted ? "She Said Yes" : content.title}
        </h2>
        <p data-anim="copy" className="text-sm uppercase tracking-[0.18em] text-[var(--color-ivory-soft)]">
          {accepted
            ? "Next exhibit unlocked"
            : content.subtitle}
        </p>
        <p data-anim="copy" className="max-w-xl text-base text-white/80 md:text-lg">
          {accepted
            ? "NYC awaits us. Ken & Dana's. Rings. Us."
            : content.body}
        </p>
        <p data-anim="chip" className="museum-chip">
          {accepted ? "Celebration mode active" : "Complete the Grand Frame to trigger celebration"}
        </p>
      </div>

      <MediaFrame
        ratio={slot.ratio}
        label={accepted ? "Ring Chapter" : "Final Reveal"}
        alt={slot.alt}
        imageName={slot.key}
        animationAttr="frame"
        className="mx-auto w-full max-w-md"
      />
    </div>
  );
}
