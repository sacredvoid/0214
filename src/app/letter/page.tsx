"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   The Infinite Love Letter
   A Valentine's Day experience for Srusti Sain
   ───────────────────────────────────────────── */

// ── Pressed Rose SVG (top-right decoration) ────────────────────────────
function PressedRose({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Petals */}
      <ellipse cx="50" cy="40" rx="18" ry="22" fill="#E8A0B4" opacity="0.55" transform="rotate(-15 50 40)" />
      <ellipse cx="50" cy="40" rx="16" ry="20" fill="#D4829A" opacity="0.5" transform="rotate(20 50 40)" />
      <ellipse cx="50" cy="38" rx="14" ry="18" fill="#C97B91" opacity="0.5" transform="rotate(-40 50 38)" />
      <ellipse cx="50" cy="42" rx="15" ry="19" fill="#E0B0C0" opacity="0.45" transform="rotate(45 50 42)" />
      <ellipse cx="50" cy="40" rx="10" ry="13" fill="#D98EA5" opacity="0.6" transform="rotate(5 50 40)" />
      {/* Center */}
      <circle cx="50" cy="40" r="6" fill="#C0687E" opacity="0.5" />
      {/* Stem */}
      <path d="M50 58 Q48 80 50 110" stroke="#7A9A6D" strokeWidth="2" opacity="0.5" fill="none" />
      {/* Leaves */}
      <ellipse cx="42" cy="78" rx="8" ry="4" fill="#8BAF7A" opacity="0.4" transform="rotate(-30 42 78)" />
      <ellipse cx="58" cy="88" rx="8" ry="4" fill="#8BAF7A" opacity="0.4" transform="rotate(25 58 88)" />
    </svg>
  );
}

// ── Lavender Flower SVG ─────────────────────────────────────────────────
function LavenderFlower({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 40 120"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 120 Q19 70 20 30" stroke="#7A9A6D" strokeWidth="1.5" opacity="0.5" fill="none" />
      {[0, 8, 16, 24, 32, 40].map((offset, i) => (
        <g key={i}>
          <ellipse cx="20" cy={20 + offset} rx="5" ry="4" fill="#B57EDC" opacity={0.5 - i * 0.03} />
          <ellipse cx="16" cy={22 + offset} rx="4" ry="3" fill="#9B6BBF" opacity={0.45 - i * 0.03} />
          <ellipse cx="24" cy={22 + offset} rx="4" ry="3" fill="#9B6BBF" opacity={0.45 - i * 0.03} />
        </g>
      ))}
      <ellipse cx="14" cy="80" rx="7" ry="3" fill="#8BAF7A" opacity="0.35" transform="rotate(-20 14 80)" />
      <ellipse cx="26" cy="90" rx="7" ry="3" fill="#8BAF7A" opacity="0.35" transform="rotate(20 26 90)" />
    </svg>
  );
}

// ── Floating Icons ──────────────────────────────────────────────────────
function FloatingRose({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="16" cy="12" rx="6" ry="7" fill="#E8A0B4" opacity="0.7" />
      <ellipse cx="16" cy="12" rx="4" ry="5" fill="#D4829A" opacity="0.6" transform="rotate(20 16 12)" />
      <circle cx="16" cy="12" r="2.5" fill="#C0687E" opacity="0.7" />
      <path d="M16 18 Q15 24 16 30" stroke="#7A9A6D" strokeWidth="1.5" opacity="0.6" fill="none" />
    </svg>
  );
}

function FloatingNote({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="22" rx="5" ry="4" fill="#8B6914" opacity="0.6" />
      <path d="M17 22 V6" stroke="#8B6914" strokeWidth="2" opacity="0.6" />
      <path d="M17 6 Q22 4 24 8 Q22 10 17 10" fill="#8B6914" opacity="0.5" />
    </svg>
  );
}

function FloatingBag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="12" width="20" height="16" rx="2" fill="#B57EDC" opacity="0.5" />
      <path d="M11 12 Q11 5 16 5 Q21 5 21 12" stroke="#8B5E9B" strokeWidth="2" fill="none" opacity="0.5" />
    </svg>
  );
}

function FloatingSmiley({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="12" fill="#FFD700" opacity="0.45" />
      <circle cx="12" cy="13" r="1.5" fill="#5D4037" opacity="0.6" />
      <circle cx="20" cy="13" r="1.5" fill="#5D4037" opacity="0.6" />
      <path d="M11 19 Q16 24 21 19" stroke="#5D4037" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  );
}

// ── Ring Doodle SVG ─────────────────────────────────────────────────────
function RingDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 90" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        className="ring-band"
        cx="40"
        cy="55"
        r="22"
        stroke="#D4AF37"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
        strokeDasharray="140"
        strokeDashoffset="140"
      />
      <path
        className="ring-diamond"
        d="M40 33 L34 23 L40 12 L46 23 Z"
        stroke="#D4AF37"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
        strokeDasharray="60"
        strokeDashoffset="60"
      />
      <line
        className="ring-diamond"
        x1="34"
        y1="23"
        x2="46"
        y2="23"
        stroke="#D4AF37"
        strokeWidth="1.5"
        opacity="0.6"
        strokeDasharray="12"
        strokeDashoffset="12"
      />
    </svg>
  );
}

