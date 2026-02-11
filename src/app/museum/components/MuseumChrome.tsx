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
    <aside className="fixed right-3 top-3 z-40 flex max-w-[calc(100vw-1.5rem)] flex-col gap-2 rounded-2xl border border-white/10 bg-[rgba(10,8,14,0.75)] p-2 shadow-[var(--shadow-soft)] backdrop-blur-xl md:right-5 md:top-5">
      <p className="px-2 pt-1 text-[0.58rem] uppercase tracking-[0.24em] text-[var(--color-ivory-soft)]">
        Gallery Controls
      </p>
      <div className="flex flex-wrap items-center gap-2 px-1 pb-1">
        <EngineToggle value={engine} onChange={onEngineChange} />
        <AudioToggle
          muted={muted}
          isReady={isReady}
          isPlaying={isPlaying}
          hasAudio={hasAudio}
          onToggle={onAudioToggle}
        />
        {reducedMotion ? (
          <span className="control-surface rounded-full border border-white/15 bg-black/35 px-3 py-2 text-[0.6rem] uppercase tracking-[0.18em] text-[var(--color-ivory-soft)]">
            Reduced Motion
          </span>
        ) : null}
      </div>
    </aside>
  );
}
