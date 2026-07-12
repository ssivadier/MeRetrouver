type ServiceSectionProps = {
  title: string;
  intro: string;
  signs: string[];
  approach: string[];
};

export function ServiceSection({ title, intro, signs, approach }: ServiceSectionProps) {
  return (
    <section className="rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft">
      <div className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-brand-deep">{title}</h2>
        <p className="text-base leading-8 text-brand-ink/80">{intro}</p>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-brand-mist bg-brand-paper/70 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">Situations concernées</h3>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-brand-ink/80">
            {signs.map((sign) => (
              <li key={sign} className="flex items-start gap-2">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-gold" />
                <span>{sign}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-brand-mist bg-brand-paper/70 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">Ce que peut ressembler l’accompagnement</h3>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-brand-ink/80">
            {approach.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-emerald" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-6 text-xs italic leading-6 text-brand-ink/60">
        Cet accompagnement ne se substitue pas à un suivi médical ou psychologique si nécessaire.
      </p>
    </section>
  );
}
