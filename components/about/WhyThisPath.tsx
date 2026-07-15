import { whyThisPathDefaults } from '@/content/about';

type WhyThisPathProps = {
  title?: string;
  intro?: string;
  points?: readonly string[] | string[];
};

export function WhyThisPath({
  title = whyThisPathDefaults.title,
  intro = whyThisPathDefaults.intro,
  points = whyThisPathDefaults.points,
}: WhyThisPathProps) {
  return (
    <section className="page-section bg-brand-paper/60">
      <h2 className="font-display text-2xl font-semibold text-brand-deep">{title}</h2>
      <p className="mt-4 text-base leading-8 text-brand-ink/80">{intro}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {points.map((point) => (
          <div key={point} className="rounded-2xl border border-brand-mist bg-white/80 p-4 text-sm leading-7 text-brand-ink/80">
            {point}
          </div>
        ))}
      </div>
    </section>
  );
}
