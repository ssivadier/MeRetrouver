import type { Service } from '@/content/services';

type ServiceSectionProps = Service;

export function ServiceSection({ anchor, title, intro, signs, stats, outcomes }: ServiceSectionProps) {
  return (
    <section className="page-section">
      <div className="space-y-4">
        <h2 id={anchor} className="scroll-mt-24 font-display text-2xl font-semibold text-brand-deep">{title}</h2>
        <p className="text-base leading-7 text-brand-ink/80">{intro}</p>
      </div>
      <div className="mt-6 rounded-2xl border border-brand-mist bg-brand-paper/70 p-5">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">Vous vous reconnaissez ?</h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-brand-ink/80">
              {signs.map((sign) => (
                <li key={sign} className="flex items-start gap-2">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-gold" />
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:border-l lg:border-brand-mist lg:pl-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">En chiffres</h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-brand-ink/80">
              {stats.map((stat) => (
                <li key={stat} className="flex items-start gap-2">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-emerald" />
                  <span>{stat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-5 border-t border-brand-mist pt-4 text-sm leading-7 text-brand-ink/80">
          <span className="font-semibold text-brand-deep">Ce que vous pouvez retrouver :</span>{' '}
          {outcomes.join(' · ')}
        </p>
      </div>
    </section>
  );
}
