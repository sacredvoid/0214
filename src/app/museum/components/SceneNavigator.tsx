import { SCENE_ORDER, type SceneId } from "@/app/museum/data/museum-content";

const LABELS: Record<SceneId, string> = {
  entrance: "Entrance",
  beginning: "Beginning",
  nicknames: "Nicknames",
  milestones: "Milestones",
  future: "Future",
  question: "Question",
  finale: "Finale",
};

interface SceneNavigatorProps {
  activeScene: SceneId;
}

export function SceneNavigator({ activeScene }: SceneNavigatorProps) {
  return (
    <nav
      className="fixed bottom-3 left-1/2 z-40 flex w-[calc(100%-1.2rem)] max-w-4xl -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-[rgba(10,8,14,0.78)] px-2 py-2 shadow-[var(--shadow-soft)] backdrop-blur-xl md:bottom-5"
      aria-label="Museum scene navigation"
    >
      {SCENE_ORDER.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.18em] transition ${
            activeScene === id
              ? "border-[var(--color-gold-soft)]/55 bg-[rgba(230,187,117,0.16)] text-[var(--color-ivory)]"
              : "border-white/10 text-[var(--color-ivory-soft)] hover:border-white/30 hover:text-white"
          }`}
          aria-current={activeScene === id ? "location" : undefined}
        >
          {LABELS[id]}
        </a>
      ))}
    </nav>
  );
}
