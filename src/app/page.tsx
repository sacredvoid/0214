"use client";

import { useEffect, useRef } from "react";

const experiences = [
  {
    id: 1,
    title: "The Museum of Us",
    subtitle: "A Curated Exhibition of Love",
    description: "Walk through a dark, elegant gallery where our memories hang in golden frames.",
    href: "/museum",
    gradient: "from-[#1a1a2e] to-[#2D1B69]",
    accent: "border-[#D4AF37]",
    icon: "🖼️",
  },
  {
    id: 2,
    title: "Dandiya Night to Diamond Ring",
    subtitle: "Where It All Began",
    description: "From Cabot Hall to NYC — a cinematic journey through our love story.",
    href: "/dandiya",
    gradient: "from-[#2D1B69] to-[#FF8C00]",
    accent: "border-[#FFD700]",
    icon: "💃",
  },
  {
    id: 3,
    title: "The Infinite Love Letter",
    subtitle: "Dear Kuttu Paapu...",
    description: "A handwritten letter that unfolds with every scroll, sealed with love.",
    href: "/letter",
    gradient: "from-[#8B0000] to-[#B57EDC]",
    accent: "border-[#8B0000]",
    icon: "💌",
  },
  {
    id: 4,
    title: "Srusti's Secret Garden",
    subtitle: "Watch Our Love Grow",
    description: "A magical garden that blooms as you scroll, with memories hidden in every flower.",
    href: "/garden",
    gradient: "from-[#2d5a27] to-[#87CEEB]",
    accent: "border-[#FFB7C5]",
    icon: "🌸",
  },
];

export default function HomePage() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    import("animejs").then(({ animate, stagger }) => {
      animate(titleRef.current!, {
        opacity: [0, 1],
        translateY: [-30, 0],
        duration: 1000,
        ease: "outQuad",
      });

      animate(subtitleRef.current!, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        delay: 400,
        ease: "outQuad",
      });

      animate(".experience-card", {
        opacity: [0, 1],
        translateY: [60, 0],
        scale: [0.9, 1],
        delay: stagger(150, { start: 800 }),
        duration: 700,
        ease: "outQuad",
      });

      animate(".floating-heart", {
        translateY: [-10, 10],
        duration: 2000,
        ease: "inOutQuad",
        alternate: true,
        loop: true,
        delay: stagger(300),
      });

      animate(".sparkle", {
        opacity: [0.3, 1, 0.3],
        scale: [0.8, 1.2, 0.8],
        duration: 2000,
        ease: "inOutQuad",
        loop: true,
        delay: stagger(400),
      });
    });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0010] via-[#1a0a2e] to-[#0a0010] relative overflow-hidden">
      {/* Floating background hearts */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="floating-heart absolute text-[#FFB7C5] opacity-10 pointer-events-none select-none"
          style={{
            left: `${10 + (i * 12) % 80}%`,
            top: `${5 + (i * 17) % 70}%`,
            fontSize: `${20 + (i * 7) % 30}px`,
          }}
        >
          ♥
        </div>
      ))}

      {/* Sparkle decorations */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`s-${i}`}
          className="sparkle absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            left: `${5 + (i * 9) % 90}%`,
            top: `${10 + (i * 11) % 80}%`,
            backgroundColor: i % 3 === 0 ? "#D4AF37" : i % 3 === 1 ? "#B57EDC" : "#FFB7C5",
          }}
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 opacity-0"
            style={{
              fontFamily: "var(--font-playfair)",
              background: "linear-gradient(135deg, #FFB7C5, #B57EDC, #D4AF37)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            For Srusti
          </h1>
          <p
            ref={subtitleRef}
            className="text-lg md:text-2xl opacity-0"
            style={{
              fontFamily: "var(--font-dancing)",
              color: "#E6E6FA",
            }}
          >
            Choose your Valentine&apos;s experience, Kuttu Paapu
          </p>
        </div>

        {/* Experience Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {experiences.map((exp) => (
            <a
              key={exp.id}
              href={exp.href}
              className={`experience-card group relative rounded-2xl border-2 ${exp.accent} overflow-hidden opacity-0 transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl`}
              style={{ minHeight: "220px" }}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-80`}
              />

              {/* Hover shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
                <div>
                  <span className="text-3xl md:text-4xl mb-3 block">{exp.icon}</span>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-white mb-1"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {exp.title}
                  </h2>
                  <p
                    className="text-sm md:text-base mb-3"
                    style={{
                      fontFamily: "var(--font-dancing)",
                      color: "#E6E6FA",
                    }}
                  >
                    {exp.subtitle}
                  </p>
                </div>
                <p
                  className="text-sm md:text-base text-gray-300"
                  style={{ fontFamily: "var(--font-lora)" }}
                >
                  {exp.description}
                </p>

                {/* Arrow */}
                <div className="absolute bottom-6 right-6 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all duration-300 text-xl">
                  →
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 md:mt-24">
          <p
            className="text-sm md:text-base"
            style={{
              fontFamily: "var(--font-caveat)",
              color: "#B57EDC",
              opacity: 0.7,
            }}
          >
            Made with all my love, for you ♥
          </p>
        </div>
      </div>
    </main>
  );
}
