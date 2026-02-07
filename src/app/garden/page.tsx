"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

/* ───────────────────────────────────────────
   Srusti's Secret Garden
   An interactive magical garden that grows
   as the user scrolls.
   ─────────────────────────────────────────── */

// ── tiny helpers ──────────────────────────
const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// ── No-button messages ───────────────────
const weedMessages = [
  "Weed removed!",
  "The garden rejects this option!",
  "Nope, try the flower!",
  "Not in this garden!",
  "Kuttu Paapu, you know which one to pick!",
];

export default function GardenPage() {
  /* refs for every section */
  const seedRef = useRef<HTMLDivElement>(null);
  const sproutRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const gardenRef = useRef<HTMLDivElement>(null);
  const wellRef = useRef<HTMLDivElement>(null);
  const signpostRef = useRef<HTMLDivElement>(null);
  const gazeboRef = useRef<HTMLDivElement>(null);

  /* animation-fired flags */
  const fired = useRef<Record<string, boolean>>({});

  /* state */
  const [yesClicked, setYesClicked] = useState(false);
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const [noPulling, setNoPulling] = useState(false);
  const [weedMsg, setWeedMsg] = useState("");
  const [showWeedMsg, setShowWeedMsg] = useState(false);
  const noMsgIdx = useRef(0);

  /* ── anime.js dynamic import holder ── */
  type AnimateType = typeof import("animejs");
  const animeRef = useRef<AnimateType | null>(null);

  /* ── Intersection Observer callback ── */
  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("data-section");
        if (!id || fired.current[id]) return;
        fired.current[id] = true;
        runAnimation(id);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /* ── Master animation dispatcher ── */
  const runAnimation = async (id: string) => {
    if (!animeRef.current) return;
    const { animate, createTimeline, stagger } = animeRef.current;

    switch (id) {
      /* ───── SEED ───── */
      case "seed": {
        // Pulse the seed
        animate(".seed-core", {
          scale: [1, 1.25],
          opacity: [0.7, 1],
          duration: 1400,
          alternate: true,
          loop: true,
          ease: "inOutSine",
        });
        // Fireflies
        animate(".firefly", {
          opacity: [0, 1],
          duration: () => rand(800, 2000),
          delay: stagger(200, { from: "random" }),
          alternate: true,
          loop: true,
          ease: "inOutSine",
        });
        // Scroll hint bounce
        animate(".scroll-hint", {
          translateY: [0, 12],
          duration: 900,
          alternate: true,
          loop: true,
          ease: "inOutQuad",
        });
        break;
      }

      /* ───── SPROUT ───── */
      case "sprout": {
        const tl = createTimeline({ defaults: { ease: "outQuart" } });
        tl.add(".sprout-stem", { height: [0, 220], duration: 1200 }, 0)
          .add(
            ".sprout-leaf-left",
            {
              scale: [0, 1],
              rotate: [-30, -50],
              opacity: [0, 1],
              duration: 700,
            },
            800
          )
          .add(
            ".sprout-leaf-right",
            {
              scale: [0, 1],
              rotate: [30, 50],
              opacity: [0, 1],
              duration: 700,
            },
            900
          )
          .add(
            ".garden-stone-1",
            { opacity: [0, 1], translateY: [30, 0], duration: 900 },
            1000
          )
          .add(
            ".grass-blade",
            {
              scaleY: [0, 1],
              duration: 600,
              delay: stagger(60),
            },
            400
          );
        break;
      }

      /* ───── FIRST BLOOM ───── */
      case "bloom": {
        const tl = createTimeline({ defaults: { ease: "outBack" } });
        tl.add(".bloom-stem", { height: [0, 180], duration: 1000, ease: "outQuart" }, 0);
        // Petals bloom one by one
        for (let i = 0; i < 8; i++) {
          tl.add(
            `.rose-petal-${i}`,
            {
              scale: [0, 1],
              opacity: [0, 1],
              duration: 500,
            },
            600 + i * 120
          );
        }
        tl.add(
          ".bloom-center",
          { scale: [0, 1], opacity: [0, 1], duration: 600 },
          600
        );
        tl.add(
          ".bloom-text",
          { opacity: [0, 1], translateY: [20, 0], duration: 800 },
          1800
        );
        // Side flowers
        tl.add(
          ".side-flower",
          {
            scale: [0, 1],
            opacity: [0, 1],
            duration: 500,
            delay: stagger(150),
          },
          1600
        );
        break;
      }

      /* ───── GROWING GARDEN ───── */
      case "garden": {
        const tl = createTimeline({ defaults: { ease: "outExpo" } });
        // Flower groups
        tl.add(
          ".garden-flower",
          {
            scale: [0, 1],
            opacity: [0, 1],
            duration: 700,
            delay: stagger(80, { from: "random" }),
          },
          0
        );
        // Nickname stones
        tl.add(
          ".nickname-stone",
          {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 900,
            delay: stagger(400),
          },
          600
        );
        // Photo frames
        tl.add(
          ".photo-frame",
          {
            opacity: [0, 1],
            scale: [0.7, 1],
            rotate: () => rand(-5, 5),
            duration: 800,
            delay: stagger(300),
          },
          1000
        );
        // Butterflies
        document.querySelectorAll(".butterfly").forEach((b, i) => {
          animate(b, {
            translateX: [0, rand(-120, 120)],
            translateY: [0, rand(-80, 80)],
            duration: rand(3000, 5000),
            delay: i * 400,
            alternate: true,
            loop: true,
            ease: "inOutSine",
          });
        });
        animate(".butterfly-wing", {
          scaleX: [1, 0.3],
          duration: 200,
          alternate: true,
          loop: true,
          ease: "inOutSine",
        });
        break;
      }

      /* ───── WISHING WELL ───── */
      case "well": {
        const tl = createTimeline({ defaults: { ease: "outQuart" } });
        tl.add(
          ".well-base",
          { opacity: [0, 1], translateY: [40, 0], duration: 900 },
          0
        )
          .add(
            ".well-roof",
            { opacity: [0, 1], translateY: [-30, 0], duration: 700 },
            400
          )
          .add(
            ".well-bucket",
            { opacity: [0, 1], scale: [0, 1], duration: 600 },
            800
          )
          .add(
            ".well-text",
            { opacity: [0, 1], translateY: [20, 0], duration: 800, delay: stagger(300) },
            1000
          );
        // Sparkles
        animate(".well-sparkle", {
          opacity: [0, 1],
          scale: [0.5, 1.2],
          duration: () => rand(600, 1500),
          delay: stagger(150, { from: "random" }),
          alternate: true,
          loop: true,
          ease: "inOutSine",
        });
        break;
      }

      /* ───── NYC SIGNPOST ───── */
      case "signpost": {
        const tl = createTimeline({ defaults: { ease: "outBack" } });
        tl.add(
          ".signpost-pole",
          { scaleY: [0, 1], duration: 800 },
          0
        )
          .add(
            ".signpost-plank",
            {
              opacity: [0, 1],
              translateX: [-60, 0],
              duration: 600,
              delay: stagger(300),
            },
            600
          )
          .add(
            ".diamond-ring",
            { scale: [0, 1], rotate: [45, 0], opacity: [0, 1], duration: 800 },
            1400
          )
          .add(
            ".signpost-text",
            { opacity: [0, 1], translateY: [20, 0], duration: 800 },
            1800
          );
        // Diamond sparkles
        animate(".diamond-sparkle", {
          opacity: [0, 1],
          scale: [0.3, 1],
          duration: () => rand(500, 1200),
          delay: stagger(120, { from: "random" }),
          alternate: true,
          loop: true,
          ease: "inOutSine",
        });
        break;
      }

      /* ───── GAZEBO ───── */
      case "gazebo": {
        const tl = createTimeline({ defaults: { ease: "outQuart" } });
        tl.add(".gazebo-roof", { opacity: [0, 1], translateY: [-40, 0], duration: 800 }, 0)
          .add(
            ".gazebo-pillar",
            { scaleY: [0, 1], opacity: [0, 1], duration: 700, delay: stagger(200) },
            400
          )
          .add(
            ".gazebo-floor",
            { opacity: [0, 1], scaleX: [0.5, 1], duration: 700 },
            800
          )
          .add(
            ".climbing-rose",
            {
              scale: [0, 1],
              opacity: [0, 1],
              duration: 400,
              delay: stagger(60, { from: "random" }),
            },
            1000
          )
          .add(
            ".gazebo-question",
            { opacity: [0, 1], translateY: [30, 0], duration: 1000 },
            1400
          )
          .add(
            ".gazebo-buttons",
            { opacity: [0, 1], scale: [0.8, 1], duration: 600 },
            2000
          );
        // Yes button pulse
        animate(".yes-glow", {
          scale: [1, 1.15],
          opacity: [0.5, 0.9],
          duration: 1200,
          alternate: true,
          loop: true,
          ease: "inOutSine",
        });
        break;
      }
    }
  };

  /* ── YES click: bloom explosion ── */
  const handleYes = async () => {
    if (yesClicked) return;
    setYesClicked(true);

    if (!animeRef.current) return;
    const { animate, stagger } = animeRef.current;

    // Create petal particles
    const container = document.getElementById("bloom-explosion");
    if (!container) return;
    container.innerHTML = "";
    const colors = ["#FFB7C5", "#FF69B4", "#FFFFFF", "#B57EDC", "#FFD700", "#ff9ec4"];
    for (let i = 0; i < 70; i++) {
      const petal = document.createElement("div");
      petal.className = "bloom-particle";
      const size = rand(8, 22);
      Object.assign(petal.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50% 0 50% 50%",
        background: pick(colors),
        left: "50%",
        top: "50%",
        opacity: "1",
        pointerEvents: "none",
        zIndex: "9999",
      });
      container.appendChild(petal);
    }

    // Explode petals
    animate(".bloom-particle", {
      translateX: () => rand(-500, 500),
      translateY: () => rand(-500, 500),
      rotate: () => rand(0, 720),
      opacity: [1, 0],
      scale: [1, rand(0.3, 0.8)],
      duration: () => rand(1500, 3000),
      delay: stagger(20, { from: "center" }),
      ease: "outExpo",
    });

    // Brighten gazebo
    const gazeboEl = gazeboRef.current;
    if (gazeboEl) {
      animate(gazeboEl, {
        duration: 1500,
        ease: "inOutQuad",
      });
      gazeboEl.style.transition = "background 1.5s ease";
      gazeboEl.style.background =
        "linear-gradient(180deg, #FFF8E7 0%, #FFD700 40%, #FFE066 100%)";
    }

    // Firefly heart formation
    const heartFireflies = document.querySelectorAll(".heart-firefly");
    const heartPoints = generateHeartPoints(heartFireflies.length);
    heartFireflies.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = "1";
      animate(htmlEl, {
        left: `${heartPoints[i].x}%`,
        top: `${heartPoints[i].y}%`,
        opacity: [0, 1],
        duration: 2000,
        delay: i * 30,
        ease: "outExpo",
      });
    });

    // Pulse all fireflies in heart
    setTimeout(() => {
      animate(".heart-firefly", {
        scale: [1, 1.5],
        opacity: [0.7, 1],
        duration: 800,
        alternate: true,
        loop: true,
        ease: "inOutSine",
      });
    }, 2200);

    // Banner unfurl
    setTimeout(() => {
      animate(".yes-banner", {
        scaleY: [0, 1],
        opacity: [0, 1],
        duration: 1000,
        ease: "outBack",
      });
    }, 1200);
  };

  /* ── Generate heart shape points ── */
  const generateHeartPoints = (count: number) => {
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const x = 50 + 16 * Math.pow(Math.sin(t), 3);
      const y =
        45 -
        (13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t));
      points.push({ x, y });
    }
    return points;
  };

  /* ── NO button weed pull ── */
  const handleNo = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (noPulling) return;
    setNoPulling(true);
    setWeedMsg(weedMessages[noMsgIdx.current % weedMessages.length]);
    noMsgIdx.current += 1;
    setShowWeedMsg(true);

    const btn = (e.currentTarget || e.target) as HTMLElement;
    if (animeRef.current) {
      // Dirt particles
      const parent = btn.parentElement;
      if (parent) {
        for (let i = 0; i < 12; i++) {
          const dirt = document.createElement("div");
          Object.assign(dirt.style, {
            position: "absolute",
            width: `${rand(4, 8)}px`,
            height: `${rand(4, 8)}px`,
            borderRadius: "50%",
            background: pick(["#8B7355", "#654321", "#5c4033", "#3e2723"]),
            left: `${btn.offsetLeft + btn.offsetWidth / 2}px`,
            top: `${btn.offsetTop + btn.offsetHeight / 2}px`,
            pointerEvents: "none",
            zIndex: "50",
          });
          parent.appendChild(dirt);
          animeRef.current.animate(dirt, {
            translateX: rand(-80, 80),
            translateY: rand(-120, -20),
            opacity: [1, 0],
            duration: rand(600, 1000),
            ease: "outQuad",
            onComplete: () => {
              dirt.remove();
            },
          });
        }
      }

      animeRef.current.animate(btn, {
        translateY: [0, 120],
        scaleY: [1, 0],
        opacity: [1, 0],
        duration: 600,
        ease: "inBack",
        onComplete: () => {
          // Reappear at random position
          const parentRect = parent?.getBoundingClientRect();
          const maxX = parentRect ? parentRect.width - 120 : 200;
          const maxY = parentRect ? parentRect.height - 60 : 100;
          setNoPos({
            x: rand(10, Math.max(maxX, 50)),
            y: rand(10, Math.max(maxY, 50)),
          });
          setNoPulling(false);
          // Reset the button styles
          btn.style.transform = "";
          btn.style.opacity = "1";
        },
      });
    }

    setTimeout(() => setShowWeedMsg(false), 2000);
  };

  /* ── Setup ── */
  useEffect(() => {
    let observer: IntersectionObserver;

    (async () => {
      // Dynamic import of anime.js to avoid SSR issues
      const anime = await import("animejs");
      animeRef.current = anime;

      // Intersection Observer
      observer = new IntersectionObserver(handleIntersect, {
        threshold: 0.2,
      });

      [
        seedRef,
        sproutRef,
        bloomRef,
        gardenRef,
        wellRef,
        signpostRef,
        gazeboRef,
      ].forEach((ref) => {
        if (ref.current) observer.observe(ref.current);
      });
    })();

    return () => {
      if (observer) observer.disconnect();
    };
  }, [handleIntersect]);

  /* ═══════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════ */
  return (
    <main className="relative w-full overflow-x-hidden hide-scrollbar">
      {/* ════════════ 1. THE SEED ════════════ */}
      <section
        ref={seedRef}
        data-section="seed"
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #1a0f0a 0%, #2D1810 100%)",
        }}
      >
        {/* Fireflies */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`ff-${i}`}
            className="firefly absolute rounded-full"
            style={{
              width: rand(3, 6) + "px",
              height: rand(3, 6) + "px",
              background: "#FFD700",
              boxShadow: "0 0 8px 3px rgba(255,215,0,0.6)",
              left: `${rand(5, 95)}%`,
              top: `${rand(5, 90)}%`,
              opacity: 0,
            }}
          />
        ))}

        {/* Title text */}
        <h2
          className="text-center mb-10 px-4 opacity-90"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.2rem, 4vw, 2rem)",
            color: "#FFF8E7",
            textShadow: "0 0 20px rgba(255,215,0,0.3)",
          }}
        >
          Every love story starts with a single moment.
        </h2>

        {/* The Seed */}
        <div className="relative">
          <div
            className="seed-core rounded-full"
            style={{
              width: 44,
              height: 56,
              background:
                "radial-gradient(ellipse, #FFD700 0%, #b8860b 60%, #8B6914 100%)",
              boxShadow:
                "0 0 30px 12px rgba(255,215,0,0.35), 0 0 60px 25px rgba(255,215,0,0.15)",
            }}
          />
        </div>

        {/* Scroll hint */}
        <div
          className="scroll-hint mt-12 flex flex-col items-center gap-2"
          style={{ color: "#c9a96e" }}
        >
          <span
            style={{
              fontFamily: "var(--font-lora)",
              fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
            }}
          >
            Scroll to grow
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ════════════ 2. THE SPROUT ════════════ */}
      <section
        ref={sproutRef}
        data-section="sprout"
        className="relative flex flex-col items-center justify-end overflow-hidden"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, #2D1810 0%, #3a2515 40%, #4a3728 100%)",
        }}
      >
        {/* Stem + Leaves */}
        <div className="relative flex flex-col items-center mb-0" style={{ paddingBottom: 0 }}>
          {/* Left leaf */}
          <div
            className="sprout-leaf-left absolute"
            style={{
              width: 32,
              height: 18,
              background: "#4CAF50",
              borderRadius: "50% 50% 50% 0",
              left: -26,
              top: 50,
              opacity: 0,
              transformOrigin: "right bottom",
            }}
          />
          {/* Right leaf */}
          <div
            className="sprout-leaf-right absolute"
            style={{
              width: 32,
              height: 18,
              background: "#66BB6A",
              borderRadius: "50% 50% 0 50%",
              right: -26,
              top: 30,
              opacity: 0,
              transformOrigin: "left bottom",
            }}
          />
          {/* Stem */}
          <div
            className="sprout-stem"
            style={{
              width: 6,
              height: 0,
              background: "linear-gradient(180deg, #66BB6A, #388E3C)",
              borderRadius: 3,
              transformOrigin: "bottom center",
            }}
          />
        </div>

        {/* Garden Stone */}
        <div
          className="garden-stone-1 mb-16 mt-8 px-6 py-4 text-center"
          style={{
            opacity: 0,
            background: "linear-gradient(135deg, #9e9e9e, #757575)",
            borderRadius: 16,
            boxShadow: "inset 0 2px 4px rgba(255,255,255,0.15), 0 4px 12px rgba(0,0,0,0.4)",
            maxWidth: 320,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-caveat)",
              fontSize: "clamp(1rem, 3.5vw, 1.35rem)",
              color: "#FFF8E7",
              lineHeight: 1.5,
            }}
          >
            Cabot Hall. Dandiya Night.
            <br />
            The moment I saw you.
          </p>
        </div>

        {/* Grass */}
        <div className="w-full flex items-end justify-center gap-[3px] pb-0" style={{ height: 60 }}>
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={`grass-${i}`}
              className="grass-blade"
              style={{
                width: rand(3, 5),
                height: rand(20, 55),
                background: `linear-gradient(180deg, ${pick(["#66BB6A", "#4CAF50", "#388E3C", "#2E7D32"])} 0%, #1b5e20 100%)`,
                borderRadius: "2px 2px 0 0",
                transformOrigin: "bottom center",
                transform: "scaleY(0)",
              }}
            />
          ))}
        </div>
      </section>

      {/* ════════════ 3. FIRST BLOOM ════════════ */}
      <section
        ref={bloomRef}
        data-section="bloom"
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, #4a3728 0%, #3a5a2a 50%, #2d5a27 100%)",
        }}
      >
        {/* Stem */}
        <div className="flex flex-col items-center relative">
          <div
            className="bloom-stem"
            style={{
              width: 6,
              height: 0,
              background: "linear-gradient(180deg, #388E3C, #2E7D32)",
              borderRadius: 3,
              position: "absolute",
              bottom: -180,
              transformOrigin: "bottom center",
            }}
          />

          {/* Rose */}
          <div className="relative" style={{ width: 160, height: 160 }}>
            {/* Petals */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * 360;
              const dist = 28;
              const x = Math.cos((angle * Math.PI) / 180) * dist;
              const y = Math.sin((angle * Math.PI) / 180) * dist;
              return (
                <div
                  key={`petal-${i}`}
                  className={`rose-petal-${i} absolute`}
                  style={{
                    width: 52,
                    height: 56,
                    background: `radial-gradient(ellipse, ${pick(["#FFB7C5", "#ff9ec4", "#ffc8d6", "#ffa5bc"])} 30%, #FF69B4 100%)`,
                    borderRadius: "50% 50% 50% 50%",
                    left: 80 + x - 26,
                    top: 80 + y - 28,
                    transform: "scale(0)",
                    opacity: 0,
                    boxShadow: "inset 0 -4px 8px rgba(255,105,180,0.3)",
                  }}
                />
              );
            })}
            {/* Center */}
            <div
              className="bloom-center absolute rounded-full"
              style={{
                width: 48,
                height: 48,
                left: 56,
                top: 56,
                background:
                  "radial-gradient(circle, #FFD700 0%, #ffb347 50%, #FF69B4 100%)",
                opacity: 0,
                boxShadow: "0 0 20px rgba(255,215,0,0.4)",
              }}
            />
          </div>
        </div>

        {/* Side flowers */}
        <div className="flex items-center gap-6 mt-6 flex-wrap justify-center px-4">
          {/* Small roses */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`sr-${i}`}
              className="side-flower"
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "radial-gradient(circle, #FFB7C5, #FF69B4)",
                boxShadow: "0 0 10px rgba(255,183,197,0.4)",
                transform: "scale(0)",
                opacity: 0,
              }}
            />
          ))}
          {/* Small lilies */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`sl-${i}`}
              className="side-flower"
              style={{
                width: 30,
                height: 30,
                borderRadius: "50% 0 50% 0",
                background: "radial-gradient(circle, #FFFFFF, #e0e0e0)",
                boxShadow: "0 0 10px rgba(255,255,255,0.3)",
                transform: "scale(0)",
                opacity: 0,
              }}
            />
          ))}
        </div>

        {/* Text */}
        <p
          className="bloom-text mt-10 text-center px-6"
          style={{
            fontFamily: "var(--font-lora)",
            fontSize: "clamp(1rem, 3vw, 1.3rem)",
            color: "#FFF8E7",
            opacity: 0,
            textShadow: "0 0 15px rgba(255,215,0,0.2)",
            maxWidth: 480,
          }}
        >
          From that night, something beautiful began to grow.
        </p>
      </section>

      {/* ════════════ 4. THE GROWING GARDEN ════════════ */}
      <section
        ref={gardenRef}
        data-section="garden"
        className="relative overflow-hidden"
        style={{
          minHeight: "150vh",
          background:
            "linear-gradient(180deg, #2d5a27 0%, #3a7d32 30%, #4CAF50 60%, #87CEEB 100%)",
        }}
      >
        <div className="relative w-full max-w-4xl mx-auto px-4 py-16">
          {/* Flower groups — positioned with absolute */}
          <div className="relative" style={{ minHeight: "120vh" }}>
            {/* Pink roses */}
            {[
              { x: "10%", y: "5%" },
              { x: "80%", y: "8%" },
              { x: "25%", y: "20%" },
              { x: "65%", y: "18%" },
              { x: "5%", y: "35%" },
              { x: "90%", y: "30%" },
              { x: "45%", y: "45%" },
              { x: "15%", y: "55%" },
              { x: "75%", y: "52%" },
              { x: "35%", y: "68%" },
              { x: "85%", y: "65%" },
              { x: "55%", y: "78%" },
            ].map((pos, i) => (
              <div
                key={`gf-rose-${i}`}
                className="garden-flower absolute"
                style={{
                  left: pos.x,
                  top: pos.y,
                  width: rand(20, 36),
                  height: rand(20, 36),
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${pick(["#FFB7C5", "#ffc8d6", "#ff9ec4"])} 40%, #FF69B4)`,
                  boxShadow: "0 0 8px rgba(255,183,197,0.3)",
                  transform: "scale(0)",
                  opacity: 0,
                }}
              />
            ))}
            {/* White lilies */}
            {[
              { x: "18%", y: "12%" },
              { x: "72%", y: "25%" },
              { x: "40%", y: "38%" },
              { x: "8%", y: "50%" },
              { x: "88%", y: "48%" },
              { x: "60%", y: "62%" },
            ].map((pos, i) => (
              <div
                key={`gf-lily-${i}`}
                className="garden-flower absolute"
                style={{
                  left: pos.x,
                  top: pos.y,
                  width: rand(22, 32),
                  height: rand(22, 32),
                  borderRadius: "50% 0 50% 0",
                  background: "radial-gradient(circle, #FFFFFF 40%, #e8e8e8)",
                  boxShadow: "0 0 10px rgba(255,255,255,0.4)",
                  transform: "scale(0)",
                  opacity: 0,
                }}
              />
            ))}
            {/* Lavender stalks */}
            {[
              { x: "30%", y: "10%" },
              { x: "55%", y: "15%" },
              { x: "20%", y: "42%" },
              { x: "70%", y: "40%" },
              { x: "50%", y: "58%" },
              { x: "10%", y: "70%" },
              { x: "80%", y: "72%" },
            ].map((pos, i) => (
              <div
                key={`gf-lav-${i}`}
                className="garden-flower absolute flex flex-col items-center"
                style={{
                  left: pos.x,
                  top: pos.y,
                  transform: "scale(0)",
                  opacity: 0,
                }}
              >
                <div
                  style={{
                    width: 3,
                    height: 36,
                    background: "#388E3C",
                    borderRadius: 2,
                  }}
                />
                {Array.from({ length: 5 }).map((_, j) => (
                  <div
                    key={j}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#B57EDC",
                      marginTop: -30 + j * 7,
                      boxShadow: "0 0 5px rgba(181,126,220,0.4)",
                    }}
                  />
                ))}
              </div>
            ))}

            {/* Nickname stones */}
            {[
              { text: "My Kuttu Paapu", x: "8%", y: "28%" },
              { text: "My Chinnu Munnu", x: "52%", y: "55%" },
              { text: "My Bangaara", x: "20%", y: "80%" },
            ].map((stone, i) => (
              <div
                key={`ns-${i}`}
                className="nickname-stone absolute px-5 py-3"
                style={{
                  left: stone.x,
                  top: stone.y,
                  opacity: 0,
                  background: "linear-gradient(135deg, #9e9e9e, #757575)",
                  borderRadius: 14,
                  boxShadow:
                    "inset 0 2px 4px rgba(255,255,255,0.15), 0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-caveat)",
                    fontSize: "clamp(0.95rem, 3vw, 1.3rem)",
                    color: "#FFF8E7",
                    whiteSpace: "nowrap",
                  }}
                >
                  {stone.text}
                </span>
              </div>
            ))}

            {/* Photo frames */}
            {[
              { x: "55%", y: "8%" },
              { x: "5%", y: "43%" },
              { x: "62%", y: "38%" },
              { x: "35%", y: "73%" },
            ].map((pos, i) => (
              <div
                key={`pf-${i}`}
                className="photo-frame absolute"
                style={{
                  left: pos.x,
                  top: pos.y,
                  opacity: 0,
                  width: 90,
                  height: 90,
                  border: "4px solid #8B7355",
                  borderRadius: 6,
                  boxShadow: "0 3px 10px rgba(0,0,0,0.3), inset 0 0 0 2px #654321",
                  background:
                    "linear-gradient(135deg, #fce4ec, #f8bbd0, #f48fb1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 28 }}>&#x1F339;</span>
              </div>
            ))}

            {/* Butterflies */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`bf-${i}`}
                className="butterfly absolute"
                style={{
                  left: `${20 + i * 18}%`,
                  top: `${15 + i * 15}%`,
                }}
              >
                <svg width="36" height="28" viewBox="0 0 36 28">
                  <ellipse
                    className="butterfly-wing"
                    cx="9"
                    cy="14"
                    rx="9"
                    ry="12"
                    fill={pick(["#FFB7C5", "#B57EDC", "#FFD700"])}
                    opacity={0.8}
                    style={{ transformOrigin: "18px 14px" }}
                  />
                  <ellipse
                    className="butterfly-wing"
                    cx="27"
                    cy="14"
                    rx="9"
                    ry="12"
                    fill={pick(["#FFB7C5", "#B57EDC", "#FFD700"])}
                    opacity={0.8}
                    style={{ transformOrigin: "18px 14px" }}
                  />
                  <ellipse cx="18" cy="14" rx="2" ry="10" fill="#654321" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ 5. THE WISHING WELL ════════════ */}
      <section
        ref={wellRef}
        data-section="well"
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, #3a7d32 0%, #2d5a27 20%, #4a3970 60%, #2c2454 100%)",
        }}
      >
        {/* Sparkles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`ws-${i}`}
            className="well-sparkle absolute"
            style={{
              width: rand(3, 6),
              height: rand(3, 6),
              borderRadius: "50%",
              background: "#FFD700",
              boxShadow: "0 0 6px 2px rgba(255,215,0,0.5)",
              left: `${rand(10, 90)}%`,
              top: `${rand(10, 90)}%`,
              opacity: 0,
            }}
          />
        ))}

        {/* Well structure */}
        <div className="relative flex flex-col items-center">
          {/* Roof */}
          <div
            className="well-roof"
            style={{
              opacity: 0,
              width: 0,
              height: 0,
              borderLeft: "70px solid transparent",
              borderRight: "70px solid transparent",
              borderBottom: "50px solid #8B7355",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
            }}
          />
          {/* Roof supports */}
          <div className="flex justify-between" style={{ width: 100, marginTop: -2 }}>
            <div
              className="well-roof"
              style={{
                width: 6,
                height: 50,
                background: "#654321",
                borderRadius: 2,
                opacity: 0,
              }}
            />
            <div
              className="well-roof"
              style={{
                width: 6,
                height: 50,
                background: "#654321",
                borderRadius: 2,
                opacity: 0,
              }}
            />
          </div>
          {/* Stone base */}
          <div
            className="well-base"
            style={{
              width: 120,
              height: 70,
              background: "linear-gradient(180deg, #9e9e9e, #757575)",
              borderRadius: "12px 12px 16px 16px",
              boxShadow:
                "inset 0 -3px 6px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.4)",
              opacity: 0,
              border: "3px solid #616161",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Bucket */}
            <div
              className="well-bucket"
              style={{
                width: 28,
                height: 24,
                background: "#8B7355",
                borderRadius: "2px 2px 6px 6px",
                border: "2px solid #654321",
                opacity: 0,
              }}
            />
          </div>
        </div>

        {/* Well text */}
        <div className="mt-10 text-center px-6" style={{ maxWidth: 440 }}>
          <p
            className="well-text"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)",
              color: "#FFF8E7",
              opacity: 0,
              textShadow: "0 0 20px rgba(255,215,0,0.2)",
              marginBottom: 16,
            }}
          >
            I wished for someone like you.
          </p>
          <p
            className="well-text"
            style={{
              fontFamily: "var(--font-lora)",
              fontSize: "clamp(0.9rem, 2.8vw, 1.15rem)",
              color: "#d4af37",
              opacity: 0,
              fontStyle: "italic",
            }}
          >
            The universe gave me someone even better.
          </p>
        </div>
      </section>

      {/* ════════════ 6. THE NYC SIGNPOST ════════════ */}
      <section
        ref={signpostRef}
        data-section="signpost"
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, #2c2454 0%, #b8860b 30%, #FFB347 60%, #FFD700 100%)",
        }}
      >
        {/* Signpost */}
        <div className="relative flex flex-col items-center">
          {/* Planks */}
          <div className="flex flex-col gap-4 items-start relative" style={{ left: 20 }}>
            {[
              "\u2192 New York City",
              "\u2192 Ken & Dana's",
              "\u2192 Something Sparkly",
            ].map((text, i) => (
              <div
                key={`plank-${i}`}
                className="signpost-plank"
                style={{
                  opacity: 0,
                  padding: "8px 24px 8px 16px",
                  background: "linear-gradient(90deg, #8B7355, #a0896c)",
                  borderRadius: "4px 12px 12px 4px",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
                  border: "2px solid #654321",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-caveat)",
                    fontSize: "clamp(1rem, 3vw, 1.4rem)",
                    color: "#FFF8E7",
                    whiteSpace: "nowrap",
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
          {/* Post */}
          <div
            className="signpost-pole"
            style={{
              width: 12,
              height: 200,
              background: "linear-gradient(180deg, #8B7355, #654321)",
              borderRadius: 4,
              transformOrigin: "bottom center",
              transform: "scaleY(0)",
              boxShadow: "2px 0 6px rgba(0,0,0,0.3)",
            }}
          />
        </div>

        {/* Diamond ring */}
        <div className="relative mt-10">
          {/* Sparkles around diamond */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * 360;
            const dist = 50;
            return (
              <div
                key={`ds-${i}`}
                className="diamond-sparkle absolute"
                style={{
                  width: 5,
                  height: 5,
                  background: "#FFD700",
                  borderRadius: "50%",
                  boxShadow: "0 0 6px 2px rgba(255,215,0,0.6)",
                  left: 30 + Math.cos((angle * Math.PI) / 180) * dist,
                  top: 30 + Math.sin((angle * Math.PI) / 180) * dist,
                  opacity: 0,
                }}
              />
            );
          })}
          <div className="diamond-ring relative flex flex-col items-center" style={{ opacity: 0 }}>
            {/* Diamond top */}
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "14px solid transparent",
                borderRight: "14px solid transparent",
                borderBottom: "16px solid #e0f7fa",
                filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))",
              }}
            />
            {/* Diamond body */}
            <div
              style={{
                width: 28,
                height: 28,
                background:
                  "linear-gradient(135deg, #e0f7fa, #b2ebf2, #80deea, #e0f7fa)",
                transform: "rotate(45deg)",
                marginTop: -6,
                boxShadow:
                  "0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(128,222,234,0.3)",
              }}
            />
            {/* Ring band */}
            <div
              style={{
                width: 40,
                height: 20,
                borderRadius: "0 0 50% 50%",
                border: "4px solid #FFD700",
                borderTop: "none",
                marginTop: 4,
              }}
            />
          </div>
        </div>

        {/* Text */}
        <p
          className="signpost-text mt-8 text-center px-6"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)",
            color: "#3e2723",
            opacity: 0,
            textShadow: "0 0 10px rgba(255,215,0,0.3)",
          }}
        >
          A new adventure awaits...
        </p>
      </section>

      {/* ════════════ 7. THE GAZEBO ════════════ */}
      <section
        ref={gazeboRef}
        data-section="gazebo"
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{
          minHeight: "100vh",
          background: yesClicked
            ? "linear-gradient(180deg, #FFF8E7 0%, #FFD700 40%, #FFE066 100%)"
            : "linear-gradient(180deg, #FFF8E7 0%, #f5e1c0 40%, #edd9b5 100%)",
          transition: "background 1.5s ease",
        }}
      >
        {/* Heart fireflies (hidden until YES) */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`hf-${i}`}
            className="heart-firefly absolute rounded-full"
            style={{
              width: 8,
              height: 8,
              background: "#FFD700",
              boxShadow: "0 0 10px 4px rgba(255,215,0,0.6)",
              left: `${rand(10, 90)}%`,
              top: `${rand(10, 90)}%`,
              opacity: 0,
              zIndex: 30,
            }}
          />
        ))}

        {/* Bloom explosion container */}
        <div
          id="bloom-explosion"
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 9999 }}
        />

        {/* Gazebo structure */}
        <div className="relative flex flex-col items-center" style={{ zIndex: 10 }}>
          {/* Roof */}
          <div
            className="gazebo-roof"
            style={{
              opacity: 0,
              width: 0,
              height: 0,
              borderLeft: "130px solid transparent",
              borderRight: "130px solid transparent",
              borderBottom: "70px solid #ffffff",
              filter: "drop-shadow(0 -3px 10px rgba(0,0,0,0.1))",
            }}
          />
          {/* Roof trim */}
          <div
            className="gazebo-roof"
            style={{
              width: 260,
              height: 8,
              background: "linear-gradient(90deg, #f5f5f5, #ffffff, #f5f5f5)",
              borderRadius: 2,
              opacity: 0,
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          />

          {/* Pillars area */}
          <div className="relative flex justify-between" style={{ width: 240, height: 200 }}>
            {/* Left pillar */}
            <div
              className="gazebo-pillar relative"
              style={{
                width: 10,
                height: "100%",
                background: "linear-gradient(180deg, #f5f5f5, #e0e0e0)",
                borderRadius: 3,
                transformOrigin: "bottom center",
                transform: "scaleY(0)",
                opacity: 0,
                boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
              }}
            >
              {/* Climbing roses on left pillar */}
              {Array.from({ length: 8 }).map((_, j) => (
                <div
                  key={`crl-${j}`}
                  className="climbing-rose absolute"
                  style={{
                    width: rand(6, 12),
                    height: rand(6, 12),
                    borderRadius: "50%",
                    background: pick(["#FFB7C5", "#ff9ec4", "#ffc8d6"]),
                    left: rand(-10, 4),
                    top: j * 24 + rand(-3, 3),
                    opacity: 0,
                    boxShadow: "0 0 4px rgba(255,183,197,0.4)",
                  }}
                />
              ))}
            </div>
            {/* Right pillar */}
            <div
              className="gazebo-pillar relative"
              style={{
                width: 10,
                height: "100%",
                background: "linear-gradient(180deg, #f5f5f5, #e0e0e0)",
                borderRadius: 3,
                transformOrigin: "bottom center",
                transform: "scaleY(0)",
                opacity: 0,
                boxShadow: "-2px 0 6px rgba(0,0,0,0.1)",
              }}
            >
              {/* Climbing roses on right pillar */}
              {Array.from({ length: 8 }).map((_, j) => (
                <div
                  key={`crr-${j}`}
                  className="climbing-rose absolute"
                  style={{
                    width: rand(6, 12),
                    height: rand(6, 12),
                    borderRadius: "50%",
                    background: pick(["#FFB7C5", "#ff9ec4", "#ffc8d6"]),
                    right: rand(-10, 4),
                    top: j * 24 + rand(-3, 3),
                    opacity: 0,
                    boxShadow: "0 0 4px rgba(255,183,197,0.4)",
                  }}
                />
              ))}
            </div>

            {/* Content inside gazebo */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center px-4"
              style={{ zIndex: 5 }}
            >
              <h1
                className="gazebo-question text-center"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.1rem, 4vw, 1.8rem)",
                  fontWeight: 700,
                  color: "#3e2723",
                  lineHeight: 1.4,
                  opacity: 0,
                  textShadow: "0 0 20px rgba(255,215,0,0.15)",
                }}
              >
                Srusti Sain,
                <br />
                will you be my Valentine?
              </h1>
            </div>
          </div>

          {/* Floor */}
          <div
            className="gazebo-floor"
            style={{
              width: 280,
              height: 12,
              background: "linear-gradient(90deg, #e0e0e0, #f5f5f5, #e0e0e0)",
              borderRadius: 4,
              opacity: 0,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />
        </div>

        {/* Buttons */}
        {!yesClicked && (
          <div
            className="gazebo-buttons relative mt-10 flex items-center gap-10"
            style={{ opacity: 0, minHeight: 100, minWidth: 280, zIndex: 20 }}
          >
            {/* YES button — blooming flower */}
            <button
              onClick={handleYes}
              className="relative flex items-center justify-center cursor-pointer group"
              style={{ outline: "none", border: "none", background: "none" }}
            >
              {/* Glow */}
              <div
                className="yes-glow absolute rounded-full"
                style={{
                  width: 90,
                  height: 90,
                  background: "radial-gradient(circle, rgba(255,183,197,0.5), transparent)",
                  zIndex: 0,
                }}
              />
              {/* Petals around button */}
              {Array.from({ length: 6 }).map((_, i) => {
                const a = (i / 6) * 360;
                const d = 30;
                return (
                  <div
                    key={`yp-${i}`}
                    className="absolute rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{
                      width: 18,
                      height: 22,
                      background: pick([
                        "#FFB7C5",
                        "#ffc8d6",
                        "#ff9ec4",
                      ]),
                      borderRadius: "50% 50% 50% 50%",
                      left: 28 + Math.cos((a * Math.PI) / 180) * d,
                      top: 24 + Math.sin((a * Math.PI) / 180) * d,
                      zIndex: 1,
                      boxShadow: "0 0 5px rgba(255,183,197,0.4)",
                    }}
                  />
                );
              })}
              {/* Center */}
              <div
                className="relative rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  width: 60,
                  height: 60,
                  background:
                    "radial-gradient(circle, #FF69B4, #ff5c9e)",
                  zIndex: 2,
                  boxShadow: "0 0 20px rgba(255,105,180,0.5)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "#fff",
                  }}
                >
                  Yes
                </span>
              </div>
            </button>

            {/* NO button — weed */}
            <div className="relative" style={{ width: 80, height: 70 }}>
              <button
                onClick={handleNo}
                onTouchEnd={handleNo}
                className="absolute cursor-pointer transition-all duration-200"
                style={{
                  outline: "none",
                  border: "2px solid #5a6e4f",
                  background: "linear-gradient(180deg, #8a9a7b, #6b7d5e)",
                  borderRadius: 10,
                  padding: "10px 18px",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
                  left: noPos ? noPos.x : 0,
                  top: noPos ? noPos.y : 0,
                  zIndex: 10,
                }}
              >
                {/* Tiny dead leaves on top */}
                <div className="flex gap-1 justify-center mb-1">
                  <div
                    style={{
                      width: 6,
                      height: 10,
                      background: "#5a6e4f",
                      borderRadius: "50% 50% 0 0",
                      transform: "rotate(-15deg)",
                    }}
                  />
                  <div
                    style={{
                      width: 6,
                      height: 10,
                      background: "#4a5e3f",
                      borderRadius: "50% 50% 0 0",
                      transform: "rotate(15deg)",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-lora)",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "#d2d8cc",
                  }}
                >
                  No
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Weed removed message */}
        {showWeedMsg && (
          <div
            className="fixed bottom-8 left-1/2 px-6 py-3 rounded-full z-50"
            style={{
              transform: "translateX(-50%)",
              background: "rgba(62,39,35,0.9)",
              color: "#FFD700",
              fontFamily: "var(--font-caveat)",
              fontSize: "clamp(1rem, 3vw, 1.3rem)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              animation: "fadeInOut 2s ease forwards",
            }}
          >
            {weedMsg}
          </div>
        )}

        {/* YES banner */}
        {yesClicked && (
          <div
            className="yes-banner mt-8 text-center px-6 py-8"
            style={{
              transformOrigin: "top center",
              transform: "scaleY(0)",
              opacity: 0,
              maxWidth: 500,
              zIndex: 20,
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-dancing)",
                fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                color: "#3e2723",
                marginBottom: 12,
                textShadow: "0 0 15px rgba(255,215,0,0.3)",
              }}
            >
              She said YES!
            </h2>
            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)",
                color: "#5d4037",
                marginBottom: 8,
              }}
            >
              NYC, here we come, bangaara!
            </p>
            <p
              style={{
                fontFamily: "var(--font-lora)",
                fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                color: "#795548",
                fontStyle: "italic",
              }}
            >
              Ken &amp; Dana&apos;s is waiting for us.
            </p>
          </div>
        )}

        <style jsx>{`
          @keyframes fadeInOut {
            0% {
              opacity: 0;
              transform: translateX(-50%) translateY(20px);
            }
            15% {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
            80% {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
            100% {
              opacity: 0;
              transform: translateX(-50%) translateY(-10px);
            }
          }
        `}</style>
      </section>
    </main>
  );
}
