"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CyberReactorCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      setMousePos({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full max-w-[620px] aspect-square select-none"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Dynamic 3D Parallax Tilt Container */}
      <div
        className="relative flex items-center justify-center w-full h-full transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${-mousePos.y * 12}deg) rotateY(${mousePos.x * 14}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* =========================================================
            BACKGROUND CIRCUIT WIRE TRACES & DIRECTIONAL ARROWS
        ========================================================== */}
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-visible opacity-70"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top-Right Circuit Trace with Arrows */}
          <path
            d="M 380 120 L 470 50 L 580 50"
            stroke="#006FC9"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
          <path d="M 465 53 L 470 50 L 465 47" fill="none" stroke="#22B8FF" strokeWidth="2" />
          <path d="M 475 53 L 480 50 L 475 47" fill="none" stroke="#22B8FF" strokeWidth="2" />
          <path d="M 485 53 L 490 50 L 485 47" fill="none" stroke="#22B8FF" strokeWidth="2" />

          {/* Top Arrow Marker */}
          <path d="M 390 50 L 400 40 L 410 50" fill="none" stroke="#22B8FF" strokeWidth="2" />
          <path d="M 390 60 L 400 50 L 410 60" fill="none" stroke="#006FC9" strokeWidth="1.5" />

          {/* Bottom-Right Circuit Trace with Arrows */}
          <path
            d="M 420 480 L 510 550 L 590 550"
            stroke="#006FC9"
            strokeWidth="1.5"
          />
          <path d="M 505 553 L 510 550 L 505 547" fill="none" stroke="#22B8FF" strokeWidth="2" />
          <path d="M 515 553 L 520 550 L 515 547" fill="none" stroke="#22B8FF" strokeWidth="2" />

          {/* Bottom-Left Circuit Trace */}
          <path
            d="M 220 500 L 120 570 L 20 570"
            stroke="#006FC9"
            strokeWidth="1.5"
            strokeDasharray="6 3"
          />
          <path d="M 125 567 L 120 570 L 125 573" fill="none" stroke="#22B8FF" strokeWidth="2" />

          {/* Top-Left Circuit Line */}
          <path
            d="M 180 140 L 90 70 L 10 70"
            stroke="#006FC9"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />
        </svg>

        {/* =========================================================
            FLOATING TOP-RIGHT & BOTTOM-RIGHT HEXAGON CLUSTERS
        ========================================================== */}
        <div
          className="absolute -top-3 -right-2 sm:right-2 sm:top-2 pointer-events-none z-10 animate-[pulse_4s_ease-in-out_infinite]"
          style={{ transform: "translateZ(30px)" }}
        >
          <svg width="120" height="110" viewBox="0 0 120 110" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="60,5 85,20 85,50 60,65 35,50 35,20"
              fill="#006FC9"
              fillOpacity="0.35"
              stroke="#22B8FF"
              strokeWidth="1.5"
            />
            <polygon
              points="95,25 120,40 120,70 95,85 70,70 70,40"
              fill="#066BBD"
              fillOpacity="0.45"
              stroke="#60C7FF"
              strokeWidth="2"
            />
            <polygon
              points="60,70 85,85 85,115 60,130 35,115 35,85"
              fill="#006FC9"
              fillOpacity="0.25"
              stroke="#006FC9"
              strokeWidth="1.5"
            />
            <polygon
              points="25,45 50,60 50,90 25,105 0,90 0,60"
              fill="#021E73"
              fillOpacity="0.5"
              stroke="#22B8FF"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div
          className="absolute -bottom-4 right-0 sm:right-6 sm:bottom-0 pointer-events-none z-10 animate-[pulse_5s_ease-in-out_infinite]"
          style={{ transform: "translateZ(35px)" }}
        >
          <svg width="110" height="100" viewBox="0 0 110 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="55,0 80,15 80,45 55,60 30,45 30,15"
              fill="#006FC9"
              fillOpacity="0.35"
              stroke="#22B8FF"
              strokeWidth="1.5"
            />
            <polygon
              points="85,25 110,40 110,70 85,85 60,70 60,40"
              fill="#066BBD"
              fillOpacity="0.5"
              stroke="#60C7FF"
              strokeWidth="2"
            />
            <polygon
              points="25,25 50,40 50,70 25,85 0,70 0,40"
              fill="#021E73"
              fillOpacity="0.35"
              stroke="#006FC9"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* =========================================================
            MAIN MULTI-LAYER HUD REACTOR
        ========================================================== */}
        <div className="relative flex items-center justify-center w-[85%] sm:w-[90%] aspect-square">
          
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-brand-accent/30 blur-[75px]" />
          <div className="pointer-events-none absolute inset-10 rounded-full bg-[#22B8FF]/20 blur-[50px]" />

          {/* ==================== LAYER 1: OUTER MECHANICAL IRIS RING ==================== */}
          <div
            className="absolute inset-0 rounded-full border border-[#006FC9]/40 animate-[spin_60s_linear_infinite]"
            style={{ transform: "translateZ(10px)" }}
          >
            <svg className="w-full h-full" viewBox="0 0 500 500">
              <circle
                cx="250"
                cy="250"
                r="244"
                fill="none"
                stroke="#006FC9"
                strokeWidth="7"
                strokeDasharray="40 12 80 18 120 24 60 14"
                strokeLinecap="round"
                opacity="0.85"
              />
              <circle
                cx="250"
                cy="250"
                r="236"
                fill="none"
                stroke="#22B8FF"
                strokeWidth="2"
                strokeDasharray="180 80 120 140"
                opacity="0.9"
              />
            </svg>
          </div>

          {/* ==================== LAYER 2: COUNTER-ROTATING TELEMETRY RING ==================== */}
          <div
            className="absolute inset-4 sm:inset-6 rounded-full animate-[spin_40s_linear_infinite_reverse]"
            style={{ transform: "translateZ(18px)" }}
          >
            <svg className="w-full h-full" viewBox="0 0 460 460">
              <circle
                cx="230"
                cy="230"
                r="222"
                fill="none"
                stroke="#60C7FF"
                strokeWidth="5"
                strokeDasharray="3 7"
                opacity="0.7"
              />
              <circle
                cx="230"
                cy="230"
                r="214"
                fill="none"
                stroke="#006FC9"
                strokeWidth="1.5"
                strokeDasharray="90 30"
              />
            </svg>
          </div>

          {/* ==================== LAYER 3: SEGMENTED SQUARE BEAD RING ==================== */}
          <div
            className="absolute inset-10 sm:inset-12 rounded-full animate-[spin_32s_linear_infinite]"
            style={{ transform: "translateZ(26px)" }}
          >
            <svg className="w-full h-full" viewBox="0 0 400 400">
              <circle
                cx="200"
                cy="200"
                r="185"
                fill="none"
                stroke="#22B8FF"
                strokeWidth="12"
                strokeDasharray="14 16"
                strokeLinecap="square"
                opacity="0.95"
                className="drop-shadow-[0_0_8px_rgba(34,184,255,0.8)]"
              />
              <circle
                cx="200"
                cy="200"
                r="170"
                fill="none"
                stroke="#006FC9"
                strokeWidth="2"
                strokeDasharray="4 6"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* ==================== LAYER 4: INNER HIGH-TECH HUD CALIBRATION RING ==================== */}
          <div
            className="absolute inset-16 sm:inset-20 rounded-full animate-[spin_24s_linear_infinite_reverse]"
            style={{ transform: "translateZ(32px)" }}
          >
            <svg className="w-full h-full" viewBox="0 0 320 320">
              <circle
                cx="160"
                cy="160"
                r="152"
                fill="none"
                stroke="#006FC9"
                strokeWidth="4"
                strokeDasharray="50 15 20 15"
                opacity="0.8"
              />
              <circle
                cx="160"
                cy="160"
                r="144"
                fill="none"
                stroke="#60C7FF"
                strokeWidth="1.5"
                strokeDasharray="4 8"
                opacity="0.9"
              />
            </svg>
          </div>

          {/* ==================== LAYER 5: CENTER SILICON PCB CIRCUIT CORE ==================== */}
          <div
            className="relative flex items-center justify-center w-[58%] aspect-square rounded-full bg-[#020D26] border-2 border-[#006FC9] shadow-[0_0_50px_rgba(0,111,201,0.6),inset_0_0_30px_rgba(0,111,201,0.4)] overflow-hidden"
            style={{ transform: "translateZ(40px)" }}
          >
            {/* Rotating Layer A: Outer Radiating Circuit Lines & Nodes (Clockwise) */}
            <div className="absolute inset-0 flex items-center justify-center animate-[spin_45s_linear_infinite]">
              <svg
                className="w-full h-full opacity-85"
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g stroke="#006FC9" strokeWidth="1.5">
                  <path d="M 150 150 L 150 20 L 180 20" />
                  <path d="M 150 150 L 150 280 L 120 280" />
                  <path d="M 150 150 L 20 150 L 20 120" />
                  <path d="M 150 150 L 280 150 L 280 180" />
                  <path d="M 150 100 L 190 70 L 220 70" />
                  <path d="M 150 200 L 110 230 L 80 230" />
                  <path d="M 100 150 L 70 190 L 70 220" />
                  <path d="M 200 150 L 230 110 L 230 80" />
                </g>

                <g fill="#22B8FF">
                  <circle cx="180" cy="20" r="3" />
                  <circle cx="120" cy="280" r="3" />
                  <circle cx="20" cy="120" r="3" />
                  <circle cx="280" cy="180" r="3" />
                  <circle cx="220" cy="70" r="2.5" />
                  <circle cx="80" cy="230" r="2.5" />
                  <circle cx="70" cy="220" r="2.5" />
                  <circle cx="230" cy="80" r="2.5" />
                </g>

                <circle cx="150" cy="150" r="95" stroke="#006FC9" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              </svg>
            </div>

            {/* Rotating Layer B: Diagonal Circuit Tracks & White Micro-Nodes (Counter-Clockwise) */}
            <div className="absolute inset-0 flex items-center justify-center animate-[spin_30s_linear_infinite_reverse]">
              <svg
                className="w-full h-full opacity-90"
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g stroke="#22B8FF" strokeWidth="1.5">
                  <path d="M 150 150 L 60 60 L 30 60" />
                  <path d="M 150 150 L 240 60 L 270 60" />
                  <path d="M 150 150 L 60 240 L 30 240" />
                  <path d="M 150 150 L 240 240 L 270 240" />
                  <path d="M 120 120 L 90 90 L 90 40" stroke="#60C7FF" />
                  <path d="M 180 120 L 210 90 L 210 40" stroke="#60C7FF" />
                  <path d="M 120 180 L 90 210 L 90 260" stroke="#60C7FF" />
                  <path d="M 180 180 L 210 210 L 210 260" stroke="#60C7FF" />
                </g>

                <g fill="#ffffff">
                  <circle cx="30" cy="60" r="3.5" />
                  <circle cx="270" cy="60" r="3.5" />
                  <circle cx="30" cy="240" r="3.5" />
                  <circle cx="270" cy="240" r="3.5" />
                </g>
              </svg>
            </div>

            {/* Rotating Layer C: Inner Concentric Dash & Dotted Data Rings (Clockwise Fast) */}
            <div className="absolute inset-0 flex items-center justify-center animate-[spin_18s_linear_infinite]">
              <svg
                className="w-full h-full opacity-80"
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="150" cy="150" r="75" stroke="#22B8FF" strokeWidth="1.5" strokeDasharray="6 8" />
                <circle cx="150" cy="150" r="62" stroke="#60C7FF" strokeWidth="1" strokeDasharray="3 5" />
                <circle cx="150" cy="75" r="2.5" fill="#22B8FF" />
                <circle cx="150" cy="225" r="2.5" fill="#22B8FF" />
                <circle cx="75" cy="150" r="2.5" fill="#22B8FF" />
                <circle cx="225" cy="150" r="2.5" fill="#22B8FF" />
              </svg>
            </div>

            {/* ==================== LAYER 6: CENTRAL HIGH-TECH MICROCHIP / LOGO EMBLEM ==================== */}
            <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#020B1E]/95 border-2 border-[#22B8FF] shadow-[0_0_25px_rgba(34,184,255,0.75)] z-10">
              {/* Rotating Outer Chip Bracket Ring */}
              <div className="absolute inset-1 rounded-full border border-dashed border-[#60C7FF]/60 animate-[spin_20s_linear_infinite_reverse]" />

              {/* Central Geometric Tech Glyph with Pulse */}
              <div className="animate-[pulse_3s_ease-in-out_infinite]">
                <svg className="w-12 h-12 sm:w-14 sm:h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 16 16 L 38 16 L 38 24 L 24 24 L 24 38 L 16 38 Z"
                    fill="#22B8FF"
                    className="drop-shadow-[0_0_6px_rgba(34,184,255,0.85)]"
                  />
                  <path
                    d="M 44 44 L 22 44 L 22 36 L 36 36 L 36 22 L 44 22 Z"
                    fill="#60C7FF"
                    className="drop-shadow-[0_0_6px_rgba(96,199,255,0.85)]"
                  />
                  <circle cx="38" cy="16" r="3" fill="#ffffff" />
                  <circle cx="22" cy="44" r="3" fill="#ffffff" />
                  <circle cx="16" cy="38" r="3" fill="#22B8FF" />
                  <circle cx="44" cy="22" r="3" fill="#60C7FF" />
                </svg>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
