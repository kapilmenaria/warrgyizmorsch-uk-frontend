import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { caseStudies, getCaseStudyBySlug } from "../../lib/case-studies";
import Reveal from "../../components/Reveal";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Quote,
  Star,
} from "lucide-react";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study Not Found | Warrgyizmorsch",
    };
  }

  return {
    title: study.meta_title || `${study.client} Case Study | Warrgyizmorsch`,
    description:
      study.meta_description ||
      study.summary ||
      `Explore how Warrgyizmorsch engineered digital solutions for ${study.client}.`,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  // Find index and next/previous case studies
  const currentIndex = caseStudies.findIndex((cs) => cs.slug === study.slug);
  const prevStudy =
    currentIndex > 0 ? caseStudies[currentIndex - 1] : caseStudies[caseStudies.length - 1];
  const nextStudy =
    currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : caseStudies[0];

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#60C7FF] selection:text-black">
      {/* =====================================================
          AMBIENT BACKGROUND GLOWS
      ====================================================== */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-brand-accent/15 blur-[140px]" />
        <div className="absolute -right-40 top-80 h-[500px] w-[500px] rounded-full bg-[#1595E8]/10 blur-[150px]" />
      </div>

      {/* =====================================================
          STICKY SUB-NAVBAR
      ====================================================== */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>All Case Studies</span>
          </Link>

          <div className="flex items-center gap-3">
            {study.websiteUrl && (
              <a
                href={study.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-all hover:border-[#60C7FF] hover:bg-white/10"
              >
                <span>Visit Website</span>
                <ExternalLink size={13} className="text-[#60C7FF]" />
              </a>
            )}

            <Link
              href="/contact-us"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-brand-accent px-4 py-1.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(0,111,201,0.4)] transition-all hover:bg-[#055A9F]"
            >
              <span>Start Project</span>
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative pt-12 sm:pt-16 pb-12 sm:pb-16 border-b border-white/10">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#60C7FF]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal className="delay-1">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
                  {study.client}
                </h1>
              </Reveal>

              <Reveal className="delay-2">
                <p className="mt-4 sm:mt-5 text-base sm:text-lg leading-relaxed text-slate-300">
                  {study.summary}
                </p>
              </Reveal>

              {study.work && (
                <Reveal className="delay-3">
                  <div className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-[#0e0e14] px-4 py-2.5 text-xs text-slate-300">
                    <span className="font-semibold uppercase tracking-wider text-white/50">
                      Scope:
                    </span>
                    <span className="font-medium text-[#60C7FF]">{study.work}</span>
                  </div>
                </Reveal>
              )}
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5">
              <Reveal className="delay-2">
                <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[#0b0b12] p-3 sm:p-4 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#14141a]">
                    <img
                      src={study.image}
                      alt={study.client}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Key Stats Grid */}
          {study.stats && study.stats.length > 0 && (
            <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {study.stats.map((stat, idx) => (
                <Reveal key={stat.label} className={`delay-${idx + 1}`}>
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/[0.07]">
                    <div className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-[#60C7FF] bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-wider text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          MAIN BODY: CONTENT & SIDEBAR
      ====================================================== */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left / Main Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* Rich Project Content */}
              <div
                className="
                  space-y-6 text-slate-300 leading-relaxed
                  [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pt-4
                  [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-3
                  [&_p]:text-base [&_p]:text-slate-300 [&_p]:leading-relaxed [&_p]:mb-4
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2.5 [&_ul]:my-4
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2.5 [&_ol]:my-4
                  [&_li]:text-slate-300 [&_li]:leading-relaxed
                  [&_strong]:text-[#60C7FF] [&_strong]:font-semibold
                  [&_.about-head]:flex [&_.about-head]:items-center [&_.about-head]:justify-between [&_.about-head]:gap-4 [&_.about-head]:flex-wrap
                  [&_.th-btn]:hidden
                "
                dangerouslySetInnerHTML={{ __html: study.content }}
              />

              {/* YouTube Video Testimonial (if available) */}
              {study.testimonialVideoId && (
                <div className="mt-12 rounded-3xl border border-white/15 bg-[#0e0e14] p-6 sm:p-8">
                  <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#60C7FF]">
                    <Sparkles size={16} />
                    <span>Client Video Testimonial</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                    Hear directly from {study.client}
                  </h3>
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${study.testimonialVideoId}`}
                      title={`${study.client} Video Testimonial`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  </div>
                </div>
              )}

              {/* Text Testimonial Quote (if available) */}
              {(study.testimonial || study.review) && (
                <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#0f172a]/60 to-[#020617]/80 p-8 backdrop-blur-xl">
                  <Quote className="absolute right-6 top-6 h-20 w-20 text-white/5" />
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="relative z-10 text-base sm:text-lg italic leading-relaxed text-slate-200">
                    &ldquo;{study.testimonial?.quote || study.review}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent text-sm font-bold text-white shadow-md">
                      {study.client.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {study.testimonial?.name || study.client}
                      </div>
                      <div className="text-xs text-slate-400">
                        {study.testimonial?.role || "Verified Client Testimonial"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Project Details Card */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-md">
                <h3 className="text-lg font-bold text-white mb-6">Project Details</h3>
                <div className="space-y-4 text-sm">
                  <div className="border-b border-white/10 pb-3.5">
                    <span className="block text-xs uppercase tracking-wider text-slate-400">
                      Client
                    </span>
                    <span className="font-semibold text-white mt-1 block">{study.client}</span>
                  </div>

                  {study.work && (
                    <div className="border-b border-white/10 pb-3.5">
                      <span className="block text-xs uppercase tracking-wider text-slate-400">
                        Services Delivered
                      </span>
                      <span className="font-medium text-[#60C7FF] mt-1 block">{study.work}</span>
                    </div>
                  )}

                  {study.websiteUrl && (
                    <div className="border-b border-white/10 pb-3.5">
                      <span className="block text-xs uppercase tracking-wider text-slate-400">
                        Live URL
                      </span>
                      <a
                        href={study.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-white hover:text-[#60C7FF] mt-1 inline-flex items-center gap-1.5 transition-colors"
                      >
                        <span>{study.websiteUrl.replace(/^https?:\/\//, "")}</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  )}

                  <div>
                    <span className="block text-xs uppercase tracking-wider text-slate-400">
                      Delivery Model
                    </span>
                    <span className="font-medium text-slate-300 mt-1 block">
                      End-to-End Agile Architecture &amp; Execution
                    </span>
                  </div>
                </div>

                {study.websiteUrl && (
                  <a
                    href={study.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-white/20"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>

              {/* Consultation CTA Card */}
              <div className="relative overflow-hidden rounded-3xl border border-brand-accent/30 bg-gradient-to-b from-[#0a1b2e] to-[#050b14] p-6 sm:p-8">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-accent/25 blur-2xl" />
                <h4 className="text-xl font-bold text-white">
                  Need a similar solution for your business?
                </h4>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Let&apos;s build high-performance web platforms, mobile apps, or enterprise software tailored to your goals.
                </p>

                <Link
                  href="/contact-us"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-accent py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(0,111,201,0.4)] transition-all hover:bg-[#055A9F]"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          NEXT / PREV CASE STUDY NAVIGATION
      ====================================================== */}
      <section className="border-t border-white/10 bg-[#08080c] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Previous */}
            <Link
              href={`/case-studies/${prevStudy.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/25 hover:bg-white/10"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                <span>Previous Case Study</span>
              </div>
              <div className="mt-3 text-lg sm:text-xl font-bold text-white group-hover:text-[#60C7FF] transition-colors">
                {prevStudy.client}
              </div>
            </Link>

            {/* Next */}
            <Link
              href={`/case-studies/${nextStudy.slug}`}
              className="group flex flex-col justify-between items-end text-right rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/25 hover:bg-white/10"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span>Next Case Study</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
              <div className="mt-3 text-lg sm:text-xl font-bold text-white group-hover:text-[#60C7FF] transition-colors">
                {nextStudy.client}
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
