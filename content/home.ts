export type HomePainPoint = {
  title: string;
  text: string;
};

export type HomeOutcome = {
  title: string;
  description: string;
};

export const homePainPoints: HomePainPoint[] = [
  {
    title: 'Stress constant',
    text: 'celui qui s\’installe lentement, jusqu\’à vous vider de votre énergie. Vous vous réveillez fatigué(e), vous vous couchez tendu(e), et entre les deux… vous tenez comme vous pouvez.',
  },
  {
    title: 'Stress post‑traumatique',
    text: 'celui qui revient par vagues, sans prévenir. Un bruit, une image, une situation… et votre corps réagit avant même que vous compreniez pourquoi.',
  },
  {
    title: 'Stress lié à une phobie',
    text: 'celui qui vous bloque, vous paralyse, vous fait éviter, contourner, renoncer. Vous savez que la peur est disproportionnée, mais votre corps ne vous écoute pas.',
  },
];

export const homeOutcomes: HomeOutcome[] = [
  {
    title: 'Une méthode scientifique',
    description: 'Dans la section \'pratiques\' vous avez accès à un résumé des résultats études scientifiques pour chaque pratique, en toute transparence et honnèteté.',
  },
  {
    title: 'Un travail sur la cause',
    description: 'Sans travail sur la cause, le mal risque de revenir.',
  },
  {
    title: 'Une méthode bornée dans le temps',
    description: 'Entre 5 à 6 séances pour vous sentir mieux et avoir les clefs pour continuer sainement.',
  },
];
