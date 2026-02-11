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
      className={`museum-scene relative px-4 py-10 md:px-8 md:py-14 lg:px-16 ${className}`}
      aria-labelledby={`${id}-title`}
    >
      <div data-anim="room-shell" className="museum-room mx-auto w-full max-w-6xl">
        <span data-anim="room-light" aria-hidden="true" className="museum-light museum-light-left" />
        <span data-anim="room-light" aria-hidden="true" className="museum-light museum-light-right" />
        <div className="museum-room-content">{children}</div>
      </div>
    </section>
  );
}
