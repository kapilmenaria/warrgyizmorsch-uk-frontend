"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

/* three.js is client-only and heavy — load it on demand */
const SceneCanvas = dynamic(() => import("./services/SceneCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-brand-accent" />
    </div>
  ),
});

/* =========================================================
   TYPES
========================================================= */

type Category = {
  id: string;
  label: string;
  description: string;
  features: string[];
};

/* =========================================================
   SERVICES
========================================================= */

const categories: Category[] = [
  {
    id: "web",
    label: "Web Development",
    description:
      "High-performing, responsive web platforms engineered to scale with your traffic instead of buckling under it.",
    features: [
      "Responsive & mobile-first",
      "SEO-ready foundation",
      "Performance optimised",
      "Secure & scalable",
    ],
  },
  {
    id: "app",
    label: "App Development",
    description:
      "Mobile applications people actually keep on their home screen — built native or cross-platform, whichever fits.",
    features: [
      "Native & cross-platform",
      "Intuitive UI/UX",
      "Built to scale",
      "Ongoing maintenance",
    ],
  },
  {
    id: "ai",
    label: "Artificial Intelligence",
    description:
      "Machine learning and automation applied where they pay for themselves, not where they look impressive.",
    features: [
      "Custom AI solutions",
      "ML integration",
      "Chatbots & assistants",
      "Workflow automation",
    ],
  },
  {
    id: "software",
    label: "Software Development",
    description:
      "Enterprise systems that replace the spreadsheet sprawl and give your team one place to work from.",
    features: [
      "Enterprise systems",
      "ERP & CRM tools",
      "Real-time dashboards",
      "Systems integration",
    ],
  },
  {
    id: "marketing",
    label: "Digital Marketing",
    description:
      "Traffic, leads and authority built on measurable channels — with the reporting to prove what worked.",
    features: [
      "Organic SEO growth",
      "Performance ads",
      "Content & social",
      "Analytics & tracking",
    ],
  },
  {
    id: "ecommerce",
    label: "Ecommerce Development",
    description:
      "Online stores tuned end to end, from the first product view through to a checkout that doesn't lose people.",
    features: [
      "Custom storefronts",
      "Secure checkout",
      "Inventory systems",
      "Conversion UX",
    ],
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function ServicesTabs() {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabsRef = useRef<HTMLDivElement | null>(null);
  const tabButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const activeCategory = categories[activeIndex];

  const selectCategory = (index: number) => {
    const next = Math.max(0, Math.min(index, categories.length - 1));
    if (next === activeIndexRef.current) return;

    activeIndexRef.current = next;
    setActiveIndex(next);
  };

  /* ------------------------------------------------------
     AUTO-SCROLL ACTIVE MOBILE TAB INTO VIEW
  ------------------------------------------------------ */
  useEffect(() => {
    if (window.innerWidth < 1024) {
      tabButtonsRef.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeIndex]);

  /* ------------------------------------------------------
     MOBILE SWIPE GESTURE HANDLERS
  ------------------------------------------------------ */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0 && activeIndex < categories.length - 1) {
        selectCategory(activeIndex + 1);
      } else if (diffX < 0 && activeIndex > 0) {
        selectCategory(activeIndex - 1);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const [isSectionActive, setIsSectionActive] = useState(true);

  /* ------------------------------------------------------
     INTERSECTION OBSERVER — pause when off screen
  ------------------------------------------------------ */
  useEffect(() => {
    const node = tabsRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionActive(entry.isIntersecting),
      { rootMargin: "250px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* ------------------------------------------------------
     PINNED SCROLL STAGE (DESKTOP)
  ------------------------------------------------------ */
  useEffect(() => {
    const stage = tabsRef.current?.closest("#services-stage");
    if (!stage) return;

    const updateService = () => {
      if (window.innerWidth < 1024) return;
      const progress = Math.max(0, -stage.getBoundingClientRect().top);
      const nextIndex = Math.min(categories.length - 1, Math.floor(progress / window.innerHeight));
      selectCategory(nextIndex);
    };

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateService();
        rafId = null;
      });
    };

    updateService();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      id="services-tabs"
      ref={tabsRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="flex flex-col gap-5 lg:grid lg:grid-cols-12 lg:gap-10 w-full"
    >
      {/* =====================================================
          3D SCENE (MOBILE: TOP / DESKTOP: RIGHT)
      ====================================================== */}
      <div className="order-1 lg:order-2 lg:col-span-7">
        <div
          className="
            animate-scene-in relative h-[250px] sm:h-[320px] lg:h-[480px] xl:h-[520px] overflow-hidden bg-transparent
          "
        >
          {/* Ambient glow behind the scene */}
          <div
            className="
              animate-pulse-glow pointer-events-none absolute left-1/2 top-1/2
              h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] -translate-x-1/2 -translate-y-1/2
              rounded-full bg-brand-accent/15 blur-[80px] sm:blur-[90px]
            "
          />

          {/* Counter */}
          <div className="absolute right-2 top-2 z-20 text-right sm:right-3 sm:top-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
              {String(activeIndex + 1).padStart(2, "0")} / 06
            </span>
          </div>

          {/* The 3D scene */}
          <div className="absolute inset-0">
            <SceneCanvas id={activeCategory.id} active={isSectionActive} />
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTROLS & TABS (MOBILE: BOTTOM / DESKTOP: LEFT)
      ====================================================== */}
      <div
        className="order-2 lg:order-1 relative flex select-none flex-col justify-center lg:col-span-5 lg:min-h-[480px] xl:min-h-[520px]"
      >
        {/* Timeline rail (Desktop) */}
        <div
          className="
            absolute bottom-8 left-[23px] top-8 hidden w-px lg:block
            bg-gradient-to-b from-transparent via-brand-accent/40 to-transparent
          "
        />

        {/* Mobile Navigation Controls & Arrows */}
        <div className="flex items-center justify-between gap-3 pb-2.5 lg:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-wider text-[#60C7FF]">
              {String(activeIndex + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
            </span>
            <span className="text-xs font-medium text-slate-400">
              Swipe or tap tabs
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => selectCategory(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous Service"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-xs transition-all active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-white/20 cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              onClick={() => selectCategory(activeIndex + 1)}
              disabled={activeIndex === categories.length - 1}
              aria-label="Next Service"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-xs transition-all active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-white/20 cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Tab Buttons Row (Mobile: Horizontal Scroll Pills / Desktop: Vertical Stack) */}
        <div
          className="
            no-scrollbar flex gap-2 overflow-x-auto pb-2 scroll-smooth
            lg:flex-col lg:gap-7 lg:overflow-visible lg:pb-0
          "
        >
          {categories.map((category, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={category.id}
                ref={(el) => {
                  tabButtonsRef.current[index] = el;
                }}
                type="button"
                onClick={() => selectCategory(index)}
                onMouseEnter={() => selectCategory(index)}
                onFocus={() => selectCategory(index)}
                aria-pressed={isActive}
                className={`
                  group relative flex shrink-0 cursor-pointer items-center gap-2
                  rounded-full px-3 py-1.5 text-left transition-all duration-300
                  lg:items-start lg:gap-5 lg:rounded-none lg:p-0
                  ${
                    isActive
                      ? "bg-brand-accent/20 border border-brand-accent/60 lg:bg-transparent lg:border-none opacity-100"
                      : "bg-white/5 border border-white/10 lg:bg-transparent lg:border-none opacity-60 hover:opacity-85"
                  }
                `}
              >
                {/* Number */}
                <span
                  className={`
                    relative z-10 flex h-6 w-6 shrink-0 items-center justify-center
                    rounded-full text-[10px] font-bold transition-all duration-300
                    lg:h-12 lg:w-12 lg:text-sm
                    ${isActive
                      ? "bg-brand-accent text-white shadow-[0_0_20px_rgba(0,111,201,0.6)] ring-2 lg:ring-4 ring-brand-accent/20"
                      : "bg-white/10 text-slate-300 ring-1 ring-white/15 hover:bg-white/15"
                    }
                  `}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Text */}
                <span className="min-w-0 whitespace-nowrap lg:whitespace-normal">
                  <span
                    className={`
                      block text-xs font-bold transition-all duration-300
                      sm:text-sm lg:text-2xl
                      ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"}
                    `}
                  >
                    {category.label}
                  </span>

                  {/* Desktop Only Description & CTA */}
                  {isActive && (
                    <span
                      key={category.id}
                      className="animate-text-in mt-3 hidden lg:block"
                    >
                      <span className="block max-w-md text-sm leading-7 text-slate-300/85">
                        {category.description}
                      </span>

                      <Link
                        href="/services"
                        className="
                          mt-5 inline-flex items-center gap-2 rounded-full
                          bg-brand-accent px-6 py-3 text-sm font-semibold text-white
                          shadow-[0_8px_25px_rgba(0,111,201,0.3)]
                          transition-all duration-300
                          hover:-translate-y-0.5 hover:bg-[#055A9F]
                          hover:shadow-[0_0_38px_rgba(0,111,201,0.45)]
                        "
                      >
                        Explore Service
                        <ChevronRight size={16} />
                      </Link>
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile description card (Directly below pills) */}
        <div
          key={activeCategory.id}
          className="animate-text-in mt-2 rounded-2xl p-3.5 sm:p-4 lg:hidden border border-white/10 bg-white/[0.06] backdrop-blur-md shadow-lg"
        >
          <p className="text-xs leading-5 text-slate-200 sm:text-sm">
            {activeCategory.description}
          </p>

          <Link
            href="/services"
            className="
              mt-2.5 inline-flex items-center gap-1 rounded-full bg-brand-accent
              px-3.5 py-1.5 text-xs font-semibold text-white
              shadow-[0_5px_18px_rgba(0,111,201,0.25)]
              transition-all active:scale-95
            "
          >
            Explore Service
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
