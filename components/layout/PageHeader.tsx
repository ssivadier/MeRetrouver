type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  as?: 'h1' | 'h2';
};

export function PageHeader({ eyebrow, title, description, as: Heading = 'h1' }: PageHeaderProps) {
  return (
    <section className="page-section">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">{eyebrow}</p>
      <Heading className="mt-3 font-display text-3xl font-semibold text-brand-deep sm:text-4xl">{title}</Heading>
      {description ? (
        <p className="mt-4 text-lg leading-8 text-brand-ink/80">{description}</p>
      ) : null}
    </section>
  );
}
