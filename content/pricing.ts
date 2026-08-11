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
    description: 'Pas de protocole rigidement figé. L\'accompagnement s\'ajuste à vous, à votre avancement et à vos besoins.',
  },
];

export const pricingModalities = [
  'À domicile, si vous préférez un cadre familier.',
  'En visio, pour s\'adapter à vos contraintes de temps ou de déplacement.',
] as const;

export const sessionPrice = 70;

export type PackageOffer = {
  name: string;
  tagline: string;
  sessions: number;
  price: number;
  perSession: number;
  savings: number;
  savingsPercent: number;
  steps: string[];
};

export const stressBurnoutPackage: PackageOffer = {
  name: 'Parcours Stress & Burnout',
  tagline: 'Un accompagnement structuré sur 4 séances pour retrouver un équilibre.',
  sessions: 4,
  price: 240,
  perSession: 60,
  savings: 40,
  savingsPercent: 14,
  steps: [
    'Un premier échange approfondi pour comprendre votre situation, votre rythme et définir ensemble vos objectifs.',
    'Identifier vos cycles de tension et poser les premiers outils concrets de détente et de respiration.',
    'Renforcer vos ressources, dénouer les tensions installées et ancrer de nouvelles habitudes.',
    'Consolider vos acquis pour prévenir les rechutes et repartir avec des outils durables.',
  ],
};
