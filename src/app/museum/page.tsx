"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createAnimeEngine } from "@/app/museum/animation/anime-engine";
import type { AnimationEngine, EngineName } from "@/app/museum/animation/engine";
import { parseEngineParam } from "@/app/museum/animation/engine";
import { createGsapEngine } from "@/app/museum/animation/gsap-engine";
import { MuseumChrome } from "@/app/museum/components/MuseumChrome";
import { SceneNavigator } from "@/app/museum/components/SceneNavigator";
import { SceneSection } from "@/app/museum/components/SceneSection";
import {
  BeginningScene,
  EntranceScene,
  FinaleScene,
  FutureScene,
  MilestonesScene,
  NicknamesScene,
  QuestionScene,
} from "@/app/museum/components/scenes";
import {
  SCENE_ORDER,
  type MuseumRuntimeSettings,
  type SceneId,
} from "@/app/museum/data/museum-content";
import { useAudioController } from "@/app/museum/hooks/useAudioController";
import { useReducedMotion } from "@/app/museum/hooks/useReducedMotion";

function buildEngine(name: EngineName): AnimationEngine {
  return name === "gsap" ? createGsapEngine() : createAnimeEngine();
}

function isSceneId(value: string): value is SceneId {
  return SCENE_ORDER.includes(value as SceneId);
}

export default function MuseumPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [engineName, setEngineName] = useState<EngineName>(() => {
    if (typeof window === "undefined") {
      return "anime";
    }

    return parseEngineParam(new URLSearchParams(window.location.search).get("engine"));
  });
  const reducedMotion = useReducedMotion();
  const { isMuted, isReady, isPlaying, hasAudio, toggleMute } = useAudioController(
    "/museum-ambient.wav"
  );

  const [accepted, setAccepted] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });

  const sceneRefs = useRef<Partial<Record<SceneId, HTMLElement>>>({});
  const engineRef = useRef<AnimationEngine | null>(null);
  const animatedScenesRef = useRef<Set<SceneId>>(new Set());

  const runtimeSettings = useMemo<MuseumRuntimeSettings>(
    () => ({
      engine: engineName,
      reducedMotion,
      audioMuted: isMuted,
    }),
    [engineName, reducedMotion, isMuted]
  );

  const petals = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        left: 3 + index * 5.2,
        delay: 0.2 + index * 0.08,
        duration: 5.6 + (index % 4) * 0.65,
      })),
    []
  );

  useEffect(() => {
    animatedScenesRef.current.clear();
    engineRef.current?.cleanup();

    if (reducedMotion) {
      return;
    }

    const activeEngine = buildEngine(engineName);
    engineRef.current = activeEngine;
    void activeEngine.init();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const sceneId = entry.target.getAttribute("data-scene");
          if (!sceneId || !isSceneId(sceneId) || animatedScenesRef.current.has(sceneId)) {
            return;
          }

          animatedScenesRef.current.add(sceneId);
          void activeEngine.animateSceneEnter(sceneId, entry.target as HTMLElement);
        });
      },
      { threshold: 0.32 }
    );

    SCENE_ORDER.forEach((sceneId) => {
      const node = sceneRefs.current[sceneId];
      if (node) {
        observer.observe(node);
      }
    });

    const entranceNode = sceneRefs.current.entrance;
    if (entranceNode) {
      animatedScenesRef.current.add("entrance");
      void activeEngine.animateSceneEnter("entrance", entranceNode);
    }

    return () => {
      observer.disconnect();
      activeEngine.cleanup();
      if (engineRef.current === activeEngine) {
        engineRef.current = null;
      }
    };
  }, [engineName, reducedMotion]);

  const setSceneRef = useCallback(
    (sceneId: SceneId) => (node: HTMLElement | null) => {
      if (node) {
        sceneRefs.current[sceneId] = node;
      } else {
        delete sceneRefs.current[sceneId];
      }
    },
    []
  );

  const updateEngine = useCallback(
    (nextEngine: EngineName) => {
      setEngineName(nextEngine);

      const params = new URLSearchParams(
        typeof window === "undefined" ? "" : window.location.search
      );
      if (nextEngine === "anime") {
        params.delete("engine");
      } else {
        params.set("engine", nextEngine);
      }

      const nextQuery = params.toString();
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router]
  );

  const handleAccept = useCallback(() => {
    setAccepted(true);
    setNoOffset({ x: 0, y: 0 });
  }, []);

  const moveNoButton = useCallback(() => {
    setNoAttempts((count) => count + 1);
    const nextOffset = {
      x: Math.round((Math.random() * 2 - 1) * 150),
      y: Math.round((Math.random() * 2 - 1) * 42),
    };
    setNoOffset(nextOffset);
  }, []);

  return (
    <main
      className="museum-app relative min-h-screen pb-28 pt-28 text-[var(--color-ivory)]"
      data-engine={runtimeSettings.engine}
      data-reduced-motion={runtimeSettings.reducedMotion}
    >
      <div className="museum-backdrop pointer-events-none absolute inset-0" />

      {accepted ? (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
          {petals.map((petal) => (
            <span
              key={petal.id}
              className="museum-petal"
              style={{
                left: `${petal.left}%`,
                animationDelay: `${petal.delay}s`,
                animationDuration: `${petal.duration}s`,
              }}
            />
          ))}
        </div>
      ) : null}

      <MuseumChrome
        engine={engineName}
        onEngineChange={updateEngine}
        muted={isMuted}
        isReady={isReady}
        isPlaying={isPlaying}
        hasAudio={hasAudio}
        onAudioToggle={toggleMute}
        reducedMotion={reducedMotion}
      />
      <SceneNavigator />

      <SceneSection id="entrance" sceneRef={setSceneRef("entrance")}>
        <EntranceScene />
      </SceneSection>

      <SceneSection id="beginning" sceneRef={setSceneRef("beginning")}>
        <BeginningScene />
      </SceneSection>

      <SceneSection id="nicknames" sceneRef={setSceneRef("nicknames")}>
        <NicknamesScene />
      </SceneSection>

      <SceneSection id="milestones" sceneRef={setSceneRef("milestones")}>
        <MilestonesScene />
      </SceneSection>

      <SceneSection id="future" sceneRef={setSceneRef("future")}>
        <FutureScene />
      </SceneSection>

      <SceneSection id="question" sceneRef={setSceneRef("question")}>
        <QuestionScene
          accepted={accepted}
          noAttempts={noAttempts}
          noOffset={noOffset}
          onAccept={handleAccept}
          onNoHover={moveNoButton}
        />
      </SceneSection>

      <SceneSection id="finale" sceneRef={setSceneRef("finale")}>
        <FinaleScene accepted={accepted} />
      </SceneSection>
    </main>
  );
}
