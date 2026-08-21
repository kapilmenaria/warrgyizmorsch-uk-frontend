"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Code2,
  Smartphone,
  BrainCircuit,
  Database,
  Megaphone,
  ShoppingCart,
  BriefcaseBusiness,
  BookOpen,
  Layers3,
  ChevronDown,
  ArrowRight,
  Globe,
  Server,
  Palette,
  Gauge,
  Search,
  Bot,
  Workflow,
  BarChart3,
  Target,
  Users,
  FileText,
  PenTool,
  Building2,
  Sparkles,
  ShoppingBag,
  CreditCard,
  LayoutDashboard,
  MonitorSmartphone,
  Settings2,
  type LucideIcon,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type SubItem = {
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
};

type MenuItem = {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  items: SubItem[];
};

/* =========================================================
   SERVICES
========================================================= */

const servicesMenu: MenuItem[] = [
  {
    id: "web",
    label: "Web Development",
    description: "Modern websites & web platforms",
    href: "/services",
    icon: Code2,
    items: [
      {
        title: "PHP Development",
        description: "Scalable PHP web applications",
        href: "/services",
        icon: Server,
      },
      {
        title: "React.js Development",
        description: "Modern interactive interfaces",
        href: "/services",
        icon: Code2,
      },
      {
        title: "Next.js Development",
        description: "Fast and SEO-friendly applications",
        href: "/services",
        icon: Gauge,
      },
      {
        title: "HTML & CSS",
        description: "Responsive frontend experiences",
        href: "/services",
        icon: Palette,
      },
      {
        title: "JavaScript Development",
        description: "Dynamic web functionality",
        href: "/services",
        icon: Code2,
      },
      {
        title: "Full Stack Development",
        description: "Complete end-to-end solutions",
        href: "/services",
        icon: Layers3,
      },
    ],
  },

  {
    id: "app",
    label: "App Development",
    description: "iOS, Android & cross-platform apps",
    href: "/services",
    icon: Smartphone,
    items: [
      {
        title: "Flutter Development",
        description: "Cross-platform mobile apps",
        href: "/services",
        icon: Smartphone,
      },
      {
        title: "React Native",
        description: "Native apps with React",
        href: "/services",
        icon: MonitorSmartphone,
      },
      {
        title: "Android Development",
        description: "Powerful Android applications",
        href: "/services",
        icon: Smartphone,
      },
      {
        title: "iOS Development",
        description: "Premium Apple applications",
        href: "/services",
        icon: Smartphone,
      },
      {
        title: "Hybrid App Development",
        description: "Flexible cross-platform solutions",
        href: "/services",
        icon: Layers3,
      },
    ],
  },

  {
    id: "ai",
    label: "Artificial Intelligence",
    description: "AI solutions & intelligent automation",
    href: "/services",
    icon: BrainCircuit,
    items: [
      {
        title: "AI Development",
        description: "Custom AI-powered solutions",
        href: "/services",
        icon: BrainCircuit,
      },
      {
        title: "Machine Learning",
        description: "Data-driven intelligent systems",
        href: "/services",
        icon: BarChart3,
      },
      {
        title: "AI Chatbots",
        description: "Smart conversational assistants",
        href: "/services",
        icon: Bot,
      },
      {
        title: "AI Automation",
        description: "Automate repetitive workflows",
        href: "/services",
        icon: Workflow,
      },
      {
        title: "AI Consulting",
        description: "Strategy for AI adoption",
        href: "/services",
        icon: Sparkles,
      },
      {
        title: "Custom AI Solutions",
        description: "AI tailored to your business",
        href: "/services",
        icon: Settings2,
      },
    ],
  },

  {
    id: "software",
    label: "Software Development",
    description: "Custom business software solutions",
    href: "/services",
    icon: Database,
    items: [
      {
        title: "Custom Software",
        description: "Software built around your needs",
        href: "/services",
        icon: Code2,
      },
      {
        title: "ERP Development",
        description: "Business management systems",
        href: "/services",
        icon: LayoutDashboard,
      },
      {
        title: "CRM Development",
        description: "Customer relationship platforms",
        href: "/services",
        icon: Users,
      },
      {
        title: "Enterprise Solutions",
        description: "Large-scale business systems",
        href: "/services",
        icon: Building2,
      },
      {
        title: "API Development",
        description: "Secure and scalable APIs",
        href: "/services",
        icon: Server,
      },
    ],
  },

  {
    id: "marketing",
    label: "Digital Marketing",
    description: "SEO, advertising & growth",
    href: "/services",
    icon: Megaphone,
    items: [
      {
        title: "SEO",
        description: "Improve organic visibility",
        href: "/services",
        icon: Search,
      },
      {
        title: "Google Ads",
        description: "Performance-driven campaigns",
        href: "/services",
        icon: Target,
      },
      {
        title: "Meta Ads",
        description: "Reach the right audience",
        href: "/services",
        icon: Megaphone,
      },
      {
        title: "Social Media Marketing",
        description: "Build your digital presence",
        href: "/services",
        icon: Users,
      },
      {
        title: "Content Marketing",
        description: "Content that drives growth",
        href: "/services",
        icon: FileText,
      },
      {
        title: "Performance Marketing",
        description: "Measurable marketing results",
        href: "/services",
        icon: BarChart3,
      },
    ],
  },

  {
    id: "ecommerce",
    label: "Ecommerce Development",
    description: "Online stores & commerce platforms",
    href: "/services",
    icon: ShoppingCart,
    items: [
      {
        title: "Shopify Development",
        description: "Modern Shopify stores",
        href: "/services",
        icon: ShoppingBag,
      },
      {
        title: "WooCommerce",
        description: "Flexible WordPress stores",
        href: "/services",
        icon: ShoppingCart,
      },
      {
        title: "Magento Development",
        description: "Enterprise ecommerce solutions",
        href: "/services",
        icon: ShoppingBag,
      },
      {
        title: "Payment Integration",
        description: "Secure payment solutions",
        href: "/services",
        icon: CreditCard,
      },
      {
        title: "Custom Ecommerce",
        description: "Commerce built for your business",
        href: "/services",
        icon: Globe,
      },
    ],
  },
];

