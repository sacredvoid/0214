import { MediaFrame } from "@/app/museum/components/MediaFrame";
import { MUSEUM_CONTENT, NICKNAME_LABELS } from "@/app/museum/data/museum-content";

export function NicknamesScene() {
  const content = MUSEUM_CONTENT.nicknames;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2
          id="nicknames-title"
          data-anim="heading"
          className="text-3xl md:text-5xl"
          style={{ fontFamily: "var(--font-display-premium)" }}
        >
          {content.title}
        </h2>
        <p data-anim="copy" className="text-sm uppercase tracking-[0.18em] text-[var(--color-ivory-soft)]">
          {content.subtitle}
        </p>
        <p data-anim="copy" className="max-w-2xl text-base text-white/80 md:text-lg">
          {content.body}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {content.mediaSlots.map((slot, index) => (
          <div key={slot.key} data-anim="nickname-frame" className="space-y-3">
            <MediaFrame
              ratio={slot.ratio}
              label={NICKNAME_LABELS[index]}
              alt={slot.alt}
              imageName={slot.key}
            />
            <p className="text-center text-sm uppercase tracking-[0.16em] text-white/70">{NICKNAME_LABELS[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
