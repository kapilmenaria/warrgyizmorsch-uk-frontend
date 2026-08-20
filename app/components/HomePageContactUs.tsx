"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, ArrowUpRight, MessageSquare, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";

export default function HomePageContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="w-full bg-[#EBF5FB] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-stretch">
          
          {/* =========================================================
              LEFT CARD — PROJECT STARTER & CONTACT INFO
          ========================================================== */}
          <Reveal className="lg:col-span-4 flex flex-col">
            <div className="h-full flex flex-col justify-between rounded-3xl bg-white p-7 sm:p-9 md:p-10 shadow-xs border border-slate-100">
            <div>
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-brand-accent uppercase">
                <span>PROJECT STARTER</span>
                <span className="h-px w-6 bg-brand-accent/40" />
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
              </div>

              {/* Title */}
              <h3 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1F3A]">
                Plan Your Next Build
              </h3>

              {/* Subtext */}
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#4A5B73]">
                Tell us what you want to build, improve, automate, or modernise. We&apos;ll review your goals and suggest the best next step.
              </p>

              {/* Contact Links */}
              <div className="my-8 space-y-4">
                {/* Phone */}
                <a
                  href="tel:02035763372"
                  className="flex items-center gap-3.5 group cursor-pointer"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-accent text-white shadow-xs transition-transform group-hover:scale-105">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold text-[#0B1F3A] group-hover:text-brand-accent transition-colors">
                    020 3576 3372
                  </span>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@warrgyizmorsch.co.uk"
                  className="flex items-center gap-3.5 group cursor-pointer"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-accent text-white shadow-xs transition-transform group-hover:scale-105">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold text-[#0B1F3A] group-hover:text-brand-accent transition-colors">
                    info@warrgyizmorsch.co.uk
                  </span>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-accent text-white shadow-xs">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold text-[#0B1F3A]">
                    London, United Kingdom
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Process Stepper */}
            <div className="pt-6 border-t border-slate-100 space-y-3.5">
              {[
                { step: "01", label: "Scope and requirements clarity" },
                { step: "02", label: "Architecture and technical planning" },
                { step: "03", label: "Clear milestones and handover" },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-accent/60 text-[11px] font-mono font-bold text-brand-accent bg-white">
                    {item.step}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-[#4A5B73]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* =========================================================
            RIGHT CARD — DISCUSS YOUR PROJECT FORM
        ========================================================== */}
        <Reveal className="lg:col-span-8 flex flex-col delay-1">
          <div className="h-full rounded-3xl bg-white p-7 sm:p-10 md:p-12 shadow-xs border border-slate-100 flex flex-col justify-between">
            <div>
              {/* Header Eyebrow */}
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-brand-accent uppercase">
                <MessageSquare className="h-4 w-4" />
                <span>DISCUSS YOUR PROJECT</span>
              </div>

              {/* Main Heading */}
              <h3 className="mt-3 text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#0B1F3A] leading-snug">
                Tell us what you want to build, improve, automate, or modernise. We&apos;ll review your goals and suggest the best next step.
              </h3>

              {submitted ? (
                <div className="my-12 rounded-2xl bg-[#EBF5FB] p-8 text-center border border-brand-accent/20">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-brand-accent" />
                  <h4 className="mt-4 text-xl font-bold text-[#0B1F3A]">Thank you for your enquiry!</h4>
                  <p className="mt-2 text-sm text-[#4A5B73]">
                    Our team will review your project details and get back to you within 24 business hours.
                  </p>
                </div>
              ) : (
                /* Form Fields */
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {/* Row 1: Full name + Business email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="block text-xs sm:text-sm font-bold text-[#0B1F3A]">
                        Full name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-[#0B1F3A] placeholder:text-slate-400 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 focus:outline-hidden transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-[#0B1F3A]">
                        Business email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="your.email@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-[#0B1F3A] placeholder:text-slate-400 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 focus:outline-hidden transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone number */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-bold text-[#0B1F3A]">
                      Phone number (optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Include country code if relevant"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-[#0B1F3A] placeholder:text-slate-400 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 focus:outline-hidden transition-all"
                    />
                  </div>

                  {/* Row 3: What are you interested in? */}
                  <div className="space-y-2">
                    <label htmlFor="interest" className="block text-xs sm:text-sm font-bold text-[#0B1F3A]">
                      What are you interested in? <span className="font-normal text-slate-400">(optional)</span>
                    </label>
                    <select
                      id="interest"
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-[#0B1F3A] focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 focus:outline-hidden transition-all"
                    >
                      <option value="">Select an area of interest</option>
                      <option value="web">Web Development &amp; SaaS Platforms</option>
                      <option value="app">Mobile Application Development</option>
                      <option value="ai">Artificial Intelligence &amp; Workflows</option>
                      <option value="software">Custom Enterprise Software &amp; Cloud</option>
                      <option value="ecommerce">Ecommerce &amp; Conversion UX</option>
                      <option value="marketing">Digital Marketing &amp; SEO Growth</option>
                      <option value="audit">Free IT Architecture &amp; Security Audit</option>
                    </select>
                  </div>

                  {/* Row 4: How can we help? */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-xs sm:text-sm font-bold text-[#0B1F3A]">
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="Tell us what you want to build, improve, automate, or modernise. Include timelines, systems involved, or goals if relevant."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-[#0B1F3A] placeholder:text-slate-400 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 focus:outline-hidden transition-all resize-y"
                    />
                  </div>

                  {/* Row 5: Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-accent hover:bg-[#055A9F] text-white font-bold text-sm sm:text-base uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                      SEND PROJECT ENQUIRY
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  </section>
);
}
