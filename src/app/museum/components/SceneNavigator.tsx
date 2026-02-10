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

export function SceneNavigator() {
  return (
    <nav
      className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 items-center gap-2 overflow-x-auto rounded-full border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-xl"
      aria-label="Museum scene navigation"
    >
      {SCENE_ORDER.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className="whitespace-nowrap rounded-full border border-white/10 px-3 py-1 text-[0.64rem] uppercase tracking-[0.18em] text-[var(--color-ivory-soft)] transition hover:border-white/30 hover:text-white"
        >
          {LABELS[id]}
        </a>
      ))}
    </nav>
  );
}
