"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

/* ──────────────────────────────────────────────
   Dandiya Night to Diamond Ring
   A cinematic origin-story journey for Srusti
   ────────────────────────────────────────────── */

// ─── playful messages when "No" button is dodged ────────────────────────
const NO_MESSAGES = [
  "The dandiya sticks say NO to No!",
  "Not happening!",
  "Wrong answer!",
  "Try the other one!",
  "Kuttu Paapu, you know the answer!",
  "Nope, try again!",
  "The universe disagrees!",
  "Bangaara, seriously?!",
  "Dandiya sticks are protecting YES!",
  "Chinnu Munnu, come on!",
];

// ─── Adventure card data ────────────────────────────────────────────────
const ADVENTURES = [
  { label: "The Foodies", gradient: "from-orange-300 to-rose-400" },
  { label: "The Explorers", gradient: "from-sky-300 to-indigo-400" },
  { label: "The Shoppers", gradient: "from-pink-300 to-fuchsia-400" },
  { label: "The Laughers", gradient: "from-amber-300 to-yellow-400" },
  { label: "The Dreamers", gradient: "from-violet-300 to-purple-400" },
  { label: "The Best Friends", gradient: "from-teal-300 to-emerald-400" },
];

// ─── Nickname card data ─────────────────────────────────────────────────
const NICKNAMES = [
  { name: "Kuttu Paapu", bg: "bg-pink-200", border: "border-pink-400" },
  { name: "Chinnu Munnu", bg: "bg-purple-200", border: "border-purple-400" },
  { name: "Bangaara", bg: "bg-amber-200", border: "border-amber-400" },
];

