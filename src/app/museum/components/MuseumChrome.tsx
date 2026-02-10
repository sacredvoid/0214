import type { EngineName } from "@/app/museum/animation/engine";
import { AudioToggle } from "@/app/museum/components/controls/AudioToggle";
import { EngineToggle } from "@/app/museum/components/controls/EngineToggle";

interface MuseumChromeProps {
  engine: EngineName;
  onEngineChange: (engine: EngineName) => void;
  muted: boolean;
  isReady: boolean;
  isPlaying: boolean;
  hasAudio: boolean;
  onAudioToggle: () => void;
  reducedMotion: boolean;
}

export function MuseumChrome({
  engine,
  onEngineChange,
  muted,
  isReady,
  isPlaying,
  hasAudio,
  onAudioToggle,
  reducedMotion,
}: MuseumChromeProps) {
  return (
    <aside className="fixed left-1/2 top-4 z-40 flex w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black/35 p-2 backdrop-blur-xl">
      <p className="px-2 text-[0.62rem] uppercase tracking-[0.22em] text-[var(--color-ivory-soft)]">
        Museum Mode
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <EngineToggle value={engine} onChange={onEngineChange} />
        <AudioToggle
          muted={muted}
          isReady={isReady}
          isPlaying={isPlaying}
          hasAudio={hasAudio}
          onToggle={onAudioToggle}
        />
        {reducedMotion ? (
          <span className="control-surface rounded-full border border-white/15 bg-black/35 px-3 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-[var(--color-ivory-soft)]">
            Reduced motion enabled
          </span>
        ) : null}
      </div>
    </aside>
  );
}
