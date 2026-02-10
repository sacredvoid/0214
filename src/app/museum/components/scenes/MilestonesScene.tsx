import { MediaFrame } from "@/app/museum/components/MediaFrame";
import { MILESTONE_COPY, MUSEUM_CONTENT } from "@/app/museum/data/museum-content";

export function MilestonesScene() {
  const content = MUSEUM_CONTENT.milestones;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2
          id="milestones-title"
          data-anim="heading"
          className="text-3xl md:text-5xl"
          style={{ fontFamily: "var(--font-display-premium)" }}
        >
          {content.title}
        </h2>
        <p data-anim="copy" className="text-sm uppercase tracking-[0.18em] text-[var(--color-ivory-soft)]">
          {content.subtitle}
        </p>
        <p data-anim="copy" className="max-w-3xl text-base text-white/80 md:text-lg">
          {content.body}
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {content.mediaSlots.map((slot, index) => (
          <article
            key={slot.key}
            data-anim="milestone-frame"
            className="rounded-[1.5rem] border border-white/15 bg-black/20 p-3"
          >
            <MediaFrame
              ratio={slot.ratio}
              label={`Milestone ${index + 1}`}
              alt={slot.alt}
              imageName={slot.key}
            />
            <p className="px-2 pb-2 pt-4 text-sm text-white/80">{MILESTONE_COPY[index]}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
