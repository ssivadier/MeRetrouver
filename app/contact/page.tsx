import { ContactDetails } from '@/components/layout/ContactDetails';
import { PageHeader } from '@/components/layout/PageHeader';
import { PageShell } from '@/components/layout/PageShell';
import { StructuredData } from '@/components/seo/JsonLd';
import { createBusinessSchema } from '@/content/site';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Prendre rendez-vous pour un accompagnement en hypnothérapie et gestion du stress à Lyon / à distance.',
  path: '/contact',
});

const contactSchema = createBusinessSchema({ sameAs: ['https://www.instagram.com/'] });

export default function ContactPage() {
  return (
    <PageShell className="max-w-5xl">
      <PageHeader
        eyebrow="Contact"
        title="Prenez rendez-vous pour un accompagnement adapté à votre rythme"
        description="Vous pouvez me contacter par téléphone ou par e-mail pour échanger sur votre besoin et découvrir si un accompagnement peut vous aider."
      />
      <section className="page-section">
        <ContactDetails />
      </section>
      <StructuredData data={contactSchema} />
    </PageShell>
  );
}
