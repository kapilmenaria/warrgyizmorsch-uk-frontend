const features = [
  {
    title: "Innovation First",
    description:
      "Our focus on innovation enables us to act upon bold ideas — special, competitive solutions that resolve current problems and drive sustainable results.",
  },
  {
    title: "Collaborative Design",
    description:
      "Success grows with teamwork. Through our technical know-how and your vision, we build solutions that truly reflect your goals.",
  },
  {
    title: "Future-Ready Tech",
    description:
      "We stay flexible with advanced frameworks, tools, and scalable solutions — keeping your product future-proof.",
  },
  {
    title: "End-to-End Support",
    description:
      "From start to finish, we offer complete support — ensuring high performance, updates, and long-term success.",
  },
];

export default function IdeaSection() {
  return (
    <section className="bg-brand-navy">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-brand-accent text-sm font-semibold uppercase tracking-wide mb-2">
              Hear from Experts
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Have an Idea? Let&apos;s Build It Together!
            </h2>
          </div>
         
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-accent/40 transition-all duration-300"
            >
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
