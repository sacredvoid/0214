import type { SceneId } from "@/app/museum/data/museum-content";
import type { ReactNode } from "react";

interface SceneSectionProps {
  id: SceneId;
  children: ReactNode;
  sceneRef: (node: HTMLElement | null) => void;
  className?: string;
}

export function SceneSection({ id, children, sceneRef, className = "" }: SceneSectionProps) {
  return (
    <section
      id={id}
      ref={sceneRef}
      data-scene={id}
      className={`museum-scene relative px-6 py-16 md:px-12 md:py-24 lg:px-20 ${className}`}
      aria-labelledby={`${id}-title`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
