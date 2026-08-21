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

  const dragStart = useRef<number | null>(null);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

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
        className="relative left-1/2 h-[520px] sm:h-[560px] md:h-[590px] w-screen -translate-x-1/2 touch-pan-y select-none overflow-visible cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-full -translate-x-1/2 -translate-y-1/2"
          style={{
            perspective: "1800px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {items.map((cs, index) => {
            let relative = index - activePosition;
            const total = items.length;

            while (relative > total / 2) relative -= total;
            while (relative < -total / 2) relative += total;

            // Spacing to keep 3 cards side-by-side in front view
            const spacing = 360;
            const x = relative * spacing;

            let scale = 1;
            if (Math.abs(relative) >= 2) {
              scale = 0.65;
            } else if (Math.abs(relative) >= 1) {
              scale = 0.88;
            }

            const depth = Math.max(-300, 100 - Math.abs(relative) * 160);
            const rotateY = relative * -14;
            const y = Math.min(30, Math.abs(relative) * 12);

            let opacity = 1;
            if (Math.abs(relative) >= 3) {
              opacity = 0;
            } else if (Math.abs(relative) >= 2) {
              opacity = 0.45;
            }

            const isFrontCard = Math.abs(relative) < 0.6;

            return (
              <div
                key={cs.slug}
                onClick={() => {
                  if (!isFrontCard) rotateToCard(index);
                }}
                className="absolute left-1/2 top-1/2 h-[460px] w-[310px] sm:h-[500px] sm:w-[350px] md:h-[530px] md:w-[375px]"
                style={{
                  marginLeft: "-187px",
                  marginTop: "-265px",
                  transform: `
                    translate3d(${x}px, ${y}px, ${depth}px)
                    rotateY(${rotateY}deg)
                    scale(${scale})
                  `,
                  transformStyle: "preserve-3d",
                  opacity,
                  zIndex: 100 - Math.round(Math.abs(relative) * 10),
                  transition: "transform 650ms cubic-bezier(0.16, 1, 0.3, 1), opacity 450ms ease",
                  pointerEvents: Math.abs(relative) <= 1 ? "auto" : "none",
                  willChange: "transform",
                }}
              >
                <CaseStudySlab card={cs} isFront={isFrontCard} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Dotted Progress Indicator */}
      <div className="relative z-30 mt-4 flex items-center justify-center gap-2">
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
        border border-white/15 bg-[#0b0b10] p-4 sm:p-5 backdrop-blur-2xl transition-all duration-500
        ${isFront ? "ring-1 ring-white/25 shadow-[0_25px_70px_rgba(0,111,201,0.28)]" : "shadow-[0_20px_50px_rgba(0,0,0,0.8)]"}
      `}
    >
      {/* Ambient bottom color glow */}
      <div
        className={`
          pointer-events-none absolute inset-x-0 bottom-0 h-40
          bg-gradient-to-t ${card.glowColor || "from-blue-600/30 via-cyan-500/20 to-transparent"}
          opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-95
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