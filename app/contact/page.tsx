import type { Metadata } from 'next';
import { StructuredData } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Contact | Me Retrouver',
  description: 'Prendre rendez-vous pour un accompagnement en hypnothérapie et gestion du stress à Lyon / à distance.',
  alternates: {
    canonical: 'https://meretrouver.fr/contact',
  },
  openGraph: {
    title: 'Contact | Me Retrouver',
    description: 'Prendre rendez-vous pour un accompagnement en hypnothérapie et gestion du stress à Lyon / à distance.',
    url: 'https://meretrouver.fr/contact',
    type: 'website',
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Me Retrouver',
  url: 'https://meretrouver.fr',
  telephone: '+33 6 12 34 56 78',
  email: 'contact@meretrouver.fr',
  description: 'Pratique d’hypnothérapie et d’accompagnement autour du stress, du burnout, des phobies et de la gestion émotionnelle.',
  areaServed: {
    '@type': 'Place',
    name: 'Lyon et à distance',
  },
  sameAs: ['https://www.instagram.com/'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'À définir',
    addressLocality: 'Lyon',
    addressRegion: 'AuRA',
    postalCode: '69000',
    addressCountry: 'FR',
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-paper">
      <div className="page-shell max-w-5xl">
        <section className="page-section">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">Contact</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-brand-deep sm:text-4xl">
            Prenez rendez-vous pour un accompagnement adapté à votre rythme
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-brand-ink/80">
            Vous pouvez me contacter par téléphone ou par e-mail pour échanger sur votre besoin et découvrir si un accompagnement peut vous aider.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-brand-mist bg-brand-paper/70 p-4 text-sm leading-7 text-brand-ink/80">
              <p className="font-semibold text-brand-deep">Téléphone</p>
              <p className="mt-1">+33 6 12 34 56 78</p>
            </div>
            <div className="rounded-2xl border border-brand-mist bg-brand-paper/70 p-4 text-sm leading-7 text-brand-ink/80">
              <p className="font-semibold text-brand-deep">E-mail</p>
              <p className="mt-1">contact@meretrouver.fr</p>
            </div>
          </div>
        </section>
        <StructuredData data={contactSchema} />
      </div>
    </main>
  );
}
