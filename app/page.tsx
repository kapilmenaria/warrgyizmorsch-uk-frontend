import Link from "next/link";

import ServicesTabs from "./components/ServicesTabs";
import ProcessStep from "./components/ProcessStep";
import Reveal from "./components/Reveal";
import LogoSlider from "./components/LogoSlider";
import SectorsSection from "./components/SectorsSection";
import Testimonials from "./components/Testimonials";
import OurWork from "./components/OurWork";
import HomePageContactUs from "./components/HomePageContactUs";
import HeroBackground from "./components/HeroBackground";

const processSteps = [
  {
    number: "01",
    title: "Strategy & Discovery",
    points: [
      "Competitor and market analysis",
      "Goal-setting workshops",
      "Audience analysis",
      "Milestone roadmap",
    ],
  },
  {
    number: "02",
    title: "Planning & Architecture",
    points: [
      "Scope aligned to client needs",
      "Best-fit tech stack",
      "Scalable architecture",
      "Risk mitigation",
    ],
  },
  {
    number: "03",
    title: "Creative & UX Design",
    points: [
      "Wireframes and prototypes",
      "Modern, engaging interfaces",
      "Cross-device UX tuning",
      "Brand consistency",
    ],
  },
  {
    number: "04",
    title: "Development",
    points: [
      "Agile delivery",
      "Custom, secure coding",
      "API integration",
      "Transparent progress updates",
    ],
  },
  {
    number: "05",
    title: "QA & Testing",
    points: [
      "Functional testing",
      "Performance testing",
      "Security testing",
      "Usability testing",
    ],
  },
  {
    number: "06",
    title: "Launch & Optimization",
    points: [
      "Zero-downtime deployment",
      "Post-launch monitoring",
      "Regular updates",
      "Ongoing optimization",
    ],
  },
];

const faqs = [
  {
    question: "What services does Warrgyizmorsch provide?",
    answer:
      "We offer website development, custom software development, mobile app development, SaaS solutions, and digital marketing — complete digital solutions to help businesses grow efficiently.",
  },
  {
    question: "How can an IT partner help my business grow?",
    answer:
      "By implementing smart digital solutions, improving operational efficiency, and enhancing customer engagement — leading to faster growth and better results.",
  },
  {
    question: "Can I scale my business with your IT solutions?",
    answer:
      "Yes — our solutions are built to scale with your business, whether that means traffic growth, new features, or system expansion.",
  },
  {
    question: "What makes Warrgyizmorsch different?",
    answer:
      "We focus on delivering practical, result-driven solutions rather than just building software — combining strategy, design, and technology for real growth.",
  },
];

