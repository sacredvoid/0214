import type { AnimationEngine } from "@/app/museum/animation/engine";
import { SCENE_STEPS } from "@/app/museum/animation/scene-steps";
import type { SceneId } from "@/app/museum/data/museum-content";

type GsapTimeline = {
  kill: () => void;
  fromTo: (
    targets: Element[] | Element,
    fromVars: Record<string, unknown>,
    toVars: Record<string, unknown>,
    position?: number
  ) => GsapTimeline;
};

interface GsapInstance {
  timeline: (config?: Record<string, unknown>) => GsapTimeline;
}

interface GsapModule {
  gsap?: GsapInstance;
  default?: GsapInstance;
}

export function createGsapEngine(): AnimationEngine {
  const timelines: GsapTimeline[] = [];
  let modulePromise: Promise<GsapInstance> | null = null;

  const loadGsap = async () => {
    if (!modulePromise) {
      modulePromise = import("gsap").then((mod: GsapModule) => {
        const instance = mod.gsap ?? mod.default;
        if (!instance) {
          throw new Error("Unable to load GSAP runtime");
        }
        return instance;
      });
    }

    return modulePromise;
  };

  const animateSceneEnter = async (sceneId: SceneId, root: HTMLElement) => {
    const gsap = await loadGsap();
    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

    for (const step of SCENE_STEPS[sceneId]) {
      const nodes = Array.from(root.querySelectorAll(step.selector));
      if (nodes.length === 0) {
        continue;
      }

      const fromVars: Record<string, unknown> = {
        opacity: step.fromOpacity ?? 0,
        x: step.fromX ?? 0,
        y: step.fromY ?? 0,
        rotate: step.fromRotate ?? 0,
      };

      if (step.fromScale) {
        fromVars.scale = step.fromScale;
      }

      const toVars: Record<string, unknown> = {
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        duration: Number((step.duration / 1000).toFixed(3)),
        delay: Number((step.delay / 1000).toFixed(3)),
      };

      if (step.fromScale) {
        toVars.scale = 1;
      }

      if (step.stagger) {
        toVars.stagger = Number((step.stagger / 1000).toFixed(3));
      }

      timeline.fromTo(nodes, fromVars, toVars, 0);
    }

    timelines.push(timeline);
  };

  return {
    name: "gsap",
    init() {
      void loadGsap();
    },
    animateSceneEnter,
    cleanup() {
      timelines.splice(0).forEach((timeline) => timeline.kill());
    },
  };
}