export default function DandiyaPage() {
  /* ── refs for every chapter ── */
  const openingRef = useRef<HTMLDivElement>(null);
  const ch1Ref = useRef<HTMLDivElement>(null);
  const ch2Ref = useRef<HTMLDivElement>(null);
  const ch3Ref = useRef<HTMLDivElement>(null);
  const ch4Ref = useRef<HTMLDivElement>(null);
  const ch5Ref = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  /* ── state ── */
  const [saidYes, setSaidYes] = useState(false);
  const [noMsg, setNoMsg] = useState("");
  const [noMsgVisible, setNoMsgVisible] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const noDodgeCount = useRef(0);
  const confettiContainerRef = useRef<HTMLDivElement>(null);
  const animeRef = useRef<{
    animate: Function;
    stagger: Function;
    createTimeline: Function;
  } | null>(null);

  /* ── typed text state ── */
  const [typedText, setTypedText] = useState("");
  const typewriterTriggered = useRef(false);
  const fullTypeText = "And just like that, I found my Kuttu Paapu.";

  /* ── track which sections have been animated ── */
  const animatedSections = useRef<Set<string>>(new Set());

  /* ── dodge the No button ── */
  const dodgeNo = useCallback(() => {
    if (!noButtonRef.current || saidYes) return;
    const parent = noButtonRef.current.parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const btnRect = noButtonRef.current.getBoundingClientRect();

    const maxX = parentRect.width - btnRect.width - 20;
    const maxY = parentRect.height - btnRect.height - 20;

    const randX = Math.random() * maxX;
    const randY = Math.random() * maxY;

    if (animeRef.current) {
      animeRef.current.animate(noButtonRef.current, {
        left: `${randX}px`,
        top: `${randY}px`,
        duration: 300,
        ease: "outElastic(1, .6)",
      });
    } else {
      noButtonRef.current.style.left = `${randX}px`;
      noButtonRef.current.style.top = `${randY}px`;
    }

    noDodgeCount.current += 1;
    const msg = NO_MESSAGES[noDodgeCount.current % NO_MESSAGES.length];
    setNoMsg(msg);
    setNoMsgVisible(true);
    setTimeout(() => setNoMsgVisible(false), 1800);
  }, [saidYes]);

  /* ── YES clicked ── */
  const handleYes = useCallback(() => {
    setSaidYes(true);
    if (!animeRef.current || !confettiContainerRef.current) return;
    const { animate } = animeRef.current;
    const container = confettiContainerRef.current;
    container.innerHTML = "";

    // create 60 confetti pieces
    const colors = [
      "#FFD700", "#FFB7C5", "#E6E6FA", "#FF8C00",
      "#FF69B4", "#7B68EE", "#FF6347", "#00CED1",
      "#FFA07A", "#DDA0DD",
    ];
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement("div");
      const size = 6 + Math.random() * 10;
      piece.style.position = "absolute";
      piece.style.width = `${size}px`;
      piece.style.height = `${size}px`;
      piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      piece.style.backgroundColor = colors[i % colors.length];
      piece.style.left = "50%";
      piece.style.top = "50%";
      piece.style.pointerEvents = "none";
      piece.classList.add("confetti-piece");
      container.appendChild(piece);
    }

    animate(".confetti-piece", {
      translateX: () => (Math.random() - 0.5) * 800,
      translateY: () => (Math.random() - 0.5) * 800 - 200,
      rotate: () => Math.random() * 720 - 360,
      scale: [1, 0],
      opacity: [1, 0],
      duration: 2000,
      ease: "outQuad",
      delay: () => Math.random() * 400,
    });
  }, []);

  /* ── Intersection Observer + anime.js animations ── */
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    import("animejs").then((mod) => {
      const { animate, stagger, createTimeline } = mod;
      animeRef.current = { animate, stagger, createTimeline };

      /* ── helper: run animation once per section key ── */
      const once = (key: string, fn: () => void) => {
        if (animatedSections.current.has(key)) return;
        animatedSections.current.add(key);
        fn();
      };

      /* ── section animation map ── */
      const animateSection = (key: string) => {
        switch (key) {
          /* ───────── Opening ───────── */
          case "opening": {
            once("opening", () => {
              // Dandiya sticks
              const tl = createTimeline({
                loop: true,
                defaults: { duration: 400, ease: "inOutQuad" },
              });
              tl.add(".stick-left", { rotate: [-30, 30] })
                .add(".stick-right", { rotate: [30, -30] }, "<<");

              // concentric circles bloom
              animate(".navratri-circle", {
                scale: [0, 1],
                opacity: [0, 0.6],
                delay: stagger(200, { start: 300 }),
                duration: 1200,
                ease: "outQuad",
              });

              // text fade in
              animate(".opening-text", {
                opacity: [0, 1],
                translateY: [40, 0],
                delay: 1000,
                duration: 1200,
                ease: "outQuad",
              });
            });
            break;
          }

          /* ───────── Chapter 1 ───────── */
          case "ch1": {
            once("ch1", () => {
              // photo frame
              animate(".ch1-photo", {
                opacity: [0, 1],
                scale: [0.8, 1],
                duration: 1000,
                ease: "outQuad",
              });

              // typewriter
              if (!typewriterTriggered.current) {
                typewriterTriggered.current = true;
                let idx = 0;
                const interval = setInterval(() => {
                  idx++;
                  setTypedText(fullTypeText.slice(0, idx));
                  if (idx >= fullTypeText.length) clearInterval(interval);
                }, 55);
              }

              // floating hearts
              animate(".float-heart", {
                translateY: [60, -600],
                translateX: () => (Math.random() - 0.5) * 100,
                opacity: [1, 0],
                duration: () => 3000 + Math.random() * 2000,
                delay: stagger(300),
                loop: true,
                ease: "outQuad",
              });
            });
            break;
          }

          /* ───────── Chapter 2 ───────── */
          case "ch2": {
            once("ch2", () => {
              animate(".ch2-title", {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
                ease: "outQuad",
              });

              animate(".adventure-card", {
                opacity: [0, 1],
                translateX: ((_el: any, i: number) =>
                  [i % 2 === 0 ? -120 : 120, 0]) as any,
                translateY: ((_el: any, i: number) =>
                  [i < 2 ? -80 : i > 3 ? 80 : 0, 0]) as any,
                rotate: [() => (Math.random() - 0.5) * 20, 0],
                delay: stagger(150, { start: 300 }),
                duration: 800,
                ease: "outQuad",
              });
            });
            break;
          }

          /* ───────── Chapter 3 ───────── */
          case "ch3": {
            once("ch3", () => {
              animate(".nickname-card", {
                opacity: [0, 1],
                scale: [0.3, 1],
                translateY: [60, 0],
                delay: stagger(250, { start: 200 }),
                duration: 900,
                ease: "outElastic(1, .6)",
              });

              // gentle float loop
              animate(".nickname-card", {
                translateY: [-8, 8],
                duration: 2400,
                ease: "inOutSine",
                loop: true,
                alternate: true,
                delay: stagger(300),
              });

              animate(".center-heart-svg", {
                scale: [0, 1],
                opacity: [0, 1],
                duration: 1000,
                ease: "outElastic(1, .5)",
                delay: 800,
              });
            });
            break;
          }

          /* ───────── Chapter 4 ───────── */
          case "ch4": {
            once("ch4", () => {
              // flowers grow
              animate(".flower-stem", {
                scaleY: [0, 1],
                delay: stagger(200, { start: 200 }),
                duration: 1200,
                ease: "outElastic(1, .6)",
              });

              animate(".flower-head", {
                scale: [0, 1],
                opacity: [0, 1],
                delay: stagger(200, { start: 700 }),
                duration: 800,
                ease: "outElastic(1, .5)",
              });

              // photo frames
              animate(".garden-photo", {
                opacity: [0, 1],
                scale: [0.7, 1],
                delay: stagger(300, { start: 1200 }),
                duration: 800,
                ease: "outQuad",
              });

              // butterflies
              animate(".butterfly", {
                translateX: [() => -200, () => 200 + Math.random() * 200],
                translateY: () => [
                  Math.random() * -50,
                  Math.random() * -50 - 30,
                ],
                duration: () => 6000 + Math.random() * 4000,
                loop: true,
                ease: "inOutSine",
                delay: stagger(800),
              });
            });
            break;
          }

          /* ───────── Chapter 5 ───────── */
          case "ch5": {
            once("ch5", () => {
              // skylines
              animate(".skyline-boston", {
                opacity: [0, 1],
                translateX: [-60, 0],
                duration: 1000,
                ease: "outQuad",
              });
              animate(".skyline-nyc", {
                opacity: [0, 1],
                translateX: [60, 0],
                duration: 1000,
                delay: 300,
                ease: "outQuad",
              });

              // dotted path draw
              animate(".travel-path", {
                strokeDashoffset: [500, 0],
                duration: 2000,
                delay: 600,
                ease: "inOutQuad",
              });

              // heart along path
              animate(".travel-heart", {
                translateX: [0, 1],
                opacity: [0, 1],
                duration: 2500,
                delay: 600,
                ease: "inOutQuad",
              });

              // sparkle around ring
              animate(".ring-sparkle", {
                scale: [0, 1.3, 0],
                opacity: [0, 1, 0],
                duration: 1500,
                delay: stagger(200, { start: 2000 }),
                loop: true,
                ease: "inOutSine",
              });

              // bottom text
              animate(".ch5-text", {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 1000,
                delay: 1800,
                ease: "outQuad",
              });
            });
            break;
          }

          /* ───────── The Question ───────── */
          case "question": {
            once("question", () => {
              animate(".q-title", {
                opacity: [0, 1],
                translateY: [40, 0],
                duration: 1200,
                ease: "outQuad",
              });
              animate(".q-buttons", {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
                delay: 800,
                ease: "outQuad",
              });
              // Yes pulse
              animate(".yes-btn", {
                scale: [1, 1.06],
                duration: 800,
                loop: true,
                alternate: true,
                ease: "inOutSine",
              });
            });
            break;
          }
        }
      };

      /* ── Intersection Observer ── */
      const sectionMap: { key: string; ref: React.RefObject<HTMLDivElement | null> }[] = [
        { key: "opening", ref: openingRef },
        { key: "ch1", ref: ch1Ref },
        { key: "ch2", ref: ch2Ref },
        { key: "ch3", ref: ch3Ref },
        { key: "ch4", ref: ch4Ref },
        { key: "ch5", ref: ch5Ref },
        { key: "question", ref: questionRef },
      ];

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const key = entry.target.getAttribute("data-section");
              if (key) animateSection(key);
            }
          });
        },
        { threshold: 0.2 }
      );

      sectionMap.forEach(({ key, ref }) => {
        if (ref.current) {
          ref.current.setAttribute("data-section", key);
          observer!.observe(ref.current);
        }
      });
    });

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  /* ═══════════════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════════ */
  return (
    <div className="hide-scrollbar w-full overflow-x-hidden">
      {/* ──────────────────────────────────────────────────────────────
          OPENING SCENE  --  "It Started with a Dance"
          ────────────────────────────────────────────────────────────── */}
      <section
        ref={openingRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at center, #3a1c71 0%, #2D1B69 40%, #1a0a3e 100%)",
        }}
      >
        {/* Navratri concentric circles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[320, 420, 540, 660, 780].map((size, i) => (
            <div
              key={i}
              className="navratri-circle absolute rounded-full opacity-0"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                border: `2px solid ${
                  [
                    "rgba(255,215,0,0.5)",
                    "rgba(255,140,0,0.4)",
                    "rgba(255,0,255,0.25)",
                    "rgba(255,105,180,0.2)",
                    "rgba(255,215,0,0.15)",
                  ][i]
                }`,
                boxShadow: `0 0 ${20 + i * 8}px ${
                  [
                    "rgba(255,215,0,0.15)",
                    "rgba(255,140,0,0.1)",
                    "rgba(255,0,255,0.08)",
                    "rgba(255,105,180,0.06)",
                    "rgba(255,215,0,0.04)",
                  ][i]
                }`,
              }}
            />
          ))}
        </div>

        {/* Dandiya Sticks SVG */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="relative w-64 h-40 sm:w-80 sm:h-48 flex items-center justify-center">
            {/* Left Stick */}
            <svg
              className="stick-left absolute"
              width="180"
              height="24"
              viewBox="0 0 180 24"
              style={{ transformOrigin: "90% 50%", left: "0", top: "40%" }}
            >
              <defs>
                <linearGradient id="stickL" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FF6347" />
                  <stop offset="50%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FF8C00" />
                </linearGradient>
              </defs>
              <rect
                x="0"
                y="8"
                width="160"
                height="8"
                rx="4"
                fill="url(#stickL)"
              />
              {/* decorative bands */}
              <rect x="10" y="6" width="6" height="12" rx="2" fill="#fff" opacity="0.7" />
              <rect x="24" y="6" width="6" height="12" rx="2" fill="#FF00FF" opacity="0.6" />
              <rect x="38" y="6" width="6" height="12" rx="2" fill="#fff" opacity="0.7" />
              {/* tip */}
              <circle cx="168" cy="12" r="10" fill="#FFD700" />
              <circle cx="168" cy="12" r="6" fill="#FF6347" />
              <circle cx="168" cy="12" r="3" fill="#fff" opacity="0.6" />
            </svg>

            {/* Right Stick */}
            <svg
              className="stick-right absolute"
              width="180"
              height="24"
              viewBox="0 0 180 24"
              style={{
                transformOrigin: "10% 50%",
                right: "0",
                top: "40%",
                transform: "scaleX(-1)",
              }}
            >
              <defs>
                <linearGradient id="stickR" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FF69B4" />
                  <stop offset="50%" stopColor="#DDA0DD" />
                  <stop offset="100%" stopColor="#FFD700" />
                </linearGradient>
              </defs>
              <rect
                x="0"
                y="8"
                width="160"
                height="8"
                rx="4"
                fill="url(#stickR)"
              />
              <rect x="10" y="6" width="6" height="12" rx="2" fill="#fff" opacity="0.7" />
              <rect x="24" y="6" width="6" height="12" rx="2" fill="#7B68EE" opacity="0.6" />
              <rect x="38" y="6" width="6" height="12" rx="2" fill="#fff" opacity="0.7" />
              <circle cx="168" cy="12" r="10" fill="#DDA0DD" />
              <circle cx="168" cy="12" r="6" fill="#FF69B4" />
              <circle cx="168" cy="12" r="3" fill="#fff" opacity="0.6" />
            </svg>
          </div>

          {/* Opening Text */}
          <div className="opening-text opacity-0 text-center px-6 max-w-2xl">
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "#FFD700",
                textShadow: "0 0 40px rgba(255,215,0,0.3)",
              }}
            >
              It Started with a Dance
            </h1>
            <p
              className="text-base sm:text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: "var(--font-lora)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              Cabot Hall. Northeastern University.
              <br />
              One Dandiya night that changed everything.
            </p>
          </div>
        </div>

        {/* floating sparkle dots */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none animate-pulse"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              backgroundColor: ["#FFD700", "#FF8C00", "#FF69B4", "#DDA0DD"][i % 4],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.4 + Math.random() * 0.4,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </section>

      {/* ──────────────────────────────────────────────────────────────
          CHAPTER 1  --  "The First Hello"
          ────────────────────────────────────────────────────────────── */}
      <section
        ref={ch1Ref}
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #2D1B69 0%, #4a2080 20%, #9b69c9 50%, #E6E6FA 80%, #FFB7C5 100%)",
        }}
      >
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 max-w-2xl">
          {/* Photo placeholder */}
          <div
            className="ch1-photo opacity-0 w-64 h-72 sm:w-80 sm:h-96 rounded-2xl shadow-2xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #E6E6FA 0%, #FFB7C5 50%, #DDA0DD 100%)",
              border: "3px solid rgba(255,255,255,0.5)",
            }}
          >
            <span
              className="text-white/70 text-sm sm:text-base text-center px-4"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Our First Photo Together
            </span>
          </div>

          {/* Typewriter text */}
          <p
            className="text-xl sm:text-2xl md:text-3xl text-center min-h-[80px]"
            style={{
              fontFamily: "var(--font-dancing)",
              color: "#2D1B69",
            }}
          >
            {typedText}
            <span className="animate-pulse text-pink-400">|</span>
          </p>
        </div>

        {/* Floating hearts */}
        <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="float-heart absolute text-pink-400"
              style={{
                left: `${8 + (i * 7.5)}%`,
                bottom: "-30px",
                fontSize: `${14 + Math.random() * 16}px`,
                opacity: 0.5 + Math.random() * 0.5,
              }}
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          CHAPTER 2  --  "The Adventures"
          ────────────────────────────────────────────────────────────── */}
      <section
        ref={ch2Ref}
        className="relative flex min-h-screen items-center justify-center overflow-hidden py-16"
        style={{
          background:
            "linear-gradient(180deg, #FFB7C5 0%, #f5e6fa 30%, #E6E6FA 100%)",
        }}
      >
        <div className="relative z-10 flex flex-col items-center gap-10 px-4 sm:px-8 w-full max-w-4xl">
          <h2
            className="ch2-title opacity-0 text-3xl sm:text-4xl md:text-5xl font-bold text-center"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "#2D1B69",
            }}
          >
            Our Adventures
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full">
            {ADVENTURES.map((adv, i) => (
              <div
                key={i}
                className={`adventure-card opacity-0 bg-gradient-to-br ${adv.gradient} rounded-2xl shadow-lg aspect-[4/5] flex flex-col items-center justify-center p-4 hover:scale-105 transition-transform duration-300`}
              >
                <div className="w-full h-3/4 rounded-xl bg-white/30 backdrop-blur-sm mb-3 flex items-center justify-center">
                  <span
                    className="text-white/60 text-xs sm:text-sm text-center"
                    style={{ fontFamily: "var(--font-lora)" }}
                  >
                    Photo
                  </span>
                </div>
                <span
                  className="text-white font-semibold text-sm sm:text-base md:text-lg text-center"
                  style={{ fontFamily: "var(--font-dancing)" }}
                >
                  {adv.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          CHAPTER 3  --  "The Names I Call You"
          ────────────────────────────────────────────────────────────── */}
      <section
        ref={ch3Ref}
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #E6E6FA 0%, #f0e0f7 50%, #FFB7C5 100%)",
        }}
      >
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 w-full max-w-3xl">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "#2D1B69",
            }}
          >
            The Names I Call You
          </h2>

          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full">
            {/* central heart */}
            <svg
              className="center-heart-svg absolute opacity-0 pointer-events-none hidden sm:block"
              width="120"
              height="110"
              viewBox="0 0 24 24"
              fill="none"
              style={{ zIndex: 0 }}
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="rgba(255,105,180,0.15)"
                stroke="#FF69B4"
                strokeWidth="0.5"
              />
            </svg>

            {NICKNAMES.map((nick, i) => (
              <div
                key={i}
                className={`nickname-card opacity-0 ${nick.bg} ${nick.border} border-2 rounded-3xl px-8 py-10 sm:px-10 sm:py-12 shadow-xl text-center relative z-10`}
                style={{ minWidth: "170px" }}
              >
                <p
                  className="text-2xl sm:text-3xl md:text-4xl"
                  style={{
                    fontFamily: "var(--font-dancing)",
                    color: "#2D1B69",
                  }}
                >
                  {nick.name}
                </p>
              </div>
            ))}
          </div>

          {/* mobile heart */}
          <svg
            className="center-heart-svg opacity-0 sm:hidden"
            width="80"
            height="74"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="rgba(255,105,180,0.2)"
              stroke="#FF69B4"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          CHAPTER 4  --  "Her Garden"
          ────────────────────────────────────────────────────────────── */}
      <section
        ref={ch4Ref}
        className="relative flex min-h-screen items-end justify-center overflow-hidden pb-0"
        style={{
          background:
            "linear-gradient(180deg, #87CEEB 0%, #d4f0d4 40%, #b5e8b5 70%, #8fbc8f 100%)",
        }}
      >
        {/* butterflies */}
        {[0, 1, 2].map((i) => (
          <svg
            key={i}
            className="butterfly absolute pointer-events-none"
            width="32"
            height="28"
            viewBox="0 0 32 28"
            style={{
              left: `${-10 + i * 10}%`,
              top: `${15 + i * 20}%`,
              opacity: 0.7,
            }}
          >
            <g fill="#B57EDC">
              <ellipse cx="10" cy="10" rx="9" ry="7" opacity="0.8">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 10 14;-20 10 14;0 10 14"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </ellipse>
              <ellipse cx="22" cy="10" rx="9" ry="7" opacity="0.8">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 22 14;20 22 14;0 22 14"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </ellipse>
              <ellipse cx="10" cy="17" rx="6" ry="5" opacity="0.6">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 10 14;-15 10 14;0 10 14"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </ellipse>
              <ellipse cx="22" cy="17" rx="6" ry="5" opacity="0.6">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 22 14;15 22 14;0 22 14"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </ellipse>
              <rect x="15" y="4" width="2" height="20" rx="1" fill="#7B68EE" />
            </g>
          </svg>
        ))}

        {/* photo placeholders among flowers */}
        <div className="absolute top-[12%] left-[8%] sm:left-[15%] z-10">
          <div
            className="garden-photo opacity-0 w-28 h-36 sm:w-36 sm:h-44 rounded-xl shadow-lg flex items-center justify-center -rotate-6"
            style={{
              background:
                "linear-gradient(135deg, #FFB7C5 0%, #E6E6FA 100%)",
              border: "3px solid white",
            }}
          >
            <span
              className="text-white/70 text-xs text-center"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Garden Date
            </span>
          </div>
        </div>
        <div className="absolute top-[18%] right-[8%] sm:right-[15%] z-10">
          <div
            className="garden-photo opacity-0 w-28 h-36 sm:w-36 sm:h-44 rounded-xl shadow-lg flex items-center justify-center rotate-6"
            style={{
              background:
                "linear-gradient(135deg, #E6E6FA 0%, #DDA0DD 100%)",
              border: "3px solid white",
            }}
          >
            <span
              className="text-white/70 text-xs text-center"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Flower Market
            </span>
          </div>
        </div>

        {/* Title at the top */}
        <h2
          className="absolute top-[5%] left-1/2 -translate-x-1/2 text-3xl sm:text-4xl md:text-5xl font-bold text-center z-20"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "#2D1B69",
          }}
        >
          Her Garden
        </h2>

        {/* Flowers growing from the bottom */}
        <div className="relative w-full flex items-end justify-center gap-2 sm:gap-4 px-4 pb-0 z-10">
          {/* Pink Rose 1 */}
          <div className="flex flex-col items-center" style={{ transformOrigin: "bottom center" }}>
            <svg className="flower-head opacity-0" width="50" height="50" viewBox="0 0 50 50">
              <circle cx="25" cy="25" r="12" fill="#FFB7C5" />
              <circle cx="18" cy="18" r="10" fill="#FF69B4" opacity="0.6" />
              <circle cx="32" cy="18" r="10" fill="#FF69B4" opacity="0.6" />
              <circle cx="18" cy="30" r="10" fill="#FF69B4" opacity="0.5" />
              <circle cx="32" cy="30" r="10" fill="#FF69B4" opacity="0.5" />
              <circle cx="25" cy="25" r="7" fill="#FFB7C5" />
              <circle cx="25" cy="25" r="4" fill="#FF69B4" opacity="0.4" />
            </svg>
            <div
              className="flower-stem w-1.5 bg-gradient-to-t from-green-700 to-green-500 rounded-full"
              style={{ height: "160px", transformOrigin: "bottom center" }}
            />
          </div>

          {/* White Lily 1 */}
          <div className="flex flex-col items-center" style={{ transformOrigin: "bottom center" }}>
            <svg className="flower-head opacity-0" width="56" height="56" viewBox="0 0 56 56">
              <ellipse cx="28" cy="14" rx="8" ry="14" fill="white" opacity="0.9" />
              <ellipse
                cx="14" cy="28" rx="8" ry="14" fill="white" opacity="0.85"
                transform="rotate(-60 14 28)"
              />
              <ellipse
                cx="42" cy="28" rx="8" ry="14" fill="white" opacity="0.85"
                transform="rotate(60 42 28)"
              />
              <ellipse
                cx="18" cy="42" rx="8" ry="14" fill="white" opacity="0.8"
                transform="rotate(-120 18 42)"
              />
              <ellipse
                cx="38" cy="42" rx="8" ry="14" fill="white" opacity="0.8"
                transform="rotate(120 38 42)"
              />
              <circle cx="28" cy="28" r="5" fill="#FFFACD" />
              <circle cx="26" cy="27" r="1" fill="#DAA520" />
              <circle cx="30" cy="27" r="1" fill="#DAA520" />
              <circle cx="28" cy="30" r="1" fill="#DAA520" />
            </svg>
            <div
              className="flower-stem w-1.5 bg-gradient-to-t from-green-700 to-green-500 rounded-full"
              style={{ height: "200px", transformOrigin: "bottom center" }}
            />
          </div>

          {/* Lavender stem 1 */}
          <div className="flex flex-col items-center" style={{ transformOrigin: "bottom center" }}>
            <svg className="flower-head opacity-0" width="24" height="70" viewBox="0 0 24 70">
              {[0, 8, 16, 24, 32, 40, 48].map((y, j) => (
                <ellipse
                  key={j}
                  cx={12 + (j % 2 === 0 ? -3 : 3)}
                  cy={y + 5}
                  rx="6"
                  ry="5"
                  fill="#B57EDC"
                  opacity={0.6 + j * 0.05}
                />
              ))}
            </svg>
            <div
              className="flower-stem w-1 bg-gradient-to-t from-green-700 to-green-500 rounded-full"
              style={{ height: "130px", transformOrigin: "bottom center" }}
            />
          </div>

          {/* Pink Rose 2 */}
          <div className="flex flex-col items-center" style={{ transformOrigin: "bottom center" }}>
            <svg className="flower-head opacity-0" width="44" height="44" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="10" fill="#FF69B4" />
              <circle cx="15" cy="16" r="9" fill="#FFB7C5" opacity="0.7" />
              <circle cx="29" cy="16" r="9" fill="#FFB7C5" opacity="0.7" />
              <circle cx="15" cy="28" r="9" fill="#FFB7C5" opacity="0.6" />
              <circle cx="29" cy="28" r="9" fill="#FFB7C5" opacity="0.6" />
              <circle cx="22" cy="22" r="6" fill="#FF69B4" />
              <circle cx="22" cy="22" r="3" fill="#FFB7C5" opacity="0.5" />
            </svg>
            <div
              className="flower-stem w-1.5 bg-gradient-to-t from-green-700 to-green-500 rounded-full"
              style={{ height: "180px", transformOrigin: "bottom center" }}
            />
          </div>

          {/* White Lily 2 */}
          <div className="flex flex-col items-center" style={{ transformOrigin: "bottom center" }}>
            <svg className="flower-head opacity-0" width="48" height="48" viewBox="0 0 48 48">
              <ellipse cx="24" cy="10" rx="7" ry="12" fill="white" opacity="0.9" />
              <ellipse
                cx="12" cy="24" rx="7" ry="12" fill="white" opacity="0.85"
                transform="rotate(-72 12 24)"
              />
              <ellipse
                cx="36" cy="24" rx="7" ry="12" fill="white" opacity="0.85"
                transform="rotate(72 36 24)"
              />
              <ellipse
                cx="15" cy="38" rx="7" ry="12" fill="white" opacity="0.8"
                transform="rotate(-144 15 38)"
              />
              <ellipse
                cx="33" cy="38" rx="7" ry="12" fill="white" opacity="0.8"
                transform="rotate(144 33 38)"
              />
              <circle cx="24" cy="24" r="4" fill="#FFFACD" />
            </svg>
            <div
              className="flower-stem w-1.5 bg-gradient-to-t from-green-700 to-green-500 rounded-full"
              style={{ height: "150px", transformOrigin: "bottom center" }}
            />
          </div>

          {/* Lavender stem 2 */}
          <div className="flex flex-col items-center" style={{ transformOrigin: "bottom center" }}>
            <svg className="flower-head opacity-0" width="24" height="60" viewBox="0 0 24 60">
              {[0, 8, 16, 24, 32, 40].map((y, j) => (
                <ellipse
                  key={j}
                  cx={12 + (j % 2 === 0 ? 3 : -3)}
                  cy={y + 5}
                  rx="6"
                  ry="5"
                  fill="#B57EDC"
                  opacity={0.6 + j * 0.05}
                />
              ))}
            </svg>
            <div
              className="flower-stem w-1 bg-gradient-to-t from-green-700 to-green-500 rounded-full"
              style={{ height: "120px", transformOrigin: "bottom center" }}
            />
          </div>

          {/* Pink Rose 3 */}
          <div className="hidden sm:flex flex-col items-center" style={{ transformOrigin: "bottom center" }}>
            <svg className="flower-head opacity-0" width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="10" fill="#FFB7C5" />
              <circle cx="14" cy="14" r="8" fill="#FF69B4" opacity="0.6" />
              <circle cx="26" cy="14" r="8" fill="#FF69B4" opacity="0.6" />
              <circle cx="14" cy="26" r="8" fill="#FF69B4" opacity="0.5" />
              <circle cx="26" cy="26" r="8" fill="#FF69B4" opacity="0.5" />
              <circle cx="20" cy="20" r="5" fill="#FFB7C5" />
            </svg>
            <div
              className="flower-stem w-1.5 bg-gradient-to-t from-green-700 to-green-500 rounded-full"
              style={{ height: "170px", transformOrigin: "bottom center" }}
            />
          </div>

          {/* Lavender stem 3 */}
          <div className="hidden sm:flex flex-col items-center" style={{ transformOrigin: "bottom center" }}>
            <svg className="flower-head opacity-0" width="24" height="55" viewBox="0 0 24 55">
              {[0, 8, 16, 24, 32].map((y, j) => (
                <ellipse
                  key={j}
                  cx={12 + (j % 2 === 0 ? -3 : 3)}
                  cy={y + 5}
                  rx="6"
                  ry="5"
                  fill="#9B59B6"
                  opacity={0.6 + j * 0.06}
                />
              ))}
            </svg>
            <div
              className="flower-stem w-1 bg-gradient-to-t from-green-700 to-green-500 rounded-full"
              style={{ height: "140px", transformOrigin: "bottom center" }}
            />
          </div>
        </div>

        {/* Grass at the very bottom */}
        <div
          className="absolute bottom-0 left-0 w-full h-16"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, #4a8c4a 40%, #2d6b2d 100%)",
          }}
        />
      </section>

      {/* ──────────────────────────────────────────────────────────────
          CHAPTER 5  --  "What's Next"
          ────────────────────────────────────────────────────────────── */}
      <section
        ref={ch5Ref}
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #FF8C42 0%, #C75B7A 25%, #7B68EE 55%, #1a0a3e 100%)",
        }}
      >
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 w-full max-w-4xl">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "#FFD700",
              textShadow: "0 0 30px rgba(255,215,0,0.25)",
            }}
          >
            What&apos;s Next
          </h2>

          {/* Skylines + path */}
          <div className="relative w-full flex items-end justify-between gap-2 sm:gap-4 mt-4">
            {/* Boston Skyline */}
            <div className="skyline-boston opacity-0 flex flex-col items-center gap-2 w-1/3">
              <svg
                viewBox="0 0 200 160"
                className="w-full max-w-[180px]"
                fill="none"
              >
                {/* buildings */}
                <rect x="10" y="70" width="25" height="90" fill="rgba(255,255,255,0.15)" rx="2" />
                <rect x="15" y="50" width="15" height="110" fill="rgba(255,255,255,0.2)" rx="1" />
                <rect x="40" y="40" width="20" height="120" fill="rgba(255,255,255,0.18)" rx="2" />
                <rect x="45" y="20" width="10" height="140" fill="rgba(255,255,255,0.25)" rx="1" />
                {/* Prudential-like tower */}
                <rect x="65" y="10" width="22" height="150" fill="rgba(255,255,255,0.22)" rx="2" />
                <rect x="70" y="0" width="12" height="160" fill="rgba(255,255,255,0.28)" rx="1" />
                <rect x="92" y="55" width="18" height="105" fill="rgba(255,255,255,0.15)" rx="2" />
                <rect x="115" y="65" width="22" height="95" fill="rgba(255,255,255,0.18)" rx="2" />
                <rect x="142" y="50" width="18" height="110" fill="rgba(255,255,255,0.2)" rx="2" />
                <rect x="165" y="75" width="25" height="85" fill="rgba(255,255,255,0.14)" rx="2" />
                {/* windows */}
                {[30, 50, 70, 90, 110, 130].map((y) =>
                  [72, 76, 80].map((x) => (
                    <rect
                      key={`bw-${x}-${y}`}
                      x={x}
                      y={y}
                      width="2"
                      height="3"
                      fill="rgba(255,215,0,0.5)"
                    />
                  ))
                )}
              </svg>
              <span
                className="text-white/80 text-sm sm:text-base font-semibold"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                Boston
              </span>
            </div>

            {/* Dotted path with heart */}
            <div className="flex-1 flex items-center justify-center relative -mb-4 sm:-mb-2">
              <svg viewBox="0 0 300 60" className="w-full max-w-[360px]" fill="none">
                <path
                  className="travel-path"
                  d="M 10 40 Q 75 10, 150 30 Q 225 50, 290 20"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                  strokeDashoffset="500"
                  fill="none"
                />
                {/* heart that sits at the midpoint — animated via JS translateX */}
                <g className="travel-heart" opacity="0">
                  <path
                    d="M150 25 l-1.2-1.1C146.3 21.8 145 20.2 145 18.4c0-1.3 1-2.3 2.3-2.3.7 0 1.4.3 1.8.9.5-.5 1.1-.9 1.8-.9 1.3 0 2.3 1 2.3 2.3 0 1.8-1.3 3.4-3.8 5.5L150 25z"
                    fill="#FF69B4"
                  />
                </g>
              </svg>
            </div>

            {/* NYC Skyline */}
            <div className="skyline-nyc opacity-0 flex flex-col items-center gap-2 w-1/3">
              <svg
                viewBox="0 0 200 160"
                className="w-full max-w-[180px]"
                fill="none"
              >
                {/* buildings */}
                <rect x="5" y="60" width="20" height="100" fill="rgba(255,255,255,0.18)" rx="2" />
                <rect x="30" y="35" width="22" height="125" fill="rgba(255,255,255,0.22)" rx="2" />
                {/* Empire State-like */}
                <rect x="57" y="15" width="26" height="145" fill="rgba(255,255,255,0.25)" rx="2" />
                <rect x="63" y="5" width="14" height="155" fill="rgba(255,255,255,0.3)" rx="1" />
                <rect x="67" y="0" width="6" height="160" fill="rgba(255,255,255,0.35)" rx="1" />
                {/* One WTC-like */}
                <rect x="90" y="8" width="20" height="152" fill="rgba(255,255,255,0.28)" rx="2" />
                <rect x="95" y="0" width="10" height="160" fill="rgba(255,255,255,0.32)" rx="1" />
                <rect x="115" y="45" width="20" height="115" fill="rgba(255,255,255,0.2)" rx="2" />
                <rect x="140" y="50" width="18" height="110" fill="rgba(255,255,255,0.18)" rx="2" />
                <rect x="163" y="65" width="22" height="95" fill="rgba(255,255,255,0.16)" rx="2" />
                {/* windows */}
                {[20, 40, 60, 80, 100, 120, 140].map((y) =>
                  [93, 97, 101, 105].map((x) => (
                    <rect
                      key={`nw-${x}-${y}`}
                      x={x}
                      y={y}
                      width="2"
                      height="3"
                      fill="rgba(255,215,0,0.5)"
                    />
                  ))
                )}
              </svg>
              <span
                className="text-white/80 text-sm sm:text-base font-semibold"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                New York City
              </span>
            </div>
          </div>

          {/* Bottom text */}
          <div className="ch5-text opacity-0 text-center mt-6 space-y-4">
            <p
              className="text-lg sm:text-xl md:text-2xl leading-relaxed"
              style={{
                fontFamily: "var(--font-dancing)",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              From Boston to New York...
              <br />
              from Dandiya night to forever.
            </p>

            {/* Ring with sparkles */}
            <div className="relative inline-flex items-center justify-center mt-4">
              {/* sparkles */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <svg
                  key={i}
                  className="ring-sparkle absolute"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  style={{
                    left: `${-10 + i * 14}px`,
                    top: `${-8 + (i % 2) * 16}px`,
                    opacity: 0,
                  }}
                >
                  <path
                    d="M8 0 L9.5 6 L16 8 L9.5 10 L8 16 L6.5 10 L0 8 L6.5 6 Z"
                    fill="#FFD700"
                  />
                </svg>
              ))}
              <span className="text-5xl sm:text-6xl">💍</span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          THE GRAND QUESTION
          ────────────────────────────────────────────────────────────── */}
      <section
        ref={questionRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #7B68EE 0%, #9B59B6 30%, #E6A0C4 60%, #FFB6C1 100%)",
        }}
      >
        {/* confetti container */}
        <div
          ref={confettiContainerRef}
          className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
        />

        {!saidYes ? (
          /* ── The Question ── */
          <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center max-w-3xl">
            <div className="q-title opacity-0">
              <p
                className="text-xl sm:text-2xl mb-4"
                style={{
                  fontFamily: "var(--font-dancing)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                And so the question is...
              </p>
              <h2
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "white",
                  textShadow: "0 0 50px rgba(255,255,255,0.3)",
                }}
              >
                Srusti Sain,
                <br />
                will you be my Valentine?
              </h2>
            </div>

            {/* Buttons container */}
            <div
              className="q-buttons opacity-0 relative w-full flex flex-col items-center"
              style={{ minHeight: "200px" }}
            >
              {/* YES button */}
              <button
                onClick={handleYes}
                className="yes-btn relative z-20 px-14 py-5 rounded-full text-white text-2xl sm:text-3xl font-bold shadow-2xl cursor-pointer transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-playfair)",
                  background:
                    "linear-gradient(135deg, #FF69B4 0%, #FF1493 50%, #C71585 100%)",
                  boxShadow:
                    "0 0 40px rgba(255,105,180,0.5), 0 0 80px rgba(255,105,180,0.2)",
                }}
              >
                Yes!
              </button>

              {/* NO button — the runaway */}
              <div className="relative w-full" style={{ minHeight: "120px" }}>
                <button
                  ref={noButtonRef}
                  onMouseEnter={dodgeNo}
                  onTouchStart={dodgeNo}
                  onClick={dodgeNo}
                  className="absolute z-20 px-6 py-2.5 rounded-full text-gray-500 bg-gray-300/70 text-sm font-medium cursor-pointer transition-colors duration-200 hover:bg-gray-400/70"
                  style={{
                    fontFamily: "var(--font-lora)",
                    left: "50%",
                    top: "20px",
                    transform: "translateX(-50%)",
                  }}
                >
                  No
                </button>
              </div>

              {/* Playful dodge message */}
              <div
                className={`mt-2 transition-all duration-300 ${
                  noMsgVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <p
                  className="text-white text-base sm:text-lg font-semibold bg-white/20 backdrop-blur-sm rounded-full px-6 py-2"
                  style={{ fontFamily: "var(--font-dancing)" }}
                >
                  {noMsg}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ── She said YES! ── */
          <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-3xl">
            {/* Dandiya sticks forming a heart / V shape */}
            <div className="relative w-48 h-32 sm:w-64 sm:h-40 flex items-center justify-center mb-4">
              <svg
                width="100"
                height="30"
                viewBox="0 0 180 24"
                style={{
                  position: "absolute",
                  transform: "rotate(-35deg)",
                  transformOrigin: "center",
                  left: "5%",
                  top: "30%",
                }}
              >
                <defs>
                  <linearGradient id="stickYL" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF6347" />
                    <stop offset="50%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#FF8C00" />
                  </linearGradient>
                </defs>
                <rect x="0" y="8" width="160" height="8" rx="4" fill="url(#stickYL)" />
                <rect x="10" y="6" width="6" height="12" rx="2" fill="#fff" opacity="0.7" />
                <rect x="24" y="6" width="6" height="12" rx="2" fill="#FF00FF" opacity="0.6" />
                <circle cx="168" cy="12" r="10" fill="#FFD700" />
                <circle cx="168" cy="12" r="6" fill="#FF6347" />
              </svg>
              <svg
                width="100"
                height="30"
                viewBox="0 0 180 24"
                style={{
                  position: "absolute",
                  transform: "rotate(35deg) scaleX(-1)",
                  transformOrigin: "center",
                  right: "5%",
                  top: "30%",
                }}
              >
                <defs>
                  <linearGradient id="stickYR" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF69B4" />
                    <stop offset="50%" stopColor="#DDA0DD" />
                    <stop offset="100%" stopColor="#FFD700" />
                  </linearGradient>
                </defs>
                <rect x="0" y="8" width="160" height="8" rx="4" fill="url(#stickYR)" />
                <rect x="10" y="6" width="6" height="12" rx="2" fill="#fff" opacity="0.7" />
                <rect x="24" y="6" width="6" height="12" rx="2" fill="#7B68EE" opacity="0.6" />
                <circle cx="168" cy="12" r="10" fill="#DDA0DD" />
                <circle cx="168" cy="12" r="6" fill="#FF69B4" />
              </svg>
            </div>

            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-bold animate-pulse"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "#FFD700",
                textShadow:
                  "0 0 30px rgba(255,215,0,0.4), 0 0 60px rgba(255,215,0,0.2)",
              }}
            >
              She said YES!
            </h2>

            <div className="space-y-4 mt-4">
              <p
                className="text-xl sm:text-2xl md:text-3xl leading-relaxed"
                style={{
                  fontFamily: "var(--font-dancing)",
                  color: "white",
                }}
              >
                NYC awaits us, bangaara.
              </p>
              <p
                className="text-lg sm:text-xl md:text-2xl"
                style={{
                  fontFamily: "var(--font-lora)",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                Ken &amp; Dana&apos;s. Rings. Us. Forever.
              </p>
            </div>

            {/* Sparkling ring */}
            <div className="relative mt-6">
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const r = 55;
                return (
                  <span
                    key={i}
                    className="absolute animate-ping"
                    style={{
                      left: `${50 + Math.cos(angle) * r}px`,
                      top: `${50 + Math.sin(angle) * r}px`,
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: ["#FFD700", "#FF69B4", "#E6E6FA", "#FF8C00"][
                        i % 4
                      ],
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: "1.5s",
                    }}
                  />
                );
              })}
              <span className="text-6xl sm:text-7xl block" style={{ width: "100px", height: "100px", lineHeight: "100px", textAlign: "center" }}>
                💍
              </span>
            </div>

            {/* Final signature */}
            <p
              className="mt-8 text-base sm:text-lg"
              style={{
                fontFamily: "var(--font-caveat)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              from Dandiya night to diamond ring &mdash; our story continues
            </p>
          </div>
        )}

        {/* ambient floating dots */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none animate-pulse"
            style={{
              width: `${3 + Math.random() * 4}px`,
              height: `${3 + Math.random() * 4}px`,
              backgroundColor:
                ["#FFD700", "#FF69B4", "#E6E6FA", "#FFB7C5"][i % 4],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.3,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </section>
    </div>
  );
}
