interface AudioToggleProps {
  muted: boolean;
  isReady: boolean;
  isPlaying: boolean;
  hasAudio: boolean;
  onToggle: () => void;
}

export function AudioToggle({ muted, isReady, isPlaying, hasAudio, onToggle }: AudioToggleProps) {
  if (!hasAudio) {
    return (
      <div className="control-surface rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-amber-100">
        Audio file missing
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className="control-surface rounded-full border border-white/15 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--color-ivory)] transition hover:bg-white/10"
      aria-live="polite"
      aria-label={muted ? "Unmute ambient music" : "Mute ambient music"}
    >
      {muted ? "Unmute" : "Sound on"} • {isReady && isPlaying ? "playing" : "standby"}
    </button>
  );
}
