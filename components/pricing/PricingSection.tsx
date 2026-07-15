import type { PricingSection as PricingSectionData } from '@/content/pricing';

type PricingSectionProps = PricingSectionData;

export function PricingSection({ title, content }: PricingSectionProps) {
  return (
    <section className="page-section">
      <h2 className="font-display text-2xl font-semibold text-brand-deep">{title}</h2>
      <ul className="mt-4 space-y-3 text-base leading-8 text-brand-ink/80">
        {content.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-emerald" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
