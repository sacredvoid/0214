import Link from "next/link";
import { MUSEUM_CONTENT } from "@/app/museum/data/museum-content";

export function EntranceScene() {
  const content = MUSEUM_CONTENT.entrance;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
      <div className="space-y-7">
        <p
          data-anim="eyebrow"
          className="inline-flex rounded-full border border-[var(--color-gold-soft)]/35 px-4 py-2 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-ivory-soft)]"
        >
          Curated for Srusti
        </p>
        <h1
          id="entrance-title"
          data-anim="heading"
          className="max-w-3xl text-5xl leading-[1.02] md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-display-premium)" }}
        >
          {content.title}
        </h1>
        <p data-anim="copy" className="max-w-2xl text-base text-[var(--color-ivory-soft)] md:text-xl">
          {content.subtitle}
        </p>
        <p data-anim="copy" className="max-w-2xl text-sm text-white/70 md:text-base">
          {content.body}
        </p>
        <div data-anim="cta" className="flex flex-wrap items-center gap-4">
          <Link
            href="#beginning"
            className="museum-button museum-button-primary"
          >
            Begin The Tour
          </Link>
          <span className="museum-chip">Apple-like pacing • Valentine palette • Museum-first</span>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-lg rounded-[2rem] border border-white/15 bg-white/5 p-6 shadow-[var(--shadow-soft)] backdrop-blur md:p-8">
        <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(255,196,216,0.34),transparent_55%)]" />
        <div className="relative space-y-6">
          <div className="rounded-2xl border border-white/15 bg-black/30 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-ivory-soft)]">Now Showing</p>
            <p className="mt-3 text-2xl" style={{ fontFamily: "var(--font-display-premium)" }}>
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