/* =========================================================
   CASE STUDIES
========================================================= */

const caseStudiesMenu: MenuItem[] = [
  {
    id: "portfolio",
    label: "Our Portfolio",
    description: "Explore our recent digital work",
    href: "/case-studies",
    icon: BriefcaseBusiness,
    items: [
      {
        title: "Web Projects",
        description: "Modern websites and platforms",
        href: "/case-studies",
        icon: Globe,
      },
      {
        title: "Mobile Applications",
        description: "Apps built for real users",
        href: "/case-studies",
        icon: Smartphone,
      },
      {
        title: "Software Solutions",
        description: "Custom business systems",
        href: "/case-studies",
        icon: Database,
      },
      {
        title: "Ecommerce Projects",
        description: "Online stores that convert",
        href: "/case-studies",
        icon: ShoppingCart,
      },
    ],
  },
  {
    id: "results",
    label: "Results & Impact",
    description: "See what our work achieves",
    href: "/case-studies",
    icon: BarChart3,
    items: [
      {
        title: "Performance",
        description: "Faster and better experiences",
        href: "/case-studies",
        icon: Gauge,
      },
      {
        title: "Business Growth",
        description: "Solutions designed for growth",
        href: "/case-studies",
        icon: BarChart3,
      },
      {
        title: "User Experience",
        description: "Interfaces people enjoy using",
        href: "/case-studies",
        icon: Users,
      },
    ],
  },
];

/* =========================================================
   BLOG
========================================================= */

