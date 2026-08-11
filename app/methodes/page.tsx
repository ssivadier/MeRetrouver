import { PageHeader } from '@/components/layout/PageHeader';
import { PageShell } from '@/components/layout/PageShell';
import { Reveal } from '@/components/ui/Reveal';
import { ReconnectCTA } from '@/components/ui/ReconnectCTA';
import { StructuredData } from '@/components/seo/JsonLd';
import { BarriosStudy } from '@/components/methods/BarriosStudy';
import { BinauralStudy } from '@/components/methods/BinauralStudy';
import { CoherenceStudy } from '@/components/methods/CoherenceStudy';
import { createBreadcrumbSchema } from '@/lib/breadcrumbs';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Méthodes hypnothérapie — Études scientifiques',
  description:
    'L\'hypnose, la cohérence cardiaque et les rythmes binauraux : des pratiques soutenues par la science pour vous aider à vous retrouver.',
  path: '/methodes',
});

export default function MethodesPage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          eyebrow="Pratiques"
          title="Des outils pour vous retrouver"
          description="Trois approches complémentaires, évaluées par des méta-analyses et des études cliniques rigoureuses — au service d\'un seul objectif : revenir à vous."
        />
      </Reveal>

      <Reveal delay={80}>
        <BarriosStudy />
      </Reveal>

      <Reveal delay={150}>
        <CoherenceStudy />
      </Reveal>

      <Reveal delay={250}>
        <BinauralStudy />
      </Reveal>

      <Reveal delay={320}>
        <ReconnectCTA />
      </Reveal>

      <StructuredData data={createBreadcrumbSchema('/methodes')} />
    </PageShell>
  );
}
