import type { Metadata } from 'next';
import { ProfileHero } from '@/components/about/ProfileHero';
import { ProfileStory } from '@/components/about/ProfileStory';
import { WhyThisPath } from '@/components/about/WhyThisPath';

export const metadata: Metadata = {
  title: 'Qui suis-je',
  description: 'Présentation de la pratique d’hypnothérapie et de l’accompagnement autour du stress, du burnout, des phobies et de la gestion émotionnelle.',
  alternates: {
    canonical: 'https://meretrouver.fr/qui-suis-je',
  },
  openGraph: {
    title: 'Qui suis-je | Me Retrouver',
    description: 'Présentation de la pratique d’hypnothérapie et de l’accompagnement autour du stress, du burnout, des phobies et de la gestion émotionnelle.',
    url: 'https://meretrouver.fr/qui-suis-je',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-paper px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <ProfileHero />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <ProfileStory />
          <ProfileStory
            title="Formation et expérience"
            text="Vous pouvez ici détailler votre formation suivie, votre expérience professionnelle et votre évolution dans la pratique."
            bulletPoints={['Formation suivie', 'Années de pratique', 'Approche personnelle']}
          />
        </div>
        <section className="rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft">
          <h2 className="font-display text-2xl font-semibold text-brand-deep">Contact</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-brand-mist bg-brand-paper/70 p-4 text-sm leading-7 text-brand-ink/80">
              <p className="font-semibold text-brand-deep">Téléphone</p>
              <p className="mt-1">+33 6 12 34 56 78</p>
            </div>
            <div className="rounded-2xl border border-brand-mist bg-brand-paper/70 p-4 text-sm leading-7 text-brand-ink/80">
              <p className="font-semibold text-brand-deep">E-mail</p>
              <p className="mt-1">contact@meretrouver.fr</p>
            </div>
          </div>
        </section>
        <WhyThisPath />
      </div>
    </main>
  );
}
