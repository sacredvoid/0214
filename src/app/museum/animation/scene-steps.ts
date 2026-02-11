import type { SceneId } from "@/app/museum/data/museum-content";

export interface SceneAnimationStep {
  selector: string;
  delay: number;
  duration: number;
  fromOpacity?: number;
  fromX?: number;
  fromY?: number;
  fromRotate?: number;
  fromScale?: number;
  stagger?: number;
}

const ROOM_STEPS: SceneAnimationStep[] = [
  { selector: '[data-anim="room-shell"]', delay: 0, duration: 900, fromOpacity: 0.55, fromY: 22, fromScale: 0.985 },
  { selector: '[data-anim="room-light"]', delay: 190, duration: 920, fromOpacity: 0, fromY: -24, stagger: 120 },
];

export const SCENE_STEPS: Record<SceneId, SceneAnimationStep[]> = {
  entrance: [
    ...ROOM_STEPS,
    { selector: '[data-anim="eyebrow"]', delay: 60, duration: 520, fromOpacity: 0, fromY: 18 },
    { selector: '[data-anim="heading"]', delay: 160, duration: 820, fromOpacity: 0, fromY: 28 },
    { selector: '[data-anim="copy"]', delay: 300, duration: 760, fromOpacity: 0, fromY: 24 },
    { selector: '[data-anim="cta"]', delay: 420, duration: 700, fromOpacity: 0, fromY: 20 },
    { selector: '[data-anim="frame"]', delay: 260, duration: 920, fromOpacity: 0, fromX: 28, fromY: 18, fromScale: 0.97 },
  ],
  beginning: [
    ...ROOM_STEPS,
    { selector: '[data-anim="heading"]', delay: 80, duration: 650, fromOpacity: 0, fromY: 22 },
    { selector: '[data-anim="copy"]', delay: 220, duration: 740, fromOpacity: 0, fromY: 22 },
    { selector: '[data-anim="frame"]', delay: 260, duration: 900, fromOpacity: 0, fromX: 24, fromY: 26, fromRotate: 1.6, fromScale: 0.96 },
  ],
  nicknames: [
    ...ROOM_STEPS,
    { selector: '[data-anim="heading"]', delay: 80, duration: 650, fromOpacity: 0, fromY: 20 },
    { selector: '[data-anim="copy"]', delay: 180, duration: 700, fromOpacity: 0, fromY: 22 },
    {
      selector: '[data-anim="nickname-frame"]',
      delay: 280,
      duration: 760,
      fromOpacity: 0,
      fromX: 10,
      fromY: 24,
      fromRotate: 1.4,
      fromScale: 0.95,
      stagger: 120,
    },
  ],
  milestones: [
    ...ROOM_STEPS,
    { selector: '[data-anim="heading"]', delay: 100, duration: 680, fromOpacity: 0, fromY: 22 },
    { selector: '[data-anim="copy"]', delay: 200, duration: 760, fromOpacity: 0, fromY: 22 },
    {
      selector: '[data-anim="milestone-frame"]',
      delay: 320,
      duration: 840,
      fromOpacity: 0,
      fromX: 12,
      fromY: 24,
      fromRotate: 1.2,
      fromScale: 0.97,
      stagger: 120,
    },
  ],
  future: [
    ...ROOM_STEPS,
    { selector: '[data-anim="heading"]', delay: 100, duration: 640, fromOpacity: 0, fromY: 20 },
    { selector: '[data-anim="copy"]', delay: 220, duration: 760, fromOpacity: 0, fromY: 20 },
    { selector: '[data-anim="frame"]', delay: 340, duration: 900, fromOpacity: 0, fromX: -24, fromY: 28, fromRotate: -1.3, fromScale: 0.95 },
    { selector: '[data-anim="chip"]', delay: 520, duration: 620, fromOpacity: 0, fromY: 16 },
  ],
  question: [
    ...ROOM_STEPS,
    { selector: '[data-anim="heading"]', delay: 80, duration: 680, fromOpacity: 0, fromY: 24 },
    { selector: '[data-anim="copy"]', delay: 240, duration: 740, fromOpacity: 0, fromY: 24 },
    { selector: '[data-anim="buttons"]', delay: 380, duration: 760, fromOpacity: 0, fromY: 22 },
  ],
  finale: [
    ...ROOM_STEPS,
    { selector: '[data-anim="heading"]', delay: 80, duration: 680, fromOpacity: 0, fromY: 20 },
    { selector: '[data-anim="copy"]', delay: 220, duration: 760, fromOpacity: 0, fromY: 22 },
    { selector: '[data-anim="frame"]', delay: 320, duration: 840, fromOpacity: 0, fromX: 20, fromY: 24, fromRotate: 1.2, fromScale: 0.96 },
    { selector: '[data-anim="chip"]', delay: 520, duration: 620, fromOpacity: 0, fromY: 16 },
  ],
};
