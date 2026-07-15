import { PageHeader } from '@/components/layout/PageHeader';
import { PageShell } from '@/components/layout/PageShell';
import { PricingSection } from '@/components/pricing/PricingSection';
import { BookingButton } from '@/components/ui/BookingButton';
import { pricingSections } from '@/content/pricing';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Tarifs',
  description: 'Informations sur le déroulé d’une séance, le tarif de 70 € et les modalités de prise de rendez-vous.',
  path: '/tarifs',
});

export default function TarifsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Tarifs"
        title="Une offre simple, claire et adaptée à votre rythme"
        description="Les informations ci-dessous vous donnent une première idée du déroulé, du tarif et des possibilités de prise de rendez-vous."
      />
      {pricingSections.map((section) => (
        <PricingSection key={section.title} {...section} />
      ))}
      <div className="flex justify-center">
        <BookingButton />
      </div>
    </PageShell>
  );
}
