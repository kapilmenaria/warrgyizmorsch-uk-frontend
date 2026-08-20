import Reveal from "../components/Reveal";

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#102A43]">
      <section className="relative overflow-hidden px-6 py-16 md:py-24 lg:py-28">

        {/* =====================================================
            BACKGROUND DECORATION
        ====================================================== */}

        <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-[#066BBD]/5 blur-[120px]" />

        <div className="pointer-events-none absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-[#1595E8]/5 blur-[120px]" />


        {/* =====================================================
            MAIN CONTAINER
        ====================================================== */}

        <div className="relative mx-auto max-w-7xl">

          <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">


            {/* =================================================
                LEFT SIDE — CONTACT INFORMATION
            ================================================== */}

            <Reveal>
              <div className="flex flex-col justify-center rounded-[30px] bg-amber-50 p-8 sm:p-10 lg:p-12">

                {/* Badge */}

                <div className="mb-6 inline-flex self-start items-center gap-2 rounded-full border border-[#066BBD]/10 bg-[#066BBD]/5 px-4 py-2">

                  <span className="h-2 w-2 rounded-full bg-[#066BBD]" />

                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#066BBD]">
                    Contact Us
                  </span>

                </div>


                {/* Heading */}

                <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-[#102A43] sm:text-5xl lg:text-6xl">

                  Let&apos;s Build Something{" "}

                  <span className="bg-gradient-to-r from-brand-accent to-cyan-400 bg-clip-text italic text-transparent">
                    Great
                  </span>

                </h1>


                {/* Description */}

                <p className="mt-6 max-w-lg text-base leading-7 text-[#102A43]/60 md:text-lg">

                  Whether you have a project in mind, need technical
                  support, or simply want to explore an idea, our team
                  is here to help you turn it into reality.

                </p>


                {/* =================================================
                    CONTACT DETAILS
                ================================================== */}

                <div className="mt-12 grid gap-7 sm:grid-cols-2">


                  {/* Email */}

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#066BBD]/10 text-[#066BBD]">

                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-9Z"
                        />

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="m4 7 7.02 5.26a1.63 1.63 0 0 0 1.96 0L20 7"
                        />
                      </svg>

                    </div>

                    <div>

                      <p className="font-bold text-[#102A43]">
                        Email
                      </p>

                      <p className="mt-1 text-sm text-[#102A43]/55">
                        info@warrgyizmorsch.com
                      </p>

                    </div>

                  </div>


                  {/* Phone */}

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#066BBD]/10 text-[#066BBD]">

                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M5.5 4.5 8 3.5l2.5 5-2 1.5a13.2 13.2 0 0 0 5.5 5.5l1.5-2 5 2.5-1 2.5a2.5 2.5 0 0 1-2.6 1.5C10.3 19.2 4.8 13.7 3.5 7.1A2.5 2.5 0 0 1 5.5 4.5Z"
                        />
                      </svg>

                    </div>

                    <div>

                      <p className="font-bold text-[#102A43]">
                        Phone
                      </p>

                      <p className="mt-1 text-sm text-[#102A43]/55">
                        +91 00000 00000
                      </p>

                    </div>

                  </div>


                  {/* Website */}

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1595E8]/10 text-[#1595E8]">

                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          strokeWidth={1.8}
                        />

                        <path
                          strokeLinecap="round"
                          strokeWidth={1.8}
                          d="M3 12h18M12 3c2.2 2.5 3.3 5.5 3.3 9s-1.1 6.5-3.3 9c-2.2-2.5-3.3-5.5-3.3-9S9.8 5.5 12 3Z"
                        />
                      </svg>

                    </div>

                    <div>

                      <p className="font-bold text-[#102A43]">
                        Website
                      </p>

                      <p className="mt-1 text-sm text-[#102A43]/55">
                        warrgyizmorsch.com
                      </p>

                    </div>

                  </div>


                  {/* Location */}

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1595E8]/10 text-[#1595E8]">

                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M20 10.5c0 5-8 10-8 10s-8-5-8-10a8 8 0 1 1 16 0Z"
                        />

                        <circle
                          cx="12"
                          cy="10.5"
                          r="2.5"
                          strokeWidth={1.8}
                        />
                      </svg>

                    </div>

                    <div>

                      <p className="font-bold text-[#102A43]">
                        Location
                      </p>

                      <p className="mt-1 text-sm text-[#102A43]/55">
                        Udaipur, Rajasthan, India
                      </p>

                    </div>

                  </div>

                </div>

              </div>
            </Reveal>


            {/* =================================================
                RIGHT SIDE — CONTACT FORM
            ================================================== */}

            <Reveal className="delay-1">

              <div className="relative overflow-hidden rounded-[30px] bg-brand-accent p-7 shadow-[0_25px_70px_rgba(16,42,67,0.18)] sm:p-9 lg:p-11">

                {/* Decorative glows */}

                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#066BBD]/30 blur-[80px]" />

                <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#1595E8]/20 blur-[90px]" />


                <div className="relative">

                  {/* Form heading */}

                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/78">
                    Start a Conversation
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                    Get in touch.
                  </h2>

                  <p className="mt-3 max-w-md text-sm leading-6 text-white/75">
                    Tell us a little about your project and our team
                    will get back to you shortly.
                  </p>


                  {/* Form */}

                  <form className="mt-8 space-y-5">


                    {/* Name */}

                    <div>

                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-white/80"
                      >
                        Your Name
                      </label>

                      <input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        className="
                          h-13
                          w-full
                          rounded-xl
                          border
                          border-white/10
                          bg-white
                          px-4
                          text-sm
                          text-[#102A43]
                          outline-none
                          transition-all
                          duration-300
                          placeholder:text-slate-400
                          focus:border-[#1595E8]
                          focus:ring-4
                          focus:ring-[#1595E8]/20
                        "
                      />

                    </div>


                    {/* Email */}

                    <div>

                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-white/80"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="
                          h-13
                          w-full
                          rounded-xl
                          border
                          border-white/10
                          bg-white
                          px-4
                          text-sm
                          text-[#102A43]
                          outline-none
                          transition-all
                          duration-300
                          placeholder:text-slate-400
                          focus:border-[#1595E8]
                          focus:ring-4
                          focus:ring-[#1595E8]/20
                        "
                      />

                    </div>


                    {/* Phone */}

                    <div>

                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-white/80"
                      >
                        Phone Number
                      </label>

                      <input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="
                          h-13
                          w-full
                          rounded-xl
                          border
                          border-white/10
                          bg-white
                          px-4
                          text-sm
                          text-[#102A43]
                          outline-none
                          transition-all
                          duration-300
                          placeholder:text-slate-400
                          focus:border-[#1595E8]
                          focus:ring-4
                          focus:ring-[#1595E8]/20
                        "
                      />

                    </div>


                    {/* Message */}

                    <div>

                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-medium text-white/80"
                      >
                        Message
                      </label>

                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Tell us about your project..."
                        className="
                          w-full
                          resize-none
                          rounded-xl
                          border
                          border-white/10
                          bg-white
                          px-4
                          py-3
                          text-sm
                          text-[#102A43]
                          outline-none
                          transition-all
                          duration-300
                          placeholder:text-slate-400
                          focus:border-[#1595E8]
                          focus:ring-4
                          focus:ring-[#1595E8]/20
                        "
                      />

                    </div>


                    {/* Submit */}

                    <button
                      type="submit"
                      className="
                        group
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-full
                        bg-white/78
                        px-7
                        py-3
                        text-sm
                        font-bold
                        text-black/85
                        shadow-lg
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:shadow-xl
                        hover:shadow-[#066BBD]/30
                      "
                    >

                      Send Message

                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h14m-6-6 6 6-6 6"
                        />

                      </svg>

                    </button>

                  </form>

                </div>

              </div>

            </Reveal>

          </div>

        </div>

      </section>
    </main>
  );
}