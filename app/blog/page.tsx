"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "../components/Reveal";

const categories = [
  "All",
  "Web Development & Design",
  "Software & Business Solutions",
  "IT Services",
  "Digital Marketing",
  "E-commerce",
];

const posts = [
  {
    title: "Why Scalable Architecture Matters for Growing Businesses",
    category: "Software & Business Solutions",
    date: "Aug 5, 2026",
    author: "Warrgyizmorsch",
    description:
      "Discover why scalable software architecture is important for businesses that want to grow without constantly rebuilding their technology.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
    slug: "scalable-architecture-growing-businesses",
  },

  {
    title: "SEO Fundamentals Every Business Website Needs",
    category: "Digital Marketing",
    date: "Jul 28, 2026",
    author: "Warrgyizmorsch",
    description:
      "Learn the essential SEO principles every business website should follow to improve visibility, organic traffic and online growth.",
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1000&q=80",
    slug: "seo-fundamentals-business-websites",
  },

  {
    title: "Choosing Between Native and Hybrid App Development",
    category: "IT Services",
    date: "Jul 20, 2026",
    author: "Warrgyizmorsch",
    description:
      "Understand the differences between native and hybrid application development and choose the right approach for your business.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80",
    slug: "native-vs-hybrid-app-development",
  },

  {
    title: "How Artificial Intelligence Is Transforming Modern Businesses",
    category: "IT Services",
    date: "Jul 14, 2026",
    author: "Warrgyizmorsch",
    description:
      "Explore how artificial intelligence can automate workflows, improve decision-making and create better customer experiences.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80",
    slug: "artificial-intelligence-modern-business",
  },

  {
    title: "Complete Guide to Modern Web Development",
    category: "Web Development & Design",
    date: "Jul 8, 2026",
    author: "Warrgyizmorsch",
    description:
      "A practical overview of modern web development technologies and the key factors businesses should consider when building a website.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
    slug: "modern-web-development-guide",
  },

  {
    title: "How E-commerce Technology Helps Businesses Grow",
    category: "E-commerce",
    date: "Jun 30, 2026",
    author: "Warrgyizmorsch",
    description:
      "Learn how the right e-commerce technology can improve customer experience, streamline operations and increase online sales.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80",
    slug: "ecommerce-technology-business-growth",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" ||
        post.category === activeCategory;

      const searchTerm = search.toLowerCase().trim();

      const matchesSearch =
        searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm) ||
        post.description.toLowerCase().includes(searchTerm) ||
        post.category.toLowerCase().includes(searchTerm);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <main className="min-h-screen ">
      {/* =========================================================
    BLOG HERO
========================================================== */}

      <section className="relative overflow-hidden bg-amber-50 px-6 pb-10 pt-20 md:pt-28">

        {/* Decorative background glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#066BBD]/5 blur-3xl" />

        {/* Same alignment system as Case Studies */}
        <div className="relative mx-auto max-w-7xl">

          <div className="max-w-5xl text-left">

            {/* Badge */}
            <Reveal>

              <div className="mb-12 inline-flex items-center gap-2 rounded-full border border-black/5 bg-black/10 px-4 py-2 backdrop-blur">

                <span className="h-2 w-2 rounded-full bg-brand-accent" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/75">
                  Latest Blog
                </span>

              </div>

            </Reveal>


            {/* Heading */}
            <Reveal className="delay-1">

              <h1 className="max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight text-black sm:text-5xl md:text-6xl lg:text-7xl">
                Get Every Single Update{" "}
                <span className="bg-gradient-to-r from-brand-accent to-cyan-400 bg-clip-text text-transparent">
                  Blog
                </span>
              </h1>

            </Reveal>


            {/* Description */}
            <Reveal className="delay-2">

              <p className="mt-6 max-w-3xl text-base leading-7 text-slate-500 md:text-lg">

                Explore insights, ideas, technology trends and practical
                solutions to help your business grow in the digital world.

              </p>

            </Reveal>


            {/* Search */}
            <Reveal className="delay-3">

              <div className="mt-8 max-w-md">

                <div className="relative">

                  <svg
                    className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#066BBD]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                    />

                  </svg>


                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search blogs by title..."
                    className="
                h-14
                w-full
                rounded-full
                border
                border-[#066BBD]
                bg-white
                pl-14
                pr-6
                text-sm
                text-[#102A43]
                shadow-sm
                outline-none
                transition-all
                duration-300
                placeholder:text-slate-400
                focus:ring-4
                focus:ring-[#066BBD]/10
              "
                  />

                </div>

              </div>

            </Reveal>

          </div>

        </div>

      </section>

      {/* =========================================================
          CATEGORY FILTER
      ========================================================== */}

      <section className="px-6 py-10 pb-6">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-wrap items-center justify-center gap-3">

            <span className="mr-2 text-sm font-bold text-[#102A43]">
              Filter By Categories:
            </span>

            {categories.map((category) => {

              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    rounded-full
                    border
                    px-5
                    py-2
                    text-sm
                    font-medium
                    transition-all
                    duration-300
                    ${isActive
                      ? "border-[#066BBD] bg-[#066BBD] text-white shadow-md shadow-[#066BBD]/20"
                      : "border-[#066BBD] bg-white text-[#102A43] hover:-translate-y-0.5 hover:bg-[#066BBD]/5"
                    }
                  `}
                >
                  {category}
                </button>
              );

            })}

          </div>

        </div>

      </section>


      {/* =========================================================
          BLOG CARDS
      ========================================================== */}

      <section className="px-6 pb-24 pt-10">

        <div className="mx-auto max-w-7xl">

          {filteredPosts.length > 0 ? (

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              {filteredPosts.map((post, index) => (

                <Reveal
                  key={post.title}
                  className={`delay-${(index % 3) + 1}`}
                >

                  <article
                    className="
                      group
                      h-full
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-100
                      bg-white
                      shadow-sm
                      transition-all
                      duration-500
                      hover:-translate-y-2
                      hover:border-[#066BBD]/20
                      hover:shadow-xl
                      hover:shadow-[#066BBD]/10
                    "
                  >

                    {/* Image */}

                    <div className="relative h-56 overflow-hidden bg-slate-100">

                      <img
                        src={post.image}
                        alt={post.title}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-105
                        "
                      />

                      {/* Image overlay */}

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-[#102A43]/50
                          via-transparent
                          to-transparent
                          opacity-0
                          transition-opacity
                          duration-500
                          group-hover:opacity-100
                        "
                      />

                      {/* Category badge */}

                      <div className="absolute left-4 top-4">

                        <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#066BBD] shadow-sm backdrop-blur-sm">
                          {post.category}
                        </span>

                      </div>

                    </div>


                    {/* Content */}

                    <div className="p-6">

                      {/* Date + Author */}

                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">

                        <div className="flex items-center gap-1.5">

                          <svg
                            className="h-4 w-4 text-[#066BBD]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                            />
                          </svg>

                          <span>{post.date}</span>

                        </div>

                        <span>
                          By:{" "}
                          <span className="font-semibold text-[#102A43]">
                            {post.author}
                          </span>
                        </span>

                      </div>


                      {/* Title */}

                      <h2
                        className="
                          mt-5
                          line-clamp-2
                          text-xl
                          font-bold
                          leading-7
                          text-[#102A43]
                          transition-colors
                          duration-300
                          group-hover:text-[#066BBD]
                        "
                      >
                        {post.title}
                      </h2>


                      {/* Description */}

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                        {post.description}
                      </p>


                      {/* Read More */}

                      <Link
                        href={`/blog/${post.slug}`}
                        className="
                          mt-6
                          inline-flex
                          items-center
                          gap-2
                          text-sm
                          font-bold
                          text-[#102A43]
                          transition-all
                          duration-300
                          group-hover:gap-3
                          group-hover:text-[#066BBD]
                        "
                      >

                        Read More

                        <svg
                          className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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

                      </Link>

                    </div>

                  </article>

                </Reveal>

              ))}

            </div>

          ) : (

            /* =====================================================
               NO SEARCH RESULTS
            ====================================================== */

            <div className="rounded-2xl border border-dashed border-[#066BBD]/30 bg-[#066BBD]/5 px-6 py-20 text-center">

              <h2 className="text-2xl font-bold text-[#102A43]">
                No blogs found
              </h2>

              <p className="mt-3 text-sm text-slate-500">
                Try another search term or choose a different category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-6 rounded-full bg-[#066BBD] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#055A9F]"
              >
                View All Blogs
              </button>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}