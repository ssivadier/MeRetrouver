import type { Metadata } from 'next';
import { TestimonialCard } from '@/components/testimonials/TestimonialCard';

export const metadata: Metadata = {
  title: 'Témoignages',
  description: 'Retours d’expériences sur l’accompagnement proposé autour du stress, du burnout et de l’équilibre émotionnel.',
  alternates: {
    canonical: 'https://meretrouver.fr/temoignages',
  },
  openGraph: {
    title: 'Témoignages | Me Retrouver',
    description: 'Retours d’expériences sur l’accompagnement proposé autour du stress, du burnout et de l’équilibre émotionnel.',
    url: 'https://meretrouver.fr/temoignages',
    type: 'website',
  },
};

const testimonials = [
  {
    name: 'Claire M.',
    initials: 'CM',
    quote:
      'Je me suis sentie accompagnée avec beaucoup de douceur et de clarté. Les séances m’ont aidée à mieux respirer et à mieux vivre avec le stress du quotidien.',
    rating: 5,
    photoAlt: 'Témoignage temporaire — à remplacer par un vrai consentement écrit',
  },
  {
    name: 'Nicolas P.',
    initials: 'NP',
    quote:
      'L’accompagnement m’a permis de retrouver un peu plus de calme et de stabilité, sans pression. J’ai apprécié la justesse du cadre proposé.',
    rating: 5,
    photoAlt: 'Témoignage temporaire — à remplacer par un vrai consentement écrit',
  },
  {
    name: 'Sophie L.',
    initials: 'SL',
    quote:
      'Le cadre a été rassurant et la présence très attentive. J’ai pu mieux me recentrer et intégrer de nouvelles ressources au quotidien.',
    rating: 4,
    photoAlt: 'Témoignage temporaire — à remplacer par un vrai consentement écrit',
  },
];

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-brand-paper">
      <div className="page-shell">
        <section className="page-section">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">Témoignages</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-brand-deep sm:text-4xl">
            Des retours de personnes accompagnées, à remplacer par des témoignages réels avec consentement écrit
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-brand-ink/80">
            Cette grille est une version temporaire avec des données d’exemple. Les témoignages réels seront intégrés ultérieurement, sous réserve d’un consentement écrit et clair.
          </p>
        </section>
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </section>
      </div>
    </main>
  );
}
