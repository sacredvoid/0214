import { useCallback, useEffect, useRef, useState } from "react";

interface AudioController {
  isMuted: boolean;
  isReady: boolean;
  isPlaying: boolean;
  hasAudio: boolean;
  toggleMute: () => void;
}

export function useAudioController(src: string): AudioController {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audio.muted = true;
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => setHasAudio(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    const attemptMutedAutoplay = async () => {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      } finally {
        setIsReady(true);
      }
    };

    const startPipelineOnInteraction = async () => {
      try {
        if (audio.paused) {
          await audio.play();
        }
      } catch {
        setIsPlaying(false);
      }
    };

    void attemptMutedAutoplay();
    window.addEventListener("pointerdown", startPipelineOnInteraction, { once: true });
    window.addEventListener("keydown", startPipelineOnInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", startPipelineOnInteraction);
      window.removeEventListener("keydown", startPipelineOnInteraction);
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, [src]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);

    if (audio.paused) {
      void audio.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  return { isMuted, isReady, isPlaying, hasAudio, toggleMute };
}
