import Link from 'next/link';
import { BookingButton } from '@/components/ui/BookingButton';
import { Reveal } from '@/components/ui/Reveal';
import { PageShell } from '@/components/layout/PageShell';
import { StructuredData } from '@/components/seo/JsonLd';
import { homePainPoints, homeOutcomes } from '@/content/home';
import { createBusinessSchema } from '@/content/site';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Accueil',
  description:
    'Vous êtes en mode survie ? Burnout, épuisement, perte de sommeil — un accompagnement structuré en hypnothérapie pour reconstruire vos fondations.',
  path: '/',
});

const homeSchema = createBusinessSchema({ includeLocalBusiness: true });

export default function HomePage() {
  return (
    <PageShell>
      <Reveal>
        <section className="page-section flex flex-col gap-10 backdrop-blur">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">
              Hypnothérapie &amp; accompagnement du stress
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-brand-deep sm:text-5xl">
              Vous êtes en mode survie&nbsp;?
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-brand-ink/80">
              Vous teniez le coup. Vous aviez l&apos;habitude de tout gérer, de repousser vos besoins, de Continuer.
              Et un jour, le corps a lâché.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-deep">
              Ce que vous vivez peut-être
            </p>
            <ul className="space-y-4">
              {homePainPoints.map((item) => (
                <li key={item.text} className="flex items-start gap-4">
                  <span className="mt-1 text-xl text-brand-emerald">{item.icon}</span>
                  <p className="text-base leading-7 text-brand-ink/80">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <BookingButton />
            <Link
              href="/qui-suis-je"
              className="rounded-full border border-brand-mist bg-white px-6 py-3 text-sm font-semibold text-brand-deep transition hover:border-brand-emerald hover:text-brand-emerald"
            >
              Comprendre ce qui se passe
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal delay={100}>
        <section className="mt-8 space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-deep">
              Ce qui change quand on s&apos;arrête
            </p>
            <h2 className="font-display text-3xl font-semibold text-brand-deep sm:text-4xl">
              On ne sort pas de l&apos;épuisement en &laquo;&nbsp;tenant encore un peu&nbsp;&raquo;
            </h2>
            <p className="max-w-2xl text-base leading-7 text-brand-ink/80">
              Il faut reconstruire les fondations. Pas un symptôme après l&apos;autre, mais une vraie méthode qui agit sur le sommeil, l&apos;énergie et la gestion du stress au quotidien.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {homeOutcomes.map((item) => (
              <article key={item.title} className="card-surface flex flex-col gap-3">
                <h3 className="font-display text-xl font-semibold text-brand-deep">{item.title}</h3>
                <p className="text-sm leading-7 text-brand-ink/80">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={150}>
        <section className="mt-8 page-section flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-2xl font-semibold text-brand-deep sm:text-3xl">
            Vous méritez de ne plus survivre
          </h2>
          <p className="max-w-xl text-base leading-7 text-brand-ink/80">
            Une première séance pour faire le point, sans engagement. Vous verrez si cette approche peut vous aider à retrouver un rythme qui vous ressemble.
          </p>
          <BookingButton />
        </section>
      </Reveal>

      <StructuredData data={homeSchema} />
    </PageShell>
  );
}
