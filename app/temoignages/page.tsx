import { PageHeader } from '@/components/layout/PageHeader';
import { PageShell } from '@/components/layout/PageShell';
import { TestimonialCard } from '@/components/testimonials/TestimonialCard';
import { testimonials } from '@/content/testimonials';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Témoignages',
  description:
    'Retours d’expériences sur l’accompagnement proposé autour du stress, du burnout et de l’équilibre émotionnel.',
  path: '/temoignages',
});

export default function TestimonialsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Témoignages"
        title="Des retours de personnes accompagnées, à remplacer par des témoignages réels avec consentement écrit"
        description="Cette grille est une version temporaire avec des données d’exemple. Les témoignages réels seront intégrés ultérieurement, sous réserve d’un consentement écrit et clair."
      />
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.name} {...testimonial} />
        ))}
      </section>
    </PageShell>
  );
}
