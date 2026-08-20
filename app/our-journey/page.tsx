import Image from "next/image";
import Link from "next/link";
import Reveal from "../components/Reveal";

const team = [
  { name: "Aditya Kumar", role: "Lead Developer", image: "/images/team-1.svg" },
  { name: "Riya Sharma", role: "UI/UX Designer", image: "/images/team-2.svg" },
  { name: "Priya Verma", role: "Project Manager", image: "/images/team-3.svg" },
  { name: "Nikhil Joshi", role: "Digital Marketing Lead", image: "/images/team-4.svg" },
  { name: "Sneha Mehta", role: "QA Engineer", image: "/images/team-5.svg" },
  { name: "Dev Kapoor", role: "Full Stack Developer", image: "/images/team-6.svg" },
];

export default function OurJourneyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-navy to-brand-navy-2 relative overflow-hidden">
        <div className="absolute top-10 left-1/3 w-72 h-72 rounded-full bg-brand-accent/15 blur-3xl animate-drift" />
        <div className="mx-auto max-w-7xl px-6 py-20 text-center relative">
          <p className="text-brand-accent font-semibold text-sm uppercase tracking-wide mb-3 animate-fade-in-up">
            Our Journey
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up delay-1">
            Celebrating Moments, Creating New Stories
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-2">
            The people behind Warrgyizmorsch — the team that plans, designs,
            builds, and supports every project we deliver.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <Reveal key={member.name} className={`delay-${(i % 3) + 1}`}>
              <div className="rounded-2xl overflow-hidden border border-black/5 bg-white shadow-sm hover:shadow-xl hover:shadow-brand-accent/10 hover:-translate-y-1.5 transition-all duration-300">
                <div className="relative h-64 w-full">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-brand-navy">{member.name}</h3>
                  <p className="text-sm text-brand-accent">{member.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-brand-navy/[0.03] py-16">
        <Reveal className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-navy">
            Have an idea? Let&apos;s build it together.
          </h2>
          <Link
            href="/contact-us"
            className="bg-brand-accent hover:bg-[#055A9F] text-white font-semibold px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-accent/30 shrink-0"
          >
            Book a Free Call
          </Link>
        </Reveal>
      </section>
    </>
  );
}
