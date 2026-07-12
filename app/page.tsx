export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-paper px-6 py-16">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 rounded-3xl border border-brand-mist bg-white/90 p-10 shadow-soft backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="info-banner w-fit">Sécurité, confidentialité et accompagnement clinique</p>
          <span className="rounded-full border border-brand-mist bg-brand-paper px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-deep">
            Me Retrouver
          </span>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-5">
            <h1 className="font-display text-4xl font-semibold leading-tight text-brand-deep sm:text-5xl">
              Hypnothérapie et accompagnement pour mieux gérer le stress
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-brand-ink/80">
              Un site vitrine professionnel pensé pour présenter votre pratique, partager des ressources et permettre la prise de rendez-vous via system.io.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://system.io" className="btn-cta-primary">
                Prendre un rendez-vous
              </a>
              <a href="/" className="rounded-full border border-brand-mist bg-white px-6 py-3 text-sm font-semibold text-brand-deep transition hover:border-brand-emerald hover:text-brand-emerald">
                Découvrir l&apos;accompagnement
              </a>
            </div>
          </div>
          <div className="card-surface flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">Références</p>
              <span className="rounded-full bg-brand-gold/20 px-3 py-1 text-xs font-semibold text-brand-deep">
                Science & bien-être
              </span>
            </div>
            <p className="text-sm leading-7 text-brand-ink/80">
              Une approche structurée, respectueuse et fondée sur l’écoute pour soutenir les personnes en quête de stabilité émotionnelle.
            </p>
            <div className="rounded-2xl border border-brand-mist bg-brand-paper/70 p-4 text-sm text-brand-ink/80">
              « Les séances sont proposées dans un cadre rassurant, adapté à votre rythme et à votre objectif. »
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
