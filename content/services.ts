export type ServiceMethod = {
  name: string;
  evidence: 'preuve solide' | 'preuve plus limitée';
  keyResult: string;
  studyLink?: string;
};

export type Service = {
  anchor: string;
  title: string;
  intro: string;
  signs: string[];
  stats: string[];
  outcomes: string[];
};

export const services: Service[] = [
  {
    anchor: 'stress-burnout',
    title: 'Stress & burnout',
    intro:
      'On continue d\'avancer parce qu\'il le faut bien, on serre les dents, on tient le coup — jusqu\'au jour où le corps dit stop. Les personnes que j\'accompagne décrivent souvent cette impression d\'avoir perdu l\'envie, l\'énergie, et parfois le fil d\'elles-mêmes, sans comprendre pourquoi. Ensemble, nous nommons ce qui se passe, puis nous retrouvons, pas à pas, un rythme qui vous ressemble.',
    signs: [
      'Surcharge mentale ou fatigue persistante',
      'Difficulté à décrocher ou à retrouver de l\’énergie',
      'Ressentis de tension, d\’irritabilité ou de saturation',
    ],
    stats: [
      '30 à 40 % des personnes ayant vécu un burnout font une rechute dans les 2 à 3 ans',
      '50 % rapportent des symptômes résiduels (fatigue, cycles, hypersensibilité au stress) pendant 12 à 24 mois',
      '10 à 15 % vivent une rechute sévère si les conditions de travail ou de vie restent identiques',
    ],
    outcomes: [
      'De l\’énergie qui revient, et un sommeil qui répare enfin',
      'Du plaisir dans les moments simples — vos enfants, vos proches, un bon repas',
      'Une présence à vous-même, au lieu de la survie',
    ],
  },
  {
    anchor: 'phobies',
    title: 'Phobies',
    intro:
      'Une peur que tout le monde — et vous-même — juge disproportionnée, mais qui, sur le moment, est bien réelle et envahissante. Vous savez qu\'elle est irrationnelle, et pourtant votre corps ne vous écoute plus. Je vous accompagne pour que cette peur n\'ait plus le dernier mot.',
    signs: [
      'Peurs spécifiques liées à certaines situations ou objets',
      'Évitement de lieux ou d\’activités',
      'État d\’alerte important avant une situation redoutée',
    ],
    stats: [
      '12,1 % des adultes présentent une phobie spécifique',
      '2,5× plus de risque après un traumatisme dans l\’enfance',
      '70 % des personnes accompagnées par hypnose rapportent une réduction significative de l\’anxiété liée à la phobie',
    ],
    outcomes: [
      'Faire ce que vous évitez aujourd\’hui — prendre l\’avion, parler en public, sortir',
      'Une peur qui peut être présente sans diriger votre vie',
      'La liberté de ne plus contourner votre quotidien',
    ],
  },
  {
    anchor: 'stress-post-traumatique',
    title: 'Troubles liés au stress post-traumatique',
    intro:
      'Des souvenirs qui reviennent sans prévenir, un corps qui reste en alerte, cette impression de ne plus être vraiment en sécurité — ni parfois vraiment vous-même. Ces réactions vous dépassent, mais elles ont une explication. Je vous accompagne pour apaiser ce qui est resté trop longtemps à vif, à votre rythme.',
    signs: [
      'Revives de souvenirs ou de sensations intenses',
      'Évitement de certains lieux, personnes ou sujets',
      'Difficultés à retrouver un sentiment de calme ou de sécurité',
    ],
    stats: [
      'Les personnes ayant vécu un trauma ont 2 à 3× plus de risque de burnout',
      '60 % des personnes traumatisées présentent une hyper‑vigilance',
      '40 % développent des comportements de régulation rapide (nourriture, addictions, isolement)',
    ],
    outcomes: [
      'Des nuits plus calmes, où le corps finit par se relâcher',
      'Un sentiment de sécurité qui revient peu à peu',
      'Retrouver confiance en vous, et dans les autres',
    ],
  },
];

export const supportingMethods: ServiceMethod[] = [
  {
    name: 'Hypnose',
    evidence: 'preuve solide',
    keyResult: 'Réduction mesurée du stress perçu et des tensions (g = 0.96, Barrios et al.)',
    studyLink: '/methodes#hypnose',
  },
  {
    name: 'Cohérence cardiaque',
    evidence: 'preuve solide',
    keyResult: 'Amélioration de la variabilité cardiaque et régulation du système nerveux (g = 0.83)',
    studyLink: '/methodes#coherence',
  },
  {
    name: 'Rythmes binauraux',
    evidence: 'preuve plus limitée',
    keyResult: 'Complément de confort sensoriel pendant les séances (g = 0.45)',
    studyLink: '/methodes#binauraux',
  },
];
