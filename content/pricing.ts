export type PricingBenefit = {
  icon: string;
  title: string;
  description: string;
};

export const pricingBenefits: PricingBenefit[] = [
  {
    icon: '○',
    title: '1 heure complète',
    description: 'Un temps dédié uniquement à vous. Écoute, échange et travail concret, dans un cadre calme et sans jugement.',
  },
  {
    icon: '○',
    title: 'Premier rendez-vous sans engagement',
    description: 'Faire le point ensemble, comprendre votre situation, et voir si cette approche vous convient — sans pression.',
  },
  {
    icon: '○',
    title: 'Adapté à votre rythme',
    description: 'Pas de protocole rigidement figé. L\'accompagnement s\'ajuste à vous, à votre.avancement et à vos besoins.',
  },
];

export const pricingModalities = [
  'À domicile, si vous préférez un cadre familier.',
  'En visio, pour s\'adapter à vos contraintes de temps ou de déplacement.',
] as const;
