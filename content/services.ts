export type Service = {
  title: string;
  intro: string;
  signs: string[];
  approach: string[];
};

export const services: Service[] = [
  {
    title: 'Stress & burnout',
    intro:
      'Je vous aide à détecter les cycles de tension/compensation. Nous travaillons ensemble pour identifier les causes physiques, cognitives puis émotionnelles. Je vous accompagne pour retrouver une détente et vous donner les outils pour réduire l\'impact de ces tensions dans votre quotidien.',
    signs: [
      'Surcharge mentale ou fatigue persistante',
      'Difficulté à décrocher ou à retrouver de l\’énergie',
      'Ressentis de tension, d\’irritabilité ou de saturation',
    ],
    approach: [
      '30 à 40 % des personnes ayant vécu un burnout font une rechute dans les 2 à 3 ans',
      '50 % rapportent des symptômes résiduels (fatigue, cycles, hypersensibilité au stress) pendant 12 à 24 mois',
      '10 à 15 % vivent une rechute sévère si les conditions de travail ou de vie restent identiques à celles du burnout initial',
    ],
  },
  {
    title: 'Phobies',
    intro:
      'Cet accompagnement peut apporter une aide à mieux vivre avec certaines peurs intenses, des réactions disproportionnées ou des situations qui deviennent difficiles à affronter.',
    signs: [
      'Peurs spécifiques liées à certaines situations ou objets',
      'Évitement de lieux ou d’activités',
      'État d’alerte important avant une situation redoutée',
    ],
    approach: [
      '12,1 % des adultes présentent une phobie spécifique',
      '2,5× plus de risque après un traumatisme dans l\’enfance',
      '70 % des personnes traitées par hypnose rapportent une réduction significative de l\’anxiété liée à la phobie',
    ],
  },
  {
    title: 'Troubles liés au stress post-traumatique',
    intro:
      'Cet accompagnement peut offrir une aide à mieux vivre avec des souvenirs marquants, des réactions de sursaut, des difficultés à se sentir en sécurité ou des symptômes liés à un vécu difficile.',
    signs: [
      'Revives de souvenirs ou de sensations intenses',
      'Évitement de certains lieux, personnes ou sujets',
      'Difficultés à retrouver un sentiment de calme ou de sécurité',
    ],
    approach: [
      'Les personnes ayant vécu un trauma ont 2 à 3× plus de risque de burnout',
      '60 % des personnes traumatisées présentent une hyper‑vigilance',
      '40 % développent des comportements de régulation rapide (nourriture, addictions, isolement, sexualité compulsive)',
    ],
  },
];
