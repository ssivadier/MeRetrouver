import { PageHeader } from '@/components/layout/PageHeader';
import { PageShell } from '@/components/layout/PageShell';
import { Reveal } from '@/components/ui/Reveal';
import { StructuredData } from '@/components/seo/JsonLd';
import { ServiceSection } from '@/components/services/ServiceSection';
import { services } from '@/content/services';
import { createBreadcrumbSchema } from '@/lib/breadcrumbs';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Accompagnements — Stress, burnout, phobies à Pessac',
  description:
    'Accompagnement professionnel en hypnothérapie pour le stress, le burnout, les phobies et le stress post-traumatique à Pessac et Bordeaux.',
  path: '/accompagnements',
});

export default function AccompagnementsPage() {
  return (
    <PageShell>
      <Reveal>
        <PageHeader
          eyebrow="Mes accompagnements"
          title="Accompagnements en hypnothérapie à Pessac"
          description="Chaque accompagnement s'adapte à votre histoire et à vos besoins, dans un espace d'écoute sans jugement où vous pouvez avancer sans pression. Vous n'avez rien à justifier, rien à prouver."
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
