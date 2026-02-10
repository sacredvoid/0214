"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HomePage() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let isMounted = true;

    const runIntro = async () => {
      const { animate } = await import("animejs");
      if (!isMounted || !rootRef.current) {
        return;
      }

      animate('[data-hero="eyebrow"]', {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 460,
        ease: "outQuad",
      });

      animate('[data-hero="title"]', {
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 860,
        delay: 120,
        ease: "outQuad",
      });

      animate('[data-hero="copy"]', {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 780,
        delay: 280,
        ease: "outQuad",
      });

      animate('[data-hero="cta"]', {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 680,
        delay: 420,
        ease: "outQuad",
      });
    };

    void runIntro();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main
      ref={rootRef}
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-12 text-[var(--color-ivory)] md:px-10"
      style={{
        background:
          "radial-gradient(circle at 14% 10%, rgba(255, 179, 204, 0.22), transparent 34%), radial-gradient(circle at 85% 12%, rgba(235, 217, 255, 0.16), transparent 37%), linear-gradient(180deg, #06060d 0%, #0d0913 56%, #130f1b 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.04)_95%)] bg-[size:100%_24px] opacity-25" />
      <div className="relative mx-auto w-full max-w-5xl rounded-[2.2rem] border border-white/10 bg-black/25 p-8 shadow-[var(--shadow-hero)] backdrop-blur-xl md:p-14">
        <p
          data-hero="eyebrow"
          className="w-fit rounded-full border border-[var(--color-gold-soft)]/40 px-4 py-2 text-[0.66rem] uppercase tracking-[0.24em] text-[var(--color-ivory-soft)]"
        >
          Valentine Edition 2026
        </p>

        <h1
          data-hero="title"
          className="mt-8 max-w-4xl text-5xl leading-[0.96] md:text-7xl"
          style={{ fontFamily: "var(--font-display-premium)" }}
        >
          A museum-like love story, redesigned with cinematic polish.
        </h1>

        <p data-hero="copy" className="mt-6 max-w-2xl text-base text-white/80 md:text-xl">
          Subtle motion. Premium typography. Golden frames. One clear journey from first memory to the grand question.
        </p>

        <div data-hero="cta" className="mt-9 flex flex-wrap items-center gap-4">
          <Link href="/museum" className="museum-button museum-button-primary">
            Enter the Museum
          </Link>
          <span className="museum-chip">Dual engine mode: Anime.js and GSAP</span>
        </div>
      </div>
    </main>
  );
}
