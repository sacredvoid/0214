import type { SceneId } from "@/app/museum/data/museum-content";

export type EngineName = "anime" | "gsap";

export interface AnimationEngine {
  name: EngineName;
  init(): void | Promise<void>;
  animateSceneEnter(sceneId: SceneId, root: HTMLElement): void | Promise<void>;
  animateSceneExit?(sceneId: SceneId, root: HTMLElement): void | Promise<void>;
  cleanup(): void;
}

export function parseEngineParam(value: string | null): EngineName {
  return value === "gsap" ? "gsap" : "anime";
}
