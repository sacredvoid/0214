import type { SceneId } from "@/app/museum/data/museum-content";

export interface SceneAnimationStep {
  selector: string;
  delay: number;
  duration: number;
  fromOpacity?: number;
  fromY?: number;
  fromScale?: number;
  stagger?: number;
}

export const SCENE_STEPS: Record<SceneId, SceneAnimationStep[]> = {
  entrance: [
    { selector: '[data-anim="eyebrow"]', delay: 60, duration: 520, fromOpacity: 0, fromY: 18 },
    { selector: '[data-anim="heading"]', delay: 160, duration: 820, fromOpacity: 0, fromY: 28 },
    { selector: '[data-anim="copy"]', delay: 300, duration: 760, fromOpacity: 0, fromY: 24 },
    { selector: '[data-anim="cta"]', delay: 420, duration: 700, fromOpacity: 0, fromY: 20 },
  ],
  beginning: [
    { selector: '[data-anim="heading"]', delay: 80, duration: 650, fromOpacity: 0, fromY: 22 },
    { selector: '[data-anim="copy"]', delay: 220, duration: 740, fromOpacity: 0, fromY: 22 },
    { selector: '[data-anim="frame"]', delay: 260, duration: 900, fromOpacity: 0, fromY: 26, fromScale: 0.96 },
  ],
  nicknames: [
    { selector: '[data-anim="heading"]', delay: 80, duration: 650, fromOpacity: 0, fromY: 20 },
    { selector: '[data-anim="copy"]', delay: 180, duration: 700, fromOpacity: 0, fromY: 22 },
    {
      selector: '[data-anim="nickname-frame"]',
      delay: 280,
      duration: 760,
      fromOpacity: 0,
      fromY: 24,
      fromScale: 0.95,
      stagger: 120,
    },
  ],
  milestones: [
    { selector: '[data-anim="heading"]', delay: 100, duration: 680, fromOpacity: 0, fromY: 22 },
    { selector: '[data-anim="copy"]', delay: 200, duration: 760, fromOpacity: 0, fromY: 22 },
    {
      selector: '[data-anim="milestone-frame"]',
      delay: 320,
      duration: 840,
      fromOpacity: 0,
      fromY: 24,
      fromScale: 0.97,
      stagger: 120,
    },
  ],
  future: [
    { selector: '[data-anim="heading"]', delay: 100, duration: 640, fromOpacity: 0, fromY: 20 },
    { selector: '[data-anim="copy"]', delay: 220, duration: 760, fromOpacity: 0, fromY: 20 },
    { selector: '[data-anim="frame"]', delay: 340, duration: 900, fromOpacity: 0, fromY: 28, fromScale: 0.95 },
    { selector: '[data-anim="chip"]', delay: 520, duration: 620, fromOpacity: 0, fromY: 16 },
  ],
  question: [
    { selector: '[data-anim="heading"]', delay: 80, duration: 680, fromOpacity: 0, fromY: 24 },
    { selector: '[data-anim="copy"]', delay: 240, duration: 740, fromOpacity: 0, fromY: 24 },
    { selector: '[data-anim="buttons"]', delay: 380, duration: 760, fromOpacity: 0, fromY: 22 },
  ],
  finale: [
    { selector: '[data-anim="heading"]', delay: 80, duration: 680, fromOpacity: 0, fromY: 20 },
    { selector: '[data-anim="copy"]', delay: 220, duration: 760, fromOpacity: 0, fromY: 22 },
    { selector: '[data-anim="frame"]', delay: 320, duration: 840, fromOpacity: 0, fromY: 24, fromScale: 0.96 },
    { selector: '[data-anim="chip"]', delay: 520, duration: 620, fromOpacity: 0, fromY: 16 },
  ],
};
