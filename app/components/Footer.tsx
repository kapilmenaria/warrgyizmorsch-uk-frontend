"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-accent text-white">
      {/* MAIN FOOTER */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1.5fr] lg:gap-12">

          {/* ================= COMPANY ================= */}
          <div>
            {/* LOGO */}
            <Link href="/" className="inline-block">
              <img
                src="/images/WARR LOGO WHITE.webp"
                alt="Warrgyizmorsch Logo"
                className="
                h-10 w-auto
                brightness-0 invert
                transition-transform duration-300
                hover:scale-105
                sm:h-12
                md:h-14
                lg:h-16
            "
              />
            </Link>


            {/* DESCRIPTION */}
            <p className="mt-5 max-w-xs text-lg leading-[1.5] text-white">
              Welcome to Warrgyizmorsch, your number one source for all the
              outsourcing services. We&apos;re dedicated to providing you the very
              best of technical and non technical services, with an emphasis
              on meeting the deadline, satisfactory service and 24*7 services.
            </p>

            {/* SOCIAL ICONS */}
            <div className="mt-6 flex items-center gap-5">

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6.5 8.5H3V21h3.5V8.5ZM4.75 3A2.05 2.05 0 1 0 4.75 7.1 2.05 2.05 0 0 0 4.75 3ZM21 13.9c0-3.77-2.01-5.52-4.7-5.52-2.17 0-3.14 1.19-3.68 2.03V8.5H9.13V21h3.49v-6.19c0-1.63.31-3.2 2.32-3.2 1.98 0 2 1.86 2 3.3V21H21v-7.1Z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.87.24-1.46 1.5-1.46H16.7V3.96c-.3-.04-1.32-.13-2.52-.13-2.5 0-4.2 1.52-4.2 4.3V10H7.2v3h2.78v8h3.52Z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <svg
                  width="29"
                  height="29"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919257874994"
                aria-label="WhatsApp"
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <svg
                  width="29"
                  height="29"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.86-1.27A9.5 9.5 0 1 0 12 2.5Zm0 17.2a7.67 7.67 0 0 1-3.9-1.07l-.28-.17-2.88.75.77-2.81-.18-.29A7.67 7.67 0 1 1 12 19.7Zm4.2-5.75c-.23-.12-1.35-.67-1.56-.74-.21-.08-.36-.12-.51.12-.15.23-.59.74-.72.89-.13.16-.27.17-.5.06-.23-.12-.97-.36-1.84-1.14-.68-.61-1.14-1.36-1.27-1.59-.13-.23-.01-.35.1-.47.11-.11.23-.27.35-.4.12-.14.16-.23.23-.39.08-.15.04-.29-.02-.41-.06-.12-.51-1.23-.7-1.68-.18-.44-.37-.38-.51-.39h-.43c-.15 0-.39.06-.59.29-.2.23-.78.76-.78 1.86s.8 2.16.91 2.31c.11.15 1.56 2.39 3.79 3.35.53.23.95.36 1.27.46.53.17 1.01.15 1.39.09.42-.06 1.35-.55 1.54-1.08.19-.53.19-.98.13-1.08-.06-.1-.21-.15-.44-.27Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div>
            <h3 className="relative inline-block pb-2 text-xl font-bold text-white">
              Quick Links
              <span className="absolute bottom-0 left-0 h-[2px] w-24 bg-white" />
              <span className="absolute bottom-[-3px] right-[-6px] h-1.5 w-1.5 rounded-full bg-white" />
            </h3>

            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-2 transition-all hover:translate-x-1 hover:text-white/70"
                >
                  <span className="text-lg">»</span>
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about-us"
                  className="flex items-center gap-2 transition-all hover:translate-x-1 hover:text-white/70"
                >
                  <span className="text-lg">»</span>
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="flex items-center gap-2 transition-all hover:translate-x-1 hover:text-white/70"
                >
                  <span className="text-lg">»</span>
                  Services
                </Link>
              </li>

              <li>
                <Link
                  href="/career"
                  className="flex items-center gap-2 transition-all hover:translate-x-1 hover:text-white/70"
                >
                  <span className="text-lg">»</span>
                  Career
                </Link>
              </li>

              <li>
                <Link
                  href="/case-studies"
                  className="flex items-center gap-2 transition-all hover:translate-x-1 hover:text-white/70"
                >
                  <span className="text-lg">»</span>
                  Case Study
                </Link>
              </li>

              <li>
                <Link
                  href="/contact-us"
                  className="flex items-center gap-2 transition-all hover:translate-x-1 hover:text-white/70"
                >
                  <span className="text-lg">»</span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= SHORT LINKS ================= */}
          <div>
            <h3 className="relative inline-block pb-2 text-xl font-bold text-white">
              Short Links
              <span className="absolute bottom-0 left-0 h-[2px] w-24 bg-white" />
              <span className="absolute bottom-[-3px] right-[-6px] h-1.5 w-1.5 rounded-full bg-white" />
            </h3>

            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="flex items-center gap-2 transition-all hover:translate-x-1 hover:text-white/70"
                >
                  <span className="text-lg">»</span>
                  Blogs
                </Link>
              </li>

              <li>
                <Link
                  href="/digital-marketing-pricing"
                  className="flex items-center gap-2 transition-all hover:translate-x-1 hover:text-white/70"
                >
                  <span className="text-lg">»</span>
                  Digital Marketing Pricing
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="flex items-center gap-2 transition-all hover:translate-x-1 hover:text-white/70"
                >
                  <span className="text-lg">»</span>
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms-conditions"
                  className="flex items-center gap-2 transition-all hover:translate-x-1 hover:text-white/70"
                >
                  <span className="text-lg">»</span>
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/cancellation-policy"
                  className="flex items-center gap-2 transition-all hover:translate-x-1 hover:text-white/70"
                >
                  <span className="text-lg">»</span>
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= GET IN TOUCH ================= */}
          <div>
            <h3 className="relative inline-block pb-2 text-xl font-bold text-white">
              Get in touch!
              <span className="absolute bottom-0 left-0 h-[2px] w-24 bg-white" />
              <span className="absolute bottom-[-3px] right-[-6px] h-1.5 w-1.5 rounded-full bg-white" />
            </h3>

            {/* OFFICE LOCATION */}
            <div className="mt-5">
              <p className="mb-3 text-xs text-white">Office Location</p>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-[#0875C9]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
                    </svg>
                  </div>

                  <p className="text-base font-semibold leading-6 text-white">
                    Warrgyizmorsch private limited, 410,
                    <br />
                    4th floor, Ashoka palace, Shobhagpura,
                    <br />
                    Udaipur, Rajasthan
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-[#0875C9]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
                    </svg>
                  </div>

                  <p className="text-base font-semibold leading-6 text-white">
                    312, Pentax House, South Hill Avenue,
                    <br />
                    South Harrow, Middlesex, HA2 0DU,
                    <br />
                    United Kingdom
                  </p>
                </div>
              </div>
            </div>

            {/* PHONE */}
            <div className="mt-6">
              <p className="mb-2 text-xs text-white">Phone Number</p>

              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-[#0875C9]">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6.6 2.5 9.1 2c.7-.1 1.4.3 1.6 1l1.1 3.1c.2.6 0 1.3-.5 1.7L9.8 9.1a14.2 14.2 0 0 0 5.1 5.1l1.3-1.5c.4-.5 1.1-.7 1.7-.5l3.1 1.1c.7.2 1.1.9 1 1.6l-.5 2.5c-.1.7-.7 1.2-1.4 1.2C10.7 18.6 5.4 13.3 5.4 6.2c0-.7.5-1.3 1.2-1.4Z" />
                  </svg>
                </div>

                <div className="text-base font-semibold leading-5">
                  <a
                    href="tel:+919257874994"
                    className="block hover:text-white/70"
                  >
                    +91 9257874994
                  </a>
                  <a
                    href="tel:+447789161193"
                    className="block hover:text-white/70"
                  >
                    +44 7789161193
                  </a>
                </div>
              </div>
            </div>

            {/* EMAIL */}
            <div className="mt-5">
              <p className="mb-2 text-xs text-white">Email address</p>

              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-[#0875C9]">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </div>

                <a
                  href="mailto:info@warrgyizmorsch.com"
                  className="text-base font-semibold hover:text-white/70"
                >
                  info@warrgyizmorsch.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM LINE ================= */}
        <div className="mt-12 border-t border-white/60 pt-3">
          <p className="text-sm text-white">
            Copyright © 2026 Warrgyizmorsch. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* ================= FLOATING WHATSAPP ================= */}
      <a
        href="https://wa.me/919257874994"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.86-1.27A9.5 9.5 0 1 0 12 2.5Zm0 17.2a7.67 7.67 0 0 1-3.9-1.07l-.28-.17-2.88.75.77-2.81-.18-.29A7.67 7.67 0 1 1 12 19.7Zm4.2-5.75c-.23-.12-1.35-.67-1.56-.74-.21-.08-.36-.12-.51.12-.15.23-.59.74-.72.89-.13.16-.27.17-.5.06-.23-.12-.97-.36-1.84-1.14-.68-.61-1.14-1.36-1.27-1.59-.13-.23-.01-.35.1-.47.11-.11.23-.27.35-.4.12-.14.16-.23.23-.39.08-.15.04-.29-.02-.41-.06-.12-.51-1.23-.7-1.68-.18-.44-.37-.38-.51-.39h-.43c-.15 0-.39.06-.59.29-.2.23-.78.76-.78 1.86s.8 2.16.91 2.31c.11.15 1.56 2.39 3.79 3.35.53.23.95.36 1.27.46.53.17 1.01.15 1.39.09.42-.06 1.35-.55 1.54-1.08.19-.53.19-.98.13-1.08-.06-.1-.21-.15-.44-.27Z" />
        </svg>
      </a>

      {/* ================= BACK TO TOP ================= */}
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#0875C9] bg-white text-[#0875C9] shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#0875C9] hover:text-white"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="6 11 12 5 18 11" />
        </svg>
      </button>
    </footer>
  );
}