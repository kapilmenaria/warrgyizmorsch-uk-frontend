import Reveal from "../components/Reveal";

const openings = [
  {
    title: "Frontend Developer",
    skills:
      "React.js, Next.js, HTML5, CSS3, JavaScript, Redux, API Integration",
    experience: "1–3 Years",
    location: "Udaipur / Remote",
  },
  {
    title: "Backend Developer",
    skills:
      "Laravel, Node.js, PHP, MySQL, MongoDB, REST APIs, Git, MVC Architecture",
    experience: "1–3 Years",
    location: "Udaipur / Hybrid",
  },
  {
    title: "Full Stack Developer",
    skills:
      "React.js, Node.js, Laravel, MySQL, MongoDB, REST APIs, Git, Deployment",
    experience: "2–4 Years",
    location: "Udaipur / Hybrid",
  },
  {
    title: "Mobile App Developer (Flutter)",
    skills:
      "Flutter, Dart, REST APIs, Play Store / App Store deployment, Firebase",
    experience: "1–3 Years",
    location: "Udaipur / Hybrid",
  },
  {
    title: "Digital Marketing Executive",
    skills:
      "SEO, Google Ads, Meta Ads, Analytics, Content Strategy, Email Marketing",
    experience: "1–3 Years",
    location: "Udaipur / On-site",
  },
  {
    title: "Social Media Marketing Executive",
    skills:
      "Content Planning, Reels, Copywriting, Social Media Strategy, Influencer Outreach",
    experience: "0–2 Years",
    location: "Udaipur / Hybrid",
  },
];

export default function CareerPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#102A43]">

      {/* =====================================================
    HERO
====================================================== */}

      <section className="relative overflow-hidden bg-amber-50">

       

        {/* Hero Container */}

        <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-20 md:pt-28">

          <div className="max-w-5xl text-left">

            {/* Badge */}

            <Reveal>

              <div className="mb-12 inline-flex items-center gap-2 rounded-full border border-black/5 bg-black/10 px-4 py-2 backdrop-blur">

                <span className="h-2 w-2 rounded-full bg-brand-accent" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/75">
                  Careers
                </span>

              </div>

            </Reveal>


            {/* Heading */}

            <Reveal className="delay-1">

              <h1 className="max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight text-black sm:text-5xl md:text-6xl lg:text-7xl">

                Build Your Career With{" "}

                <span className="ml-2 bg-gradient-to-r from-brand-accent to-cyan-400 bg-clip-text italic text-transparent">

                  Warrgyizmorsch

                </span>

              </h1>

            </Reveal>


            {/* Description */}

            <Reveal className="delay-2">

              <p className="mt-6 max-w-3xl text-base leading-7 text-black/75 md:text-lg">

                Join a growing team building modern digital solutions,
                innovative products, and technology that helps
                businesses grow.

              </p>

            </Reveal>

          </div>

        </div>

      </section>
      {/* =====================================================
          OPEN POSITIONS
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-14 md:py-10">

        {/* Section heading */}

        <Reveal>

          <div className="mb-10 text-center">

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#066BBD]">
              Current Openings
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#102A43] md:text-4xl">
              Find Your Next Opportunity
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#102A43]/55">
              Explore our current openings and find a role where
              your skills can make a real impact.
            </p>

          </div>

        </Reveal>


        {/* =================================================
            JOB GRID
        ================================================== */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {openings.map((job, i) => (

            <Reveal
              key={job.title}
              className={`delay-${(i % 3) + 1}`}
            >

              <article
                className="
                  group
                  flex
                  h-full
                  flex-col
                  rounded-2xl
                  border
                  border-[#102A43]/8
                  border-l-4
                  border-l-[#066BBD]
                  bg-white
                  p-6
                  shadow-[0_8px_30px_rgba(16,42,67,0.07)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-l-[#1595E8]
                  hover:shadow-[0_15px_40px_rgba(6,107,189,0.14)]
                "
              >

                {/* Job title */}

                <h3 className="text-xl font-bold leading-snug text-[#102A43] transition-colors duration-300 group-hover:text-[#066BBD]">

                  {job.title}

                </h3>


                {/* Experience */}

                <div className="mt-5">

                  <p className="text-sm leading-6 text-[#102A43]/70">

                    <span className="font-bold text-[#102A43]">
                      Experience:
                    </span>{" "}

                    {job.experience}

                  </p>

                </div>


                {/* Location */}

                <div className="mt-2">

                  <p className="text-sm leading-6 text-[#102A43]/70">

                    <span className="font-bold text-[#102A43]">
                      Location:
                    </span>{" "}

                    {job.location}

                  </p>

                </div>


                {/* Required skills */}

                <div className="mt-4 rounded-xl bg-[#EEF5FB] p-3.5">

                  <p className="text-sm font-bold text-[#102A43]/70">
                    Required Skills:
                  </p>

                  <p className="mt-1 text-sm leading-6 text-[#102A43]/60">
                    {job.skills}
                  </p>

                </div>


                {/* Apply button */}

                <div className="mt-auto pt-7">

                  <a
                    href={`mailto:info@warrgyizmorsch.com?subject=${encodeURIComponent(
                      `Application - ${job.title}`
                    )}`}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded-full
                      bg-[#066BBD]
                      px-5
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:bg-[#055A9F]
                      hover:shadow-[0_8px_20px_rgba(6,107,189,0.3)]
                    "
                  >
                    Apply Now
                  </a>

                </div>

              </article>

            </Reveal>

          ))}

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}

      <section className="border-t border-[#102A43]/8 bg-white">

        <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">

          <Reveal>

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#066BBD]">
              Don&apos;t See Your Role?
            </p>

          </Reveal>

          <Reveal className="delay-1">

            <h2 className="mt-3 text-3xl font-bold text-[#102A43] md:text-4xl">
              We&apos;re Always Looking for Great Talent
            </h2>

          </Reveal>

          <Reveal className="delay-2">

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#102A43]/55">

              If you believe your skills can contribute to our
              team, send us your resume and tell us how you can
              help build something great.

            </p>

          </Reveal>

          <Reveal className="delay-3">

            <a
              href="mailto:info@warrgyizmorsch.com?subject=General Career Inquiry"
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#066BBD]
                px-6
                py-3
                text-sm
                font-semibold
                text-[#066BBD]
                transition-all
                duration-300
                hover:bg-[#066BBD]
                hover:text-white
                hover:shadow-[0_8px_20px_rgba(6,107,189,0.2)]
              "
            >
              Send Your Resume
              <span>→</span>
            </a>

          </Reveal>

        </div>

      </section>

    </main>
  );
}