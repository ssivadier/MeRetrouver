import { TestimonialCard } from '@/components/testimonials/TestimonialCard';

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
    <main className="min-h-screen bg-brand-paper px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft">
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
