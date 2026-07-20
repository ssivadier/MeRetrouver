import Link from 'next/link';
import { BookingButton } from '@/components/ui/BookingButton';
import { Reveal } from '@/components/ui/Reveal';
import { PageShell } from '@/components/layout/PageShell';
import { StructuredData } from '@/components/seo/JsonLd';
import { homePainPoints, homeOutcomes } from '@/content/home';
import { createBusinessSchema } from '@/content/site';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Accueil',
  description:
    'Vous êtes en mode survie ? Burnout, épuisement, perte de sommeil — un accompagnement structuré en hypnothérapie pour reconstruire vos fondations.',
  path: '/',
});

const homeSchema = createBusinessSchema({ includeLocalBusiness: true });

const cardAccents = ['border-t-brand-gold', 'border-t-brand-burgundy', 'border-t-brand-emerald'];

export default function HomePage() {
  return (
    <PageShell>
      <Reveal>
        <section className="page-section flex flex-col gap-10 backdrop-blur">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">
              quand le stress devient votre quotidien, il finit par prendre le contrôle.
            </p>
            <p className="text-base leading-8 text-brand-ink/80">
              Vous sentez des tensions dans votre corps, votre coeur qui s&apos;emballe, votre sommeil est instable, des reflux acides. Vous avez l&apos;impression que vous ne faites que <span className="highlight-gold">tenir le coup</span>.
              <br /><br />
              Malgré tous vos efforts, votre humeur et votre comportement ont changé. Vous voulez redevenir comme avant, <span className="highlight-gold">vous retrouver</span>, mais vous ne savez plus comment faire.
            </p>
          </div>

          <div className="space-y-4">
            <p className="font-display text-2xl font-semibold text-brand-deep">
              Reconnaitre 3 formes de stress
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {homePainPoints.map((item, i) => (
                <article key={item.title} className={`card-surface flex flex-col gap-3 border-t-2 ${cardAccents[i]}`}>
                  <h3 className="font-display text-xl font-semibold text-brand-deep">{item.title}</h3>
                  <p className="text-base leading-7 text-brand-ink/80">{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <BookingButton />
            <Link
              href="/test-stress"
              className="rounded-full border border-brand-gold/30 bg-brand-gold/10 px-6 py-3 text-sm font-semibold text-brand-deep transition hover:bg-brand-gold/20"
            >
              Quel mon niveau de stress ?
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal delay={100}>
        <section className="page-section flex flex-col gap-10 backdrop-blur">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">
              En quoi nous pouvons vous aider ?
            </p>
            <p className="text-base leading-7 text-brand-ink/80">
              Notre approche n&apos;est pas sur les symptomes, comme le sont les médicaments, mais sur <span className="highlight-gold">la cause du stress</span>.
              <br /><br />
              La cause de ce stress peut revetir plusieurs formes, mais sa conséquence est un déséquilibre entre le systeme sympathique et parasympathique qui induit une réaction forte. C&apos;est utile et naturel. Lorsque le danger est réel (un tigre en face de vous par exemple), cela vous protège. Mais dans nos vies sur-stimulées, ou suite à un traumatisme, ce déséquilibre tend à ne pas revenir à la normale.
              <br /><br />
              Par ailleurs, nous n&apos;utilisons que des pratiques pour lesquelles il y a eu des études scientifiques et dont <span className="highlight-gold">l&apos;efficacité a été démontrée</span>. Pas d&apos;ésotérisme ou de croyances.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {homeOutcomes.map((item, i) => (
              <article key={item.title} className={`card-surface flex flex-col gap-3 border-t-2 ${cardAccents[i]}`}>
                <h3 className="font-display text-xl font-semibold text-brand-deep">{item.title}</h3>
                <p className="text-base leading-7 text-brand-ink/80">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={150}>
        <section className="mt-8 page-section flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-2xl font-semibold text-brand-deep">
            Vous méritez de ne plus subir, mais de vous retrouver.
          </h2>
          <p className="max-w-xl text-base leading-7 text-brand-ink/80">
            Une première séance pour faire le point, sans engagement. Vous verrez si cette approche peut vous aider à retrouver un rythme qui vous ressemble.
          </p>
          <BookingButton />
        </section>
      </Reveal>

      <StructuredData data={homeSchema} />
    </PageShell>
  );
}
