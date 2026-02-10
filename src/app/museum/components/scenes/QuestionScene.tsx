import { useMemo } from "react";
import { MUSEUM_CONTENT } from "@/app/museum/data/museum-content";

interface QuestionSceneProps {
  accepted: boolean;
  noAttempts: number;
  noOffset: { x: number; y: number };
  onAccept: () => void;
  onNoHover: () => void;
}

const NO_LINES = [
  "Nice try.",
  "That one keeps moving.",
  "Still no.",
  "Wrong frame.",
  "Only one good answer here.",
];

export function QuestionScene({
  accepted,
  noAttempts,
  noOffset,
  onAccept,
  onNoHover,
}: QuestionSceneProps) {
  const content = MUSEUM_CONTENT.question;

  const noMessage = useMemo(() => {
    if (noAttempts === 0) {
      return "Pointer users get a playful challenge.";
    }

    return NO_LINES[(noAttempts - 1) % NO_LINES.length];
  }, [noAttempts]);

  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] border border-[var(--color-gold-soft)]/40 bg-[rgba(13,9,19,0.55)] p-8 text-center shadow-[var(--shadow-soft)] backdrop-blur lg:p-12">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-ivory-soft)]">{content.title}</p>
      <h2
        id="question-title"
        data-anim="heading"
        className="mt-4 text-4xl md:text-6xl"
        style={{ fontFamily: "var(--font-display-premium)" }}
      >
        {content.body}
      </h2>
      <p data-anim="copy" className="mx-auto mt-5 max-w-2xl text-base text-white/80 md:text-lg">
        {content.subtitle}
      </p>

      <div
        data-anim="buttons"
        className="relative mt-9 flex min-h-[7rem] flex-wrap items-center justify-center gap-4"
      >
        <button
          type="button"
          onClick={onAccept}
          className="museum-button museum-button-primary"
        >
          Yes, absolutely
        </button>

        <button
          type="button"
          onPointerEnter={onNoHover}
          onMouseMove={onNoHover}
          className="museum-button museum-button-secondary"
          style={{ transform: `translate(${noOffset.x}px, ${noOffset.y}px)` }}
          aria-label="Playful no button"
        >
          No
        </button>
      </div>

      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--color-ivory-soft)]">{noMessage}</p>
      {accepted ? (
        <p className="mt-4 text-sm text-[var(--color-blush)]">Accepted. The final reveal is now open.</p>
      ) : null}
    </div>
  );
}
