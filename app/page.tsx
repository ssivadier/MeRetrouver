import Link from 'next/link';
import { BookingButton } from '@/components/ui/BookingButton';
import { Reveal } from '@/components/ui/Reveal';
import { PageShell } from '@/components/layout/PageShell';
import { StructuredData } from '@/components/seo/JsonLd';
import { homeHighlights } from '@/content/home';
import { createBusinessSchema } from '@/content/site';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Accueil',
  description:
    'Accompagnement professionnel en hypnothérapie et cohérence cardiaque pour le stress, le burnout, les phobies et l\u2019équilibre émotionnel.',
  path: '/',
});

const homeSchema = createBusinessSchema({ includeLocalBusiness: true });

export default function HomePage() {
  return (
    <PageShell>
      <Reveal>
        <section className="page-section flex flex-col gap-8 backdrop-blur">
          <div className="overflow-hidden rounded-[2rem] border border-brand-mist/80 bg-brand-paper/70">
            <img src="/hero-abstract.svg" alt="Illustration de calme et de soutien" className="h-44 w-full object-cover sm:h-56" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="info-banner w-fit">Sécurité, confidentialité et accompagnement clinique</p>
            <span className="rounded-full border border-brand-mist bg-brand-paper px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-deep">
              Me Retrouver
            </span>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">Accompagnement professionnel</p>
                <h1 className="font-display text-4xl font-semibold leading-tight text-brand-deep sm:text-5xl">
                  Soutien clair et rassurant pour le stress, le burnout, les phobies et l&apos;équilibre émotionnel
                </h1>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-brand-ink/80">
                À travers l&apos;hypnose et la cohérence cardiaque, je vous accompagne vers un mieux-être plus stable, avec une écoute attentive et un cadre sécurisé.
              </p>
              <div className="flex flex-wrap gap-4">
                <BookingButton />
                <Link
                  href="/methodes"
                  className="rounded-full border border-brand-mist bg-white px-6 py-3 text-sm font-semibold text-brand-deep transition hover:border-brand-emerald hover:text-brand-emerald"
                >
                  Découvrir mon approche
                </Link>
              </div>
            </div>
            <div className="card-surface flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">Références</p>
                <span className="rounded-full bg-brand-gold/20 px-3 py-1 text-xs font-semibold text-brand-deep">
                  Science &amp; bien-être
                </span>
              </div>
              <p className="text-sm leading-7 text-brand-ink/80">
                Une approche structurée, respectueuse et fondée sur l&apos;écoute pour soutenir les personnes en quête de stabilité émotionnelle.
              </p>
              <div className="rounded-2xl border border-brand-mist bg-brand-paper/70 p-4 text-sm text-brand-ink/80">
                « Les séances sont proposées dans un cadre rassurant, adapté à votre rythme et à votre objectif. »
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal delay={100}>
        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {homeHighlights.map((item) => (
            <article key={item.title} className="card-surface flex flex-col gap-3">
              <h2 className="font-display text-2xl font-semibold text-brand-deep">{item.title}</h2>
              <p className="text-sm leading-7 text-brand-ink/80">{item.description}</p>
              <Link href={item.href} className="mt-auto text-sm font-semibold text-brand-emerald transition hover:text-brand-emeraldHover">
                En savoir plus →
              </Link>
            </article>
          ))}
        </section>
      </Reveal>
      <StructuredData data={homeSchema} />
    </PageShell>
  );
}
