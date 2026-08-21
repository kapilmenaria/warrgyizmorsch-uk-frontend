import Link from "next/link";
import Reveal from "../components/Reveal";
import RotatingCaseStudiesCarousel from "../components/case-studies/RotatingCaseStudiesCarousel";
import { caseStudies } from "../lib/case-studies";
import { ArrowRight } from "lucide-react";

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white selection:bg-[#60C7FF] selection:text-black">
      {/* =====================================================
          HERO & 3D ROTATING CASE STUDIES CAROUSEL
      ====================================================== */}
      <section className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-6 sm:pb-14">
        {/* Ambient background glows */}
        <div className="pointer-events-none absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-brand-accent/15 blur-[140px]" />
        <div className="pointer-events-none absolute -right-40 top-40 h-[450px] w-[450px] rounded-full bg-[#1595E8]/10 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ===================================================
              HERO HEADER (Matching Screenshot)
          ==================================================== */}
          <div className="mb-8 sm:mb-12">
            {/* Pill Badge */}
            <Reveal>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#60C7FF] shadow-[0_0_8px_#60C7FF]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                  Case Studies · Proven Impact &amp; Growth
                </span>
              </div>
            </Reveal>

            {/* Main Heading */}
            <Reveal className="delay-1">
              <h1 className="mt-2 max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Architecting Digital Products That{" "}
                <span className="bg-gradient-to-r from-brand-accent to-cyan-400 bg-clip-text text-transparent">
                  Deliver Measurable Impact.
                </span>
              </h1>
            </Reveal>

            {/* Sub-description */}
            <Reveal className="delay-2">
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-300/90 sm:text-base md:text-lg">
                Explore our portfolio of custom web platforms, mobile applications, and enterprise digital transformations. Hover any project card to preview interactive builds in motion and see the outcomes shipped for our partners.
              </p>
            </Reveal>

            {/* Quick Stats Row */}
            <Reveal className="delay-3">
              <div className="mt-8 flex flex-wrap items-center gap-y-4 pt-2">
                {/* Stat 1 */}
                <div className="flex items-center gap-3 pr-8 sm:pr-10">
                  <span className="text-2xl sm:text-3xl font-bold text-white">50+</span>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 leading-tight">
                    <div>Projects</div>
                    <div>Shipped</div>
                  </span>
                </div>

                <div className="hidden h-8 w-px bg-white/15 sm:block" />

                {/* Stat 2 */}
                <div className="flex items-center gap-3 px-0 sm:px-10 pr-8">
                  <span className="text-2xl sm:text-3xl font-bold text-white">99.8%</span>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 leading-tight">
                    <div>Client</div>
                    <div>Satisfaction</div>
                  </span>
                </div>

                <div className="hidden h-8 w-px bg-white/15 sm:block" />

                {/* Stat 3 */}
                <div className="flex items-center gap-3 pl-0 sm:pl-10">
                  <span className="text-2xl sm:text-3xl font-bold text-white">100%</span>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 leading-tight">
                    <div>Custom Builds</div>
                    <div>&amp; Performance</div>
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ===================================================
              3D ROTATING CASE STUDIES CAROUSEL
          ==================================================== */}
          <Reveal className="delay-2">
            <RotatingCaseStudiesCarousel items={caseStudies} />
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CALL TO ACTION
      ====================================================== */}
      <section className="relative border-t border-white/10 bg-gradient-to-b from-[#08080c] to-black py-8 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#60C7FF]">
              START YOUR PROJECT
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Ready to Build Your Next Success Story?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
              Let&apos;s turn your vision into high-performing web platforms, mobile apps, and scalable digital solutions.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(0,111,201,0.4)] transition-all hover:-translate-y-0.5 hover:bg-[#055A9F]"
              >
                <span>Book a Consultation</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                <span>View Our Services</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}