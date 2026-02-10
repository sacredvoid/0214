import type { EngineName } from "@/app/museum/animation/engine";

interface EngineToggleProps {
  value: EngineName;
  onChange: (engine: EngineName) => void;
}

export function EngineToggle({ value, onChange }: EngineToggleProps) {
  return (
    <fieldset className="control-surface rounded-full border border-white/15 bg-black/35 p-1 backdrop-blur">
      <legend className="sr-only">Animation engine</legend>
      <div className="flex items-center gap-1 text-xs uppercase tracking-[0.16em]">
        <button
          type="button"
          onClick={() => onChange("anime")}
          className={`rounded-full px-3 py-2 transition ${
            value === "anime"
              ? "bg-white/20 text-white"
              : "text-[var(--color-ivory-soft)] hover:bg-white/8"
          }`}
          aria-pressed={value === "anime"}
        >
          Anime.js
        </button>
        <button
          type="button"
          onClick={() => onChange("gsap")}
          className={`rounded-full px-3 py-2 transition ${
            value === "gsap"
              ? "bg-white/20 text-white"
              : "text-[var(--color-ivory-soft)] hover:bg-white/8"
          }`}
          aria-pressed={value === "gsap"}
        >
          GSAP
        </button>
      </div>
    </fieldset>
  );
}