export default function Home() {
  return (
    <>
      {/* =========================================================
          HERO

          The animated background lives entirely inside
          <HeroBackground />: the WebGL scene, accent glows,
          vignette, readability scrim and loading strip. Nothing
          else needs to sit behind the content.

          Keep these classes on the section:
            relative  — positioning ancestor for the background
            isolate   — stacking context, keeps -z-10 above bg-black
            bg-black  — paints instantly, before three.js loads
      ========================================================= */}
      {/* =========================================================
          HERO

          The animated background lives entirely inside
          <HeroBackground />: the WebGL scene, accent glows,
          vignette, readability scrim and loading strip. Nothing
          else needs to sit behind the content.

          Keep these classes on the section:
            relative  — positioning ancestor for the background
            isolate   — stacking context, keeps -z-10 above bg-black
            bg-black  — paints instantly, before three.js loads
      ========================================================= */}
      <section className="hero-section relative isolate overflow-hidden bg-black">
        <HeroBackground />

        {/* =======================================================
            HERO CONTENT
        ======================================================== */}
        <div
          className="
            mx-auto
            flex
            min-h-[620px]
            max-w-7xl
            items-center
            justify-center
            px-5
            py-24
            text-center

            sm:min-h-[660px]
            sm:px-8
            sm:py-28

            md:min-h-[700px]
            md:px-10
            md:py-32

            lg:min-h-[740px]
            lg:px-12
            lg:py-36

            xl:px-6
          "
        >
          <div className="mx-auto w-full max-w-5xl">

            {/* ===================================================
                EYEBROW
            =================================================== */}
            <div
              className="
                mb-5
                flex
                items-center
                justify-center
                gap-2
                hero-eyebrow-enter

                sm:mb-6
              "
            >
              {/* Brand blue dot */}
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-brand-accent
                  shadow-[0_0_14px_rgba(0,111,201,0.8)]
                "
              />

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.24em]
                  text-[#60C7FF]

                  sm:text-xs
                  sm:tracking-[0.28em]
                "
              >
                IT Services &amp; Digital Solutions
              </p>

              {/* Cyan supporting dot */}
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#22B8FF]
                  shadow-[0_0_14px_rgba(34,184,255,0.6)]
                "
              />
            </div>

            {/* ===================================================
                MAIN HEADING
            =================================================== */}
            <h1
              className="
                mx-auto
                max-w-5xl
                text-[2.35rem]
                font-bold
                leading-[1.04]
                tracking-[-0.035em]
                text-white
                hero-heading-enter

                sm:text-5xl
                md:text-6xl
                lg:text-[72px]
                xl:text-[78px]
              "
            >
              Smart &amp; Scalable{" "}

              <span
                className="
                  bg-gradient-to-r
                  from-brand-accent
                  via-[#1598E8]
                  to-[#60C7FF]
                  bg-clip-text
                  text-transparent
                "
              >
                IT Solutions
              </span>

              <br className="hidden sm:block" /> for Growing Businesses
            </h1>

            {/* ===================================================
                DESCRIPTION
            =================================================== */}
            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-sm
                leading-6
                text-white/65
                hero-copy-enter

                sm:mt-7
                sm:text-base
                sm:leading-7

                md:text-lg
                md:leading-8
              "
            >
              Since 2017, we&apos;ve been building reliable digital products —
              websites, custom software, mobile apps, SaaS, and ecommerce —
              tailored to help startups and established businesses grow.
            </p>

            {/* ===================================================
                BUTTONS
            =================================================== */}
            <div
              className="
                mt-8
                flex
                flex-col
                items-center
                justify-center
                gap-3
                hero-actions-enter

                sm:mt-9
                sm:flex-row
                sm:gap-4
              "
            >
              {/* =================================================
                  PRIMARY CTA
              ================================================= */}
              <Link
                href="/contact-us"
                className="
                  group
                  inline-flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-brand-accent
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_0_28px_rgba(0,111,201,0.28)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#087DD4]
                  hover:shadow-[0_0_38px_rgba(0,111,201,0.42)]

                  sm:w-auto
                  sm:min-w-[180px]
                  sm:px-7
                  sm:py-3.5
                  sm:text-base
                "
              >
                Book a Free Call

                <span
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </Link>

              {/* =================================================
                  SECONDARY CTA
              ================================================= */}
              <Link
                href="/case-studies"
                className="
                  group
                  inline-flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/20
                  bg-white/[0.04]
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-brand-accent/55
                  hover:bg-brand-accent/[0.08]

                  sm:w-auto
                  sm:min-w-[180px]
                  sm:px-7
                  sm:py-3.5
                  sm:text-base
                "
              >
                Explore Our Work

                <span
                  className="
                    text-[#60C7FF]
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </Link>
            </div>

            {/* ===================================================
                SMALL SERVICE LINE
            =================================================== */}
            <div
              className="
                mt-8
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-5
                gap-y-2
                text-[10px]
                font-medium
                uppercase
                tracking-[0.14em]
                text-white/35

                sm:mt-10
                sm:text-[11px]
              "
            >
              <span>Web Development</span>

              <span className="h-1 w-1 rounded-full bg-brand-accent/60" />

              <span>AI &amp; Software</span>

              <span className="h-1 w-1 rounded-full bg-brand-accent/60" />

              <span>Digital Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          LOGO SLIDER
      ========================================================= */}
      <Reveal>
        <LogoSlider />
      </Reveal>

      {/* =========================================================
          SECTORS
      ========================================================= */}
      <Reveal>
        <div id="sectors-stage" className="lg:h-[600svh]">
          <SectorsSection />
        </div>
      </Reveal>

      {/* =========================================================
          SERVICES
      ========================================================= */}
      <Reveal>
        <div id="services-stage" className="lg:h-[600svh]">
          <section
            id="services"
            className="
              relative isolate overflow-hidden
              flex w-full flex-col justify-center
              bg-[#020B1E]
              px-4
              py-10

              sm:px-6
              sm:py-12

              lg:min-h-[100svh]
              lg:px-8
              lg:pt-24
              lg:pb-12

              xl:px-12
              xl:pt-28
              xl:pb-14
            "
          >
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -right-32 top-10 h-[480px] w-[480px] rounded-full bg-brand-accent/20 blur-[130px]" />
            <div className="pointer-events-none absolute -left-32 bottom-10 h-[480px] w-[480px] rounded-full bg-[#066BBD]/20 blur-[130px]" />

            <Reveal className="mx-auto mb-4 max-w-2xl text-center sm:mb-6 lg:mb-8 relative z-10">
              <p className="mb-1.5 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#60C7FF] sm:text-sm">
                OUR SERVICES
              </p>

              <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl sm:whitespace-nowrap">
                IT Services For{" "}
                <span className="ml-1 bg-gradient-to-r from-brand-accent via-[#22B8FF] to-cyan-300 bg-clip-text text-transparent sm:ml-2">
                  Business Growth
                </span>
              </h2>
            </Reveal>

            <Reveal className="relative z-10">
              <ServicesTabs />
            </Reveal>
          </section>
        </div>
      </Reveal>

      {/* =========================================================
          OUR WORK
      ========================================================= */}
      <Reveal>
        <OurWork />
      </Reveal>

      {/* =========================================================
          TESTIMONIALS
      ========================================================= */}
      <Reveal>
        <Testimonials />
      </Reveal>

      {/* =========================================================
          PROCESS
      ========================================================= */}
      <Reveal>
        <section className="bg-white py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal>
              <div className="mb-8 text-center md:mb-12">
                <h2 className="text-3xl font-bold text-black md:text-5xl">
                  Our Proven Processes{" "}
                  <span className="ml-2 bg-gradient-to-r from-brand-accent to-cyan-400 bg-clip-text text-transparent">
                    to deliver success
                  </span>
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
                  A structured approach designed to transform your ideas into
                  scalable, high-performing digital solutions.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((step, i) => (
                <Reveal
                  key={step.number}
                  className={`delay-${(i % 3) + 1}`}
                >
                  <ProcessStep {...step} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>


      {/* =========================================================
          FAQ — FULL-WIDTH RESPONSIVE LAYOUT
      ========================================================= */}
      <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 border-t border-slate-100">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 items-start">

            {/* LEFT SIDE */}
            <Reveal className="relative">
              <p className="mb-3 text-xs font-mono font-bold uppercase tracking-widest text-brand-accent">
                FREQUENTLY ASKED QUESTIONS
              </p>

              <h2 className="text-3xl font-bold leading-[1.08] tracking-tight text-[#0B1F3A] sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#4A5B73] sm:text-base">
                Find answers to some of the most common questions about
                our services, development process, and digital solutions.
              </p>
            </Reveal>

            {/* RIGHT SIDE — ACCORDIONS */}
            <Reveal className="border-t border-[#0B1F3A]/10 delay-1">
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="group border-b border-[#0B1F3A]/10"
                  open={index === 0}
                >
                  <summary
                    className="
                      flex
                      cursor-pointer
                      select-none
                      list-none
                      items-center
                      justify-between
                      gap-5
                      py-6
                      text-[#0B1F3A]
                      [&::-webkit-details-marker]:hidden
                    "
                  >
                    <span className="text-base font-semibold text-[#0B1F3A] sm:text-lg">
                      {faq.question}
                    </span>

                    <span
                      className="
                        flex
                        h-8
                        w-8
                        min-w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-slate-200
                        text-xl
                        font-light
                        leading-none
                        text-brand-accent
                        transition-transform
                        duration-300
                        group-open:rotate-45
                      "
                    >
                      +
                    </span>
                  </summary>

                  <div className="pb-6 pr-4">
                    <p className="text-sm leading-relaxed text-[#4A5B73] sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </Reveal>

          </div>
        </div>
      </section>

      {/* =========================================================
          HOME PAGE CONTACT US (BELOW FAQ)
      ========================================================= */}
      <Reveal>
        <HomePageContactUs />
      </Reveal>
    </>
  );
}