// ── Sparkle ─────────────────────────────────────────────────────────────
function Sparkle({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 20 20" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 0 L11.5 7 L18 10 L11.5 13 L10 20 L8.5 13 L2 10 L8.5 7 Z"
        fill="#D4AF37"
        opacity="0.8"
      />
    </svg>
  );
}

// ── Wax Seal Piece (for crumbling) ──────────────────────────────────────
function WaxSealPiece({
  style,
  className = "",
}: {
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`absolute rounded-sm ${className}`}
      style={{
        width: "12px",
        height: "10px",
        background: "radial-gradient(circle at 40% 40%, #B22222, #8B0000)",
        boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2)",
        ...style,
      }}
    />
  );
}

// ────────────────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ────────────────────────────────────────────────────────────────────────
export default function InfiniteLoveLetter() {
  // ── Anime module ref ──────────────────────────────────────────────────
  const animeRef = useRef<{
    animate: typeof import("animejs").animate;
    stagger: typeof import("animejs").stagger;
    createTimeline: typeof import("animejs").createTimeline;
    createDrawable: typeof import("animejs").createDrawable;
  } | null>(null);

  // ── State ─────────────────────────────────────────────────────────────
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [noCrumbleMsg, setNoCrumbleMsg] = useState("");
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const noCrumbleIndex = useRef(0);

  // ── Refs ──────────────────────────────────────────────────────────────
  const envelopeRef = useRef<HTMLDivElement>(null);
  const waxSealRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const letterSlideRef = useRef<HTMLDivElement>(null);
  const sealPiecesRef = useRef<HTMLDivElement>(null);

  const greetingRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  const polaroidRef = useRef<HTMLDivElement>(null);
  const lavenderRef = useRef<HTMLDivElement>(null);
  const floatingIconsRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);

  const noBtnRef = useRef<HTMLButtonElement>(null);
  const noPiecesRef = useRef<HTMLDivElement>(null);

  const petalsContainerRef = useRef<HTMLDivElement>(null);
  const finalMessageRef = useRef<HTMLDivElement>(null);

  const observedSections = useRef(new Set<string>());

  // ── Crumble messages ──────────────────────────────────────────────────
  const crumbleMessages = [
    "This seal refuses!",
    "Not in this letter!",
    "Error 404: No not found",
    "The pen has spoken!",
    "Nice try, Kuttu Paapu!",
    "I don't think so!",
    "Sealed with love, not denial!",
    "Try the other one!",
  ];

  // ── Load anime.js ─────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    import("animejs").then((mod) => {
      if (cancelled) return;
      animeRef.current = {
        animate: mod.animate,
        stagger: mod.stagger,
        createTimeline: mod.createTimeline,
        createDrawable: mod.createDrawable,
      };
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Wrap text in character spans ──────────────────────────────────────
  const wrapChars = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="char-span inline-block"
        style={{ opacity: 0 }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  // ── Intersection Observer for scroll-triggered animations ─────────────
  const animateSection = useCallback(
    (sectionId: string) => {
      const a = animeRef.current;
      if (!a) return;

      switch (sectionId) {
        case "greeting": {
          const chars = greetingRef.current?.querySelectorAll(".char-span");
          if (chars && chars.length > 0) {
            a.animate(chars, {
              opacity: [0, 1],
              translateY: [8, 0],
              delay: a.stagger(45),
              duration: 400,
              ease: "outQuad",
            });
          }
          // Animate pressed rose
          const rose = greetingRef.current?.querySelector(".pressed-rose");
          if (rose) {
            a.animate(rose, {
              opacity: [0, 0.7],
              scale: [0.5, 1],
              rotate: [15, 0],
              duration: 1200,
              delay: 600,
              ease: "outQuad",
            });
          }
          break;
        }

        case "section1": {
          const paras = section1Ref.current?.querySelectorAll(".letter-para");
          if (paras) {
            a.animate(paras, {
              opacity: [0, 1],
              translateY: [30, 0],
              delay: a.stagger(250),
              duration: 800,
              ease: "outQuad",
            });
          }
          // Polaroid develop
          if (polaroidRef.current) {
            const overlay = polaroidRef.current.querySelector(".polaroid-overlay");
            if (overlay) {
              a.animate(overlay, {
                opacity: [1, 0],
                duration: 2000,
                delay: 800,
                ease: "inOutQuad",
              });
            }
            a.animate(polaroidRef.current, {
              opacity: [0, 1],
              rotate: [-5, -3],
              translateY: [20, 0],
              duration: 1000,
              delay: 400,
              ease: "outQuad",
            });
          }
          break;
        }

        case "section2": {
          const paras = section2Ref.current?.querySelectorAll(".letter-para");
          if (paras) {
            a.animate(paras, {
              opacity: [0, 1],
              translateY: [30, 0],
              delay: a.stagger(250),
              duration: 800,
              ease: "outQuad",
            });
          }
          // Lavender flowers
          if (lavenderRef.current) {
            const flowers = lavenderRef.current.querySelectorAll(".lavender-stem");
            if (flowers.length > 0) {
              a.animate(flowers, {
                opacity: [0, 0.65],
                scale: [0.4, 1],
                translateY: [20, 0],
                delay: a.stagger(200),
                duration: 1000,
                ease: "outQuad",
              });
            }
          }
          break;
        }

        case "section3": {
          const paras = section3Ref.current?.querySelectorAll(".letter-para");
          if (paras) {
            a.animate(paras, {
              opacity: [0, 1],
              translateY: [30, 0],
              delay: a.stagger(250),
              duration: 800,
              ease: "outQuad",
            });
          }
          // Floating icons
          if (floatingIconsRef.current) {
            const icons = floatingIconsRef.current.querySelectorAll(".floating-icon");
            icons.forEach((icon, i) => {
              a.animate(icon, {
                opacity: [0, 0.7],
                duration: 600,
                delay: 300 + i * 200,
                ease: "outQuad",
              });
              a.animate(icon, {
                translateY: [-6, 6],
                duration: 2000 + i * 300,
                loop: true,
                alternate: true,
                ease: "inOutSine",
                delay: i * 150,
              });
            });
          }
          break;
        }

        case "section4": {
          const paras = section4Ref.current?.querySelectorAll(".letter-para");
          if (paras) {
            a.animate(paras, {
              opacity: [0, 1],
              translateY: [30, 0],
              delay: a.stagger(250),
              duration: 800,
              ease: "outQuad",
            });
          }
          // Ring draw animation
          if (ringRef.current) {
            const band = ringRef.current.querySelector(".ring-band");
            const diamonds = ringRef.current.querySelectorAll(".ring-diamond");
            if (band) {
              a.animate(band, {
                strokeDashoffset: [140, 0],
                opacity: [0, 0.7],
                duration: 1500,
                delay: 500,
                ease: "inOutQuad",
              });
            }
            if (diamonds.length > 0) {
              a.animate(diamonds, {
                strokeDashoffset: [60, 0],
                opacity: [0, 0.7],
                duration: 1000,
                delay: a.stagger(200, { start: 1200 }),
                ease: "inOutQuad",
              });
            }
            // Sparkles
            if (sparklesRef.current) {
              const sparkles = sparklesRef.current.querySelectorAll(".sparkle");
              sparkles.forEach((sp, i) => {
                a.animate(sp, {
                  opacity: [0, 0.9, 0],
                  scale: [0, 1.2, 0.3],
                  duration: 1200,
                  delay: 1800 + i * 200,
                  loop: true,
                  ease: "inOutQuad",
                });
              });
            }
          }
          break;
        }

        case "section5": {
          const paras = section5Ref.current?.querySelectorAll(".letter-para");
          if (paras) {
            a.animate(paras, {
              opacity: [0, 1],
              translateY: [30, 0],
              delay: a.stagger(400),
              duration: 1000,
              ease: "outQuad",
            });
          }
          break;
        }

        case "question": {
          const title = questionRef.current?.querySelector(".question-text");
          if (title) {
            a.animate(title, {
              opacity: [0, 1],
              scale: [0.85, 1],
              translateY: [30, 0],
              duration: 1200,
              ease: "outQuad",
            });
          }
          const btns = questionRef.current?.querySelectorAll(".seal-btn");
          if (btns) {
            a.animate(btns, {
              opacity: [0, 1],
              scale: [0.7, 1],
              delay: a.stagger(300, { start: 600 }),
              duration: 800,
              ease: "outBack",
            });
          }
          // Pulse the yes button
          const yesBtn = questionRef.current?.querySelector(".yes-seal");
          if (yesBtn) {
            a.animate(yesBtn, {
              boxShadow: [
                "0 0 0px 0px rgba(220,50,80,0.3)",
                "0 0 25px 8px rgba(220,50,80,0.5)",
              ],
              duration: 1200,
              loop: true,
              alternate: true,
              ease: "inOutSine",
              delay: 1200,
            });
          }
          break;
        }
      }
    },
    []
  );

  // ── Setup Intersection Observer ───────────────────────────────────────
  useEffect(() => {
    if (!letterVisible) return;

    const sectionMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
      greeting: greetingRef,
      section1: section1Ref,
      section2: section2Ref,
      section3: section3Ref,
      section4: section4Ref,
      section5: section5Ref,
      question: questionRef,
    };

    // Small delay so DOM is ready
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("data-section");
              if (id && !observedSections.current.has(id)) {
                observedSections.current.add(id);
                animateSection(id);
              }
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
      );

      Object.entries(sectionMap).forEach(([id, ref]) => {
        if (ref.current) {
          ref.current.setAttribute("data-section", id);
          observer.observe(ref.current);
        }
      });

      return () => observer.disconnect();
    }, 200);

    return () => clearTimeout(timer);
  }, [letterVisible, animateSection]);

  // ── Envelope Open Animation ───────────────────────────────────────────
  const handleEnvelopeOpen = () => {
    const a = animeRef.current;
    if (!a || envelopeOpen) return;
    setEnvelopeOpen(true);

    const tl = a.createTimeline({
      defaults: { ease: "outQuad" },
    });

    // 1) Wax seal cracks - pieces fly out
    if (sealPiecesRef.current) {
      const pieces = sealPiecesRef.current.querySelectorAll(".seal-piece");
      // Hide original seal
      tl.add(waxSealRef.current!, { opacity: [1, 0], scale: [1, 1.15], duration: 300 }, 0);
      // Pieces appear and scatter
      if (pieces.length > 0) {
        pieces.forEach((piece, i) => {
          const angle = (i / pieces.length) * Math.PI * 2;
          const dist = 60 + Math.random() * 50;
          const tx = Math.cos(angle) * dist;
          const ty = Math.sin(angle) * dist;
          tl.add(
            piece as HTMLElement,
            {
              opacity: [1, 0],
              translateX: [0, tx],
              translateY: [0, ty],
              rotate: [0, (Math.random() - 0.5) * 360],
              scale: [1, 0.3],
              duration: 700,
              ease: "outExpo",
            },
            100
          );
        });
      }
    }

    // 2) Flap opens (rotateX around top edge)
    if (flapRef.current) {
      tl.add(
        flapRef.current,
        {
          rotateX: [0, 180],
          duration: 600,
          ease: "inOutQuad",
        },
        400
      );
    }

    // 3) Letter slides up
    if (letterSlideRef.current) {
      tl.add(
        letterSlideRef.current,
        {
          translateY: [0, -80],
          opacity: [0, 1],
          duration: 700,
          ease: "outQuad",
        },
        700
      );
    }

    // 4) Envelope fades out, letter content appears
    if (envelopeRef.current) {
      tl.add(
        envelopeRef.current,
        {
          opacity: [1, 0],
          scale: [1, 0.9],
          duration: 600,
          ease: "inQuad",
          onComplete: () => {
            setLetterVisible(true);
          },
        },
        1500
      );
    }
  };

  // ── No Button Crumble ─────────────────────────────────────────────────
  const handleNoCrumble = () => {
    const a = animeRef.current;
    if (!a || !noPiecesRef.current || !noBtnRef.current) return;

    // Show crumble message
    const msg = crumbleMessages[noCrumbleIndex.current % crumbleMessages.length];
    noCrumbleIndex.current++;
    setNoCrumbleMsg(msg);

    // Crumble: pieces scatter
    const pieces = noPiecesRef.current.querySelectorAll(".no-piece");
    // Make button invisible
    noBtnRef.current.style.opacity = "0";

    pieces.forEach((piece, i) => {
      const el = piece as HTMLElement;
      el.style.opacity = "1";
      const angle = (i / pieces.length) * Math.PI * 2 + (Math.random() - 0.5);
      const dist = 50 + Math.random() * 80;
      a.animate(el, {
        translateX: [0, Math.cos(angle) * dist],
        translateY: [0, Math.sin(angle) * dist],
        rotate: [0, (Math.random() - 0.5) * 540],
        opacity: [1, 0],
        scale: [1, 0.2],
        duration: 700 + Math.random() * 300,
        ease: "outExpo",
      });
    });

    // Reappear in a random position after a short delay
    setTimeout(() => {
      const container = questionRef.current;
      if (!container || !noBtnRef.current) return;
      const rect = container.getBoundingClientRect();
      const maxX = Math.max(0, rect.width - 100);
      const maxY = Math.max(0, 200);
      const randomX = Math.random() * maxX - maxX / 2;
      const randomY = Math.random() * maxY - maxY / 2 + 40;
      setNoPosition({ x: randomX, y: randomY });
      noBtnRef.current.style.opacity = "1";
      setNoCrumbleMsg("");
      // Reset piece positions
      pieces.forEach((piece) => {
        const el = piece as HTMLElement;
        el.style.opacity = "0";
        el.style.transform = "none";
      });
      a.animate(noBtnRef.current, {
        opacity: [0, 1],
        scale: [0.5, 1],
        duration: 400,
        ease: "outBack",
      });
    }, 1100);
  };

  // ── Yes Button - Petals & Final ───────────────────────────────────────
  const handleYes = () => {
    const a = animeRef.current;
    if (!a || answered) return;
    setAnswered(true);

    // Rain petals
    if (petalsContainerRef.current) {
      petalsContainerRef.current.style.display = "block";
      const petals = petalsContainerRef.current.querySelectorAll(".petal");
      petals.forEach((petal, i) => {
        const el = petal as HTMLElement;
        const startX = Math.random() * 100;
        const swayAmount = (Math.random() - 0.5) * 120;
        el.style.left = `${startX}%`;
        el.style.top = "-20px";
        el.style.opacity = "0";
        a.animate(el, {
          translateY: [0, window.innerHeight + 100],
          translateX: [0, swayAmount],
          rotate: [0, (Math.random() - 0.5) * 720],
          opacity: [{ to: 0.9, duration: 300 }, { to: 0, duration: 500 }],
          duration: 2500 + Math.random() * 2000,
          delay: i * 60 + Math.random() * 400,
          ease: "inQuad",
        });
      });
    }

    // After petals, show final message
    setTimeout(() => {
      setShowFinal(true);
      setTimeout(() => {
        if (finalMessageRef.current && a) {
          a.animate(finalMessageRef.current, {
            opacity: [0, 1],
            scale: [0.8, 1],
            translateY: [40, 0],
            duration: 1200,
            ease: "outQuad",
          });
          // Animate the inner elements
          const lines = finalMessageRef.current.querySelectorAll(".final-line");
          if (lines.length > 0) {
            a.animate(lines, {
              opacity: [0, 1],
              translateY: [20, 0],
              delay: a.stagger(300, { start: 400 }),
              duration: 800,
              ease: "outQuad",
            });
          }
        }
      }, 100);
    }, 2200);
  };

  // ── RENDER: FINAL MESSAGE ─────────────────────────────────────────────
  if (showFinal) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #F5E6D3 0%, #EDD9C4 50%, #F5E6D3 100%)" }}>
        {/* Petal container still visible */}
        <div ref={petalsContainerRef} className="fixed inset-0 pointer-events-none z-10" style={{ display: "block" }}>
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="petal absolute"
              style={{
                width: `${8 + Math.random() * 10}px`,
                height: `${10 + Math.random() * 12}px`,
                borderRadius: "50% 0 50% 50%",
                background: i % 3 === 0
                  ? "linear-gradient(135deg, #FFB7C5, #FF91A4)"
                  : i % 3 === 1
                  ? "linear-gradient(135deg, #FFE4E9, #FFB7C5)"
                  : "linear-gradient(135deg, #FFFFFF, #FFE4E9)",
                opacity: 0,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>

        <div
          ref={finalMessageRef}
          className="relative z-20 max-w-lg mx-auto px-8 py-12 text-center"
          style={{
            opacity: 0,
            background: "linear-gradient(180deg, rgba(245,230,211,0.95), rgba(237,217,196,0.95))",
            borderRadius: "8px",
            boxShadow: "0 8px 40px rgba(62,39,35,0.15)",
          }}
        >
          {/* Decorative top flourish */}
          <div className="final-line flex justify-center mb-6" style={{ opacity: 0 }}>
            <svg viewBox="0 0 120 20" className="w-32" fill="none">
              <path d="M10 10 Q30 0 60 10 Q90 20 110 10" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6" fill="none" />
              <circle cx="60" cy="10" r="3" fill="#D4AF37" opacity="0.5" />
            </svg>
          </div>

          <p
            className="final-line text-lg md:text-xl leading-relaxed mb-4"
            style={{
              fontFamily: "var(--font-caveat)",
              color: "#3E2723",
              opacity: 0,
            }}
          >
            Forever yours, and soon...
          </p>
          <p
            className="final-line text-lg md:text-xl leading-relaxed mb-4"
            style={{
              fontFamily: "var(--font-caveat)",
              color: "#3E2723",
              opacity: 0,
            }}
          >
            ring shopping in NYC.
          </p>
          <p
            className="final-line text-xl md:text-2xl font-semibold mb-8"
            style={{
              fontFamily: "var(--font-caveat)",
              color: "#5D4037",
              opacity: 0,
            }}
          >
            Ken & Dana&apos;s awaits us, bangaara.
          </p>

          {/* Heart signature */}
          <div className="final-line flex justify-center" style={{ opacity: 0 }}>
            <svg viewBox="0 0 60 55" className="w-14 h-14">
              <path
                d="M30 50 C10 35 0 20 5 12 C10 4 20 4 30 15 C40 4 50 4 55 12 C60 20 50 35 30 50Z"
                fill="#C0687E"
                opacity="0.7"
              />
            </svg>
          </div>

          {/* Bottom flourish */}
          <div className="final-line flex justify-center mt-6" style={{ opacity: 0 }}>
            <svg viewBox="0 0 120 20" className="w-32" fill="none">
              <path d="M10 10 Q30 20 60 10 Q90 0 110 10" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // ── RENDER: ENVELOPE ──────────────────────────────────────────────────
  if (!letterVisible) {
    return (
      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #F5E6D3 0%, #EDE0D4 40%, #F5E6D3 100%)",
        }}
      >
        {/* Subtle parchment noise */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
            opacity: 0.5,
          }}
        />

        <div
          ref={envelopeRef}
          className="relative cursor-pointer select-none"
          onClick={handleEnvelopeOpen}
          style={{ perspective: "800px" }}
        >
          {/* Envelope body */}
          <div
            className="relative"
            style={{
              width: "min(85vw, 360px)",
              height: "min(60vw, 240px)",
              background: "linear-gradient(180deg, #C89AE8 0%, #B57EDC 100%)",
              borderRadius: "8px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            {/* Inner paper peek */}
            <div
              className="absolute left-1/2 -translate-x-1/2 rounded-t"
              style={{
                bottom: "20%",
                width: "75%",
                height: "50%",
                background: "linear-gradient(180deg, #FFF8E7, #F5E6D3)",
                boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
              }}
            />

            {/* Letter slide element */}
            <div
              ref={letterSlideRef}
              className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
              style={{
                bottom: "25%",
                width: "70%",
                height: "40%",
                background: "linear-gradient(180deg, #FFF8E7, #F5E6D3)",
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                opacity: 0,
              }}
            >
              <span
                className="text-sm md:text-base"
                style={{
                  fontFamily: "var(--font-caveat)",
                  color: "#3E2723",
                  opacity: 0.7,
                }}
              >
                A letter for you...
              </span>
            </div>

            {/* Addressed label */}
            <div
              className="absolute left-1/2 -translate-x-1/2 text-center"
              style={{
                top: "55%",
                transform: "translateX(-50%)",
              }}
            >
              <p
                className="text-2xl md:text-3xl"
                style={{
                  fontFamily: "var(--font-caveat)",
                  color: "#FFF8E7",
                  textShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              >
                Kuttu Paapu
              </p>
            </div>

            {/* Envelope flap (triangle on top) */}
            <div
              ref={flapRef}
              className="absolute left-0 right-0 top-0"
              style={{
                height: "50%",
                background: "linear-gradient(180deg, #A66FC8 0%, #B57EDC 100%)",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                borderRadius: "8px 8px 0 0",
                transformOrigin: "top center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                zIndex: 2,
              }}
            />

            {/* Wax seal */}
            <div
              ref={waxSealRef}
              className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
              style={{
                top: "28%",
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #D4453A, #8B0000 70%)",
                boxShadow:
                  "0 3px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -2px 6px rgba(0,0,0,0.2)",
              }}
            >
              {/* Embossed heart on seal */}
              <svg viewBox="0 0 24 22" className="w-6 h-6" style={{ opacity: 0.6 }}>
                <path
                  d="M12 20 C4 14 0 8 2 5 C4 2 8 2 12 7 C16 2 20 2 22 5 C24 8 20 14 12 20Z"
                  fill="rgba(255,255,255,0.3)"
                />
              </svg>
            </div>

            {/* Seal crack pieces */}
            <div
              ref={sealPiecesRef}
              className="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-none"
              style={{ top: "28%", width: "56px", height: "56px" }}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <WaxSealPiece key={i} className="seal-piece" style={{ opacity: 0, top: "50%", left: "50%" }} />
              ))}
            </div>
          </div>

          {/* Tap to open text */}
          <p
            className="text-center mt-6 animate-pulse"
            style={{
              fontFamily: "var(--font-caveat)",
              color: "#5D4037",
              fontSize: "1.15rem",
              opacity: 0.8,
            }}
          >
            Tap to open
          </p>
        </div>
      </div>
    );
  }

  // ── RENDER: LETTER CONTENT ────────────────────────────────────────────
  return (
    <div
      className="min-h-screen relative"
      style={{
        background: "linear-gradient(180deg, #F5E6D3 0%, #EDE0D4 20%, #F5E6D3 40%, #EDD9C4 60%, #F5E6D3 80%, #EDE0D4 100%)",
      }}
    >
      {/* Parchment texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.6,
        }}
      />

      {/* Petals container (activated on YES) */}
      <div
        ref={petalsContainerRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ display: "none" }}
      >
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="petal absolute"
            style={{
              width: `${8 + Math.random() * 10}px`,
              height: `${10 + Math.random() * 12}px`,
              borderRadius: "50% 0 50% 50%",
              background:
                i % 3 === 0
                  ? "linear-gradient(135deg, #FFB7C5, #FF91A4)"
                  : i % 3 === 1
                  ? "linear-gradient(135deg, #FFE4E9, #FFB7C5)"
                  : "linear-gradient(135deg, #FFFFFF, #FFE4E9)",
              opacity: 0,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      {/* ─── Letter content ─── */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 sm:px-10 md:px-16 py-16 md:py-24">

        {/* === GREETING === */}
        <section ref={greetingRef} className="relative mb-20 md:mb-28 min-h-[30vh] flex flex-col justify-center">
          {/* Pressed rose top-right */}
          <div className="pressed-rose absolute -top-4 -right-2 sm:right-0 md:-right-8" style={{ opacity: 0 }}>
            <PressedRose className="w-20 h-24 md:w-28 md:h-32" />
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl leading-snug"
            style={{
              fontFamily: "var(--font-caveat)",
              color: "#3E2723",
            }}
          >
            {wrapChars("Dear Kuttu Paapu,")}
          </h1>
        </section>

        {/* === PARAGRAPH 1 - THE MEETING === */}
        <section ref={section1Ref} className="relative mb-20 md:mb-28">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-5">
              <p
                className="letter-para text-lg md:text-xl leading-relaxed"
                style={{
                  fontFamily: "var(--font-caveat)",
                  color: "#3E2723",
                  opacity: 0,
                  lineHeight: "1.9",
                }}
              >
                Do you remember that Dandiya night at Cabot Hall? I still remember every detail. The music, the colors, the energy...
              </p>
              <p
                className="letter-para text-lg md:text-xl leading-relaxed"
                style={{
                  fontFamily: "var(--font-caveat)",
                  color: "#3E2723",
                  opacity: 0,
                  lineHeight: "1.9",
                }}
              >
                and then there was you. Standing there like you owned the place (you kind of did).
              </p>
              <p
                className="letter-para text-lg md:text-xl leading-relaxed"
                style={{
                  fontFamily: "var(--font-caveat)",
                  color: "#3E2723",
                  opacity: 0,
                  lineHeight: "1.9",
                }}
              >
                That night, my heart decided before my brain could even catch up.
              </p>
            </div>

            {/* Polaroid */}
            <div
              ref={polaroidRef}
              className="relative flex-shrink-0 mx-auto md:mx-0"
              style={{
                width: "180px",
                height: "210px",
                opacity: 0,
                transform: "rotate(-3deg)",
              }}
            >
              <div
                className="w-full h-full p-3 pb-10 rounded-sm"
                style={{
                  background: "#FFFFFF",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)",
                }}
              >
                {/* Photo placeholder gradient */}
                <div
                  className="w-full h-full rounded-sm relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #E8D5C8, #D4A990, #C99A80, #E0C4B0)",
                  }}
                >
                  {/* Little decorative elements inside placeholder */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ opacity: 0.4 }}
                  >
                    <svg viewBox="0 0 60 60" className="w-12 h-12">
                      <path
                        d="M30 45 C15 35 5 22 10 15 C15 8 22 10 30 20 C38 10 45 8 50 15 C55 22 45 35 30 45Z"
                        fill="#C0687E"
                        opacity="0.5"
                      />
                    </svg>
                  </div>
                  {/* Overexposed overlay */}
                  <div
                    className="polaroid-overlay absolute inset-0"
                    style={{
                      background: "linear-gradient(135deg, #FFFFFF, #FFF8F0)",
                      opacity: 1,
                    }}
                  />
                </div>
              </div>
              {/* Polaroid caption */}
              <p
                className="absolute bottom-2 left-0 right-0 text-center text-xs"
                style={{
                  fontFamily: "var(--font-caveat)",
                  color: "#8D6E63",
                }}
              >
                Cabot Hall, Boston
              </p>
            </div>
          </div>
        </section>

        {/* === PARAGRAPH 2 - THE NICKNAMES === */}
        <section ref={section2Ref} className="relative mb-20 md:mb-28">
          {/* Lavender flowers in left margin */}
          <div
            ref={lavenderRef}
            className="absolute -left-4 sm:-left-6 md:-left-16 top-0 flex flex-col gap-4"
          >
            <LavenderFlower
              className="lavender-stem w-8 md:w-10 h-24 md:h-28"
              style={{ opacity: 0, transform: "rotate(-5deg)" }}
            />
            <LavenderFlower
              className="lavender-stem w-7 md:w-9 h-20 md:h-24"
              style={{ opacity: 0, transform: "rotate(8deg)" }}
            />
            <LavenderFlower
              className="lavender-stem w-6 md:w-8 h-18 md:h-22"
              style={{ opacity: 0, transform: "rotate(-3deg)" }}
            />
          </div>

          <div className="space-y-5 pl-4 md:pl-0">
            <p
              className="letter-para text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: "var(--font-caveat)",
                color: "#3E2723",
                opacity: 0,
                lineHeight: "1.9",
              }}
            >
              Somewhere along the way, I started calling you things.
            </p>
            <p
              className="letter-para text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: "var(--font-caveat)",
                color: "#3E2723",
                opacity: 0,
                lineHeight: "1.9",
              }}
            >
              <span className="italic" style={{ color: "#8B5E3C" }}>Chinnu Munnu</span> — because you&apos;re the sweetest thing I know.
            </p>
            <p
              className="letter-para text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: "var(--font-caveat)",
                color: "#3E2723",
                opacity: 0,
                lineHeight: "1.9",
              }}
            >
              <span className="italic" style={{ color: "#8B5E3C" }}>Bangaara</span> — because you&apos;re pure gold to me.
            </p>
            <p
              className="letter-para text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: "var(--font-caveat)",
                color: "#3E2723",
                opacity: 0,
                lineHeight: "1.9",
              }}
            >
              And <span className="italic" style={{ color: "#8B5E3C" }}>Kuttu Paapu</span> — well, because you&apos;re my Kuttu Paapu. No explanation needed.
            </p>
          </div>
        </section>

        {/* === PARAGRAPH 3 - HER WORLD === */}
        <section ref={section3Ref} className="relative mb-20 md:mb-28">
          {/* Floating icons */}
          <div ref={floatingIconsRef} className="absolute -right-2 sm:-right-4 md:-right-14 top-0 flex flex-col gap-6">
            <FloatingRose className="floating-icon w-8 h-8 md:w-10 md:h-10" />
            <FloatingNote className="floating-icon w-8 h-8 md:w-10 md:h-10" />
            <FloatingBag className="floating-icon w-8 h-8 md:w-10 md:h-10" />
            <FloatingSmiley className="floating-icon w-8 h-8 md:w-10 md:h-10" />
          </div>

          <div className="space-y-5 pr-6 md:pr-0">
            <p
              className="letter-para text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: "var(--font-caveat)",
                color: "#3E2723",
                opacity: 0,
                lineHeight: "1.9",
              }}
            >
              I know your world:
            </p>
            <p
              className="letter-para text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: "var(--font-caveat)",
                color: "#3E2723",
                opacity: 0,
                lineHeight: "1.9",
              }}
            >
              the way your eyes light up when you see pink roses and lilies, how you can listen to Anirudh on loop and never get tired,
            </p>
            <p
              className="letter-para text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: "var(--font-caveat)",
                color: "#3E2723",
                opacity: 0,
                lineHeight: "1.9",
              }}
            >
              your unstoppable energy when we go shopping, and how your laugh can fix literally anything.
            </p>
          </div>
        </section>

        {/* === PARAGRAPH 4 - THE FUTURE === */}
        <section ref={section4Ref} className="relative mb-20 md:mb-28">
          {/* Ring doodle */}
          <div
            ref={ringRef}
            className="absolute -right-2 sm:-right-4 md:-right-16 top-8 md:top-4"
          >
            <RingDoodle className="w-16 h-18 md:w-20 md:h-24" />
            {/* Sparkles */}
            <div ref={sparklesRef} className="absolute -inset-4">
              <Sparkle className="sparkle absolute -top-2 -right-1 w-4 h-4" style={{ opacity: 0 }} />
              <Sparkle className="sparkle absolute top-0 left-0 w-3 h-3" style={{ opacity: 0 }} />
              <Sparkle className="sparkle absolute -top-3 right-4 w-3.5 h-3.5" style={{ opacity: 0 }} />
              <Sparkle className="sparkle absolute top-2 -right-3 w-2.5 h-2.5" style={{ opacity: 0 }} />
              <Sparkle className="sparkle absolute bottom-8 -right-2 w-3 h-3" style={{ opacity: 0 }} />
            </div>
          </div>

          <div className="space-y-5 pr-14 md:pr-0">
            <p
              className="letter-para text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: "var(--font-caveat)",
                color: "#3E2723",
                opacity: 0,
                lineHeight: "1.9",
              }}
            >
              And now, we&apos;re about to write a new chapter.
            </p>
            <p
              className="letter-para text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: "var(--font-caveat)",
                color: "#3E2723",
                opacity: 0,
                lineHeight: "1.9",
              }}
            >
              You and me, in New York City.
            </p>
            <p
              className="letter-para text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: "var(--font-caveat)",
                color: "#3E2723",
                opacity: 0,
                lineHeight: "1.9",
              }}
            >
              There&apos;s a place called Ken & Dana&apos;s, and I think we should go look at something... <span className="italic" style={{ color: "#8B5E3C" }}>sparkly</span>.
            </p>
          </div>
        </section>

        {/* === PARAGRAPH 5 - THE CLOSING === */}
        <section ref={section5Ref} className="relative mb-12 md:mb-16">
          <div className="space-y-5">
            <p
              className="letter-para text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: "var(--font-caveat)",
                color: "#3E2723",
                opacity: 0,
                lineHeight: "1.9",
              }}
            >
              But before all of that, I need to ask you something very important...
            </p>
          </div>
        </section>

        {/* Dramatic pause space */}
        <div className="h-[30vh] md:h-[40vh]" />

        {/* === THE QUESTION === */}
        <section
          ref={questionRef}
          className="relative min-h-[60vh] flex flex-col items-center justify-center py-16"
        >
          <h2
            className="question-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-16 italic"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "#3E2723",
              opacity: 0,
              lineHeight: "1.3",
            }}
          >
            Will you be my Valentine?
          </h2>

          {/* Buttons container */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 relative">
            {/* YES Seal */}
            <button
              onClick={handleYes}
              disabled={answered}
              className="seal-btn yes-seal relative flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #D4453A, #8B0000 70%)",
                boxShadow:
                  "0 4px 15px rgba(139,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -3px 8px rgba(0,0,0,0.25)",
                border: "none",
                opacity: 0,
              }}
            >
              <span
                className="text-xl font-semibold"
                style={{
                  fontFamily: "var(--font-caveat)",
                  color: "rgba(255,255,255,0.85)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                Yes
              </span>
            </button>

            {/* NO Seal */}
            <div className="relative" style={{ width: "100px", height: "100px" }}>
              <button
                ref={noBtnRef}
                onClick={handleNoCrumble}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleNoCrumble();
                }}
                className="seal-btn no-seal relative flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 35%, #9E9E9E, #616161 70%)",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -3px 8px rgba(0,0,0,0.25)",
                  border: "none",
                  opacity: 0,
                  transform: noPosition
                    ? `translate(${noPosition.x}px, ${noPosition.y}px)`
                    : "none",
                }}
              >
                <span
                  className="text-xl font-semibold"
                  style={{
                    fontFamily: "var(--font-caveat)",
                    color: "rgba(255,255,255,0.85)",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  }}
                >
                  No
                </span>
              </button>

              {/* Crumble pieces for No */}
              <div
                ref={noPiecesRef}
                className="absolute inset-0 pointer-events-none"
                style={{
                  transform: noPosition
                    ? `translate(${noPosition.x}px, ${noPosition.y}px)`
                    : "none",
                }}
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="no-piece absolute rounded-sm"
                    style={{
                      width: `${10 + Math.random() * 8}px`,
                      height: `${8 + Math.random() * 6}px`,
                      background: "radial-gradient(circle at 40% 40%, #9E9E9E, #616161)",
                      boxShadow: "inset 0 1px 2px rgba(255,255,255,0.15)",
                      opacity: 0,
                      top: `${30 + Math.random() * 40}%`,
                      left: `${20 + Math.random() * 60}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Crumble message */}
          {noCrumbleMsg && (
            <p
              className="mt-6 text-lg md:text-xl animate-bounce"
              style={{
                fontFamily: "var(--font-caveat)",
                color: "#8B0000",
                textAlign: "center",
              }}
            >
              {noCrumbleMsg}
            </p>
          )}
        </section>

        {/* Bottom margin */}
        <div className="h-[10vh]" />
      </div>
    </div>
  );
}
