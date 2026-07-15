export type HomePainPoint = {
  icon: string;
  text: string;
};

export type HomeOutcome = {
  title: string;
  description: string;
};

export const homePainPoints: HomePainPoint[] = [
  {
    icon: '○',
    text: 'Vous tenez le coup depuis des mois, peut-être des années, sans jamais vous arrêter.',
  },
  {
    icon: '○',
    text: 'Vous gérez, vous avancez, vous repoussez vos besoins en vous disant que ce n\'est pas le moment.',
  },
  {
    icon: '○',
    text: 'Le sommeil ne suffit plus à vous remettre debout. L\'énergie diminue. Le corps commence à parler.',
  },
];

export const homeOutcomes: HomeOutcome[] = [
  {
    title: 'Retrouver un sommeil réparateur',
    description: 'Quand le stress ne vous empêche plus de dormir, le corps recommence à se reconstruire.',
  },
  {
    title: 'Récupérer de l\'énergie au quotidien',
    description: 'Ne plus vivre avec cette fatigue de fond qui s\'accumule et rend tout plus difficile.',
  },
  {
    title: 'Gérer le stress sans s\'épuiser',
    description: 'Apprendre à réguler ses émotions et ses réactions, sans avoir l\'impression de lutter contre soi-même.',
  },
];
