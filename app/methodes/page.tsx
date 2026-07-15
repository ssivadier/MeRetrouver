import { PageHeader } from '@/components/layout/PageHeader';
import { PageShell } from '@/components/layout/PageShell';
import { Reveal } from '@/components/ui/Reveal';
import { StructuredData } from '@/components/seo/JsonLd';
import { BarriosStudy } from '@/components/methods/BarriosStudy';
import { BinauralStudy } from '@/components/methods/BinauralStudy';
import { CoherenceStudy } from '@/components/methods/CoherenceStudy';
import { MethodSection } from '@/components/methods/MethodSection';
import { methods } from '@/content/methods';
import { createBreadcrumbSchema } from '@/lib/breadcrumbs';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Mes méthodes',
  description:
    'Présentation des méthodes d\u2019hypnose, de cohérence cardiaque et des rythmes binauraux dans un cadre rassurant et professionnel.',
  path: '/methodes',
});

const hypnose = methods.find((m) => m.title === 'Hypnose');
const coherence = methods.find((m) => m.title === 'Cohérence cardiaque');
const binaural = methods.find((m) => m.title === 'Rythmes binauraux');

export default function MethodesPage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          eyebrow="Mes méthodes"
          title="Des méthodes adaptées, crédibles et utilisées avec discernement"
          description="L&apos;hypnose et la cohérence cardiaque sont présentées ici comme des méthodes avec un niveau de preuve scientifique solide, tandis que les rythmes binauraux sont abordés comme un complément de confort sensoriel, avec un niveau de preuve scientifique nettement plus faible."
        />
      </Reveal>

      {hypnose && (
        <Reveal delay={100}>
          <MethodSection {...hypnose} />
        </Reveal>
      )}

      <Reveal delay={150}>
        <BarriosStudy />
      </Reveal>

      {coherence && (
        <Reveal delay={200}>
          <MethodSection {...coherence} />
        </Reveal>
      )}

      <Reveal delay={250}>
        <CoherenceStudy />
      </Reveal>

      {binaural && (
        <Reveal delay={300}>
          <MethodSection {...binaural} />
        </Reveal>
      )}

      <Reveal delay={350}>
        <BinauralStudy />
      </Reveal>

      <StructuredData data={createBreadcrumbSchema('/methodes')} />
    </PageShell>
  );
}
