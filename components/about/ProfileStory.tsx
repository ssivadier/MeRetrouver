import { formationStory } from '@/content/about';

type ProfileStoryProps = {
  title?: string;
  text?: string;
  bulletPoints?: readonly string[] | string[];
};

export function ProfileStory({
  title = formationStory.title,
  text = formationStory.text,
  bulletPoints = formationStory.bulletPoints,
}: ProfileStoryProps) {
  return (
    <section className="page-section flex flex-col gap-10 backdrop-blur">
      <h2 className="font-display text-2xl font-semibold text-brand-deep">{title}</h2>
      <p className="text-base leading-8 text-brand-ink/80">{text}</p>
      <ul className="space-y-3 text-sm leading-7 text-brand-ink/80">
        {bulletPoints.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-emerald" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
