export type SceneId =
  | "entrance"
  | "beginning"
  | "nicknames"
  | "milestones"
  | "future"
  | "question"
  | "finale";

export type MediaRatio = "4:5" | "16:9" | "1:1";

export interface MuseumMediaSlot {
  key: string;
  alt: string;
  ratio: MediaRatio;
}

export interface MuseumSceneContent {
  id: SceneId;
  title: string;
  subtitle?: string;
  body?: string;
  mediaSlots: MuseumMediaSlot[];
}

export interface MuseumRuntimeSettings {
  engine: "anime" | "gsap";
  reducedMotion: boolean;
  audioMuted: boolean;
}

export const SCENE_ORDER: SceneId[] = [
  "entrance",
  "beginning",
  "nicknames",
  "milestones",
  "future",
  "question",
  "finale",
];

export const NICKNAME_LABELS = ["Kuttu Paapu", "Chinnu Munnu", "Bangaara"];

export const MILESTONE_COPY = [
  "Every city walk became a memory worth framing.",
  "Every meal tasted better because we were laughing.",
  "Every ordinary day turned cinematic with you.",
];

export const MUSEUM_CONTENT: Record<SceneId, MuseumSceneContent> = {
  entrance: {
    id: "entrance",
    title: "The Museum of Us",
    subtitle: "A curated exhibition in blush light and gold frames",
    body: "Step into a quieter world where each room keeps one memory, one promise, and one future reveal.",
    mediaSlots: [],
  },
  beginning: {
    id: "beginning",
    title: "Room I — The Beginning",
    subtitle: "Cabot Hall, Northeastern University",
    body: "A Dandiya night opened the first door. The light, the music, and one hello that changed everything.",
    mediaSlots: [{ key: "beginning-cabot", alt: "First memory from Cabot Hall", ratio: "4:5" }],
  },
  nicknames: {
    id: "nicknames",
    title: "Room II — The Nickname Gallery",
    subtitle: "Three names. One heart.",
    body: "Each name carries its own mood, its own memory, and its own little language between us.",
    mediaSlots: [
      { key: "nickname-kuttu", alt: "Kuttu Paapu portrait", ratio: "4:5" },
      { key: "nickname-chinnu", alt: "Chinnu Munnu portrait", ratio: "4:5" },
      { key: "nickname-bangaara", alt: "Bangaara portrait", ratio: "4:5" },
    ],
  },
  milestones: {
    id: "milestones",
    title: "Room III — Days We Keep",
    subtitle: "Small moments, framed forever",
    body: "Collecting adventures, late-night conversations, and everyday joy that felt bigger than the day itself.",
    mediaSlots: [
      { key: "milestone-one", alt: "Memory frame one", ratio: "16:9" },
      { key: "milestone-two", alt: "Memory frame two", ratio: "16:9" },
      { key: "milestone-three", alt: "Memory frame three", ratio: "16:9" },
    ],
  },
  future: {
    id: "future",
    title: "Room IV — What Comes Next",
    subtitle: "Boston to New York",
    body: "One last covered frame hints at the next chapter: Ken & Dana's and a sparkly little promise waiting in NYC.",
    mediaSlots: [{ key: "future-nyc", alt: "Future chapter with NYC reveal", ratio: "16:9" }],
  },
  question: {
    id: "question",
    title: "Grand Frame",
    subtitle: "The question that matters",
    body: "Srusti, will you be my Valentine?",
    mediaSlots: [],
  },
  finale: {
    id: "finale",
    title: "Finale",
    subtitle: "Lights up. Curtain open.",
    body: "A polished beginning for everything we still have to collect together.",
    mediaSlots: [{ key: "finale-ring", alt: "Final reveal frame with ring motif", ratio: "1:1" }],
  },
};
