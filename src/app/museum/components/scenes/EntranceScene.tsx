import Link from "next/link";
import { MUSEUM_CONTENT } from "@/app/museum/data/museum-content";

export function EntranceScene() {
  const content = MUSEUM_CONTENT.entrance;

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
      <div className="space-y-8">
        <p
          data-anim="eyebrow"
          className="inline-flex rounded-full border border-[var(--color-gold-soft)]/35 bg-[rgba(12,8,18,0.5)] px-4 py-2 text-[0.64rem] uppercase tracking-[0.24em] text-[var(--color-ivory-soft)]"
        >
          Grand Opening
        </p>
        <h1
          id="entrance-title"
          data-anim="heading"
          className="max-w-3xl text-5xl leading-[0.98] md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-display-premium)" }}
        >
          {content.title}
        </h1>
        <p data-anim="copy" className="max-w-2xl text-base text-[var(--color-ivory-soft)] md:text-xl">
          {content.subtitle}
        </p>
        <p data-anim="copy" className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          {content.body}
        </p>
        <div data-anim="cta" className="flex flex-wrap items-center gap-4">
          <Link href="#beginning" className="museum-button museum-button-primary">
            Begin The Tour
          </Link>
          <span className="museum-chip">Spotlit rooms • curated frames • cinematic pacing</span>
        </div>
      </div>

      <div data-anim="frame" className="museum-curator-card">
        <div className="relative space-y-7">
          <div className="museum-curator-header">
            <p className="text-[0.64rem] uppercase tracking-[0.2em] text-[var(--color-ivory-soft)]">Now Showing</p>
            <p className="mt-2 text-2xl md:text-[2rem]" style={{ fontFamily: "var(--font-display-premium)" }}>
              A Curated Exhibition of Love
            </p>
          </div>
          <div className="grid gap-3 text-sm text-white/75">
            <p>Room I: The Beginning</p>
            <p>Room II: The Nickname Gallery</p>
            <p>Room III: Days We Keep</p>
            <p>Room IV: Future Reveal</p>
            <p>Grand Frame: The Question</p>
          </div>
        </div>
      </div>
    </div>
  );
}
