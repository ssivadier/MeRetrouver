export type PricingSection = {
  title: string;
  content: string[];
};

export const pricingSections: PricingSection[] = [
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
