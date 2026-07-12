import type { Metadata } from 'next';
import { BookingButton } from '@/components/ui/BookingButton';
import { StructuredData } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Accueil',
  description: 'Accompagnement professionnel en hypnothérapie et cohérence cardiaque pour le stress, le burnout, les phobies et l’équilibre émotionnel.',
  alternates: {
    canonical: 'https://meretrouver.fr/',
  },
  openGraph: {
    title: 'Me Retrouver | Hypnothérapie & gestion du stress',
    description: 'Accompagnement professionnel en hypnothérapie et cohérence cardiaque pour le stress, le burnout, les phobies et l’équilibre émotionnel.',
    url: 'https://meretrouver.fr/',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Me Retrouver',
  },
};

const highlights = [
  {
    title: 'Mes accompagnements',
    description: 'Un accompagnement structuré pour le stress, le burnout et les phobies.',
    href: '/accompagnements',
  },
  {
    title: 'Mes méthodes',
    description: 'Hypnose et cohérence cardiaque pour retrouver un rythme plus apaisé.',
    href: '/methodes',
  },
  {
    title: 'Preuves scientifiques',
    description: 'Des approches claires, crédibles et adaptées à un cadre professionnel.',
    href: '/preuves-scientifiques',
  },
];

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'MedicalBusiness'],
  name: 'Me Retrouver',
  url: 'https://meretrouver.fr',
  telephone: '+33 6 12 34 56 78',
  email: 'contact@meretrouver.fr',
  description: 'Pratique d’hypnothérapie et d’accompagnement autour du stress, du burnout, des phobies et de la gestion émotionnelle.',
  areaServed: {
    '@type': 'Place',
    name: 'Lyon et à distance',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'À définir',
    addressLocality: 'Lyon',
    addressRegion: 'AuRA',
    postalCode: '69000',
    addressCountry: 'FR',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-paper px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft backdrop-blur sm:p-10 lg:p-12">
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
                Soutien clair et rassurant pour le stress, le burnout, les phobies et l’équilibre émotionnel
              </h1>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-brand-ink/80">
              À travers l’hypnose et la cohérence cardiaque, je vous accompagne vers un mieux-être plus stable, avec une écoute attentive et un cadre sécurisé.
            </p>
            <div className="flex flex-wrap gap-4">
              <BookingButton />
              <a href="/methodes" className="rounded-full border border-brand-mist bg-white px-6 py-3 text-sm font-semibold text-brand-deep transition hover:border-brand-emerald hover:text-brand-emerald">
                Découvrir mon approche
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

      <section className="mx-auto mt-8 grid max-w-6xl gap-4 lg:grid-cols-3">
        {highlights.map((item) => (
          <article key={item.title} className="card-surface flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold text-brand-deep">{item.title}</h2>
            <p className="text-sm leading-7 text-brand-ink/80">{item.description}</p>
            <a href={item.href} className="mt-auto text-sm font-semibold text-brand-emerald transition hover:text-brand-emeraldHover">
              En savoir plus →
            </a>
          </article>
        ))}
      </section>
      <StructuredData data={homeSchema} />
    </main>
  );
}
