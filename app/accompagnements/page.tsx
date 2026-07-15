import { PageHeader } from '@/components/layout/PageHeader';
import { PageShell } from '@/components/layout/PageShell';
import { Reveal } from '@/components/ui/Reveal';
import { StructuredData } from '@/components/seo/JsonLd';
import { ServiceSection } from '@/components/services/ServiceSection';
import { services } from '@/content/services';
import { createBreadcrumbSchema } from '@/lib/breadcrumbs';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Mes accompagnements',
  description:
    'Accompagnement professionnel pour le stress, le burnout, les phobies et les troubles liés au stress post-traumatique.',
  path: '/accompagnements',
});

export default function AccompagnementsPage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          eyebrow="Mes accompagnements"
          title="Un accompagnement sur mesure pour mieux vivre avec les difficultés liées au stress et à l&apos;émotion"
          description="Chaque accompagnement est pensé pour être adapté à la personne, à son contexte et à ses besoins, dans un cadre rassurant et respectueux."
        />
      </Reveal>
      {services.map((service, i) => (
        <Reveal key={service.title} delay={100 + i * 100}>
          <ServiceSection {...service} />
        </Reveal>
      ))}
      <StructuredData data={createBreadcrumbSchema('/accompagnements')} />
    </PageShell>
  );
}
