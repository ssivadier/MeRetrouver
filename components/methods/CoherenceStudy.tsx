import { coherenceStudy, coherenceStudySource, coherenceKeyFigures } from '@/content/study-coherence';

export function CoherenceStudy() {
  return (
    <section className="page-section">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">
          Étude comparative
        </p>
        <h2 className="font-display text-2xl font-semibold text-brand-deep sm:text-3xl">
          La cohérence cardiaque, une méthode validée par la science
        </h2>
        <p className="max-w-2xl text-base leading-7 text-brand-ink/80">
          Une méta-analyse de 24 études cliniques randomisées, publiée dans{' '}
          <em>Psychological Medicine</em>, confirme l&apos;efficacité de la cohérence cardiaque
          sur le stress et l&apos;anxiété.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {coherenceStudy.map((item) => (
          <div
            key={item.name}
            className={`flex flex-col gap-4 rounded-3xl border p-6 transition-all duration-300 ${
              item.highlight
                ? 'border-brand-emerald/40 bg-brand-emerald/5 shadow-soft'
                : 'border-brand-mist bg-white/90'
            }`}
          >
            <div>
              <p
                className={`text-sm font-semibold uppercase tracking-[0.3em] ${
                  item.highlight ? 'text-brand-emerald' : 'text-brand-deep'
                }`}
              >
                {item.name}
              </p>
            </div>

            <div className="space-y-1">
              <p
                className={`font-display text-4xl font-bold ${
                  item.highlight ? 'text-brand-emerald' : 'text-brand-deep'
                }`}
              >
                {item.effectSize}
              </p>
              <p className="text-sm text-brand-ink/70">effet mesuré</p>
            </div>

            <p className="text-sm leading-7 text-brand-ink/80">{item.details}</p>

            {item.highlight && (
              <div className="mt-auto rounded-2xl border border-brand-emerald/20 bg-brand-emerald/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-emerald text-center">
                Méta-analyse de 24 études
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-brand-mist bg-white/90 p-6">
        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald mb-4">
          Chiffres clés
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-brand-deep">
              {coherenceStudySource.participants}
            </p>
            <p className="text-sm text-brand-ink/70">études analysées</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-brand-deep">
              {coherenceStudySource.totalSubjects}
            </p>
            <p className="text-sm text-brand-ink/70">participants</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-brand-emerald">
              {coherenceKeyFigures.stressReduction}
            </p>
            <p className="text-sm text-brand-ink/70">de réduction du stress</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-brand-emerald">
              {coherenceKeyFigures.practiceTime}
            </p>
            <p className="text-sm text-brand-ink/70">de pratique quotidienne</p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs leading-6 text-brand-ink/50">
        Source&nbsp;: {coherenceStudySource.authors}, «&nbsp;{coherenceStudySource.title}&nbsp;»,{' '}
        {coherenceStudySource.journal}, {coherenceStudySource.year}, {coherenceStudySource.volume},
        pp.&nbsp;{coherenceStudySource.pages}.
      </p>
    </section>
  );
}
