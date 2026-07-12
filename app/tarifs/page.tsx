import { PricingSection } from '@/components/pricing/PricingSection';
import { BookingButton } from '@/components/ui/BookingButton';

const sections = [
  {
    title: 'Déroulé d’une séance',
    content: [
      'Séance d’environ 1 heure, dans un cadre calme et rassurant.',
      'Pour un premier rendez-vous, l’objectif est d’échanger sur votre contexte, vos besoins et ce que vous souhaitez travailler ensemble.',
      'L’accompagnement est adapté à votre rythme, avec un temps d’écoute et des propositions concrètes pour la suite.',
    ],
  },
  {
    title: 'Tarif',
    content: [
      'Tarif unique : 70 € la séance d’1 heure.',
      'Beaucoup de mutuelles permettent un remboursement des médecines douces, dont l’hypnose, selon votre contrat et votre couverture.',
      'Il peut être utile de vérifier auprès de votre mutuelle pour connaître les conditions applicables.',
    ],
  },
  {
    title: 'Possibilités de séance',
    content: [
      'Séances possibles à domicile ou en visio selon votre situation et vos préférences.',
      'Le format est choisi en fonction de votre confort, de votre environnement et de la nature de l’accompagnement.',
    ],
  },
];

export default function TarifsPage() {
  return (
    <main className="min-h-screen bg-brand-paper px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">Tarifs</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-brand-deep sm:text-4xl">
            Une offre simple, claire et adaptée à votre rythme
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-brand-ink/80">
            Les informations ci-dessous vous donnent une première idée du déroulé, du tarif et des possibilités de prise de rendez-vous.
          </p>
        </section>
        {sections.map((section) => (
          <PricingSection key={section.title} {...section} />
        ))}
        <div className="flex justify-center">
          <BookingButton />
        </div>
      </div>
    </main>
  );
}
