import { siteConfig } from '@/content/site';

export function ContactDetails() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-brand-mist bg-brand-paper/70 p-4 text-sm leading-7 text-brand-ink/80">
        <p className="font-semibold text-brand-deep">Téléphone</p>
        <p className="mt-1">
          <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="transition hover:text-brand-emerald">
            {siteConfig.phone}
          </a>
        </p>
      </div>
      <div className="rounded-2xl border border-brand-mist bg-brand-paper/70 p-4 text-sm leading-7 text-brand-ink/80">
        <p className="font-semibold text-brand-deep">E-mail</p>
        <p className="mt-1">
          <a href={`mailto:${siteConfig.email}`} className="transition hover:text-brand-emerald">
            {siteConfig.email}
          </a>
        </p>
      </div>
    </div>
  );
}
