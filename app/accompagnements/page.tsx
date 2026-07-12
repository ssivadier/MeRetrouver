import { ServiceSection } from '@/components/services/ServiceSection';

const services = [
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

export default function AccompagnementsPage() {
  return (
    <main className="min-h-screen bg-brand-paper px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">Mes accompagnements</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-brand-deep sm:text-4xl">
            Un accompagnement sur mesure pour mieux vivre avec les difficultés liées au stress et à l’émotion
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-brand-ink/80">
            Chaque accompagnement est pensé pour être adapté à la personne, à son contexte et à ses besoins, dans un cadre rassurant et respectueux.
          </p>
        </section>
        {services.map((service) => (
          <ServiceSection key={service.title} {...service} />
        ))}
      </div>
    </main>
  );
}
