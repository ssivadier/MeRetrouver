import { PageHeader } from '@/components/layout/PageHeader';
import { PageShell } from '@/components/layout/PageShell';
import { ServiceSection } from '@/components/services/ServiceSection';
import { services } from '@/content/services';
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
      <PageHeader
        eyebrow="Mes accompagnements"
        title="Un accompagnement sur mesure pour mieux vivre avec les difficultés liées au stress et à l’émotion"
        description="Chaque accompagnement est pensé pour être adapté à la personne, à son contexte et à ses besoins, dans un cadre rassurant et respectueux."
      />
      {services.map((service) => (
        <ServiceSection key={service.title} {...service} />
      ))}
    </PageShell>
  );
}
