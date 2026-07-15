import { barriosStudy, barriosStudySource } from '@/content/study';

export function BarriosStudy() {
  return (
    <section className="page-section">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">
          Étude comparative
        </p>
        <h2 className="font-display text-2xl font-semibold text-brand-deep sm:text-3xl">
          L&apos;hypnose, la thérapie la plus efficace selon la recherche
        </h2>
        <p className="max-w-2xl text-base leading-7 text-brand-ink/80">
          Une méta-analyse du Dr Alfred A. Barrios, publiée dans{' '}
          <em>Psychotherapy: Theory, Research and Practice</em> et reprise par{' '}
          <em>American Health Magazine</em>, compare l&apos;efficacité de trois approches psychothérapeutiques.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {barriosStudy.map((therapy) => {
          const isHypnosis = therapy.name === 'Hypnothérapie';
          return (
            <div
              key={therapy.name}
              className={`flex flex-col gap-4 rounded-3xl border p-6 transition-all duration-300 ${
                isHypnosis
                  ? 'border-brand-emerald/40 bg-brand-emerald/5 shadow-soft'
                  : 'border-brand-mist bg-white/90'
              }`}
            >
              <div>
                <p
                  className={`text-sm font-semibold uppercase tracking-[0.3em] ${
                    isHypnosis ? 'text-brand-emerald' : 'text-brand-deep'
                  }`}
                >
                  {therapy.name}
                </p>
              </div>

              <div className="space-y-1">
                <p
                  className={`font-display text-5xl font-bold ${
                    isHypnosis ? 'text-brand-emerald' : 'text-brand-deep'
                  }`}
                >
                  {therapy.recoveryRate}&nbsp;%
                </p>
                <p className="text-sm text-brand-ink/70">taux de réussite</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-semibold text-brand-deep">
                  {therapy.sessions} séance{therapy.sessions > 1 ? 's' : ''}
                </p>
                <p className="text-sm text-brand-ink/70">{therapy.description}</p>
              </div>

              {isHypnosis && (
                <div className="mt-auto rounded-2xl border border-brand-emerald/20 bg-brand-emerald/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-emerald text-center">
                  Niveau de preuve le plus élevé
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-xs leading-6 text-brand-ink/50">
        Source&nbsp;: {barriosStudySource.author}, «&nbsp;{barriosStudySource.title}&nbsp;»,{' '}
        {barriosStudySource.journal}, {barriosStudySource.year}. Cité dans{' '}
        {barriosStudySource.citation}.
      </p>
    </section>
  );
}
