type MethodSectionProps = {
  title: string;
  summary: string;
  howItWorks: string[];
  uses: string[];
  evidence?: string;
};

export function MethodSection({ title, summary, howItWorks, uses, evidence }: MethodSectionProps) {
  return (
    <section className="rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">Méthode</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-brand-deep">{title}</h2>
        </div>
        {evidence ? (
          <span className="rounded-full border border-brand-mist bg-brand-paper px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-deep">
            {evidence}
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-base leading-8 text-brand-ink/80">{summary}</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-brand-mist bg-brand-paper/70 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">Fonctionnement</h3>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-brand-ink/80">
            {howItWorks.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-brand-mist bg-brand-paper/70 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">Usage dans les séances</h3>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-brand-ink/80">
            {uses.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-emerald" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
