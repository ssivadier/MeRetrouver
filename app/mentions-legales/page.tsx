import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site Me Retrouver, structure standard conforme au cadre légal en vigueur.',
  alternates: {
    canonical: 'https://meretrouver.fr/mentions-legales',
  },
  openGraph: {
    title: 'Mentions légales | Me Retrouver',
    description: 'Mentions légales du site Me Retrouver.',
    url: 'https://meretrouver.fr/mentions-legales',
    type: 'website',
  },
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-brand-paper px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <section className="rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">Mentions légales</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-brand-deep sm:text-4xl">
            Mentions légales
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-brand-ink/80">
            Les informations ci-dessous constituent une base de mentions légales standard et seront complétées avec les données exactes lorsque vous les fournirez.
          </p>
        </section>

        <section className="rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft">
          <h2 className="font-display text-2xl font-semibold text-brand-deep">Éditeur du site</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-brand-ink/80">
            <p><strong>Nom / prénom :</strong> à compléter</p>
            <p><strong>Nom de l’activité / structure :</strong> à compléter</p>
            <p><strong>Adresse :</strong> à compléter</p>
            <p><strong>SIRET :</strong> à compléter</p>
            <p><strong>Code APE / activité :</strong> à compléter</p>
            <p><strong>Contact :</strong> contact@meretrouver.fr</p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft">
          <h2 className="font-display text-2xl font-semibold text-brand-deep">Hébergement</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-brand-ink/80">
            <p><strong>Hébergeur :</strong> à compléter</p>
            <p><strong>Adresse :</strong> à compléter</p>
            <p><strong>Site web :</strong> à compléter</p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft">
          <h2 className="font-display text-2xl font-semibold text-brand-deep">Propriété intellectuelle</h2>
          <p className="mt-4 text-sm leading-7 text-brand-ink/80">
            L’ensemble des contenus présents sur ce site (textes, images, graphismes, logos, codes, mises en page) est protégé par le droit d’auteur. Toute reproduction, représentation ou utilisation sans autorisation préalable est interdite sauf exception prévue par la loi.
          </p>
        </section>
      </div>
    </main>
  );
}
