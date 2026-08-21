import Image from "next/image";
import Reveal from "../components/Reveal";

const categories = [
  {
    id: "web",
    title: "Web Development",
    bg: "/images/services/web-bg.svg",
    items: ["PHP Development", "Node.js Development", "Angular Development", "Laravel Development", "React.js Development", "Full Stack Development"],
  },
  {
    id: "app",
    title: "App Development",
    bg: "/images/services/app-bg.svg",
    items: ["Android App Development", "iOS App Development", "Flutter App Development", "Hybrid App Development"],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    bg: "/images/services/ai-bg.svg",
    items: ["AI Development", "AI Consulting", "AI Chatbot Development", "AI Automation"],
  },
  {
    id: "software",
    title: "Software Development",
    bg: "/images/services/software-bg.svg",
    items: ["Enterprise Software Development", "ERP Development", "CRM Development", "Software Development Outsourcing"],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    bg: "/images/services/marketing-bg.svg",
    items: ["SEO", "Performance Marketing", "Social Media Marketing", "Content Writing", "Email Marketing", "Google & Meta Ads"],
  },
  {
    id: "ecommerce",
    title: "Ecommerce Development",
    bg: "/images/services/ecommerce-bg.svg",
    items: ["Shopify Development", "Magento Development", "WooCommerce Development"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-amber-50 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full " />
        <div className="mx-auto max-w-7xl px-6 py-20 relative">

          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-4 py-2 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-brand-accent" />

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/75">
                All Services
              </span>
            </div>
          </Reveal>

          <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight text-black sm:text-5xl md:text-6xl lg:text-7xl">
            Everything You Need To Build & Grow,{" "}
            <span className="bg-gradient-to-r from-brand-accent to-cyan-400 bg-clip-text text-transparent">
              in One Place.
            </span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 space-y-16">
        {categories.map((cat) => (
          <div key={cat.id} id={cat.id}>
            <Reveal>
              <h2 className="text-2xl font-bold text-brand-navy mb-6">{cat.title}</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cat.items.map((item, i) => (
                <Reveal key={item} className={`delay-${(i % 3) + 1}`}>
                  <div className="relative h-40 rounded-2xl overflow-hidden group hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-brand-accent/20">
                    {/* background photo/graphic */}
                    <Image
                      src={cat.bg}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* overlay so text stays readable over the photo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/70 via-brand-accent/30 to-transparent" />
                    {/* text content */}
                    <div className="relative h-full flex items-end p-5">
                      <p className="text-white font-semibold text-base leading-snug">
                        {item}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}