"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import type { HeroQuality } from "./hero/HeroCanvas";

/* three.js is client-only and heavy — keep it out of the initial bundle */
const HeroCanvas = dynamic(() => import("./hero/HeroCanvas"), { ssr: false });

/**
 * Full-bleed animated hero background.
 *
 * Drop it as the first child of the hero <section>; it positions
 * itself absolutely and sits behind everything else.
 *
 * Layers, back to front:
 *   1. solid black — paints instantly, before three.js loads
 *   2. the WebGL scene
 *   3. accent glows
 *   4. a light scrim so the headline stays readable
 *   5. a loading strip that fades out once the canvas is live
 *
 * Degrades on its own: no WebGL, reduced-motion, and off-screen
 * are all handled without the caller doing anything.
 */
export default function HeroBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [quality, setQuality] = useState<HeroQuality>("high");
  const [still, setStill] = useState(false);
  const [active, setActive] = useState(true);
  const [canRender, setCanRender] = useState(false);
  const [ready, setReady] = useState(false);

  /* ---- capability + preference checks (client only) ---- */
  useEffect(() => {
    let webgl = false;

    try {
      const probe = document.createElement("canvas");
      webgl = Boolean(probe.getContext("webgl2") ?? probe.getContext("webgl"));
    } catch {
      webgl = false;
    }

    setCanRender(webgl);

    // Nothing to wait for if the canvas will never mount.
    if (!webgl) setReady(true);

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 768px)");
    const coarse = window.matchMedia("(pointer: coarse)");

    const sync = () => {
      setStill(motion.matches);

      // Phone-ish: fewer streams and nodes, lower DPR ceiling.
      const weak =
        small.matches ||
        coarse.matches ||
        (navigator.hardwareConcurrency ?? 8) <= 4;

      setQuality(weak ? "low" : "high");
    };

    sync();

    motion.addEventListener("change", sync);
    small.addEventListener("change", sync);

    return () => {
      motion.removeEventListener("change", sync);
      small.removeEventListener("change", sync);
    };
  }, []);

  /* ---- stop rendering once the hero is scrolled past ---- */
  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "120px 0px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-black"
    >
      {/* ---- 3D scene ---- */}
      {canRender && (
        <div
          className={`
            absolute inset-0 transition-opacity duration-700 ease-out
            ${ready ? "opacity-100" : "opacity-0"}
          `}
        >
          <HeroCanvas
            quality={quality}
            still={still}
            active={active}
            onReady={() => setReady(true)}
          />
        </div>
      )}

      {/* ---- accent glows ---- */}
      <div
        className="
          absolute -right-24 top-[-120px] h-[320px] w-[320px] rounded-full
          bg-brand-accent/20 blur-[110px] animate-drift
          sm:-right-16 sm:h-[440px] sm:w-[440px]
          lg:right-[6%] lg:h-[560px] lg:w-[560px]
        "
      />

      <div
        className="
          absolute -bottom-32 left-[4%] h-[260px] w-[260px] rounded-full
          bg-[#22B8FF]/10 blur-[120px] animate-pulse-glow
          sm:h-[360px] sm:w-[360px] lg:h-[460px] lg:w-[460px]
        "
      />

      {/*
        Readability scrim. Deliberately light — the previous
        version was heavy enough to hide the animation behind it.
        Portrait gets a wider, shallower ellipse because the copy
        is narrower and taller there.
      */}
      <div
        className="
          absolute inset-0 sm:hidden
          bg-[radial-gradient(ellipse_95%_30%_at_50%_42%,rgba(0,0,0,0.66)_0%,rgba(0,0,0,0.26)_58%,rgba(0,0,0,0)_88%)]
        "
      />

      <div
        className="
          absolute inset-0 hidden sm:block
          bg-[radial-gradient(ellipse_54%_40%_at_50%_46%,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.32)_50%,rgba(0,0,0,0)_82%)]
        "
      />

      {/* ---- edge vignette + fade into the next section ---- */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_bottom,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0)_20%,rgba(0,0,0,0)_74%,rgba(0,0,0,0.88)_100%)]
        "
      />

      {/* ---- loading strip ---- */}
      <div
        className={`
          absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center
          transition-opacity duration-500
          ${ready ? "opacity-0" : "opacity-100"}
        `}
      >
        <span
          className="
            h-px w-40 rounded-full
            bg-[linear-gradient(90deg,transparent,var(--color-brand-accent),#60C7FF,var(--color-brand-accent),transparent)]
            bg-[length:200%_100%]
            animate-[shimmer_1.2s_linear_infinite]
          "
        />
      </div>
    </div>
  );
}
