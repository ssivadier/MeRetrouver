import { PageHeader } from '@/components/layout/PageHeader';
import { PageShell } from '@/components/layout/PageShell';
import { siteConfig } from '@/content/site';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Mentions légales',
  description: 'Mentions légales du site Me Retrouver, structure standard conforme au cadre légal en vigueur.',
  path: '/mentions-legales',
});

export default function MentionsLegalesPage() {
  return (
    <PageShell className="max-w-5xl">
      <PageHeader
        eyebrow="Mentions légales"
        title="Mentions légales"
        description="Les informations ci-dessous constituent une base de mentions légales standard et seront complétées avec les données exactes lorsque vous les fournirez."
      />

      <section className="page-section">
        <h2 className="font-display text-2xl font-semibold text-brand-deep">Éditeur du site</h2>
        <div className="mt-4 space-y-3 text-sm leading-7 text-brand-ink/80">
          <p><strong>Nom / prénom :</strong> à compléter</p>
          <p><strong>Nom de l’activité / structure :</strong> à compléter</p>
          <p><strong>Adresse :</strong> à compléter</p>
          <p><strong>SIRET :</strong> à compléter</p>
          <p><strong>Code APE / activité :</strong> à compléter</p>
          <p><strong>Contact :</strong> {siteConfig.email}</p>
        </div>
      </section>

      <section className="page-section">
        <h2 className="font-display text-2xl font-semibold text-brand-deep">Hébergement</h2>
        <div className="mt-4 space-y-3 text-sm leading-7 text-brand-ink/80">
          <p><strong>Hébergeur :</strong> à compléter</p>
          <p><strong>Adresse :</strong> à compléter</p>
          <p><strong>Site web :</strong> à compléter</p>
        </div>
      </section>

      <section className="page-section">
        <h2 className="font-display text-2xl font-semibold text-brand-deep">Propriété intellectuelle</h2>
        <p className="mt-4 text-sm leading-7 text-brand-ink/80">
          L’ensemble des contenus présents sur ce site (textes, images, graphismes, logos, codes, mises en page) est protégé par le droit d’auteur. Toute reproduction, représentation ou utilisation sans autorisation préalable est interdite sauf exception prévue par la loi.
        </p>
      </section>
    </PageShell>
  );
}
