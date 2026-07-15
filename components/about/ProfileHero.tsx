import { profileDefaults } from '@/content/about';

type ProfileHeroProps = {
  name?: string;
  role?: string;
  imageAlt?: string;
  imageSrc?: string;
};

export function ProfileHero({
  name = profileDefaults.name,
  role = profileDefaults.role,
  imageAlt = profileDefaults.imageAlt,
  imageSrc = profileDefaults.imageSrc,
}: ProfileHeroProps) {
  return (
    <section className="page-section grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div className="flex justify-center lg:justify-start">
        <div className="flex h-56 w-56 items-center justify-center overflow-hidden rounded-full border-4 border-brand-emerald/20 bg-brand-paper shadow-soft sm:h-64 sm:w-64">
          <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">Qui suis-je</p>
        <h1 className="font-display text-3xl font-semibold text-brand-deep sm:text-4xl">{name}</h1>
        <p className="text-lg leading-8 text-brand-ink/80">{role}</p>
        <div className="rounded-2xl border border-brand-mist bg-brand-paper/70 p-5 text-sm leading-7 text-brand-ink/80">
          <p className="font-medium text-brand-deep">Pourquoi vouloir aider?</p>
          <p className="mt-2">
            "Lorsque vous apportez la paix aux autres, vous l’apportez à vous-même." - Bouddha
          </p>
        </div>
      </div>
    </section>
  );
}
