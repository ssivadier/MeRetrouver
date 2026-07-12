import { MethodSection } from '@/components/methods/MethodSection';

const methods = [
  {
    title: 'Hypnose',
    summary:
      'L’hypnose est une méthode d’accompagnement utilisée pour aider à mieux vivre avec certaines sensations de tension, de stress ou de blocage, dans un cadre rassurant et structuré.',
    howItWorks: [
      'Elle s’appuie sur un état de concentration et de relâchement soutenu.',
      'Le praticien guide l’attention vers des images, des sensations ou des mots choisis pour soutenir un changement de posture.',
      'Elle favorise un accès plus conscient aux ressources internes de la personne.',
    ],
    uses: [
      'Elle peut être utilisée pour accompagner la gestion du stress, l’orientation de l’attention et la réduction de certaines tensions.',
      'Elle peut soutenir l’exploration de représentations mentales utiles au quotidien.',
      'Elle s’inscrit dans un accompagnement global, avec une posture respectueuse du rythme de la personne.',
    ],
    evidence: 'preuve solide',
  },
  {
    title: 'Cohérence cardiaque',
    summary:
      'La cohérence cardiaque est une méthode simple, fondée sur des exercices de respiration et de régulation du rythme cardiaque, souvent utilisée pour aider à mieux vivre avec le stress au quotidien.',
    howItWorks: [
      'Elle repose sur une respiration lente et régulière, associée à une attention portée au souffle.',
      'L’objectif est d’aider à moduler le rythme cardiaque et le niveau de tension perçu.',
      'Elle s’appuie sur des principes de régulation physiologique bien connus et largement utilisés.',
    ],
    uses: [
      'Elle peut être intégrée dans les séances pour stabiliser l’état de la personne.',
      'Elle peut être proposée comme une ressource à réutiliser à domicile entre les séances.',
      'Elle s’inscrit dans une logique d’aide à mieux vivre avec les tensions et les réactions de stress.',
    ],
    evidence: 'preuve solide',
  },
  {
    title: 'Rythmes binauraux',
    summary:
      'Les rythmes binauraux sont un complément de confort sensoriel, parfois utilisé pour créer une ambiance plus calme ou plus soutenue pendant l’accompagnement, mais leur niveau de preuve scientifique est plus faible que pour l’hypnose ou la cohérence cardiaque.',
    howItWorks: [
      'Ils reposent sur l’exposition à des stimulations auditives légèrement différentes entre les deux oreilles.',
      'L’idée est de proposer une expérience auditive douce, souvent perçue comme apaisante.',
      'Ils ne constituent pas un pilier central de l’accompagnement, mais un support possible de confort.',
    ],
    uses: [
      'Ils peuvent accompagner un moment de détente en début ou en fin de séance.',
      'Ils peuvent servir de support sensoriel, selon l’envie et la sensibilité de la personne.',
      'Ils sont utilisés avec prudence et sans en faire une promesse de résultats à fort niveau de preuve.',
    ],
    evidence: 'preuve plus limitée',
  },
];

export default function MethodesPage() {
  return (
    <main className="min-h-screen bg-brand-paper px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">Mes méthodes</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-brand-deep sm:text-4xl">
            Des méthodes adaptées, crédibles et utilisées avec discernement
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-brand-ink/80">
            L’hypnose et la cohérence cardiaque sont présentées ici comme des méthodes avec un niveau de preuve scientifique solide, tandis que les rythmes binauraux sont abordés comme un complément de confort sensoriel, avec un niveau de preuve scientifique nettement plus faible.
          </p>
        </section>
        {methods.map((method) => (
          <MethodSection key={method.title} {...method} />
        ))}
      </div>
    </main>
  );
}
