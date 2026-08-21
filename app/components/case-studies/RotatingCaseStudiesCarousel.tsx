"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { caseStudies, CaseStudy } from "../../lib/case-studies";

type Props = {
  items?: CaseStudy[];
};

export default function RotatingCaseStudiesCarousel({ items = caseStudies }: Props) {
  const [activePosition, setActivePosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);

  const dragStart = useRef<number | null>(null);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  /* -------------------------------------------------------
     WINDOW RESIZE TRACKING FOR ACCURATE RESPONSIVE ARC
  ------------------------------------------------------- */
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* -------------------------------------------------------
     AUTO-SWIPE WITH 2-SECOND TIMER
  ------------------------------------------------------- */
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActivePosition((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  const temporarilyPause = () => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4000);
  };

  /* -------------------------------------------------------
     HORIZONTAL DRAG & SWIPE
  ------------------------------------------------------- */
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStart.current = event.clientX;
    temporarilyPause();
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return;

    const distance = event.clientX - dragStart.current;

    if (Math.abs(distance) > 35) {
      if (distance < 0) {
        setActivePosition((prev) => prev + 1);
      } else {
        setActivePosition((prev) => prev - 1);
      }
    }

    dragStart.current = null;
  };

  const rotateStep = (direction: 1 | -1) => {
    temporarilyPause();
    setActivePosition((prev) => prev + direction);
  };

  const rotateToCard = (index: number) => {
    temporarilyPause();
    const total = items.length;
    let diff = (index - (activePosition % total) + total) % total;
    if (diff > total / 2) diff -= total;
    setActivePosition((prev) => prev + diff);
  };

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // Responsive spacing so both side cards peek in symmetrically on mobile
  const spacing = isMobile
    ? Math.min(270, Math.max(220, windowWidth * 0.70))
    : isTablet
    ? 320
    : 370;

  return (
    <section
      id="rotating-stats"
      className="relative w-full overflow-visible py-4 sm:py-8 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Header Controls: Count & Arrow Navigation */}
      <div className="mx-auto mb-6 sm:mb-8 flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-wider text-[#60C7FF]">
            {String(items.length).padStart(2, "0")} SHOWCASED CASE STUDIES
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider text-slate-300">
            <span className="h-2 w-2 rounded-full bg-[#60C7FF] animate-ping" />
            <span className="uppercase text-[11px] tracking-[0.16em]">
              {isPaused ? "Paused on Hover" : "Auto-Swiping (2s)"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => rotateStep(-1)}
              aria-label="Previous Case Study"
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/10 text-white shadow-xs hover:border-white/30 hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>

            <button
              type="button"
              onClick={() => rotateStep(1)}
              aria-label="Next Case Study"
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/10 text-white shadow-xs hover:border-white/30 hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Ambient background glow ring */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#006FC9]/[0.06] blur-[140px]" />

      {/* 3D Circular Viewport */}
      <div
        className="relative left-1/2 h-[500px] sm:h-[550px] md:h-[580px] w-screen -translate-x-1/2 touch-pan-y select-none overflow-visible cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-full -translate-x-1/2 -translate-y-1/2"
          style={{
            perspective: isMobile ? "1400px" : "1800px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {items.map((cs, index) => {
            let relative = index - activePosition;
            const total = items.length;

            while (relative > total / 2) relative -= total;
            while (relative < -total / 2) relative += total;

            // Only render visible cards in DOM to guarantee 60/120fps butter-smooth performance
            if (Math.abs(relative) > 2.5) return null;

            const x = relative * spacing;

            let scale = 1;
            if (Math.abs(relative) >= 2) {
              scale = isMobile ? 0.62 : 0.68;
            } else if (Math.abs(relative) >= 1) {
              scale = isMobile ? 0.82 : 0.88;
            }

            const depth = isMobile
              ? Math.max(-200, 50 - Math.abs(relative) * 120)
              : Math.max(-260, 80 - Math.abs(relative) * 140);

            const rotateY = relative * (isMobile ? -9 : -12);
            const y = Math.min(20, Math.abs(relative) * 8);

            let opacity = 1;
            if (Math.abs(relative) >= 2) {
              opacity = isMobile ? 0.25 : 0.45;
            } else if (Math.abs(relative) >= 1) {
              opacity = isMobile ? 0.85 : 0.95;
            }

            const isFrontCard = Math.abs(relative) < 0.6;

            return (
              <div
                key={cs.slug}
                onClick={() => {
                  if (!isFrontCard) rotateToCard(index);
                }}
                className="absolute left-1/2 top-1/2 h-[450px] w-[275px] sm:h-[490px] sm:w-[340px] md:h-[520px] md:w-[370px]"
                style={{
                  transform: `
                    translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${depth}px)
                    rotateY(${rotateY}deg)
                    scale(${scale})
                  `,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  opacity,
                  zIndex: 100 - Math.round(Math.abs(relative) * 10),
                  transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 380ms ease",
                  pointerEvents: Math.abs(relative) <= 1 ? "auto" : "none",
                  willChange: "transform, opacity",
                }}
              >
                <CaseStudySlab card={cs} isFront={isFrontCard} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Dotted Progress Indicator */}
      <div className="relative z-30 flex items-center justify-center gap-2">
        {items.map((_, i) => {
          let relative = i - activePosition;
          const total = items.length;
          while (relative > total / 2) relative -= total;
          while (relative < -total / 2) relative += total;
          const isFront = Math.abs(relative) < 0.5;

          return (
            <button
              key={i}
              type="button"
              onClick={() => rotateToCard(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                isFront ? "w-6 bg-[#60C7FF]" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to case study ${i + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
}

/* =========================================================
   CASE STUDY SLAB CARD
========================================================= */

function CaseStudySlab({
  card,
  isFront,
}: {
  card: CaseStudy;
  isFront: boolean;
}) {
  return (
    <div
      className={`
        group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[28px]
        border border-white/12 bg-[#0c0c12] p-4 sm:p-5 transition-all duration-500
        ${isFront ? "ring-1 ring-white/25 shadow-[0_15px_40px_rgba(0,111,201,0.22)]" : "shadow-[0_10px_30px_rgba(0,0,0,0.6)]"}
      `}
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* Ambient bottom color glow */}
      <div
        className={`
          pointer-events-none absolute inset-x-0 bottom-0 h-36
          bg-gradient-to-t ${card.glowColor || "from-blue-600/25 via-cyan-500/15 to-transparent"}
          opacity-60 transition-opacity duration-300 group-hover:opacity-90
        `}
      />

      {/* Top Edge Highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

      {/* =====================================================
          TOP: DEDICATED IMAGE WINDOW (Matching Reference)
      ====================================================== */}
      <div className="relative z-10 h-[190px] sm:h-[220px] w-full overflow-hidden rounded-[20px] bg-[#14141a] border border-white/10">
        {card.image ? (
          <img
            src={card.image}
            alt={card.client}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1b1b24] to-[#0d0d12] text-slate-500 text-xs">
            {card.client}
          </div>
        )}
      </div>

      {/* =====================================================
          BOTTOM: TAGS, TITLE, SUMMARY & BUTTON
      ====================================================== */}
      <div className="relative z-10 flex flex-col justify-between flex-1 pt-4 sm:pt-5">
        <div>
          {/* Tags */}
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
            {card.tags.slice(0, 3).join(" · ")}
          </p>

          {/* Client Title */}
          <h3 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {card.client}
          </h3>

          {/* Summary text */}
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/60 line-clamp-2">
            {card.summary}
          </p>
        </div>

        {/* Read Case Study Button */}
        <Link
          href={`/case-studies/${card.slug}`}
          className="
            mt-4 flex w-full items-center justify-between rounded-xl
            border border-white/15 bg-white/5 px-4 py-3 text-xs sm:text-sm
            font-semibold text-white backdrop-blur-md transition-all duration-300
            hover:border-brand-accent hover:bg-brand-accent hover:text-white
            group-hover:border-white/30 shadow-xs
          "
        >
          <span>Read Case Study</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}