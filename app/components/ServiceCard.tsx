export default function ServiceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-xl hover:shadow-brand-accent/10 hover:-translate-y-1.5 transition-all duration-300">
      <div className="w-11 h-11 rounded-lg bg-brand-accent-light flex items-center justify-center mb-4">
        <span className="w-3 h-3 rounded-full bg-brand-accent" />
      </div>
      <h3 className="font-semibold text-brand-navy mb-2">{title}</h3>
      <p className="text-sm text-brand-navy/60 leading-relaxed">{description}</p>
    </div>
  );
}
