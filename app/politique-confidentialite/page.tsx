import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité du site Me Retrouver et informations RGPD relatives aux données personnelles.',
  alternates: {
    canonical: 'https://meretrouver.fr/politique-confidentialite',
  },
  openGraph: {
    title: 'Politique de confidentialité | Me Retrouver',
    description: 'Politique de confidentialité du site Me Retrouver.',
    url: 'https://meretrouver.fr/politique-confidentialite',
    type: 'website',
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-brand-paper">
      <div className="page-shell max-w-5xl">
        <section className="rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">Politique de confidentialité</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-brand-deep sm:text-4xl">
            Politique de confidentialité
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-brand-ink/80">
            Cette politique a pour objet d’informer les visiteurs du site sur la manière dont leurs données personnelles sont collectées, utilisées, conservées et protégées.
          </p>
        </section>

        <section className="rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft">
          <h2 className="font-display text-2xl font-semibold text-brand-deep">Responsable du traitement</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-brand-ink/80">
            <p><strong>Responsable du traitement :</strong> à compléter</p>
            <p><strong>Contact :</strong> contact@meretrouver.fr</p>
            <p><strong>Adresse :</strong> à compléter</p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft">
          <h2 className="font-display text-2xl font-semibold text-brand-deep">Données collectées</h2>
          <p className="mt-4 text-sm leading-7 text-brand-ink/80">
            Via le formulaire de contact, les données suivantes peuvent être collectées : nom, prénom, adresse e-mail, numéro de téléphone, objet du message et contenu du message. Les données peuvent également être collectées lorsque vous utilisez les boutons de prise de rendez-vous ou d’autres moyens de contact mis à disposition sur le site.
          </p>
        </section>

        <section className="rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft">
          <h2 className="font-display text-2xl font-semibold text-brand-deep">Finalités</h2>
          <p className="mt-4 text-sm leading-7 text-brand-ink/80">
            Les données collectées sont utilisées pour répondre aux demandes de contact, organiser une prise de rendez-vous, traiter des demandes d’information ou de suivi, et assurer la bonne gestion des échanges avec les visiteurs.
          </p>
        </section>

        <section className="rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft">
          <h2 className="font-display text-2xl font-semibold text-brand-deep">Base légale</h2>
          <p className="mt-4 text-sm leading-7 text-brand-ink/80">
            Le traitement est fondé sur l’exécution d’une demande de contact ou d’un intérêt légitime à la bonne gestion de l’échange, dans le respect du cadre RGPD. Si le traitement est nécessaire à l’exécution d’une prestation ou d’un rendez-vous, la base légale peut reposer sur l’exécution d’un contrat ou d’une mission de service.
          </p>
        </section>

        <section className="rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft">
          <h2 className="font-display text-2xl font-semibold text-brand-deep">Durée de conservation</h2>
          <p className="mt-4 text-sm leading-7 text-brand-ink/80">
            Les données collectées via le formulaire de contact sont conservées pendant une durée limitée, correspondant au temps nécessaire au traitement de la demande et, si nécessaire, à la gestion de la relation commerciale ou d’accompagnement. Les durées exactes seront précisées dans la version finale, selon votre pratique et vos obligations internes.
          </p>
        </section>

        <section className="rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft">
          <h2 className="font-display text-2xl font-semibold text-brand-deep">Droits des personnes</h2>
          <p className="mt-4 text-sm leading-7 text-brand-ink/80">
            Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition, de limitation et de portabilité sur vos données personnelles. Pour exercer ces droits, vous pouvez contacter le responsable du traitement à l’adresse mentionnée ci-dessus.
          </p>
        </section>

        <section className="rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft">
          <h2 className="font-display text-2xl font-semibold text-brand-deep">Destinataires et transferts</h2>
          <p className="mt-4 text-sm leading-7 text-brand-ink/80">
            Les données peuvent être traitées par des prestataires techniques ou de messagerie, dans le respect de leurs obligations de confidentialité et de sécurité. Les informations exactes seront complétées selon vos prestataires réels.
          </p>
        </section>
      </div>
    </main>
  );
}
