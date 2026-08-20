"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Layers,
  Activity,
  ShieldCheck,
  Zap,
  Globe,
  Building2,
} from "lucide-react";
import type { SectorScene } from "./sectors/SectorCanvas";

const SectorCanvas = dynamic(() => import("./sectors/SectorCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <span className="h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-brand-accent" />
    </div>
  ),
});

type Sector = {
  title: string;
  eyebrow: string;
  description: string;
  scene: SectorScene;
  accent: string;
  icon: typeof Activity;
  tag: string;
  stat: { value: string; label: string };
  features: string[];
};

const sectors: Sector[] = [
  {
    title: "Manufacturing",
    eyebrow: "Operations · Industry 4.0",
    description:
      "Connected digital systems that unify production lines, robotic machinery, workforce telemetry, and real-time performance into one dependable view.",
    scene: "factory",
    accent: "#b87945",
    icon: Layers,
    tag: "SMART FACTORY & ROBOTICS",
    stat: { value: "99.98%", label: "Uptime Reliability" },
    features: ["Robotic Arm Telemetry", "Predictive Maintenance", "Smart IoT Sensors", "OEE Performance"],
  },
  {
    title: "Health & Care",
    eyebrow: "Health · Patient Experience",
    description:
      "Thoughtful digital platforms and clinical tools that power better patient outcomes, secure record management, workforce planning, and everyday connected care.",
    scene: "health",
    accent: "#ef62a9",
    icon: Activity,
    tag: "CONNECTED HEALTHCARE AI",
    stat: { value: "< 40ms", label: "Real-time Telemetry" },
    features: ["HIPAA Compliant", "Telehealth Platforms", "Clinical Workflow AI", "Secure Patient Portals"],
  },
  {
    title: "Fintech",
    eyebrow: "Finance · Secure Systems",
    description:
      "Secure, high-throughput financial technology designed to simplify complex transaction journeys, protect user assets, and ensure frictionless compliance.",
    scene: "finance",
    accent: "#51ad91",
    icon: ShieldCheck,
    tag: "HIGH-THROUGHPUT FINTECH",
    stat: { value: "256-bit", label: "End-to-End Encryption" },
    features: ["Sub-second Settlement", "Automated KYC / AML", "Institutional Security", "Real-time Analytics"],
  },
  {
    title: "Retail",
    eyebrow: "Commerce · Customer Journeys",
    description:
      "Modern omnichannel digital retail experiences that seamlessly bridge physical inventory, personalized shopping journeys, and sustainable revenue growth.",
    scene: "retail",
    accent: "#d9a62b",
    icon: Zap,
    tag: "OMNICHANNEL COMMERCE",
    stat: { value: "+44%", label: "Conversion Lift" },
    features: ["Headless Storefronts", "Dynamic Personalisation", "Real-time Inventory", "Unified Checkout"],
  },
  {
    title: "Supply Chain",
    eyebrow: "Logistics · Global Visibility",
    description:
      "Connected logistics and intelligent tracking platforms that improve route efficiency, cargo visibility, warehouse throughput, and multi-modal fleet decisions.",
    scene: "supply",
    accent: "#668fb5",
    icon: Globe,
    tag: "GLOBAL LOGISTICS & ROUTING",
    stat: { value: "100%", label: "Fleet Telemetry" },
    features: ["Intermodal Tracking", "Air & Ocean Freight", "Predictive Logistics", "Live Dispatch"],
  },
  {
    title: "Real Estate",
    eyebrow: "Property · Digital Infrastructure",
    description:
      "Practical digital property solutions, smart tenant portals, and digital twin management systems that streamline building operations and elevate resident experiences.",
    scene: "property",
    accent: "#9b7ad1",
    icon: Building2,
    tag: "SMART CITY & PROPTECH",
    stat: { value: "32%", label: "Operational Savings" },
    features: ["Digital Twin Management", "Smart Tenant Portals", "Automated Leasing", "Energy Optimization"],
  },
];

