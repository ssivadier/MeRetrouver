export type CoherenceComparison = {
  name: string;
  effectSize: string;
  details: string;
  highlight?: boolean;
};

export const coherenceStudy: CoherenceComparison[] = [
  {
    name: 'Sans traitement',
    effectSize: 'Aucun',
    details: 'Les symptômes de stress et d\u2019anxiété persistent ou s\u2019aggravent spontanément.',
  },
  {
    name: 'Relaxation classique',
    effectSize: 'Modéré',
    details: 'Effet positif, mais moins marqué et moins durable que la cohérence cardiaque.',
  },
  {
    name: 'Cohérence cardiaque',
    effectSize: 'Fort',
    details: 'Réduction significative du stress et de l\u2019anxiété en 4 à 12 semaines, avec des effets durables.',
    highlight: true,
  },
];

export const coherenceStudySource = {
  authors: 'Goessl, V. C., Curtiss, J. E. & Hofmann, S. G.',
  title: 'The effect of heart rate variability biofeedback training on stress and anxiety: a meta-analysis',
  journal: 'Psychological Medicine',
  year: 2017,
  volume: '47(15)',
  pages: '2578-2586',
  participants: 24,
  totalSubjects: 484,
};

export const coherenceKeyFigures = {
  stressReduction: '73%',
  anxietyReduction: '2 points (STAI)',
  practiceTime: '5 min, 2-3x/jour',
  minimumDuration: '6 semaines',
};
