import { ProfileHero } from '@/components/about/ProfileHero';
import { ProfileStory } from '@/components/about/ProfileStory';
import { WhyThisPath } from '@/components/about/WhyThisPath';
import { ContactDetails } from '@/components/layout/ContactDetails';
import { PageShell } from '@/components/layout/PageShell';
import { Reveal } from '@/components/ui/Reveal';
import { StructuredData } from '@/components/seo/JsonLd';
import { formationStory } from '@/content/about';
import { createBreadcrumbSchema } from '@/lib/breadcrumbs';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Qui suis-je',
  description:
    'Présentation de la pratique d’hypnothérapie et de l’accompagnement autour du stress, du burnout, des phobies et de la gestion émotionnelle.',
  path: '/qui-suis-je',
});

export default function AboutPage() {
  return (
    <PageShell>
      <Reveal>
        <ProfileHero />
      </Reveal>
      <Reveal delay={100}>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <ProfileStory />
          <ProfileStory {...formationStory} />
        </div>
      </Reveal>
      <Reveal delay={150}>
        <section className="page-section">
          <h2 className="font-display text-2xl font-semibold text-brand-deep">Contact</h2>
          <div className="mt-4">
            <ContactDetails />
          </div>
        </section>
      </Reveal>
      <Reveal delay={200}>
        <WhyThisPath />
      </Reveal>
      <StructuredData data={createBreadcrumbSchema('/qui-suis-je')} />
    </PageShell>
  );
}