export default function SectorsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSectionActive, setIsSectionActive] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const active = sectors[activeIndex];
  const IconComponent = active.icon;

  const select = (index: number) => {
    const next = Math.max(0, Math.min(index, sectors.length - 1));
    if (next !== activeRef.current) {
      activeRef.current = next;
      setActiveIndex(next);
    }
  };

  /* ------------------------------------------------------
     TOUCH SWIPE SUPPORT (SMARTPHONE)
  ------------------------------------------------------ */
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0 && activeIndex < sectors.length - 1) {
        select(activeIndex + 1);
      } else if (diffX < 0 && activeIndex > 0) {
        select(activeIndex - 1);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionActive(entry.isIntersecting),
      { rootMargin: "250px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stage = sectionRef.current?.parentElement;
    if (!stage) return;

    const updateSector = () => {
      if (window.innerWidth < 1024) return;
      const stageTop = stage.getBoundingClientRect().top;
      const progress = Math.max(0, -stageTop);
      const nextIndex = Math.min(
        sectors.length - 1,
        Math.floor(progress / window.innerHeight)
      );
      select(nextIndex);
    };

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateSector();
        rafId = null;
      });
    };

    updateSector();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="bg-white px-4 py-6 sm:px-8 sm:py-10 lg:min-h-[100svh] lg:px-12 lg:pt-24 lg:pb-12 xl:px-16 xl:pt-28 xl:pb-14 flex items-center overflow-hidden touch-pan-y"
    >
      <div className="mx-auto flex max-w-7xl flex-col justify-center gap-4 lg:gap-6 w-full">
        
        {/* =========================================================
            HEADER & PROGRESS
        ========================================================== */}
        <header className="flex items-end gap-4 sm:gap-8">
          <div>
            <p className="mb-0.5 sm:mb-1 text-[10px] font-bold uppercase tracking-[.18em] text-brand-accent sm:text-xs">
              Explore our expertise
            </p>
            <h2 className="text-2xl font-bold text-black sm:text-4xl md:text-5xl">
              Sectors We{" "}
              <span className="bg-gradient-to-r from-brand-accent to-cyan-400 bg-clip-text text-transparent">
                Serve
              </span>
            </h2>
          </div>
          <div className="mb-2 h-px flex-1 bg-slate-200">
            <div
              className="h-px bg-slate-800 transition-all duration-700"
              style={{
                width: `${((activeIndex + 1) / sectors.length) * 100}%`,
              }}
            />
          </div>
          <span className="mb-2 text-[10px] font-bold tracking-[.22em] text-slate-500">
            {String(activeIndex + 1).padStart(2, "0")} / 06
          </span>
        </header>

        {/* =========================================================
            SEAMLESS 2-COLUMN LAYOUT (MOBILE: 3D TOP / DESKTOP: SIDE-BY-SIDE)
        ========================================================== */}
        <div className="flex flex-col lg:grid items-center gap-3 sm:gap-8 py-1 lg:py-2 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-16">
          
          {/* 3D CANVAS (MOBILE: TOP / DESKTOP: RIGHT) */}
          <div className="order-1 lg:order-2 relative flex items-center justify-center w-full h-[220px] sm:h-[300px] lg:h-[520px] xl:h-[560px]">
            {/* Subtle Ambient Radial Glow */}
            <div
              className="pointer-events-none absolute h-[200px] w-[200px] sm:h-[320px] sm:w-[320px] rounded-full blur-[80px] sm:blur-[110px] opacity-25 transition-all duration-700 ease-out"
              style={{ backgroundColor: active.accent }}
            />

            {/* Transparent 3D Canvas */}
            <div className="absolute inset-0">
              <SectorCanvas scene={active.scene} accent={active.accent} active={isSectionActive} />
            </div>

            {/* Floating Tag at Bottom (Desktop Only - Avoids covering 3D model on mobile) */}
            <div
              key={active.scene}
              className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 hidden lg:inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/90 px-3.5 py-1 text-xs font-semibold text-[#27364A] shadow-xs backdrop-blur-xs animate-[fade-in-up_400ms_ease-out_both]"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: active.accent }} />
              <span>{active.tag}</span>
            </div>
          </div>

          {/* SECTOR DETAILS (MOBILE: BOTTOM / DESKTOP: LEFT) */}
          <div className="order-2 lg:order-1 flex flex-col justify-center max-w-xl w-full">
            <div
              key={active.title}
              className="animate-[fade-in-up_450ms_ease-out_both]"
            >
              {/* Category Eyebrow Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 shadow-2xs">
                <IconComponent className="h-3 w-3" style={{ color: active.accent }} />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em]" style={{ color: active.accent }}>
                  {active.eyebrow}
                </span>
              </div>

              {/* Sector Title */}
              <h3 className="mt-1.5 sm:mt-4 text-xl sm:text-4xl font-bold leading-[1.08] tracking-tight text-[#0B1F3A] lg:text-6xl xl:text-[68px]">
                {active.title}
              </h3>

              {/* Description */}
              <p className="mt-1.5 sm:mt-5 max-w-lg text-xs sm:text-base leading-5 sm:leading-7 text-[#4A5B73] lg:text-lg lg:leading-8">
                {active.description}
              </p>

              {/* Key Features Pill Matrix (Desktop Only) */}
              <div className="hidden lg:flex mt-6 flex-wrap gap-2">
                {active.features.map((feat) => (
                  <span
                    key={feat}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-slate-50/80 px-3 py-1.5 text-xs font-medium text-[#27364A]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: active.accent }} />
                    {feat}
                  </span>
                ))}
              </div>

              {/* Stat Highlight (Desktop Only) */}
              <div className="hidden lg:flex mt-6 items-center gap-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-2xs">
                <div>
                  <div className="text-2xl font-bold font-mono tracking-tight" style={{ color: active.accent }}>
                    {active.stat.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-500">
                    {active.stat.label}
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Sparkles className="h-4 w-4 text-brand-accent" />
                  Bespoke Architectural Engineering
                </div>
              </div>
            </div>

            {/* Navigation & Controls */}
            <div className="mt-3 sm:mt-8 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => select(activeIndex - 1)}
                  disabled={!activeIndex}
                  aria-label="Previous sector"
                  type="button"
                  className="grid h-8 w-8 sm:h-11 sm:w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-xs hover:border-slate-300 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white cursor-pointer transition-all active:scale-95"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={() => select(activeIndex + 1)}
                  disabled={activeIndex === sectors.length - 1}
                  aria-label="Next sector"
                  type="button"
                  className="grid h-8 w-8 sm:h-11 sm:w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-xs hover:border-slate-300 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white cursor-pointer transition-all active:scale-95"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>

                <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-slate-400">
                  Swipe or tap arrows
                </span>
              </div>

              {/* Mobile Indicator */}
              <div className="flex lg:hidden gap-1.5">
                {sectors.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => select(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-5 bg-brand-accent" : "w-1.5 bg-slate-300"
                    }`}
                    aria-label={`Go to sector ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