const blogMenu: MenuItem[] = [
  {
    id: "latest",
    label: "Latest Blogs",
    description: "Insights, ideas & technology",
    href: "/blog",
    icon: BookOpen,
    items: [
      {
        title: "Web Development",
        description: "Latest web development insights",
        href: "/blog",
        icon: Code2,
      },
      {
        title: "Software & Business",
        description: "Technology for growing businesses",
        href: "/blog",
        icon: Database,
      },
      {
        title: "IT Services",
        description: "Technology trends and solutions",
        href: "/blog",
        icon: Globe,
      },
      {
        title: "Digital Marketing",
        description: "SEO, ads and online growth",
        href: "/blog",
        icon: Megaphone,
      },
      {
        title: "E-commerce",
        description: "Online store strategies",
        href: "/blog",
        icon: ShoppingCart,
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    description: "Guides and useful information",
    href: "/blog",
    icon: FileText,
    items: [
      {
        title: "Technology Guides",
        description: "Easy-to-understand technology guides",
        href: "/blog",
        icon: BookOpen,
      },
      {
        title: "Business Insights",
        description: "Ideas for digital growth",
        href: "/blog",
        icon: BarChart3,
      },
      {
        title: "Development Tips",
        description: "Practical development advice",
        href: "/blog",
        icon: Code2,
      },
    ],
  },
];

/* =========================================================
   ABOUT US
========================================================= */

const aboutMenu: MenuItem[] = [
  {
    id: "company",
    label: "About Warrgyizmorsch",
    description: "Who we are and what we believe",
    href: "/about-us",
    icon: Building2,
    items: [
      {
        title: "Our Mission",
        description: "What drives us forward",
        href: "/about-us",
        icon: Target,
      },
      {
        title: "Our Vision",
        description: "Where we want to go",
        href: "/about-us",
        icon: Sparkles,
      },
      {
        title: "Our Goal",
        description: "The impact we want to create",
        href: "/about-us",
        icon: Gauge,
      },
      {
        title: "Our Expertise",
        description: "Our technology capabilities",
        href: "/about-us",
        icon: Layers3,
      },
    ],
  },
  {
    id: "journey",
    label: "Our Journey",
    description: "The story behind our growth",
    href: "/our-journey",
    icon: TrendingUp,
    items: [
      {
        title: "Our Story",
        description: "How Warrgyizmorsch started",
        href: "/our-journey",
        icon: BookOpen,
      },
      {
        title: "Our Team",
        description: "Meet the people behind our work",
        href: "/our-journey",
        icon: Users,
      },
      {
        title: "Our Growth",
        description: "Milestones along the way",
        href: "/our-journey",
        icon: BarChart3,
      },
    ],
  },
];



/* =========================================================
   MEGA DROPDOWN
========================================================= */

function MegaDropdown({
  items,
  onClose,
}: {
  items: MenuItem[];
  onClose: () => void;
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  const activeItem =
    items.find((item) => item.id === activeId) ?? items[0];

  if (!activeItem) return null;

  return (
    <div
      className="
        absolute
        left-1/2
        top-full
        z-[999]
        w-[850px]
        max-w-[calc(100vw-32px)]
        -translate-x-1/2
        pt-4
        animate-dropdown
      "
      onMouseEnter={() => {}}
      onMouseLeave={onClose}
    >
      {/* Arrow */}
      <div
        className="
          absolute
          left-1/2
          top-[10px]
          h-3
          w-3
          -translate-x-1/2
          rotate-45
          border-l
          border-t
          border-black/[0.06]
          bg-white
        "
      />

      <div
        className="
          relative
          overflow-hidden
          rounded-[24px]
          border
          border-black/[0.07]
          bg-white
          shadow-[0_25px_80px_rgba(11,31,58,0.16)]
        "
      >
        {/* Dropdown Header */}
        <div className="border-b border-black/8  px-5 py-4 sm:px-7">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-black">
            {activeItem.label}
          </p>

          <p className="mt-1 text-xs text-[#0B1F3A]/75">
            Explore our services and solutions
          </p>
        </div>

        {/* Main */}
        <div className="grid min-h-[350px] grid-cols-[280px_1fr]">
          {/* Left column */}
          <div className="border-r border-black/[0.06] bg-white p-3">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeId;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onMouseEnter={() => setActiveId(item.id)}
                  className={`
                    group
                    relative
                    mb-1
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    px-4
                    py-3
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-amber-50 via-amber-25 to-amber-10 shadow-sm"
                        : "hover:bg-[#F7FAFD]"
                    }
                  `}
                >
                  {/* Active line */}
                  <span
                    className={`
                      absolute
                      left-0
                      top-2
                      h-[calc(100%-16px)]
                      w-[3px]
                      rounded-r-full
                      bg-[#066BBD]
                      transition-all
                      duration-200
                      ${
                        isActive ? "opacity-100" : "opacity-0"
                      }
                    `}
                  />

                  {/* Icon */}
                  <span
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? "bg-brand-accent/80 text-white"
                          : "bg-black/5 text-black/45"
                      }
                    `}
                  >
                    <Icon size={18} strokeWidth={1.9} />
                  </span>

                  {/* Text */}
                  <span className="min-w-0 flex-1">
                    <span
                      className={`
                        block
                        text-sm
                        font-bold
                        transition-colors
                        ${
                          isActive
                            ? "text-brand-accent"
                            : "text-[#0B1F3A]"
                        }
                      `}
                    >
                      {item.label}
                    </span>

                    <span className="mt-0.5 block truncate text-[11px] text-[#0B1F3A]/75">
                      {item.description}
                    </span>
                  </span>

                  {/* Arrow */}
                  <ArrowRight
                    size={15}
                    className={`
                      shrink-0
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? "translate-x-0 text-[#066BBD]"
                          : "-translate-x-1 text-[#066BBD]/35"
                      }
                    `}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right column */}
          <div
            key={activeItem.id}
            className="
              bg-gradient-to-br
              from-[#FCFEFF]
              via-white
              to-[#F5FAFF]
              p-5
              sm:p-6
              animate-panel
            "
          >
            {/* Heading */}
            <div className="mb-5">
              <div className="flex items-center gap-2">

              </div>

              <h3 className="mt-2 text-xl font-bold text-[#0B1F3A]">
                {activeItem.label}
              </h3>

              <p className="mt-1 max-w-md text-xs leading-5 text-[#0B1F3A]/75">
                {activeItem.description}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-2">
              {activeItem.items.map((subItem) => {
                const SubIcon = subItem.icon;

                return (
                  <Link
                    key={subItem.title}
                    href={subItem.href}
                    className="
                      group
                      rounded-2xl
                      border
                      border-black/[0.055]
                      bg-white
                      p-3
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:border-[#066BBD]/15
                      hover:bg-amber-50/45
                      hover:shadow-[0_8px_22px_rgba(6,107,189,0.08)]
                    "
                  >
                    <div className="flex items-start gap-2.5">
                      {SubIcon && (
                        <span
                          className="
                            mt-0.5
                            flex
                            h-7
                            w-7
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-black/5
                            text-black/45
                            transition-all
                            duration-200
                            group-hover:bg-brand-accent/80
                            group-hover:text-white
                          "
                        >
                          <SubIcon size={14} />
                        </span>
                      )}

                      <span className="min-w-0">
                        <span
                          className="
                            block
                            text-xs
                            font-semibold
                            text-[#0B1F3A]
                            transition-colors
                            group-hover:text-[#066BBD]
                          "
                        >
                          {subItem.title}
                        </span>

                        <span className="mt-1 block text-[10px] leading-4 text-[#0B1F3A]/75">
                          {subItem.description}
                        </span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <Link
              href={activeItem.href}
              className="
                mt-5
                flex
                items-center
                justify-between
                rounded-xl
                bg-gradient-to-r
                from-black/15
                to-black/5
                px-4
                py-3
                text-12px
                font-semibold
                text-brand-accent
                transition-all
                duration-200
                hover:from-[#E3F2FF]
                hover:to-[#EEF8FF]
              "
            >
              <span>Explore {activeItem.label}</span>

              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const dropdownMenus: Record<string, MenuItem[]> = {
    Solutions: servicesMenu,
    "Case Studies": caseStudiesMenu,
    Blog: blogMenu,
    "About Us": aboutMenu,
  };

  const navLinks = [
    {
      label: "Solutions",
      href: "/services",
    },
    {
      label: "Case Studies",
      href: "/case-studies",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About Us",
      href: "/about-us",
    },
    {
      label: "Career",
      href: "/career",
    },
  ];

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileSubmenu(null);
  };

  return (
    <header
      className="
        sticky
        top-0
        z-[1000]
        border-b
        border-black/[0.06]
        bg-white/65
        backdrop-blur-xl
      "
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* =====================================================
          DESKTOP / MOBILE HEADER BAR
      ====================================================== */}

      <div
        className="
          mx-auto
          flex
          min-h-[72px]
          max-w-7xl
          items-center
          justify-between
          px-4

          sm:px-6

          lg:h-[76px]
          lg:px-8
        "
      >
        {/* =================================================
            LOGO
        ================================================== */}

        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Warrgyizmorsch Home"
        >
          <img
            src="/images/companynamelogo.png"
            alt="Warrgyizmorsch"
            className="
              h-10
              w-auto
              max-w-[150px]
              object-contain
              object-left

              sm:h-11
              sm:max-w-[175px]

              lg:h-12
              lg:max-w-[190px]
            "
          />
        </Link>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================== */}

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const hasDropdown = Boolean(dropdownMenus[link.label]);
            const isOpen = openMenu === link.label;

            return (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  hasDropdown
                    ? setOpenMenu(link.label)
                    : setOpenMenu(null)
                }
              >
                <Link
                  href={link.href}
                  className={`
                    group
                    relative
                    flex
                    items-center
                    gap-1.5
                    rounded-xl
                    px-4
                    py-2.5
                    text-lg
                    font-semibold
                    transition-all
                    duration-200
                    ${
                      isOpen
                        ? "bg-gradient-to-r from-[#EAF4FF] via-[#F3F8FF] to-white text-[#066BBD] shadow-[0_5px_18px_rgba(6,107,189,0.08)]"
                        : "text-black hover:bg-[#F5F9FD] hover:text-[#066BBD]"
                    }
                  `}
                >
                  {/* Center expanding blue line */}
                  <span
                    className={`
                      absolute
                      bottom-[-1px]
                      left-1/2
                      h-[2px]
                      -translate-x-1/2
                      rounded-full
                      bg-brand-accent
                      transition-[width,opacity]
                      duration-300
                      ease-out
                      ${
                        isOpen
                          ? "w-[calc(100%-16px)] opacity-100"
                          : "w-0 opacity-0"
                      }
                    `}
                  />

                  {link.label}

                  {hasDropdown && (
                    <ChevronDown
                      size={14}
                      className={`
                        transition-transform
                        duration-200
                        ${
                          isOpen
                            ? "rotate-180"
                            : "rotate-0"
                        }
                      `}
                    />
                  )}
                </Link>

                {/* Desktop Mega Dropdown */}
                {hasDropdown && isOpen && (
                  <MegaDropdown
                    items={dropdownMenus[link.label]}
                    onClose={() => setOpenMenu(null)}
                  />
                )}
              </div>
            );
          })}
        </nav>

        {/* =================================================
            RIGHT SIDE
        ================================================== */}

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Phone */}
          <a
            href="tel:+447789161193"
            className="
              hidden
              text-sm
              font-semibold
              text-black
              transition-colors
              hover:text-brand-accent

              xl:block
            "
          >
            +44 7789 161193
          </a>

          {/* Desktop CTA */}
          <Link
            href="/contact-us"
            className="
              hidden
              rounded-2xl
              bg-brand-accent
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-[0_6px_18px_rgba(6,107,189,0.18)]
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-[#055A9F]
              hover:shadow-[0_10px_25px_rgba(6,107,189,0.25)]

              lg:inline-flex
              lg:items-center
              lg:justify-center
              xl:px-5
            "
          >
            Book a Strategy Call
          </Link>

          {/* Mobile / Tablet Menu Button */}
          <button
            type="button"
            aria-label={
              mobileOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((prev) => !prev);
              setMobileSubmenu(null);
            }}
            className="
              grid
              h-10
              w-10
              place-items-center
              rounded-xl
              border
              border-black/10
              bg-white
              text-[#0B1F3A]
              transition-all
              duration-200
              hover:bg-[#F5F9FD]
              hover:text-[#066BBD]

              lg:hidden
            "
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE / TABLET NAVIGATION
      ====================================================== */}

      {mobileOpen && (
        <div
          className="
            border-t
            border-black/[0.06]
            bg-white
            shadow-[0_20px_40px_rgba(11,31,58,0.10)]
            lg:hidden
          "
        >
          <div
            className="
              max-h-[calc(100vh-72px)]
              overflow-y-auto
              px-4
              py-4

              sm:px-6
            "
          >
            <nav className="space-y-1">
              {navLinks.map((link) => {
                const hasDropdown = Boolean(
                  dropdownMenus[link.label]
                );

                const isSubmenuOpen =
                  mobileSubmenu === link.label;

                return (
                  <div key={link.label}>
                    <div className="flex items-center">
                      {/* Main link */}
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className="
                          flex-1
                          rounded-xl
                          px-4
                          py-3.5
                          text-sm
                          font-semibold
                          text-[#0B1F3A]
                          transition-colors
                          hover:bg-[#F5F9FD]
                          hover:text-[#066BBD]
                        "
                      >
                        {link.label}
                      </Link>

                      {/* Submenu toggle */}
                      {hasDropdown && (
                        <button
                          type="button"
                          aria-label={`Open ${link.label} menu`}
                          aria-expanded={isSubmenuOpen}
                          onClick={() =>
                            setMobileSubmenu(
                              isSubmenuOpen
                                ? null
                                : link.label
                            )
                          }
                          className="
                            mr-1
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            text-[#066BBD]
                            transition-colors
                            hover:bg-[#F5F9FD]
                          "
                        >
                          <ChevronDown
                            size={18}
                            className={`
                              transition-transform
                              duration-200
                              ${
                                isSubmenuOpen
                                  ? "rotate-180"
                                  : "rotate-0"
                              }
                            `}
                          />
                        </button>
                      )}
                    </div>

                    {/* Mobile submenu */}
                    {hasDropdown && isSubmenuOpen && (
                      <div
                        className="
                          mb-2
                          ml-3
                          rounded-2xl
                          bg-[#F7FAFD]
                          p-2
                          animate-panel
                        "
                      >
                        {dropdownMenus[link.label].map(
                          (item) => {
                            const Icon = item.icon;

                            return (
                              <Link
                                key={item.id}
                                href={item.href}
                                onClick={closeMobileMenu}
                                className="
                                  flex
                                  items-center
                                  gap-3
                                  rounded-xl
                                  px-3
                                  py-3
                                  transition-all
                                  duration-200
                                  hover:bg-white
                                "
                              >
                                <span
                                  className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-[#EAF3FE]
                                    text-[#066BBD]
                                  "
                                >
                                  <Icon size={17} />
                                </span>

                                <span className="min-w-0">
                                  <span className="block text-sm font-semibold text-[#0B1F3A]">
                                    {item.label}
                                  </span>

                                  <span className="mt-0.5 block text-[11px] leading-4 text-[#0B1F3A]/45">
                                    {item.description}
                                  </span>
                                </span>

                                <ArrowRight
                                  size={15}
                                  className="ml-auto shrink-0 text-[#066BBD]/50"
                                />
                              </Link>
                            );
                          }
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Mobile CTA */}
            <Link
              href="/contact-us"
              onClick={closeMobileMenu}
              className="
                mt-4
                flex
                w-full
                items-center
                justify-center
                rounded-xl
                bg-brand-accent
                px-5
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-[0_6px_18px_rgba(6,107,189,0.18)]
                transition-all
                duration-200
                hover:bg-[#055A9F]
              "
            >
              Book a Strategy Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
