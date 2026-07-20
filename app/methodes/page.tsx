import { PageHeader } from '@/components/layout/PageHeader';
import { PageShell } from '@/components/layout/PageShell';
import { Reveal } from '@/components/ui/Reveal';
import { StructuredData } from '@/components/seo/JsonLd';
import { BarriosStudy } from '@/components/methods/BarriosStudy';
import { BinauralStudy } from '@/components/methods/BinauralStudy';
import { CoherenceStudy } from '@/components/methods/CoherenceStudy';
import { createBreadcrumbSchema } from '@/lib/breadcrumbs';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Pratiques',
  description:
    'Études scientifiques sur l\u2019hypnose, la cohérence cardiaque et les rythmes binauraux.',
  path: '/methodes',
});

export default function MethodesPage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          eyebrow="Pratiques"
          title="Des pratiques soutenues par la science"
          description="Trois approches complémentaires, évaluées par des méta-analyses et des études cliniques rigoureuses."
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

      <StructuredData data={createBreadcrumbSchema('/methodes')} />
    </PageShell>
  );
}
