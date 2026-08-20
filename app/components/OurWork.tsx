"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";

import "swiper/css";

type Project = {
  title: string;
  image: string;
  route: string;
  description: string;
};

const projects: Project[] = [
  {
    title: "Aloe Naturals",
    image: "/images/ourwork-imgs/work_aloe.webp",
    route: "/case-studies/aloe-naturals",
    description:
      "A modern ecommerce experience built to showcase natural products with a clean and engaging digital presence.",
  },
  {
    title: "ITMSU",
    image: "/images/ourwork-imgs/itms.webp",
    route: "/case-studies/itmsu",
    description:
      "A powerful digital platform combining modern web technologies with scalable business solutions.",
  },
  {
    title: "WTS Visa",
    image: "/images/ourwork-imgs/work_wts.webp",
    route: "/case-studies/wts-visa",
    description:
      "A streamlined visa management platform designed to simplify applications and improve the customer experience.",
  },
  {
    title: "Plate Master",
    image: "/images/ourwork-imgs/numberPlate_case.webp",
    route: "/case-studies/plate-master",
    description:
      "An interactive number plate experience powered by modern frontend technology and immersive 3D visuals.",
  },
];

export default function OurWork() {
  return (
    <section className="overflow-hidden bg-[#050505] py-12 sm:py-16 md:py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="mb-8 md:mb-10">
          {/* Eyebrow */}
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-brand-accent">
            Portfolio
          </p>

          {/* Heading */}
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            Our Outstanding Latest{" "}
            <span className="bg-gradient-to-r from-brand-accent to-cyan-400 bg-clip-text text-transparent">
              Projects &amp; Works
            </span>
          </h2>
        </div>

        {/* =====================================================
            PROJECT SLIDER
        ====================================================== */}

        <div className="relative">
          <Swiper
            modules={[Navigation, FreeMode]}
            freeMode={true}
            spaceBetween={26}
            slidesPerView={1.05}
            navigation={{
              prevEl: ".our-work-prev",
              nextEl: ".our-work-next",
            }}
            breakpoints={{
              480: {
                slidesPerView: 1.35,
              },
              640: {
                slidesPerView: 2,
              },
              900: {
                slidesPerView: 2.5,
              },
              1100: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className="!overflow-visible"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.title}>
                <Link href={project.route} className="block">
                  <article
                    className="
                      group
                      relative
                      h-[430px]
                      overflow-hidden
                      bg-black
                      sm:h-[450px]
                      lg:h-[500px]
                    "
                  >
                    {/* =================================================
                        PROJECT IMAGE
                    ================================================== */}

                    <div className="absolute inset-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-all
                          duration-700
                          ease-out
                          group-hover:scale-[1.08]
                          group-hover:blur-[3px]
                        "
                      />

                      {/* Dark overlay */}
                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black
                          via-black/20
                          to-transparent
                          opacity-30
                          transition-all
                          duration-500
                          group-hover:opacity-90
                        "
                      />

                      {/* Extra hover tint */}
                      <div
                        className="
                          absolute
                          inset-0
                          bg-black/20
                          opacity-0
                          transition-opacity
                          duration-500
                          group-hover:opacity-100
                        "
                      />
                    </div>

                    {/* =================================================
                        HOVER CONTENT
                    ================================================== */}

                    <div
                      className="
                        absolute
                        inset-x-0
                        bottom-0
                        z-10
                        p-6
                        sm:p-7
                      "
                    >
                      {/* Project title */}

                      <h3
                        className="
                          max-w-[95%]
                          translate-y-8
                          text-xl
                          font-medium
                          leading-tight
                          text-white
                          opacity-0
                          transition-all
                          duration-500
                          ease-out
                          group-hover:translate-y-0
                          group-hover:opacity-100
                          sm:text-2xl
                        "
                      >
                        {project.title}
                      </h3>

                      {/* Description */}

                      <p
                        className="
                          mt-3
                          max-w-[95%]
                          translate-y-8
                          text-sm
                          leading-6
                          text-white/80
                          opacity-0
                          transition-all
                          delay-75
                          duration-500
                          ease-out
                          group-hover:translate-y-0
                          group-hover:opacity-100
                        "
                      >
                        {project.description}
                      </p>

                      {/* Arrow */}

                      <div
                        className="
                          mt-5
                          grid
                          h-11
                          w-11
                          translate-y-8
                          place-items-center
                          rounded-full
                          bg-white
                          text-black
                          opacity-0
                          transition-all
                          delay-100
                          duration-500
                          ease-out
                          group-hover:translate-y-0
                          group-hover:opacity-100
                          hover:bg-brand-accent
                          hover:text-white
                        "
                      >
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </div>

                    {/* =================================================
                        DEFAULT PROJECT LABEL
                        Visible before hover
                    ================================================== */}

                    <div
                      className="
                        absolute
                        bottom-6
                        left-6
                        z-[5]
                        transition-all
                        duration-500
                        group-hover:translate-y-6
                        group-hover:opacity-0
                      "
                    >
                      <p className="text-lg font-medium text-white sm:text-xl">
                        {project.title}
                      </p>
                    </div>
                  </article>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* =====================================================
              NAVIGATION
          ====================================================== */}

          <div className="mt-8 flex justify-end gap-3">
            {/* Previous */}
            <button
              type="button"
              className="
                our-work-prev
                grid
                h-11
                w-11
                place-items-center
                rounded-full
                border
                border-white/20
                bg-white/5
                text-white
                transition-all
                duration-300
                hover:border-brand-accent
                hover:bg-brand-accent
                hover:text-white
              "
              aria-label="Previous project"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Next */}
            <button
              type="button"
              className="
                our-work-next
                grid
                h-11
                w-11
                place-items-center
                rounded-full
                border
                border-white/20
                bg-white/5
                text-white
                transition-all
                duration-300
                hover:border-brand-accent
                hover:bg-brand-accent
                hover:text-white
              "
              aria-label="Next project"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
