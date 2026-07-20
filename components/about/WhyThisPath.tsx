import { whyThisPathDefaults } from '@/content/about';

type WhyThisPathProps = {
  title?: string;
  intro?: string;
  points?: readonly string[] | string[];
};

const cardAccents = ['border-t-brand-gold', 'border-t-brand-burgundy', 'border-t-brand-emerald'];

export function WhyThisPath({
  title = whyThisPathDefaults.title,
  intro = whyThisPathDefaults.intro,
  points = whyThisPathDefaults.points,
}: WhyThisPathProps) {
  return (
    <section className="page-section flex flex-col gap-10 backdrop-blur">
      <h2 className="font-display text-2xl font-semibold text-brand-deep">{title}</h2>
      <p className="mt-4 text-base leading-8 text-brand-ink/80">{intro}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {points.map((point, i) => (
          <div key={point} className={`card-surface flex flex-col gap-3 border-t-2 ${cardAccents[i]}`}>
            {point}
          </div>
        ))}
      </div>
    </section>
  );
}
