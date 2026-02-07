"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ──────────────────────────────────────────────
   The Museum of Us — A Curated Exhibition of Love
   ────────────────────────────────────────────── */

// ── Petal component for the celebration ──
function Petal({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="petal fixed pointer-events-none z-50"
      style={{
        width: style.width ?? 14,
        height: style.height ?? 14,
        borderRadius: "50% 0 50% 50%",
        background: style.background ?? "var(--color-rose-pink)",
        opacity: 0,
        top: -30,
        left: style.left ?? "50%",
        transform: `rotate(${style.rotate ?? 0}deg)`,
        ...style,
      }}
    />
  );
}

// ── Floating icon used in Room 4 ──
function FloatingIcon({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`floating-icon inline-block text-3xl md:text-5xl select-none ${className}`}
      style={{ opacity: 0 }}
    >
      {children}
    </span>
  );
}

// ── Photo placeholder shared by several rooms ──
function PhotoPlaceholder({
  label,
  className = "",
  aspect = "aspect-[4/5]",
}: {
  label: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`${aspect} w-full rounded-sm flex flex-col items-center justify-center gap-3 ${className}`}
      style={{
        background:
          "linear-gradient(135deg, var(--color-lavender) 0%, var(--color-rose-pink) 50%, var(--color-lavender-light) 100%)",
      }}
    >
      {/* camera icon */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-cream)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-60"
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
      <span
        className="text-xs md:text-sm tracking-widest uppercase opacity-70"
        style={{ color: "var(--color-cream)", fontFamily: "var(--font-lora)" }}
      >
        {label}
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════
export default function MuseumPage() {
  // ── Refs ──
  const mainRef = useRef<HTMLDivElement>(null);
  const entranceRef = useRef<HTMLElement>(null);
  const room1Ref = useRef<HTMLElement>(null);
  const room2Ref = useRef<HTMLElement>(null);
  const room3Ref = useRef<HTMLElement>(null);
  const room4Ref = useRef<HTMLElement>(null);
  const room5Ref = useRef<HTMLElement>(null);
  const finaleRef = useRef<HTMLElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  // ── State ──
  const [accepted, setAccepted] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const animatedSections = useRef<Set<string>>(new Set());

  const noMessages = [
    "Nice try!",
    "Nope!",
    "Not an option!",
    "Try again!",
    "That button doesn't work!",
    "Seriously?",
    "Haha, cute attempt!",
    "Keep dreaming!",
    "Nuh-uh!",
    "Wrong button, bangaara!",
  ];

  // ── Run-away "No" button ──
  const escapeNoButton = useCallback(() => {
    if (!noBtnRef.current) return;
    setNoAttempts((prev) => prev + 1);

    import("animejs").then(({ animate }) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const btnW = 120;
      const btnH = 48;
      const newX = Math.random() * (vw - btnW * 2) - (vw / 2 - btnW);
      const newY = Math.random() * (vh * 0.4) - vh * 0.2;

      animate(noBtnRef.current!, {
        translateX: newX,
        translateY: newY,
        rotate: [0, Math.random() * 40 - 20],
        duration: 400,
        ease: "outBack",
      });
    });
  }, []);

  // ── YES handler — petal rain ──
  const handleYes = useCallback(() => {
    setAccepted(true);

    import("animejs").then(({ animate, stagger }) => {
      // fade in celebration text
      setTimeout(() => {
        animate(".celebration-text", {
          opacity: [0, 1],
          translateY: [40, 0],
          delay: stagger(150),
          duration: 1000,
          ease: "outQuad",
        });
      }, 200);

      // animate petals
      setTimeout(() => {
        const petals = document.querySelectorAll(".petal");
        petals.forEach((petal) => {
          const el = petal as HTMLElement;
          const delay = Math.random() * 3000;
          const dur = 3000 + Math.random() * 4000;
          const startX = Math.random() * window.innerWidth;
          el.style.left = `${startX}px`;

          animate(el, {
            opacity: [
              { to: 0.9, duration: 300 },
              { to: 0, duration: dur * 0.3 },
            ],
            translateY: [0, window.innerHeight + 100],
            translateX: [0, Math.sin(Math.random() * Math.PI * 2) * 150],
            rotate: [0, Math.random() * 720 - 360],
            delay: delay,
            duration: dur,
            ease: "inQuad",
          });
        });
      }, 100);
    });
  }, []);

  // ── Intersection Observer + anime.js animations ──
  useEffect(() => {
    const sections = [
      { ref: entranceRef, id: "entrance" },
      { ref: room1Ref, id: "room1" },
      { ref: room2Ref, id: "room2" },
      { ref: room3Ref, id: "room3" },
      { ref: room4Ref, id: "room4" },
      { ref: room5Ref, id: "room5" },
      { ref: finaleRef, id: "finale" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const sectionId = entry.target.getAttribute("data-section");
          if (!sectionId || animatedSections.current.has(sectionId)) return;
          animatedSections.current.add(sectionId);
          triggerAnimation(sectionId);
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach(({ ref, id }) => {
      if (ref.current) {
        ref.current.setAttribute("data-section", id);
        observer.observe(ref.current);
      }
    });

    // Entrance auto-animation on load
    triggerAnimation("entrance");
    animatedSections.current.add("entrance");

    return () => observer.disconnect();
  }, []);

  function triggerAnimation(id: string) {
    import("animejs").then(({ animate, stagger }) => {
      switch (id) {
        case "entrance": {
          animate(".entrance-title", {
            opacity: [0, 1],
            translateY: [60, 0],
            duration: 1400,
            ease: "outQuad",
            delay: 300,
          });
          animate(".entrance-subtitle", {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1200,
            ease: "outQuad",
            delay: 900,
          });
          animate(".entrance-door-left", {
            translateX: [-80, 0],
            opacity: [0, 1],
            duration: 1600,
            ease: "outQuad",
            delay: 200,
          });
          animate(".entrance-door-right", {
            translateX: [80, 0],
            opacity: [0, 1],
            duration: 1600,
            ease: "outQuad",
            delay: 200,
          });
          animate(".scroll-indicator", {
            opacity: [0, 1],
            duration: 1000,
            delay: 2000,
            ease: "outQuad",
          });
          // bounce loop for scroll indicator
          const bounceLoop = () => {
            animate(".scroll-indicator", {
              translateY: [0, 12, 0],
              duration: 1800,
              ease: "inOutSine",
              onComplete: bounceLoop,
            });
          };
          setTimeout(bounceLoop, 2800);
          break;
        }
        case "room1": {
          animate(".room1-title", {
            opacity: [0, 1],
            letterSpacing: ["0.5em", "0.2em"],
            duration: 1200,
            ease: "outQuad",
          });
          animate(".room1-frame", {
            opacity: [0, 1],
            scale: [0.85, 1],
            duration: 1400,
            ease: "outQuad",
            delay: 400,
          });
          animate(".room1-nameplate", {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000,
            ease: "outQuad",
            delay: 1000,
          });
          animate(".room1-spotlight", {
            opacity: [0, 0.6],
            duration: 2000,
            ease: "outQuad",
            delay: 200,
          });
          break;
        }
        case "room2": {
          animate(".room2-title", {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 1000,
            ease: "outQuad",
          });
          animate(".nickname-frame", {
            opacity: [0, 1],
            translateY: [60, 0],
            scale: [0.9, 1],
            delay: stagger(300, { start: 500 }),
            duration: 1000,
            ease: "outQuad",
          });
          break;
        }
        case "room3": {
          animate(".room3-title", {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 1000,
            ease: "outQuad",
          });
          animate(".adventure-frame", {
            opacity: [0, 1],
            translateY: [50, 0],
            rotate: [3, 0],
            delay: stagger(200, { start: 500 }),
            duration: 900,
            ease: "outQuad",
          });
          break;
        }
        case "room4": {
          animate(".room4-title", {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 1000,
            ease: "outQuad",
          });
          animate(".floating-icon", {
            opacity: [0, 1],
            scale: [0, 1],
            delay: stagger(150, { start: 400 }),
            duration: 800,
            ease: "outBack",
          });
          animate(".room4-quote", {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1200,
            ease: "outQuad",
            delay: 1600,
          });

          // continuous floating loops
          const floatIcons = document.querySelectorAll(".floating-icon");
          floatIcons.forEach((icon, i) => {
            const floatLoop = () => {
              animate(icon, {
                translateY: [0, -18 - Math.random() * 14, 0],
                translateX: [
                  0,
                  Math.sin(i) * 10,
                  0,
                ],
                rotate: [0, Math.random() * 10 - 5, 0],
                duration: 2800 + Math.random() * 1200,
                ease: "inOutSine",
                onComplete: floatLoop,
              });
            };
            setTimeout(floatLoop, 2000 + i * 200);
          });
          break;
        }
        case "room5": {
          animate(".room5-title", {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 1000,
            ease: "outQuad",
          });
          animate(".room5-frame", {
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 1400,
            ease: "outQuad",
            delay: 400,
          });
          animate(".room5-card", {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1000,
            ease: "outQuad",
            delay: 1200,
          });

          // shimmer loop on the veil
          const shimmerLoop = () => {
            animate(".room5-veil", {
              backgroundPosition: ["200% 0%", "-200% 0%"],
              duration: 3500,
              ease: "linear",
              onComplete: shimmerLoop,
            });
          };
          setTimeout(shimmerLoop, 1600);

          // sparkle loop
          const sparkleLoop = () => {
            animate(".room5-sparkle", {
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
              duration: 2000,
              ease: "inOutSine",
              onComplete: sparkleLoop,
            });
          };
          setTimeout(sparkleLoop, 1800);
          break;
        }
        case "finale": {
          animate(".finale-outer-frame", {
            opacity: [0, 1],
            scale: [0.88, 1],
            duration: 1800,
            ease: "outQuad",
          });
          animate(".finale-question", {
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1400,
            ease: "outQuad",
            delay: 600,
          });
          animate(".finale-buttons", {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000,
            ease: "outQuad",
            delay: 1400,
          });

          // pulse the yes button
          const pulseLoop = () => {
            animate(".yes-btn-glow", {
              boxShadow: [
                "0 0 20px rgba(255,105,180,0.4)",
                "0 0 50px rgba(255,105,180,0.8)",
                "0 0 20px rgba(255,105,180,0.4)",
              ],
              duration: 2200,
              ease: "inOutSine",
              onComplete: pulseLoop,
            });
          };
          setTimeout(pulseLoop, 1800);
          break;
        }
      }
    });
  }

  // ── Petals data for celebration ──
  const petals = Array.from({ length: 50 }, (_, i) => {
    const colors = [
      "var(--color-rose-pink)",
      "var(--color-rose-hot)",
      "#fff0f5",
      "#ffe4e9",
      "var(--color-lavender-light)",
      "#ffc0cb",
    ];
    return {
      id: i,
      width: 8 + Math.random() * 14,
      height: 8 + Math.random() * 14,
      background: colors[Math.floor(Math.random() * colors.length)],
      left: `${Math.random() * 100}%`,
      rotate: Math.random() * 360,
    };
  });

  return (
    <div
      ref={mainRef}
      className="hide-scrollbar"
      style={{ background: "var(--color-charcoal)", color: "var(--color-cream)" }}
    >
      {/* ═══════════════════════════════════════════
          PETALS (always rendered, animated on YES)
          ═══════════════════════════════════════════ */}
      {accepted &&
        petals.map((p) => (
          <Petal
            key={p.id}
            style={{
              width: p.width,
              height: p.height,
              background: p.background,
              left: p.left,
              transform: `rotate(${p.rotate}deg)`,
            }}
          />
        ))}

      {/* ═══════════════════════════════════════════
          SECTION 0 — Museum Entrance
          ═══════════════════════════════════════════ */}
      <section
        ref={entranceRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
      >
        {/* ambient radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(181,126,220,0.12) 0%, transparent 70%)",
          }}
        />

        {/* ornate door */}
        <div className="relative flex items-stretch justify-center gap-0 mb-10 md:mb-14">
          {/* left door panel */}
          <div
            className="entrance-door-left opacity-0 w-[110px] md:w-[160px] h-[260px] md:h-[380px] rounded-tl-[50%] border-2"
            style={{
              borderColor: "var(--color-gold)",
              background:
                "linear-gradient(180deg, rgba(212,175,55,0.08) 0%, rgba(26,26,46,0.95) 100%)",
              boxShadow:
                "inset -8px 0 30px rgba(212,175,55,0.06), 0 0 40px rgba(212,175,55,0.08)",
            }}
          >
            {/* door detail — inner panel */}
            <div
              className="m-3 md:m-5 h-[calc(100%-24px)] md:h-[calc(100%-40px)] rounded-tl-[45%] border"
              style={{
                borderColor: "rgba(212,175,55,0.3)",
                background:
                  "linear-gradient(180deg, rgba(212,175,55,0.04) 0%, transparent 60%)",
              }}
            >
              <div
                className="m-2 md:m-3 h-[calc(100%-16px)] md:h-[calc(100%-24px)] rounded-tl-[40%] border"
                style={{ borderColor: "rgba(212,175,55,0.15)" }}
              />
            </div>
          </div>
          {/* right door panel */}
          <div
            className="entrance-door-right opacity-0 w-[110px] md:w-[160px] h-[260px] md:h-[380px] rounded-tr-[50%] border-2"
            style={{
              borderColor: "var(--color-gold)",
              background:
                "linear-gradient(180deg, rgba(212,175,55,0.08) 0%, rgba(26,26,46,0.95) 100%)",
              boxShadow:
                "inset 8px 0 30px rgba(212,175,55,0.06), 0 0 40px rgba(212,175,55,0.08)",
            }}
          >
            <div
              className="m-3 md:m-5 h-[calc(100%-24px)] md:h-[calc(100%-40px)] rounded-tr-[45%] border"
              style={{
                borderColor: "rgba(212,175,55,0.3)",
                background:
                  "linear-gradient(180deg, rgba(212,175,55,0.04) 0%, transparent 60%)",
              }}
            >
              <div
                className="m-2 md:m-3 h-[calc(100%-16px)] md:h-[calc(100%-24px)] rounded-tr-[40%] border"
                style={{ borderColor: "rgba(212,175,55,0.15)" }}
              />
            </div>
          </div>
          {/* door handle — left */}
          <div
            className="absolute left-[calc(50%-28px)] md:left-[calc(50%-36px)] top-[55%] w-3 h-3 rounded-full"
            style={{
              background: "var(--color-gold)",
              boxShadow: "0 0 10px rgba(212,175,55,0.5)",
            }}
          />
          {/* door handle — right */}
          <div
            className="absolute left-[calc(50%+16px)] md:left-[calc(50%+24px)] top-[55%] w-3 h-3 rounded-full"
            style={{
              background: "var(--color-gold)",
              boxShadow: "0 0 10px rgba(212,175,55,0.5)",
            }}
          />
        </div>

        {/* title */}
        <h1
          className="entrance-title opacity-0 text-center text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-tight mb-4 md:mb-6"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--color-gold)",
            textShadow: "0 0 40px rgba(212,175,55,0.25)",
          }}
        >
          The Museum of Us
        </h1>
        <p
          className="entrance-subtitle opacity-0 text-center text-base md:text-xl tracking-[0.25em] uppercase"
          style={{
            fontFamily: "var(--font-lora)",
            color: "var(--color-lavender-light)",
          }}
        >
          A Curated Exhibition of Love
        </p>

        {/* scroll indicator */}
        <div className="scroll-indicator opacity-0 absolute bottom-10 flex flex-col items-center gap-2">
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{
              fontFamily: "var(--font-lora)",
              color: "rgba(255,248,231,0.5)",
            }}
          >
            Scroll to enter
          </span>
          <svg
            width="20"
            height="28"
            viewBox="0 0 20 28"
            fill="none"
            className="opacity-50"
          >
            <rect
              x="1"
              y="1"
              width="18"
              height="26"
              rx="9"
              stroke="var(--color-gold)"
              strokeWidth="1.5"
            />
            <circle cx="10" cy="9" r="2.5" fill="var(--color-gold)" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ROOM 1 — The Beginning
          ═══════════════════════════════════════════ */}
      <section
        ref={room1Ref}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20"
      >
        {/* spotlight */}
        <div
          className="room1-spotlight absolute inset-0 pointer-events-none opacity-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 55% at 50% 45%, rgba(181,126,220,0.18) 0%, transparent 100%)",
          }}
        />

        {/* room number */}
        <span
          className="room1-title opacity-0 text-xs tracking-[0.5em] uppercase mb-6"
          style={{
            fontFamily: "var(--font-lora)",
            color: "rgba(212,175,55,0.5)",
          }}
        >
          Room I
        </span>

        {/* title */}
        <h2
          className="room1-title opacity-0 text-2xl md:text-4xl lg:text-5xl font-bold mb-10 md:mb-14 text-center"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--color-gold)",
            letterSpacing: "0.2em",
            textShadow: "0 0 30px rgba(212,175,55,0.2)",
          }}
        >
          The Beginning
        </h2>

        {/* ornate frame */}
        <div
          className="room1-frame opacity-0 relative p-3 md:p-5"
          style={{
            border: "3px solid var(--color-gold)",
            boxShadow:
              "0 0 30px rgba(212,175,55,0.15), inset 0 0 30px rgba(212,175,55,0.05), 0 0 80px rgba(181,126,220,0.1)",
          }}
        >
          {/* inner border */}
          <div
            className="p-2 md:p-3"
            style={{ border: "1px solid rgba(212,175,55,0.35)" }}
          >
            <div className="w-[260px] md:w-[360px] lg:w-[420px]">
              <PhotoPlaceholder label="Our First Memory" aspect="aspect-[4/5]" />
            </div>
          </div>
          {/* corner ornaments */}
          {[
            "top-0 left-0",
            "top-0 right-0 rotate-90",
            "bottom-0 right-0 rotate-180",
            "bottom-0 left-0 -rotate-90",
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-5 h-5 md:w-7 md:h-7`}
              style={{
                borderTop: "2px solid var(--color-gold)",
                borderLeft: "2px solid var(--color-gold)",
              }}
            />
          ))}
        </div>

        {/* brass nameplate */}
        <div
          className="room1-nameplate opacity-0 mt-8 md:mt-12 px-6 md:px-10 py-3 md:py-4 text-center max-w-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.04) 100%)",
            border: "1px solid rgba(212,175,55,0.3)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{
              fontFamily: "var(--font-lora)",
              color: "var(--color-cream)",
            }}
          >
            Cabot Hall, Northeastern University.
          </p>
          <p
            className="text-sm md:text-base mt-1 italic"
            style={{
              fontFamily: "var(--font-lora)",
              color: "var(--color-lavender-light)",
            }}
          >
            A Dandiya night that changed everything.
          </p>
          <p
            className="text-xs tracking-[0.2em] uppercase mt-2 opacity-50"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            Boston, MA
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ROOM 2 — The Nickname Gallery
          ═══════════════════════════════════════════ */}
      <section
        ref={room2Ref}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20"
      >
        {/* soft ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(181,126,220,0.08) 0%, transparent 60%)",
          }}
        />

        <span
          className="room2-title opacity-0 text-xs tracking-[0.5em] uppercase mb-6"
          style={{
            fontFamily: "var(--font-lora)",
            color: "rgba(212,175,55,0.5)",
          }}
        >
          Room II
        </span>

        <h2
          className="room2-title opacity-0 text-2xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--color-gold)",
            letterSpacing: "0.15em",
            textShadow: "0 0 30px rgba(212,175,55,0.2)",
          }}
        >
          The Nickname Gallery
        </h2>

        {/* three nickname frames */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-14 items-center">
          {/* Kuttu Paapu — pink accent */}
          <div
            className="nickname-frame opacity-0 flex flex-col items-center p-6 md:p-8 w-[220px] md:w-[240px]"
            style={{
              border: "2px solid var(--color-rose-pink)",
              boxShadow:
                "0 0 25px rgba(255,183,197,0.15), inset 0 0 20px rgba(255,183,197,0.04)",
              background:
                "linear-gradient(180deg, rgba(255,183,197,0.06) 0%, transparent 100%)",
            }}
          >
            <span
              className="text-3xl md:text-4xl"
              style={{
                fontFamily: "var(--font-dancing)",
                color: "var(--color-rose-pink)",
                textShadow: "0 0 20px rgba(255,183,197,0.3)",
              }}
            >
              Kuttu Paapu
            </span>
            <div
              className="w-12 h-px mt-4"
              style={{ background: "var(--color-rose-pink)", opacity: 0.4 }}
            />
          </div>

          {/* Chinnu Munnu — lavender accent */}
          <div
            className="nickname-frame opacity-0 flex flex-col items-center p-6 md:p-8 w-[220px] md:w-[240px]"
            style={{
              border: "2px solid var(--color-lavender)",
              boxShadow:
                "0 0 25px rgba(181,126,220,0.15), inset 0 0 20px rgba(181,126,220,0.04)",
              background:
                "linear-gradient(180deg, rgba(181,126,220,0.06) 0%, transparent 100%)",
            }}
          >
            <span
              className="text-3xl md:text-4xl"
              style={{
                fontFamily: "var(--font-dancing)",
                color: "var(--color-lavender)",
                textShadow: "0 0 20px rgba(181,126,220,0.3)",
              }}
            >
              Chinnu Munnu
            </span>
            <div
              className="w-12 h-px mt-4"
              style={{ background: "var(--color-lavender)", opacity: 0.4 }}
            />
          </div>

          {/* Bangaara — gold accent */}
          <div
            className="nickname-frame opacity-0 flex flex-col items-center p-6 md:p-8 w-[220px] md:w-[240px]"
            style={{
              border: "2px solid var(--color-gold)",
              boxShadow:
                "0 0 25px rgba(212,175,55,0.15), inset 0 0 20px rgba(212,175,55,0.04)",
              background:
                "linear-gradient(180deg, rgba(212,175,55,0.06) 0%, transparent 100%)",
            }}
          >
            <span
              className="text-3xl md:text-4xl"
              style={{
                fontFamily: "var(--font-dancing)",
                color: "var(--color-gold)",
                textShadow: "0 0 20px rgba(212,175,55,0.3)",
              }}
            >
              Bangaara
            </span>
            <div
              className="w-12 h-px mt-4"
              style={{ background: "var(--color-gold)", opacity: 0.4 }}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ROOM 3 — Adventures Together
          ═══════════════════════════════════════════ */}
      <section
        ref={room3Ref}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 60%)",
          }}
        />

        <span
          className="room3-title opacity-0 text-xs tracking-[0.5em] uppercase mb-6"
          style={{
            fontFamily: "var(--font-lora)",
            color: "rgba(212,175,55,0.5)",
          }}
        >
          Room III
        </span>

        <h2
          className="room3-title opacity-0 text-2xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--color-gold)",
            letterSpacing: "0.15em",
            textShadow: "0 0 30px rgba(212,175,55,0.2)",
          }}
        >
          The Adventures
        </h2>

        {/* grid of adventure frames */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl w-full">
          {[
            { label: "The Foodies", emoji: "\u{1F35C}" },
            { label: "The Explorers", emoji: "\u{1F30D}" },
            { label: "The Laughers", emoji: "\u{1F602}" },
            { label: "The Shoppers", emoji: "\u{1F6CD}\u{FE0F}" },
            { label: "The Dreamers", emoji: "\u{2728}" },
            { label: "The Dancers", emoji: "\u{1F483}" },
          ].map(({ label, emoji }, i) => (
            <div
              key={i}
              className="adventure-frame opacity-0 flex flex-col"
              style={{
                border: "2px solid rgba(212,175,55,0.35)",
                boxShadow:
                  "0 0 20px rgba(212,175,55,0.08), inset 0 0 15px rgba(181,126,220,0.03)",
              }}
            >
              <div
                className="aspect-square w-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(181,126,220,0.12) 0%, rgba(255,183,197,0.12) 50%, rgba(212,175,55,0.08) 100%)",
                }}
              >
                <span className="text-4xl md:text-5xl">{emoji}</span>
              </div>
              {/* caption plate */}
              <div
                className="px-3 py-2 md:py-3 text-center"
                style={{
                  borderTop: "1px solid rgba(212,175,55,0.25)",
                  background: "rgba(212,175,55,0.04)",
                }}
              >
                <span
                  className="text-xs md:text-sm tracking-[0.15em] uppercase"
                  style={{
                    fontFamily: "var(--font-lora)",
                    color: "var(--color-cream)",
                    opacity: 0.8,
                  }}
                >
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ROOM 4 — Her Favorites
          ═══════════════════════════════════════════ */}
      <section
        ref={room4Ref}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(255,183,197,0.08) 0%, transparent 60%)",
          }}
        />

        <span
          className="room4-title opacity-0 text-xs tracking-[0.5em] uppercase mb-6"
          style={{
            fontFamily: "var(--font-lora)",
            color: "rgba(212,175,55,0.5)",
          }}
        >
          Room IV
        </span>

        <h2
          className="room4-title opacity-0 text-2xl md:text-4xl lg:text-5xl font-bold mb-14 md:mb-20 text-center"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--color-gold)",
            letterSpacing: "0.15em",
            textShadow: "0 0 30px rgba(212,175,55,0.2)",
          }}
        >
          Things She Loves
        </h2>

        {/* floating icons arranged in a loose circle */}
        <div className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px] mb-10">
          {/* rose */}
          <div className="absolute top-[5%] left-[45%]">
            <FloatingIcon>{"\u{1F339}"}</FloatingIcon>
          </div>
          {/* lily */}
          <div className="absolute top-[25%] right-[5%]">
            <FloatingIcon>{"\u{1F33A}"}</FloatingIcon>
          </div>
          {/* music notes */}
          <div className="absolute bottom-[20%] right-[8%]">
            <FloatingIcon>{"\u{1F3B5}"}</FloatingIcon>
          </div>
          {/* shopping bag */}
          <div className="absolute bottom-[5%] left-[42%]">
            <FloatingIcon>{"\u{1F6CD}\u{FE0F}"}</FloatingIcon>
          </div>
          {/* food */}
          <div className="absolute bottom-[22%] left-[5%]">
            <FloatingIcon>{"\u{1F370}"}</FloatingIcon>
          </div>
          {/* sparkles */}
          <div className="absolute top-[28%] left-[8%]">
            <FloatingIcon>{"\u{2728}"}</FloatingIcon>
          </div>
          {/* heart */}
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
            <FloatingIcon className="!text-4xl md:!text-6xl">
              {"\u{1F495}"}
            </FloatingIcon>
          </div>
          {/* headphones / music */}
          <div className="absolute top-[8%] left-[15%]">
            <FloatingIcon>{"\u{1F3A7}"}</FloatingIcon>
          </div>
        </div>

        {/* centered quote */}
        <div className="room4-quote opacity-0 max-w-md text-center">
          <p
            className="text-lg md:text-2xl italic leading-relaxed"
            style={{
              fontFamily: "var(--font-dancing)",
              color: "var(--color-lavender-light)",
              textShadow: "0 0 20px rgba(181,126,220,0.15)",
            }}
          >
            &ldquo;Pink roses, lilies, Anirudh on repeat, and adventures with
            you.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ROOM 5 — Coming Soon
          ═══════════════════════════════════════════ */}
      <section
        ref={room5Ref}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 55%)",
          }}
        />

        <span
          className="room5-title opacity-0 text-xs tracking-[0.5em] uppercase mb-6"
          style={{
            fontFamily: "var(--font-lora)",
            color: "rgba(212,175,55,0.5)",
          }}
        >
          Room V
        </span>

        <h2
          className="room5-title opacity-0 text-2xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "var(--color-gold)",
            letterSpacing: "0.15em",
            textShadow: "0 0 30px rgba(212,175,55,0.2)",
          }}
        >
          Coming Soon
        </h2>

        {/* veiled frame */}
        <div
          className="room5-frame opacity-0 relative w-[280px] md:w-[380px] aspect-[4/5]"
          style={{
            border: "3px solid var(--color-gold)",
            boxShadow: "0 0 40px rgba(212,175,55,0.12)",
          }}
        >
          {/* inner content (blurred/hidden) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(181,126,220,0.15) 0%, rgba(255,183,197,0.15) 100%)",
            }}
          />
          {/* the veil / shimmer overlay */}
          <div
            className="room5-veil absolute inset-0"
            style={{
              background:
                "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 70%)",
              backgroundSize: "200% 100%",
            }}
          />
          {/* "covered" text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(212,175,55,0.4)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
              <line x1="1" y1="1" x2="23" y2="23" stroke="rgba(212,175,55,0.5)" strokeWidth="1.5" />
            </svg>
            <span
              className="mt-3 text-xs tracking-[0.3em] uppercase"
              style={{
                fontFamily: "var(--font-lora)",
                color: "rgba(212,175,55,0.5)",
              }}
            >
              Under Wraps
            </span>
          </div>
        </div>

        {/* info card below */}
        <div
          className="room5-card opacity-0 mt-8 md:mt-12 text-center max-w-sm px-4"
        >
          <p
            className="text-base md:text-lg italic mb-4"
            style={{
              fontFamily: "var(--font-lora)",
              color: "var(--color-lavender-light)",
            }}
          >
            This exhibit continues in New York City...
          </p>
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-sm"
            style={{
              border: "1px solid rgba(212,175,55,0.3)",
              background: "rgba(212,175,55,0.06)",
            }}
          >
            <span className="room5-sparkle text-lg">{"\u{1F48D}"}</span>
            <span
              className="text-sm md:text-base tracking-wider"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--color-gold)",
              }}
            >
              Ken &amp; Dana&apos;s &mdash; Coming Soon
            </span>
            <span className="room5-sparkle text-lg">{"\u2728"}</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          THE GRAND FINALE
          ═══════════════════════════════════════════ */}
      <section
        ref={finaleRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20"
      >
        {/* dramatic radial spotlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(181,126,220,0.14) 0%, rgba(255,105,180,0.06) 40%, transparent 80%)",
          }}
        />

        {!accepted ? (
          <>
            {/* ornate outer frame */}
            <div
              className="finale-outer-frame opacity-0 relative p-4 md:p-6"
              style={{
                border: "3px solid var(--color-gold)",
                boxShadow:
                  "0 0 60px rgba(212,175,55,0.15), 0 0 120px rgba(181,126,220,0.08), inset 0 0 40px rgba(212,175,55,0.05)",
              }}
            >
              {/* decorative inner border */}
              <div
                className="p-4 md:p-6"
                style={{ border: "1px solid rgba(212,175,55,0.3)" }}
              >
                <div
                  className="p-5 md:p-8"
                  style={{ border: "1px solid rgba(212,175,55,0.15)" }}
                >
                  {/* the question */}
                  <div className="finale-question opacity-0 text-center max-w-md">
                    <p
                      className="text-lg md:text-xl mb-3 tracking-wider"
                      style={{
                        fontFamily: "var(--font-lora)",
                        color: "var(--color-lavender-light)",
                      }}
                    >
                      Srusti Sain
                    </p>
                    <h2
                      className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight"
                      style={{
                        fontFamily: "var(--font-dancing)",
                        color: "var(--color-rose-pink)",
                        textShadow:
                          "0 0 30px rgba(255,183,197,0.3), 0 0 60px rgba(255,105,180,0.15)",
                      }}
                    >
                      Will you be my
                      <br />
                      Valentine?
                    </h2>
                    <div
                      className="mx-auto mt-4 w-20 h-px"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, var(--color-gold), transparent)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* corner ornaments */}
              {[
                "top-0 left-0",
                "top-0 right-0 rotate-90",
                "bottom-0 right-0 rotate-180",
                "bottom-0 left-0 -rotate-90",
              ].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute ${pos} w-6 h-6 md:w-8 md:h-8`}
                  style={{
                    borderTop: "2px solid var(--color-gold)",
                    borderLeft: "2px solid var(--color-gold)",
                  }}
                />
              ))}
            </div>

            {/* buttons */}
            <div className="finale-buttons opacity-0 relative mt-10 md:mt-14 flex flex-col items-center gap-5 w-full">
              {/* YES button */}
              <button
                onClick={handleYes}
                className="yes-btn-glow relative px-14 md:px-20 py-4 md:py-5 text-xl md:text-2xl font-bold tracking-wider rounded-sm cursor-pointer transition-transform hover:scale-105 active:scale-95"
                style={{
                  fontFamily: "var(--font-playfair)",
                  background:
                    "linear-gradient(135deg, var(--color-rose-pink) 0%, var(--color-rose-hot) 100%)",
                  color: "#fff",
                  border: "none",
                  boxShadow: "0 0 30px rgba(255,105,180,0.4)",
                }}
              >
                Yes
              </button>

              {/* NO button */}
              <div className="relative h-14 flex items-center justify-center">
                <button
                  ref={noBtnRef}
                  onMouseEnter={escapeNoButton}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    escapeNoButton();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    escapeNoButton();
                  }}
                  className="relative px-8 py-2 text-sm tracking-wider rounded-sm cursor-pointer transition-colors"
                  style={{
                    fontFamily: "var(--font-lora)",
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.35)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  No
                </button>
              </div>

              {/* playful message on "No" attempts */}
              {noAttempts > 0 && (
                <p
                  className="text-sm md:text-base italic"
                  style={{
                    fontFamily: "var(--font-caveat)",
                    color: "var(--color-rose-pink)",
                  }}
                >
                  {noMessages[(noAttempts - 1) % noMessages.length]}
                </p>
              )}
            </div>
          </>
        ) : (
          /* ── Celebration state ── */
          <div className="flex flex-col items-center text-center gap-6 md:gap-8 px-4">
            <div
              className="celebration-text opacity-0 text-5xl md:text-7xl lg:text-8xl font-bold"
              style={{
                fontFamily: "var(--font-dancing)",
                color: "var(--color-rose-pink)",
                textShadow:
                  "0 0 40px rgba(255,183,197,0.4), 0 0 80px rgba(255,105,180,0.2)",
              }}
            >
              She said YES!
            </div>

            <div
              className="celebration-text opacity-0 flex items-center gap-3"
            >
              <span className="text-3xl">{"\u2764\u{FE0F}"}</span>
              <span className="text-3xl">{"\u2764\u{FE0F}"}</span>
              <span className="text-3xl">{"\u2764\u{FE0F}"}</span>
            </div>

            <div
              className="celebration-text opacity-0 max-w-md"
            >
              <p
                className="text-base md:text-xl leading-relaxed"
                style={{
                  fontFamily: "var(--font-lora)",
                  color: "var(--color-cream)",
                }}
              >
                P.S. Pack your bags,{" "}
                <span
                  style={{
                    fontFamily: "var(--font-dancing)",
                    color: "var(--color-gold)",
                    fontSize: "1.2em",
                  }}
                >
                  bangaara
                </span>
                .
              </p>
              <p
                className="text-base md:text-xl mt-2 leading-relaxed"
                style={{
                  fontFamily: "var(--font-lora)",
                  color: "var(--color-cream)",
                }}
              >
                We&apos;re going ring shopping at{" "}
                <span
                  style={{
                    color: "var(--color-gold)",
                    fontWeight: 600,
                  }}
                >
                  Ken &amp; Dana&apos;s, NYC
                </span>
                .
              </p>
            </div>

            <div
              className="celebration-text opacity-0 flex items-center gap-2 mt-2"
            >
              <span className="text-2xl">{"\u{1F48D}"}</span>
              <span className="text-2xl">{"\u2728"}</span>
              <span className="text-2xl">{"\u{1F48D}"}</span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
