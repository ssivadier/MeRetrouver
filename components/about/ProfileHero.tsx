type ProfileHeroProps = {
  name?: string;
  role?: string;
  imageAlt?: string;
};

export function ProfileHero({
  name = 'Votre prénom et nom',
  role = 'Praticien.ne en hypnothérapie et accompagnement du stress',
  imageAlt = 'Portrait du praticien',
}: ProfileHeroProps) {
  return (
    <section className="grid gap-8 rounded-[2rem] border border-brand-mist bg-white/90 p-8 shadow-soft lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:p-10">
      <div className="flex justify-center lg:justify-start">
        <div className="flex h-56 w-56 items-center justify-center overflow-hidden rounded-full border-4 border-brand-emerald/20 bg-brand-paper text-center text-sm font-medium text-brand-deep shadow-soft sm:h-64 sm:w-64">
          <span className="max-w-[10rem] px-4">Photo de profil à intégrer</span>
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">Qui suis-je</p>
        <h1 className="font-display text-3xl font-semibold text-brand-deep sm:text-4xl">{name}</h1>
        <p className="text-lg leading-8 text-brand-ink/80">{role}</p>
        <div className="rounded-2xl border border-brand-mist bg-brand-paper/70 p-5 text-sm leading-7 text-brand-ink/80">
          <p className="font-medium text-brand-deep">Zones de texte modulables</p>
          <p className="mt-2">
            Vous pourrez remplacer ce bloc par votre bio, votre formation suivie, vos années de pratique et votre approche personnelle.
          </p>
        </div>
      </div>
    </section>
  );
}
