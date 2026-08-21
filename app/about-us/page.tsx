import Image from "next/image";
import Link from "next/link";
import {
  BrainCircuit,
  Code2,
  Database,
  Megaphone,
  Smartphone,
  ShoppingCart,
  Sparkles,
  Target,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import Reveal from "../components/Reveal";

/* =========================================================
   COMPANY LEADERS
========================================================= */


/* =========================================================
   EXPERTISE
========================================================= */

const expertise = [
  {
    title: "Software Development",
    shortTitle: "Software",
    icon: Database,
    color: "from-blue-500 to-cyan-500",
    description:
      "Custom software systems designed around your business processes, workflows, and growth requirements.",
    points: [
      "Enterprise applications",
      "ERP & CRM solutions",
      "Custom business software",
    ],
  },
  {
    title: "Web Development",
    shortTitle: "Web",
    icon: Code2,
    color: "from-cyan-500 to-blue-600",
    description:
      "Modern, responsive websites and web applications engineered for performance, usability, and growth.",
    points: [
      "Business websites",
      "Web applications",
      "High-performance platforms",
    ],
  },
  {
    title: "Mobile Development",
    shortTitle: "Mobile",
    icon: Smartphone,
    color: "from-indigo-500 to-blue-600",
    description:
      "Mobile experiences that feel fast, intuitive, and reliable across today's major devices.",
    points: [
      "Android applications",
      "iOS applications",
      "Cross-platform apps",
    ],
  },
  {
    title: "Digital Marketing",
    shortTitle: "Marketing",
    icon: Megaphone,
    color: "from-blue-600 to-indigo-600",
    description:
      "Digital strategies focused on visibility, engagement, qualified traffic, and measurable business growth.",
    points: [
      "SEO & content",
      "Paid advertising",
      "Social media growth",
    ],
  },
  {
    title: "Ecommerce Development",
    shortTitle: "Ecommerce",
    icon: ShoppingCart,
    color: "from-sky-500 to-blue-700",
    description:
      "Conversion-focused ecommerce experiences that make it easier for customers to discover, trust, and buy.",
    points: [
      "Online storefronts",
      "Payment integration",
      "Order & inventory systems",
    ],
  },
  {
    title: "Artificial Intelligence",
    shortTitle: "AI",
    icon: BrainCircuit,
    color: "from-blue-500 to-violet-600",
    description:
      "Practical AI solutions that automate repetitive work, improve decision-making, and unlock new possibilities.",
    points: [
      "AI automation",
      "Chatbots & assistants",
      "Machine learning integration",
    ],
  },
];

/* =========================================================
   TECHNOLOGY STACK
========================================================= */

const techStack = [
  "Angular",
  "JavaScript",
  "Node.js",
  "Laravel",
  "React Native",
  "React.js",
  "Next.js",
  "PHP",
  "Python",
  "Flutter",
  "MySQL",
  "MongoDB",
];

/* =========================================================
   MISSION / VISION / GOAL
========================================================= */

const companyPillars = [
  {
    eyebrow: "01",
    title: "Our Mission",
    label: "MISSION",
    icon: Target,
    text:
      "Our mission is to empower businesses with reliable, innovative, and bespoke digital solutions. We aim to deliver web development, digital services, and technology-oriented strategies that are unique to each client. Through quality, transparency, and client satisfaction, we facilitate the growth, competition, and success of our clients in the digital space.",
  },
  {
    eyebrow: "02",
    title: "Our Vision",
    label: "VISION",
    icon: Sparkles,
    text:
      "Our vision is to become a trusted technology partner for ambitious businesses by creating scalable, accessible, and meaningful digital experiences. We continuously evolve with technology while keeping usability, performance, innovation, and customer success at the centre of everything we build.",
  },
  {
    eyebrow: "03",
    title: "Our Goal",
    label: "GOAL",
    icon: Zap,
    text:
      "Our goal is simple: create technology that delivers real business value. We want every website, application, software system, and digital strategy we build to make our clients faster, smarter, more competitive, and better prepared for the future.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="overflow-hidden bg-white">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-amber-50 ">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full" />

        <div className="absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">

          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-4 py-2 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-brand-accent" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/75">
                About Warrgyizmorsch
              </span>
            </div>
          </Reveal>

          <Reveal className="delay-1">
            <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight text-black sm:text-5xl md:text-6xl lg:text-7xl">

              We Build Digital Experiences{" "}
              <span className="bg-gradient-to-r from-brand-accent to-cyan-400 bg-clip-text text-transparent">
                That Matter.
              </span>
            </h1>
          </Reveal>

          <Reveal className="delay-2">
            <p className="mt-7 max-w-2xl text-base leading-8 text-black/75 md:text-lg">
              We are a forward-thinking IT company delivering innovative
              software and web solutions that help businesses grow in a
              fast-changing digital world.
            </p>
          </Reveal>

        </div>
      </section>

      {/* =====================================================
          MISSION / VISION / GOAL
      ====================================================== */}

      <section className="relative bg-[#F5F8FC] py-20 md:py-28">

        <div className="mx-auto max-w-7xl px-6">

          <Reveal className="mb-16 text-center">



            <h2 className="text-3xl font-bold text-black md:text-5xl">
              Purpose Behind{" "}
              <span className="ml-2 bg-gradient-to-r from-brand-accent to-cyan-400 bg-clip-text text-transparent">
                Every Project
              </span>
            </h2>

          </Reveal>

          <div className="space-y-12 md:space-y-20">

            {companyPillars.map((pillar, index) => {

              const Icon = pillar.icon;

              const imageOnLeft = index % 2 === 0;

              return (
                <Reveal key={pillar.title}>

                  <div
                    className={`
                      grid
                      items-center
                      gap-8
                      lg:grid-cols-2
                      lg:gap-14
                      ${imageOnLeft ? "" : "lg:[&>*:first-child]:order-2"}
                    `}
                  >

                    {/* IMAGE / VISUAL */}

                    <div className="relative">

                      <div className="group relative aspect-[16/9] overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-xl shadow-brand-navy/5">

                        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-2 to-brand-accent" />

                        <div className="absolute inset-0 opacity-20">

                          <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full border-[35px] border-white/20" />

                          <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full border-[45px] border-white/10" />

                        </div>

                        <div className="absolute inset-0 flex flex-col items-center justify-center">

                          <Icon
                            size={48}
                            strokeWidth={1.4}
                            className="mb-5 text-white/80 transition-transform duration-500 group-hover:scale-110"
                          />

                          <span className="text-4xl font-black tracking-[0.12em] text-white md:text-5xl">
                            {pillar.label}
                          </span>

                          <span className="mt-3 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur">
                            Replace this with your image
                          </span>

                        </div>

                      </div>


                    </div>

                    {/* TEXT */}

                    <div>



                      <h2 className="text-3xl font-bold text-black md:text-4xl">
                        {pillar.title}
                      </h2>


                      <p className="mt-7 text-base leading-8 text-black">
                        {pillar.text}
                      </p>

                      <div className="mt-7 flex items-center gap-3 text-sm font-semibold text-brand-navy">



                      </div>

                    </div>

                  </div>

                </Reveal>
              );
            })}

          </div>

        </div>
      </section>

      {/* =====================================================
          OUR EXPERTISE
      ====================================================== */}

      <section className="relative overflow-hidden bg-white py-20 md:py-28">

        <div className="mx-auto max-w-7xl px-6">

          <Reveal className="text-center">

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Our Expertise
            </p>

            <h1 className="mt-6 max-w-5xl mx-auto text-5xl font-bold leading-[1.08] tracking-tight text-black ">

              Technology Meets {" "}

              <span className="ml-2 bg-gradient-to-r from-brand-accent to-cyan-400 bg-clip-text italic text-transparent">

                Expertise

              </span> </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-black/75">
              Explore the capabilities that allow us to create complete
              digital solutions for modern businesses.
            </p>

          </Reveal>

          {/* =================================================
              DESKTOP HEXAGON LAYOUT
          ================================================== */}

          <div className="relative mx-auto mt-16 hidden h-[680px] max-w-[900px] lg:block">

            {/* Decorative circles */}

            <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-accent/10" />

            <div className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-accent/5" />

            {/* =================================================
                CENTER COMPANY LOGO
            ================================================== */}

            <div
              className="
                group
                absolute
                left-1/2
                top-1/2
                z-20
                flex
                h-64
                w-64
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                bg-brand-accent
                shadow-2xl
                shadow-brand-accent/25
                transition-all
                duration-500
                hover:scale-[1.04]
                hover:shadow-brand-accent/40
              "
              style={{
                clipPath:
                  "polygon(25% 6%,75% 6%,94% 50%,75% 94%,25% 94%,6% 50%)",
              }}
            >

              <div
                className="
                  flex
                  h-52
                  w-52
                  items-center
                  justify-center
                  bg-brand-accent
                  p-3
                "
                style={{
                  clipPath:
                    "polygon(25% 6%,75% 6%,94% 50%,75% 94%,25% 94%,6% 50%)",
                }}
              >

                {/* =================================================
                    YOUR ACTUAL COMPANY LOGO

                    File:
                    public/images/companylogo.png

                    The PNG already has a transparent background,
                    so there is NO white background here.
                ================================================== */}

                <Image
                  src="/images/companylogo.png"
                  alt="Warrgyizmorsch Logo"
                  width={190}
                  height={150}
                  priority
                  className="
                    h-[150px]
                    w-[190px]
                    object-contain
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />

              </div>

            </div>

            {/* =================================================
                SERVICE HEXAGONS
            ================================================== */}

            <ExpertiseHex
              item={expertise[0]}
              className="absolute left-1/2 top-0 -translate-x-1/2"
            />

            <ExpertiseHex
              item={expertise[1]}
              className="absolute right-[2%] top-[25%]"
            />

            <ExpertiseHex
              item={expertise[2]}
              className="absolute right-[2%] bottom-[10%]"
            />

            <ExpertiseHex
              item={expertise[3]}
              className="absolute left-[2%] bottom-[10%]"
            />

            <ExpertiseHex
              item={expertise[4]}
              className="absolute left-[2%] top-[25%]"
            />

            <ExpertiseHex
              item={expertise[5]}
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
            />

          </div>

          {/* =================================================
              MOBILE / TABLET
          ================================================== */}

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:hidden">

            {expertise.map((item) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    group
                    rounded-3xl
                    border
                    border-black/5
                    bg-[#f7f9fc]
                    p-6
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-brand-accent/20
                    hover:bg-white
                    hover:shadow-xl
                    hover:shadow-brand-accent/10
                  "
                >

                  <div className="flex items-start gap-4">

                    <div
                      className={`
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        ${item.color}
                        text-white
                      `}
                    >
                      <Icon size={22} />
                    </div>

                    <div>

                      <h3 className="font-bold text-brand-navy">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-brand-navy/55">
                        {item.description}
                      </p>

                    </div>

                  </div>

                  <div className="mt-5 space-y-2">

                    {item.points.map((point) => (

                      <div
                        key={point}
                        className="flex items-center gap-2 text-xs text-brand-navy/55"
                      >

                        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />

                        {point}

                      </div>

                    ))}

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* =====================================================
          TECHNOLOGY STACK
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#f7f9fc] py-20 md:py-28">

        <Reveal className="mx-auto max-w-7xl px-6 text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-accent">
            Our Tech Stack
          </p>
          <h2 className="mt-6 max-w-5xl mx-auto text-4xl sm:text-5xl font-bold leading-[1.08] tracking-tight text-black">
            Technologies We{" "}
            <span className="bg-gradient-to-r from-brand-accent to-cyan-400 bg-clip-text text-transparent">
              Work With
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-black/75">
            A modern technology stack that allows us to build flexible,
            scalable, and high-performance digital products.
          </p>

        </Reveal>

        {/* MOVING ROW */}

        <div className="relative mt-14 overflow-hidden">

          {/* Left fade */}

          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#f7f9fc] to-transparent md:w-40" />

          {/* Right fade */}

          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#f7f9fc] to-transparent md:w-40" />

          <div className="tech-marquee">

            <div className="tech-track">

              {techStack.map((tech, index) => (
                <TechCard
                  key={`first-${tech}`}
                  tech={tech}
                  index={index}
                />
              ))}

              {techStack.map((tech, index) => (
                <TechCard
                  key={`second-${tech}`}
                  tech={tech}
                  index={index}
                />
              ))}

            </div>

          </div>

        </div>

      </section>



      {/* =====================================================
          JOURNEY CTA
      ====================================================== */}

      <section className="bg-white py-16 md:py-20">

        <Reveal className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">

          <div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
              Our Journey
            </p>

            <h2 className="max-w-2xl text-3xl font-bold text-white md:text-4xl">
              The journey continues.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">
              Discover the people, milestones, and experiences that have
              shaped Warrgyizmorsch.
            </p>

          </div>

          <Link
            href="/our-journey"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-brand-accent
              px-6
              py-3.5
              font-semibold
              text-white
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#055A9F]
              hover:shadow-xl
              hover:shadow-brand-accent/30
            "
          >
            Explore Our Journey
            <ArrowUpRight size={18} />
          </Link>

        </Reveal>

      </section>

    </main>
  );
}

/* =========================================================
   EXPERTISE HEXAGON
========================================================= */

function ExpertiseHex({
  item,
  className = "",
}: {
  item: (typeof expertise)[number];
  className?: string;
}) {

  const Icon = item.icon;

  return (
    <div
      className={`
        group
        z-10
        h-[205px]
        w-[205px]
        transition-all
        duration-500
        hover:z-30
        hover:scale-110
        ${className}
      `}
    >

      {/* Outer hexagon */}

      <div
        className="
          relative
          h-full
          w-full
          bg-brand-navy/70
          p-[1px]
          shadow-lg
          transition-all
          duration-500
          group-hover:bg-brand-accent
          group-hover:shadow-2xl
          group-hover:shadow-brand-accent/20
        "
        style={{
          clipPath:
            "polygon(25% 3%,75% 3%,98% 50%,75% 97%,25% 97%,2% 50%)",
        }}
      >

        {/* Inner hexagon */}

        <div
          className="
            relative
            flex
            h-full
            w-full
            flex-col
            items-center
            justify-center
            bg-white
            px-7
            text-center
            transition-all
            duration-500
            group-hover:bg-brand-accent/[0.04]
          "
          style={{
            clipPath:
              "polygon(25% 3%,75% 3%,98% 50%,75% 97%,25% 97%,2% 50%)",
          }}
        >

          {/* Icon */}

          <div
            className="
              mb-4
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-brand-accent/[0.07]
              text-brand-accent
              transition-all
              duration-500
              group-hover:scale-110
              group-hover:bg-brand-accent
              group-hover:text-white
            "
          >
            <Icon size={24} />
          </div>

          {/* Normal title */}

          <h3 className="text-sm font-bold leading-tight text-brand-navy">
            {item.shortTitle}
          </h3>

          <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-brand-navy/40">
            Development
          </span>

          {/* =================================================
              HOVER DETAIL
          ================================================== */}

          <div
            className="
              absolute
              inset-4
              flex
              flex-col
              items-center
              justify-center
              rounded-2xl
              bg-brand-navy
              p-5
              text-center
              opacity-0
              scale-75
              transition-all
              duration-500
              group-hover:scale-100
              group-hover:opacity-100
            "
          >

            <p className="text-xs font-bold text-white">
              {item.title}
            </p>

            <p className="mt-2 text-[10px] leading-4 text-white/60">
              {item.description}
            </p>

            <div className="mt-3 space-y-1">

              {item.points.slice(0, 2).map((point) => (

                <p
                  key={point}
                  className="text-[9px] text-white/50"
                >
                  • {point}
                </p>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   TECHNOLOGY CARD
========================================================= */

function TechCard({
  tech,
  index,
}: {
  tech: string;
  index: number;
}) {

  return (
    <div
      className="
        group
        relative
        flex
        h-[150px]
        w-[190px]
        shrink-0
        flex-col
        items-center
        justify-center
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#111827]
        shadow-xl
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-brand-accent/40
        hover:shadow-brand-accent/20
      "
    >

      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brand-accent/20 blur-2xl transition-all duration-500 group-hover:bg-brand-accent/40" />

      <span className="absolute right-4 top-3 text-[9px] font-bold text-white/15">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        className="
          relative
          mb-4
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          border
          border-white/10
          bg-white/5
          text-lg
          font-black
          text-white
          transition-all
          duration-300
          group-hover:scale-110
          group-hover:border-brand-accent/40
          group-hover:text-brand-accent
        "
      >
        {tech.charAt(0)}
      </div>

      <span className="relative text-sm font-bold text-white">
        {tech}
      </span>

      <span className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/30">
        Technology
      </span>

    </div>
  );
}