export type TherapyComparison = {
  name: string;
  recoveryRate: number;
  sessions: number;
  description: string;
};

export const barriosStudy: TherapyComparison[] = [
  {
    name: 'Psychothérapie',
    recoveryRate: 38,
    sessions: 600,
    description: 'Environ 600 séances en moyenne sur 3 à 4 ans.',
  },
  {
    name: 'Thérapies comportementales',
    recoveryRate: 72,
    sessions: 22,
    description: 'Environ 22 séances en moyenne.',
  },
  {
    name: 'Hypnothérapie',
    recoveryRate: 93,
    sessions: 6,
    description: 'Environ 6 séances en moyenne.',
  },
];

export const barriosStudySource = {
  author: 'Alfred A. Barrios, Ph.D.',
  title: 'Hypnotherapy: A Reappraisal',
  journal: 'Psychotherapy: Theory, Research and Practice',
  year: 1970,
  citation: 'American Health Magazine',
};
