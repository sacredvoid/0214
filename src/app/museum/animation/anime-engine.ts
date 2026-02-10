import type { AnimationEngine } from "@/app/museum/animation/engine";
import { SCENE_STEPS } from "@/app/museum/animation/scene-steps";
import type { SceneId } from "@/app/museum/data/museum-content";

type AnimeAnimationHandle = {
  pause?: () => void;
};

interface AnimeModule {
  animate: (targets: Element[] | Element, options: Record<string, unknown>) => AnimeAnimationHandle;
  stagger: (value: number, options?: Record<string, unknown>) => (index: number) => number;
}

export function createAnimeEngine(): AnimationEngine {
  const handles: AnimeAnimationHandle[] = [];
  let modulePromise: Promise<AnimeModule> | null = null;

  const loadAnime = () => {
    if (!modulePromise) {
      modulePromise = import("animejs") as unknown as Promise<AnimeModule>;
    }
    return modulePromise;
  };

  const animateSceneEnter = async (sceneId: SceneId, root: HTMLElement) => {
    const anime = await loadAnime();
    const steps = SCENE_STEPS[sceneId];

    for (const step of steps) {
      const nodes = Array.from(root.querySelectorAll(step.selector));
      if (nodes.length === 0) {
        continue;
      }

      const animationOptions: Record<string, unknown> = {
        opacity: [step.fromOpacity ?? 0, 1],
        translateY: [step.fromY ?? 0, 0],
        duration: step.duration,
        ease: "outQuad",
        delay: step.stagger
          ? anime.stagger(step.stagger, { start: step.delay })
          : step.delay,
      };

      if (step.fromScale) {
        animationOptions.scale = [step.fromScale, 1];
      }

      const handle = anime.animate(nodes, animationOptions);
      handles.push(handle);
    }
  };

  return {
    name: "anime",
    init() {
      void loadAnime();
    },
    animateSceneEnter,
    cleanup() {
      handles.splice(0).forEach((handle) => handle.pause?.());
    },
  };
}
