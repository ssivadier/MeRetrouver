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
    text: 'celui qui s\’installe progressivement, et vous vide de votre énergie. Vous vous réveillez fatigué(e), vous vous couchez tendu(e), et entre les deux… vous tenez comme vous pouvez.',
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
    description: 'L\'efficacité de l\'hypnose a été prouvée scientifiquement par plusieurs études.',
  },
  {
    title: 'Une co-construction',
    description: 'En tant que praticien, je vous accompagne par mes paroles à trouver, en vous, les ressources dont vous n\'aviez pas conscience. Vous êtes acteur/actrice du votre changement.',
  },
  {
    title: 'Une attitude bienveillante',
    description: 'Avec douceur et respect, vous restez libre d\’accepter ou non chacune de mes suggestions. C\'est un accompagnement sans ordre à suivre, ni injonction, et adapté à vous.',
  },
];
