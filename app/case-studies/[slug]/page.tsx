import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "../../lib/case-studies";
import Reveal from "../../components/Reveal";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <>
      <section className="bg-gradient-to-br from-brand-navy to-brand-navy-2 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-brand-accent/15 blur-3xl animate-drift" />
        <div className="mx-auto max-w-4xl px-6 py-20 relative">
          <Link href="/case-studies" className="text-white/60 hover:text-brand-accent text-sm font-medium transition-colors">
            ← All Case Studies
          </Link>
          <div className="flex flex-wrap gap-2 mt-6 mb-4 animate-fade-in-up">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white animate-fade-in-up delay-1">{study.client}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <Reveal>
          <p className="text-lg text-brand-navy/70 leading-relaxed mb-10">{study.summary}</p>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {study.metrics.map((m, i) => (
            <Reveal key={m} className={`delay-${i + 1}`}>
              <div className="p-5 rounded-xl bg-brand-accent-light border border-brand-accent/10 text-center hover:-translate-y-1 transition-all duration-300">
                <p className="font-semibold text-brand-navy">{m}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Link
          href="/contact-us"
          className="inline-block bg-brand-accent hover:bg-[#055A9F] text-white font-semibold px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-accent/30"
        >
          Start Your Project
        </Link>
      </section>
    </>
  );
}
