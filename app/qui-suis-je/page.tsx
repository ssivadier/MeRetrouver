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
    'Présentation de la pratique d’hypnothérapie et de l’accompagnement autour du stress, du burnout, des phobies et de la gestion émotionnelle à Pessac.',
  path: '/qui-suis-je',
});

export default function AboutPage() {
  return (
    <PageShell>
      <Reveal>
        <ProfileHero />
      </Reveal>
      <Reveal delay={80}>
        <WhyThisPath />
      </Reveal>
      <Reveal delay={150}>
          <ProfileStory {...formationStory} />
      </Reveal>
      <Reveal delay={200}>
        <section className="page-section">
          <h2 className="font-display text-2xl font-semibold text-brand-deep">Contact</h2>
          <div className="mt-4">
            <ContactDetails />
          </div>
        </section>
      </Reveal>
      <StructuredData data={createBreadcrumbSchema('/qui-suis-je')} />
    </PageShell>
  );
}
