"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "./Reveal";

type Testimonial = {
  name: string;
  photo: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Comfort Transfers",
    photo: "/images/testimonials/comfort_transfer_thum.webp",
    quote:
      "Warrgyizmorsch built exactly the website I needed — professional, user-friendly, and delivered on time. They were responsive, understood my requirements clearly, and made the whole process smooth and hassle-free.",
  },
  {
    name: "Aloe Naturals",
    photo: "/images/testimonials/aloe-natural-thumb.webp",
    quote:
      "Working with Warrgyizmorsch on the Aloe Naturals website was a great experience from start to finish. The team was responsive, reliable, and delivered everything on time. I'm very happy with the final result.",
  },
  {
    name: "Yellow Sapphire Visa & Education Consultants",
    photo: "/images/testimonials/yellow-sepphire-thumb.webp",
    quote:
      "Working with the team at Warrgyizmorsch has been a great experience for us. They are prompt, professional, and always deliver quality work on time. We've seen excellent results from their digital marketing services.",
  },
];

const PHOTO_WIDTH = 320;
const EXPANDED_TEXT_WIDTH = 380;
const CARD_HEIGHT = 420;

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: direction * 340, behavior: "smooth" });
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div>
          <Reveal className="relative mx-auto mb-8 sm:mb-12 text-center">
            <div>
              <h2 className="text-3xl font-bold text-black md:text-5xl">
                What Our{" "}
                <span className="ml-2 bg-gradient-to-r from-brand-accent to-cyan-400 bg-clip-text text-transparent">
                  Customers Say
                </span>
              </h2>
              <p className="text-sm text-black/65 py-2 px-2">
                Our clients trust us for quality, innovation, and satisfaction. Hear their stories below.
              </p>
            </div>

            <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 gap-3 sm:flex">
              <button
                onClick={() => scroll(-1)}
                className="w-10 h-10 rounded-full bg-white/80 hover:bg-brand-accent text-brand-navy hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll(1)}
                className="w-10 h-10 rounded-full bg-white/80 hover:bg-brand-accent text-brand-navy hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </Reveal>

          <Reveal>
            {/* Desktop View (Horizontal expanding card) */}
            <div
              ref={scrollRef}
              className="hidden md:flex w-full items-center justify-center gap-5 overflow-x-auto scroll-smooth pb-4 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {testimonials.map((t, i) => {
                const isActive = i === activeIndex;
                return (
                  <motion.div
                    key={t.name}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                    animate={{ width: isActive ? PHOTO_WIDTH + EXPANDED_TEXT_WIDTH : PHOTO_WIDTH }}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    className="shrink-0 rounded-2xl overflow-hidden bg-white border border-slate-200 cursor-pointer flex shadow-lg"
                    style={{ height: CARD_HEIGHT }}
                  >
                    {/* Photo — stays fixed width, always visible */}
                    <div className="relative shrink-0" style={{ width: PHOTO_WIDTH, height: CARD_HEIGHT }}>
                      <Image src={t.photo} alt={t.name} fill sizes="320px" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent" />
                      {!isActive && (
                        <p className="absolute bottom-4 left-4 right-4 text-white font-semibold text-sm">
                          {t.name}
                        </p>
                      )}
                    </div>

                    {/* Quote panel — only appears when this card is active */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 16 }}
                          transition={{ duration: 0.3, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                          className="flex flex-col justify-center p-7 text-left bg-white"
                          style={{ width: EXPANDED_TEXT_WIDTH }}
                        >
                          <Quote className="text-brand-accent mb-4" size={30} strokeWidth={1.5} />
                          <p className="text-black text-[15px] leading-relaxed mb-5">
                            {t.quote}
                          </p>
                          <p className="text-brand-navy font-semibold">{t.name}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile View (Vertical card with Tap to Open review underneath) */}
            <div className="flex md:hidden flex-col gap-4 w-full">
              {testimonials.map((t, i) => {
                const isActive = i === activeIndex;
                return (
                  <div
                    key={t.name}
                    onClick={() => setActiveIndex(isActive ? null : i)}
                    className="w-full rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-md transition-all duration-300 cursor-pointer"
                  >
                    {/* Photo Card on Top */}
                    <div className="relative w-full h-[360px] sm:h-[400px]">
                      <Image
                        src={t.photo}
                        alt={t.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent" />
                      
                      {/* Name bottom left */}
                      <p className="absolute bottom-4 left-4 text-white font-bold text-base max-w-[65%] leading-snug drop-shadow-sm">
                        {t.name}
                      </p>

                      {/* Tap to open pill badge bottom right */}
                      <div className="absolute bottom-4 right-4">
                        <span className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-brand-accent text-white text-xs font-semibold shadow-lg active:scale-95 transition-transform">
                          {isActive ? "Close ▴" : "Read review ▾"}
                        </span>
                      </div>
                    </div>

                    {/* Review Section (Opens below photo on tap) */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="p-5 text-left bg-white border-t border-slate-100"
                        >
                          <Quote className="text-brand-accent mb-2.5" size={24} strokeWidth={1.5} />
                          <p className="text-[#1E293B] text-sm leading-relaxed mb-4">
                            {t.quote}
                          </p>
                          <p className="text-brand-navy font-bold text-xs uppercase tracking-wider">
                            {t.name}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
