import { binauralStudy, binauralStudySource, binauralKeyFigures } from '@/content/study-binaural';

export function BinauralStudy() {
  return (
    <section className="page-section">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">
          Étude comparative
        </p>
        <h2 className="font-display text-2xl font-semibold text-brand-deep sm:text-3xl">
          Des rythmes binauraux prometteurs, mais encore en exploration
        </h2>
        <p className="max-w-2xl text-base leading-7 text-brand-ink/80">
          Une méta-analyse de 22 études, publiée dans{' '}
          <em>Psychological Research</em>, confirme un effet moyen des rythmes binauraux sur
          l&apos;anxiété et la cognition — un niveau de preuve inférieur à l&apos;hypnose et à la
          cohérence cardiaque.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {binauralStudy.map((item) => (
          <div
            key={item.name}
            className={`flex flex-col gap-4 rounded-3xl border p-6 transition-all duration-300 ${
              item.highlight
                ? 'border-brand-gold/40 bg-brand-gold/5 shadow-soft'
                : 'border-brand-mist bg-white/90'
            }`}
          >
            <div>
              <p
                className={`text-sm font-semibold uppercase tracking-[0.3em] ${
                  item.highlight ? 'text-brand-gold' : 'text-brand-deep'
                }`}
              >
                {item.name}
              </p>
            </div>

            <div className="space-y-1">
              <p
                className={`font-display text-4xl font-bold ${
                  item.highlight ? 'text-brand-gold' : 'text-brand-deep'
                }`}
              >
                {item.effectSize}
              </p>
              <p className="text-sm text-brand-ink/70">effet mesuré</p>
            </div>

            <p className="text-sm leading-7 text-brand-ink/80">{item.details}</p>

            {item.highlight && (
              <div className="mt-auto rounded-2xl border border-brand-gold/20 bg-brand-gold/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold text-center">
                complément confort sensoriel
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
              {binauralStudySource.studies}
            </p>
            <p className="text-sm text-brand-ink/70">études analysées</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-brand-deep">
              {binauralStudySource.effectSizes}
            </p>
            <p className="text-sm text-brand-ink/70">tailles d&apos;effet</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-brand-gold">
              {binauralKeyFigures.overallEffect}
            </p>
            <p className="text-sm text-brand-ink/70">effet global moyen</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-brand-gold">
              {binauralKeyFigures.optimalDuration}
            </p>
            <p className="text-sm text-brand-ink/70">durée optimale</p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs leading-6 text-brand-ink/50">
        Source&nbsp;: {binauralStudySource.authors}, «&nbsp;{binauralStudySource.title}&nbsp;»,{' '}
        {binauralStudySource.journal}, {binauralStudySource.year}, {binauralStudySource.volume},
        pp.&nbsp;{binauralStudySource.pages}.
      </p>
    </section>
  );
}
