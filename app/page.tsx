export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-16">
      <section className="mx-auto flex max-w-5xl flex-col gap-8 rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-sm backdrop-blur">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">Me Retrouver</p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Hypnothérapie et accompagnement pour mieux gérer le stress
          </h1>
          <p className="max-w-2xl text-lg text-slate-600">
            Un site vitrine professionnel pensé pour présenter votre pratique, partager des ressources et permettre la prise de rendez-vous via system.io.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://system.io"
            className="rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            Prendre un rendez-vous
          </a>
          <a
            href="/"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
          >
            Découvrir l&apos;accompagnement
          </a>
        </div>
      </section>
    </main>
  );
}
