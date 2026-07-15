export type Testimonial = {
  name: string;
  initials: string;
  quote: string;
  rating: number;
  photoAlt: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Claire M.',
    initials: 'CM',
    quote:
      'Je me suis sentie accompagnée avec beaucoup de douceur et de clarté. Les séances m’ont aidée à mieux respirer et à mieux vivre avec le stress du quotidien.',
    rating: 5,
    photoAlt: 'Témoignage temporaire — à remplacer par un vrai consentement écrit',
  },
  {
    name: 'Nicolas P.',
    initials: 'NP',
    quote:
      'L’accompagnement m’a permis de retrouver un peu plus de calme et de stabilité, sans pression. J’ai apprécié la justesse du cadre proposé.',
    rating: 5,
    photoAlt: 'Témoignage temporaire — à remplacer par un vrai consentement écrit',
  },
  {
    name: 'Sophie L.',
    initials: 'SL',
    quote:
      'Le cadre a été rassurant et la présence très attentive. J’ai pu mieux me recentrer et intégrer de nouvelles ressources au quotidien.',
    rating: 4,
    photoAlt: 'Témoignage temporaire — à remplacer par un vrai consentement écrit',
  },
];
