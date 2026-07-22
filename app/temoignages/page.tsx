import { PageHeader } from '@/components/layout/PageHeader';
import { PageShell } from '@/components/layout/PageShell';
import { Reveal } from '@/components/ui/Reveal';
import { StructuredData } from '@/components/seo/JsonLd';
import { TestimonialCard } from '@/components/testimonials/TestimonialCard';
import { testimonials } from '@/content/testimonials';
import { createBreadcrumbSchema } from '@/lib/breadcrumbs';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Témoignages hypnothérapie Pessac',
  description:
    'Retours d\u2019expériences sur l\u2019accompagnement en hypnothérapie à Pessac — stress, burnout et équilibre émotionnel.',
  path: '/temoignages',
});

export default function TestimonialsPage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          eyebrow="Témoignages"
          title="Témoignages de personnes accompagnées"
          description="Des retours d'expérience sur l'accompagnement en hypnothérapie à Pessac."
        />
      </Reveal>
      <Reveal delay={100}>
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </section>
      </Reveal>
      <StructuredData data={createBreadcrumbSchema('/temoignages')} />
    </PageShell>
  );
}
