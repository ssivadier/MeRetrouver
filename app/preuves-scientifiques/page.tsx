import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preuves scientifiques',
  description: 'Références et éléments de validité clinique autour de l’hypnose et de la cohérence cardiaque.',
  alternates: {
    canonical: 'https://meretrouver.fr/preuves-scientifiques',
  },
  openGraph: {
    title: 'Preuves scientifiques | Me Retrouver',
    description: 'Références et éléments de validité clinique autour de l’hypnose et de la cohérence cardiaque.',
    url: 'https://meretrouver.fr/preuves-scientifiques',
    type: 'website',
  },
};

export default function PreuvesPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-20">
      <h1 className="font-display text-3xl font-semibold text-brand-deep">Preuves scientifiques</h1>
      <p className="max-w-2xl text-lg leading-8 text-brand-ink/80">
        Cette page sera dédiée aux références scientifiques et aux éléments de validité clinique.
      </p>
    </main>
  );
}
