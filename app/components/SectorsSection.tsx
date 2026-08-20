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
      className="min-h-[720px] bg-white px-5 py-14 sm:px-8 lg:h-[100svh] lg:min-h-0 lg:px-12 lg:py-10 xl:px-16 flex items-center overflow-hidden"
    >
      <div className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col justify-between w-full lg:h-full lg:min-h-0">
        
        {/* =========================================================
            HEADER & PROGRESS
        ========================================================== */}
        <header className="flex items-end gap-5 sm:gap-8">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[.18em] text-brand-accent sm:text-xs">
              Explore our expertise
            </p>
            <h2 className="text-3xl font-bold text-black md:text-5xl">
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
            SEAMLESS 2-COLUMN LAYOUT (SAME CONTAINER, NO DARK BOX)
        ========================================================== */}
        <div className="grid flex-1 items-center gap-8 py-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-16">
          
          {/* LEFT: Sector Details */}
          <div className="flex flex-col justify-center max-w-xl">
            <div
              key={active.title}
              className="animate-[fade-in-up_450ms_ease-out_both]"
            >
              {/* Category Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 shadow-2xs">
                <IconComponent className="h-4 w-4" style={{ color: active.accent }} />
                <span className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: active.accent }}>
                  {active.eyebrow}
                </span>
              </div>

              {/* Sector Title */}
              <h3 className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight text-[#0B1F3A] sm:text-5xl lg:text-6xl xl:text-[68px]">
                {active.title}
              </h3>

              {/* Description */}
              <p className="mt-5 max-w-lg text-base leading-7 text-[#4A5B73] sm:text-lg sm:leading-8">
                {active.description}
              </p>

              {/* Key Features Pill Matrix */}
              <div className="mt-6 flex flex-wrap gap-2">
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

              {/* Stat Highlight */}
              <div className="mt-6 flex items-center gap-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-2xs">
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
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => select(activeIndex - 1)}
                  disabled={!activeIndex}
                  aria-label="Previous sector"
                  type="button"
                  className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-xs hover:border-slate-300 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white cursor-pointer transition-all active:scale-95"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={() => select(activeIndex + 1)}
                  disabled={activeIndex === sectors.length - 1}
                  aria-label="Next sector"
                  type="button"
                  className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-xs hover:border-slate-300 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-white cursor-pointer transition-all active:scale-95"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>

                <span className="ml-2 text-xs font-medium uppercase tracking-wider text-slate-400">
                  Scroll or click to explore
                </span>
              </div>

              {/* Mobile Indicator */}
              <div className="flex lg:hidden gap-1.5">
                {sectors.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => select(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-6 bg-brand-accent" : "w-2 bg-slate-300"
                    }`}
                    aria-label={`Go to sector ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Transparent Interactive 3D Canvas in Same Visual Space */}
          <div className="relative flex items-center justify-center w-full h-[360px] sm:h-[440px] lg:h-[520px] xl:h-[560px]">
            {/* Subtle Ambient Radial Glow */}
            <div
              className="pointer-events-none absolute h-[320px] w-[320px] rounded-full blur-[110px] opacity-25 transition-all duration-700 ease-out"
              style={{ backgroundColor: active.accent }}
            />

            {/* Transparent 3D Canvas */}
            <div className="absolute inset-0">
              <SectorCanvas scene={active.scene} accent={active.accent} active={isSectionActive} />
            </div>

            {/* Floating Tag at Bottom */}
            <div
              key={active.scene}
              className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-4 py-1.5 text-xs font-semibold text-[#27364A] shadow-xs backdrop-blur-xs animate-[fade-in-up_400ms_ease-out_both]"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: active.accent }} />
              <span>{active.tag}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
