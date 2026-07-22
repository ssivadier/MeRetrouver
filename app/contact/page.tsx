import { ContactDetails } from '@/components/layout/ContactDetails';
import { PageHeader } from '@/components/layout/PageHeader';
import { PageShell } from '@/components/layout/PageShell';
import { Reveal } from '@/components/ui/Reveal';
import { StructuredData } from '@/components/seo/JsonLd';
import { createBusinessSchema } from '@/content/site';
import { createBreadcrumbSchema } from '@/lib/breadcrumbs';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Contact — Hypnothérapeute Pessac',
  description:
    'Prendre rendez-vous pour un accompagnement en hypnothérapie et gestion du stress à Pessac et en visio.',
  path: '/contact',
});

const contactSchema = createBusinessSchema();

export default function ContactPage() {
  return (
    <PageShell className="max-w-5xl">
      <Reveal>
        <PageHeader
          eyebrow="Contact"
          title="Prenez rendez-vous pour un accompagnement adapté à votre rythme"
          description="Vous pouvez me contacter par téléphone ou par e-mail pour échanger sur votre besoin et découvrir si un accompagnement peut vous aider."
        />
      </Reveal>
      <Reveal delay={100}>
        <section className="page-section">
          <ContactDetails />
        </section>
      </Reveal>
      <StructuredData data={contactSchema} />
      <StructuredData data={createBreadcrumbSchema('/contact')} />
    </PageShell>
  );
}
