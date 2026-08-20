"use client";

import { useState } from "react";

export default function ProcessStep({
  number,
  title,
  points,
}: {
  number: string;
  title: string;
  points: string[];
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative
        min-h-[270px]
        rounded-[18px]
        border
        p-8
        text-center
        overflow-hidden
        cursor-pointer
        transition-all
        duration-500
        ease-out
        ${
          isHovered
            ? "bg-brand-accent  shadow-xl shadow-[#021E73]/20 -translate-y-1"
            : "bg-[#eef1f0] border-transparent hover:shadow-lg"
        }
      `}
    >
      {/* Number / Icon */}
      <div
        className={`
          mx-auto
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          font-semibold
          text-sm
          transition-all
          duration-500
          ${
            isHovered
              ? "bg-white text-[#021E73] scale-105"
              : "bg-black text-white"
          }
        `}
      >
        {number}
      </div>

      {/* Title */}
      <h3
        className={`
          mt-6
          text-xl
          md:text-2xl
          font-semibold
          transition-colors
          duration-500
          ${isHovered ? "text-white" : "text-[#111827]"}
        `}
      >
        {title}
      </h3>

      {/* Points */}
      <div className="mt-4 space-y-1.5">
        {points.map((point) => (
          <p
            key={point}
            className={`
              text-sm
              leading-relaxed
              transition-colors
              duration-500
              ${
                isHovered
                  ? "text-white/85"
                  : "text-[#374151]"
              }
            `}
          >
            {point}
          </p>
        ))}
      </div>

      {/* Subtle hover glow */}
      <div
        className={`
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-32
          w-32
          rounded-full
          bg-white/10
          blur-2xl
          transition-opacity
          duration-500
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
      />
    </div>
  );
}