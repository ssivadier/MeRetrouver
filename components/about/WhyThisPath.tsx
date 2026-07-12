type WhyThisPathProps = {
  title?: string;
  intro?: string;
  points?: string[];
};

export function WhyThisPath({
  title = 'Pourquoi j’ai choisi cette voie',
  intro = 'Ajoutez ici un texte plus humain, personnel et vivant pour expliquer votre motivation, votre sensibilité et votre manière de transmettre.',
  points = ['Votre histoire personnelle', 'Votre sens du soin', 'Ce qui vous guide dans votre pratique'],
}: WhyThisPathProps) {
  return (
    <section className="rounded-[2rem] border border-brand-mist bg-brand-paper/60 p-8 shadow-soft">
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
