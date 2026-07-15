export type BinauralComparison = {
  name: string;
  effectSize: string;
  details: string;
  highlight?: boolean;
};

export const binauralStudy: BinauralComparison[] = [
  {
    name: 'Hypnose',
    effectSize: 'Fort',
    details: '93% de réussite en moyenne après 6 séances (Barrios, 1970).',
  },
  {
    name: 'Cohérence cardiaque',
    effectSize: 'Fort',
    details: 'Effet important (g = 0.83) sur le stress et l\u2019anxiété (Goessl et al., 2017).',
  },
  {
    name: 'Rythmes binauraux',
    effectSize: 'Modéré',
    details: 'Effet moyen (g = 0.45) sur l\u2019anxiété et la cognition (Garcia-Argibay et al., 2019).',
    highlight: true,
  },
];

export const binauralStudySource = {
  authors: 'Garcia-Argibay, M., Santed, M. A. & Reales, J. M.',
  title: 'Efficacy of binaural auditory beats in cognition, anxiety, and pain perception: a meta-analysis',
  journal: 'Psychological Research',
  year: 2019,
  volume: '83',
  pages: '357-372',
  studies: 22,
  effectSizes: 35,
};

export const binauralKeyFigures = {
  overallEffect: 'g = 0.45',
  anxietyEffect: 'SMD = -0.74',
  optimalDuration: '20-30 min',
  optimalFrequencies: 'Thêta (4-8 Hz) et Alpha (8-13 Hz)',
};
