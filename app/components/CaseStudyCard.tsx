"use client";

import Link from "next/link";
import { useState } from "react";

type CaseStudyCardProps = {
  slug: string;
  client: string;
  tags: string[];
  summary: string;
  metrics: string[];
  image?: string;
};

export default function CaseStudyCard({
  slug,
  client,
  tags,
  summary,
  metrics,
  image,
}: CaseStudyCardProps) {
  const [hover, setHover] = useState(false);

  /*
    If your caseStudies data does not have an image yet,
    this fallback will show instead.
  */
  const bgImage = image;

  return (
    <Link
      href={`/case-studies/${slug}`}
      className="group block h-full"
    >
      <article
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="
          relative
          flex
          h-[560px]
          w-full
          flex-col
          overflow-hidden
          rounded-[28px]
          border
          border-black/10
          bg-[#0b0b12]
          transition-all
          duration-500
          hover:-translate-y-2
        "
        style={{
          boxShadow: hover
            ? "0 25px 70px rgba(2, 30, 115, 0.28)"
            : "0 10px 35px rgba(0, 0, 0, 0.12)",
        }}
      >
        {/* =====================================================
            BACKGROUND IMAGE
        ====================================================== */}

        <div className="absolute inset-0 overflow-hidden">
          {bgImage ? (
            <img
              src={bgImage}
              alt={client}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-105
              "
            />
          ) : (
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-br
                from-[#dbeafe]
                via-[#f1f5f9]
                to-[#cbd5e1]
              "
            />
          )}
        </div>

        {/* =====================================================
            BLUE / DARK GRADIENT OVERLAY
        ====================================================== */}

        <div
          className="
          pointer-events-none
          absolute
          inset-0
          transition-all
          duration-500
  "
          style={{
            background: hover
              ? `
           linear-gradient(  
          to top,
          rgba(45,45,45,0.95) 0%,
          rgba(70,70,70,0.78) 42%,
          rgba(100,100,100,0.35) 75%,
          rgba(120,120,120,0.12) 100%
        )
      `
              : `
         linear-gradient(
          to top,
          rgba(25,25,25,0.92) 0%,
          rgba(45,45,45,0.62) 42%,
          rgba(80,80,80,0.25) 75%,
          rgba(100,100,100,0.08) 100%
        )
      `,
          }}
        />


        {/* =====================================================
            TOP TAGS
        ====================================================== */}

        <div className="absolute left-6 right-6 top-6 z-20">
          <div
            className="
              flex
              flex-wrap
              gap-x-2
              gap-y-1
              text-[14px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-white
            "
          >
            {tags.slice(0, 3).map((tag, index) => (
              <span key={tag}>
                {tag}
                {index < Math.min(tags.length, 3) - 1 && (
                  <span className="mx-1.5 text-white/40">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="relative z-10 mt-auto flex h-full flex-col justify-end p-6 sm:p-7">

          {/* =================================================
              NORMAL VIEW
          ================================================== */}

          <div
            className="
              w-full
              transition-all
              duration-500
            "
            style={{
              opacity: hover ? 0 : 1,
              transform: hover
                ? "translateY(-15px)"
                : "translateY(0)",
              pointerEvents: hover ? "none" : "auto",
            }}
          >
            {/* CLIENT NAME */}

            <h3
              className="
                text-3xl
                font-bold
                tracking-tight
                text-white
                drop-shadow-lg
                sm:text-[34px]
              "
            >
              {client}
            </h3>

            {/* SUMMARY */}

            <p
              className="
                mt-4
                line-clamp-3
                text-sm
                leading-7
                text-white/70
                drop-shadow-md
              "
            >
              {summary}
            </p>

            {/* METRICS */}

            {metrics.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {metrics.slice(0, 3).map((metric) => (
                  <span
                    key={metric}
                    className="
                      rounded-full
                      border
                      border-white/15
                      bg-white/10
                      px-3
                      py-1
                      text-[11px]
                      font-medium
                      text-white/75
                      backdrop-blur-md
                    "
                  >
                    {metric}
                  </span>
                ))}
              </div>
            )}

            {/* READ BUTTON */}

            <div
              className="
                mt-7
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-white/20
                bg-white/5
                px-5
                py-4
                backdrop-blur-md
                transition-all
                duration-300
                group-hover:bg-white/15
              "
            >
              <span className="text-sm font-semibold tracking-wide text-white">
                Read Case Study
              </span>

              <ArrowIcon />
            </div>
          </div>

          {/* =================================================
              HOVER VIEW
          ================================================== */}

          <div
            className="
              absolute
              bottom-6
              left-6
              right-6
              transition-all
              duration-500
              sm:bottom-7
              sm:left-7
              sm:right-7
            "
            style={{
              opacity: hover ? 1 : 0,
              transform: hover
                ? "translateY(0)"
                : "translateY(30px)",
              pointerEvents: hover ? "auto" : "none",
            }}
          >
            {/* SMALL LABEL */}

            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-white/60
              "
            >
              Project Overview
            </p>

            {/* CLIENT */}

            <h3
              className="
                mt-2
                text-3xl
                font-bold
                tracking-tight
                text-white
              "
            >
              {client}
            </h3>

            {/* DESCRIPTION */}

            <p
              className="
                mt-4
                text-sm
                leading-7
                text-white/85
              "
            >
              {summary}
            </p>

            {/* METRICS */}

            {metrics.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {metrics.map((metric) => (
                  <span
                    key={metric}
                    className="
                      rounded-full
                      border
                      border-white/20
                      bg-white/10
                      px-3
                      py-1.5
                      text-[11px]
                      font-medium
                      text-white
                      backdrop-blur-md
                    "
                  >
                    {metric}
                  </span>
                ))}
              </div>
            )}

            {/* HOVER BUTTON */}

            <div
              className="
                mt-6
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-white/25
                bg-white/10
                px-5
                py-4
                backdrop-blur-md
              "
            >
              <span className="text-sm font-semibold text-white">
                Explore Case Study
              </span>

              <ArrowIcon />
            </div>
          </div>
        </div>

        {/* =====================================================
            BLUE GLOW ON HOVER
        ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            -right-32
            h-72
            w-72
            rounded-full
            bg-[#919399]
            blur-[90px]
            transition-opacity
            duration-500
          "
          style={{
            opacity: hover ? 0.45 : 0,
          }}
        />
      </article>
    </Link>
  );
}

/* ============================================================
   ARROW
============================================================ */

function ArrowIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="
        text-white/70
        transition-all
        duration-500
        group-hover:translate-x-1
        group-hover:text-white
      "
    >
      <path
        d="M5 12h14M12 5l7 7-7 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}