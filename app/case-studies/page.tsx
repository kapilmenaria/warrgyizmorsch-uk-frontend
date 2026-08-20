import CaseStudyCard from "../components/CaseStudyCard";
import Reveal from "../components/Reveal";
import { caseStudies } from "../lib/case-studies";

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8FAFC] text-[#102A43]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-amber-50 ">

        {/* Background decorative glows */}

        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#066BBD]/8 blur-[120px]" />

        <div className="pointer-events-none absolute -right-40 top-20 h-[450px] w-[450px] rounded-full bg-[#1595E8]/8 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-20 md:pt-28">

          {/* Badge */}



          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-4 py-2 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-brand-accent" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/75">
                Case Studies · Proven Impact & Growth
              </span>
            </div>
          </Reveal>


          {/* Heading */}

          <Reveal className="delay-1">

            <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight text-black sm:text-5xl md:text-6xl lg:text-7xl">

              Architecting Digital Products That{" "}

              <span className="ml-2 bg-gradient-to-r from-brand-accent to-cyan-400 bg-clip-text italic text-transparent">

                Deliver Measurable Impact.

              </span>

            </h1>

          </Reveal>


          {/* Description */}

          <Reveal className="delay-2">

            <p className="mt-7 max-w-3xl text-base leading-8 text-[#102A43]/65 md:text-lg">

              Explore our portfolio of custom web platforms, mobile
              applications, software solutions, and digital
              transformations. Discover how strategy, design, and
              technology come together to create meaningful digital
              experiences.

            </p>

          </Reveal>


          {/* Divider */}

          <Reveal className="delay-3">

            <div className="mt-10 h-px w-full bg-[#102A43]/10" />

          </Reveal>


          {/* =================================================
              STATS
          ================================================== */}

          <Reveal className="delay-3">

            <div className="mt-8 flex flex-wrap items-center gap-y-7">

              {/* Stat 1 */}

              <div className="flex items-center gap-4 pr-8 md:pr-10">

                <div className="text-3xl font-bold text-[#102A43] md:text-4xl">
                  {caseStudies.length}+
                </div>

                <div className="text-xs font-semibold uppercase tracking-wider text-[#102A43]/50">
                  <div>Case Studies</div>
                  <div>Showcased</div>
                </div>

              </div>


              {/* Divider */}

              <div className="hidden h-10 w-px bg-[#102A43]/10 md:block" />


              {/* Stat 2 */}

              <div className="flex items-center gap-4 px-0 md:px-10">

                <div className="text-3xl font-bold text-[#066BBD] md:text-4xl">
                  100%
                </div>

                <div className="text-xs font-semibold uppercase tracking-wider text-[#102A43]/50">
                  <div>Custom</div>
                  <div>Solutions</div>
                </div>

              </div>


              {/* Divider */}

              <div className="hidden h-10 w-px bg-[#102A43]/10 md:block" />


              {/* Stat 3 */}

              <div className="flex items-center gap-4 pl-0 md:pl-10">

                <div className="text-3xl font-bold text-[#6956D8] md:text-4xl">
                  24/7
                </div>

                <div className="text-xs font-semibold uppercase tracking-wider text-[#102A43]/50">
                  <div>Digital</div>
                  <div>Performance</div>
                </div>

              </div>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          SELECTED WORK
      ====================================================== */}

      <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">

        {/* Decorative glow */}

        <div className="pointer-events-none absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#066BBD]/5 blur-[130px]" />

        <div className="relative">

          {/* Section heading */}

          <Reveal>

            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>

                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#066BBD]">
                  Selected Work
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#102A43] md:text-4xl">
                  Built to Create Real Impact
                </h2>

              </div>


              <p className="max-w-md text-sm leading-6 text-[#102A43]/55">
                Explore projects where strategy, technology, and
                thoughtful design come together to solve real
                business challenges.
              </p>

            </div>

          </Reveal>


          {/* =================================================
              CASE STUDY CARDS
          ================================================== */}

          {caseStudies.length > 0 ? (

            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

              {caseStudies.map((cs, i) => (

                <Reveal
                  key={cs.slug}
                  className={`delay-${(i % 3) + 1}`}
                >

                  <div
                    className="
                      group
                      h-full
                      overflow-hidden
                      rounded-3xl
                      border
                      border-[#102A43]/10
                      bg-white
                      shadow-[0_8px_30px_rgba(16,42,67,0.06)]
                      transition-all
                      duration-500
                      hover:-translate-y-2
                      hover:border-[#066BBD]/30
                      hover:shadow-[0_20px_50px_rgba(6,107,189,0.14)]
                    "
                  >

                    <CaseStudyCard {...cs} />

                  </div>

                </Reveal>

              ))}

            </div>

          ) : (

            /* Empty state */

            <div className="rounded-3xl border border-[#102A43]/10 bg-white px-6 py-20 text-center shadow-sm">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#066BBD]/10">

                <span className="text-2xl text-[#066BBD]">
                  ✦
                </span>

              </div>

              <h3 className="mt-5 text-2xl font-bold text-[#102A43]">
                Case Studies Coming Soon
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#102A43]/55">
                We are preparing our project portfolio. Check back
                soon to explore our latest digital solutions.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="relative overflow-hidden border-t border-[#102A43]/10 bg-white">

        {/* Background glow */}

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#066BBD]/6 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center md:py-24">

          <Reveal>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#066BBD]">
              Have a Project in Mind?
            </p>

          </Reveal>


          <Reveal className="delay-1">

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-black md:text-5xl">

              Let&apos;s Build Something{" "}

              <span className="ml-2 bg-gradient-to-r from-brand-accent to-cyan-400 bg-clip-text italic text-transparent">
                Remarkable.
              </span>

            </h2>

          </Reveal>


          <Reveal className="delay-2">

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#102A43]/55">

              From the first idea to the final product, we help
              businesses turn ambitious ideas into scalable digital
              experiences.

            </p>

          </Reveal>


          {/* Decorative line */}

          <Reveal className="delay-3">

            <div className="mx-auto mt-8 h-1 w-16 rounded-full bg-gradient-to-r from-[#066BBD] to-[#6956D8]" />

          </Reveal>

        </div>

      </section>

    </main>
  );
}