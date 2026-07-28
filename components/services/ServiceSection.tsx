import Link from 'next/link';
import type { Service } from '@/content/services';

type ServiceSectionProps = Service;

export function ServiceSection({ title, intro, signs, approach, methods }: ServiceSectionProps) {
  return (
    <section className="page-section">
      <div className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-brand-deep">{title}</h2>
        <p className="text-base leading-7 text-brand-ink/80">{intro}</p>
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
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">En quelques chiffres</h3>
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
      {methods.length > 0 && (
        <div className="mt-6 rounded-2xl border border-brand-mist bg-white/90 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">Méthodes utilisées</h3>
          <div className="mt-4 space-y-4">
            {methods.map((method) => (
              <div key={method.name} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-display text-base font-semibold text-brand-deep">{method.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    method.evidence === 'preuve solide'
                      ? 'bg-brand-emerald/10 text-brand-emerald'
                      : 'bg-brand-gold/10 text-brand-gold'
                  }`}>
                    {method.evidence}
                  </span>
                </div>
                <p className="text-sm leading-6 text-brand-ink/80">{method.keyResult}</p>
                {method.studyLink && (
                  <Link href={method.studyLink} className="text-xs font-medium text-brand-emerald underline underline-offset-2 transition hover:text-brand-deep">
                    Voir l&apos;étude →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <p className="mt-6 text-xs italic leading-6 text-brand-ink/60">
        Cet accompagnement ne se substitue pas à un suivi médical ou psychologique si nécessaire.
      </p>
    </section>
  );
}
