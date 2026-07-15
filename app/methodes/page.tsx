import { PageHeader } from '@/components/layout/PageHeader';
import { PageShell } from '@/components/layout/PageShell';
import { MethodSection } from '@/components/methods/MethodSection';
import { methods } from '@/content/methods';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Mes méthodes',
  description:
    'Présentation des méthodes d’hypnose, de cohérence cardiaque et des rythmes binauraux dans un cadre rassurant et professionnel.',
  path: '/methodes',
});

export default function MethodesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Mes méthodes"
        title="Des méthodes adaptées, crédibles et utilisées avec discernement"
        description="L’hypnose et la cohérence cardiaque sont présentées ici comme des méthodes avec un niveau de preuve scientifique solide, tandis que les rythmes binauraux sont abordés comme un complément de confort sensoriel, avec un niveau de preuve scientifique nettement plus faible."
      />
      {methods.map((method) => (
        <MethodSection key={method.title} {...method} />
      ))}
    </PageShell>
  );
}
