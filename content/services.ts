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
      'Cet accompagnement peut aider à mieux vivre avec un stress de longue durée, une fatigue mentale, un sentiment d’épuisement ou un besoin de retrouver un rythme plus apaisé.',
    signs: [
      'Surcharge mentale ou fatigue persistante',
      'Difficulté à décrocher ou à retrouver de l’énergie',
      'Ressentis de tension, d’irritabilité ou de saturation',
    ],
    approach: [
      'Un temps d’écoute pour identifier les tensions actuelles',
      'Des exercices d’ancrage et de détente adaptés à la situation',
      'Un accompagnement orienté vers l’aide à mieux vivre avec le quotidien',
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
      'Une approche progressive et rassurante',
      'Un travail sur la perception de la peur et des mécanismes de maintien',
      'Un accompagnement centré sur l’aide à mieux vivre avec la situation',
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
      'Un cadre attentif, stable et respectueux du rythme',
      'Un accompagnement visant à aider à mieux vivre avec les souvenirs et les émotions',
      'Un soutien pour retrouver des repères et une meilleure présence au quotidien',
    ],
  },
];
