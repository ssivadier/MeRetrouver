import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { PageShell } from '@/components/layout/PageShell';
import { StructuredData } from '@/components/seo/JsonLd';
import { BookingButton } from '@/components/ui/BookingButton';
import { pricingBenefits, pricingModalities } from '@/content/pricing';
import { createBreadcrumbSchema } from '@/lib/breadcrumbs';
import { createPageMetadata } from '@/lib/seo';

const cardAccents = ['border-t-brand-gold', 'border-t-brand-burgundy', 'border-t-brand-emerald'];

export const metadata = createPageMetadata({
  title: 'Tarifs',
  description:
    'Séance d\'hypnothérapie à 70 €. Remboursement possible par certaines mutuelles. Séances en cabinet, à domicile ou en visio à Pessac.',
  path: '/tarifs',
});


export default function TarifsPage() {
  return (
    <PageShell>
      <Reveal>
        <section className="page-section flex flex-col items-center gap-8 text-center backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">
            Tarif transparent
          </p>
          <div className="space-y-2">
            <p className="font-display text-6xl font-bold text-brand-deep sm:text-7xl">
              70&nbsp;&euro;
            </p>
            <p className="text-base text-brand-ink/70">par séance d&apos;1 heure</p>
          </div>
          <p className="max-w-xl text-base leading-7 text-brand-ink/80">
            Un tarif unique, clair d&apos;avance. Pas de surprise, pas de frais cachés.
            Vous savez exactement à quoi vous vous engagez avant même de prendre rendez-vous.
          </p>
        </section>
      </Reveal>

      <Reveal delay={80}>
        <section className="mt-8 page-section flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
          <div className="flex-1 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">
              Remboursement possible
            </p>
            <p className="text-base leading-7 text-brand-ink/80">
              De nombreuses <span className="highlight-gold">mutuelles prennent en charge</span> une partie de l&apos;hypnothérapie, selon votre contrat et votre couverture.
              Il vous suffit de vérifier auprès de votre mutuelle les conditions applicables à votre situation.
            </p>
          </div>
          <div className="flex-1 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">
              Où se déroule la séance
            </p>
            <ul className="space-y-3 text-base leading-7 text-brand-ink/80">
              {pricingModalities.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-emerald" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Reveal>

      <Reveal delay={150}>
        <section className="page-section flex flex-col gap-10 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-deep">
            Ce que comprend chaque séance
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {pricingBenefits.map((item, i) => (
              <article key={item.title} className={`card-surface flex flex-col gap-3 border-t-2 ${cardAccents[i]}`}>
                <h3 className="font-display text-xl font-semibold text-brand-deep">{item.title}</h3>
                <p className="text-sm leading-7 text-brand-ink/80">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>


      <Reveal delay={200}>
        <section className="mt-8 page-section flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-2xl font-semibold text-brand-deep sm:text-3xl">
            Prêt à faire le premier pas&nbsp;?
          </h2>
          <p className="max-w-xl text-base leading-7 text-brand-ink/80">
            Prenez rendez-vous pour une première séance. C&apos;est un moment d&apos;échange, sans engagement, pour voir si cette approche peut vous aider.
          </p>
          <BookingButton />
        </section>
      </Reveal>

      <StructuredData data={createBreadcrumbSchema('/tarifs')} />
    </PageShell>
  );
}
