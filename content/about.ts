export const profileDefaults = {
  name: 'Sébastien Sivadier',
  role: 'Praticien en hypnothérapie et accompagnement du stress',
  imageAlt: 'Portrait de Sébastien Sivadier',
  imageSrc: '/photo_profil.png',
} as const;

export const profileStoryDefaults = {
  title: 'Présentation',
  text: 'Ajoutez ici votre bio, votre parcours, vos formations suivies et votre manière d’accompagner.',
  bulletPoints: ['Formation suivie', 'Années de pratique', 'Approche personnelle'],
} as const;

export const formationStory = {
  title: 'Formation et expérience',
  text: 'La plupars des hypnotiseurs font des formations de 5-12 jours. J\'ai choisi de suivre une formation complète de 1 an.',
  bulletPoints: [
    'Diplomé FPS : https://www.sophrologue-formation.com/devenir-hypnotherapeute',
    'Années de pratique',
    'Approche personnelle',
  ],
} as const;

export const whyThisPathDefaults = {
  title: 'Pourquoi j’ai choisi cette voie',
  intro:
    "Cadre sup dans une multinationale, j'ai fait un burn-out en 2025. J'ai alors réalisé qu'on avait très peu de soutien, sorti des anti-dépresseurs et d'un rdv psy. J'ai donc cherché des moyens d'aider les personnes ayant aussi ce type de souffrances.",
  points: [
    'Père de 5 enfants, je connais la charge mentale associé à une famille nombreuse, aux sollicitation constantes.',
    "J'ai encadré des équipes de plus de 100 personnes, géré des programmes stratégiques avec des budgets de plusieurs millions d'€. Je connais la pression du résultat et de la hiérarchie.",
    'La médecine moderne est très efficace pour traiter les maladies, mais elle est moins adaptée pour aider à mieux vivre avec le stress, l’anxiété ou les émotions difficiles.',
  ],
} as const;
