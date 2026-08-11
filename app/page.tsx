import Link from 'next/link';
import { BookingButton } from '@/components/ui/BookingButton';
import { Reveal } from '@/components/ui/Reveal';
import { PageShell } from '@/components/layout/PageShell';
import { StructuredData } from '@/components/seo/JsonLd';
import { homePainPoints, homeOutcomes } from '@/content/home';
import { createBusinessSchema } from '@/content/site';
import { createPageMetadata } from '@/lib/seo';
import { cardAccents } from '@/lib/design-tokens';

export const metadata = createPageMetadata({
  title: 'Hypnothérapie Pessac — Stress, burnout, phobies',
  description:
    'Accompagnement en hypnothérapie à Pessac et Bordeaux. Burnout, stress, phobies — une méthode structurée pour reconstruire vos fondations.',
  path: '/',
});

const homeSchema = createBusinessSchema({ includeLocalBusiness: true });

export default function HomePage() {
  return (
    <PageShell>
      <Reveal>
        <section className="page-section flex flex-col gap-10">
          <div className="space-y-6">
            <h1 className="sr-only">Hypnothérapie à Pessac — Accompagnement stress, burnout, phobies</h1>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">
              "Je ne me reconnais plus, et je ne sais plus comment revenir à qui j'étais."
            </p>
            <p className="text-base leading-7 text-brand-ink/80">
              Ce n&apos;est pas juste &quot;J&apos;ai du stress&quot; (<a href="https://fondation-ramsaysante.com/observatoire-stress" target="_blank" rel="noopener noreferrer" className="font-medium text-brand-emerald underline underline-offset-2 transition hover:text-brand-deep">59% des Français sont en état de stress en 2025.</a>). Mais quelque part entre votre corps qui essaie de vous dire que ça ne va pas (votre cœur qui s&apos;emballe, votre sommeil instable, des reflux acides, crises de panique,...) et votre humeur qui change malgré vos efforts (impatience, isolements, colères,...), vous perdez le contrôle de votre vie. Vous avez l&apos;impression que vous ne faites que <span className="highlight-gold">tenir le coup</span>, mais vous naviguez entre la culpabilité de ne pas réussir à aller mieux et le sentiment que chaque jour est un fardeau.
              <br /><br />
              Vous voulez redevenir comme avant, <span className="highlight-gold">vous retrouver</span>, reprendre du plaisir à être avec vos enfants, votre conjoint(e) et vos amis, mais vous ne savez plus comment faire. Vous n&apos;êtes ni faible, ni seul(e) dans ce cas. Mais si vous ne traitez pas la cause, avec les bons outils, vous risquez de traîner cette souffrance pendant des années au lieu de profiter de l&apos;instant présent.
            </p>
          </div>

          <div className="space-y-4">
            <p className="font-display text-2xl font-semibold text-brand-deep">
              Reconnaître 3 formes de stress
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
            <Link href="/test-stress" className="btn-cta-secondary">
              Estimer mon niveau de stress
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal delay={100}>
        <section className="page-section flex flex-col gap-10">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">
              En quoi nous pouvons vous aider ?
            </p>
            <p className="font-display text-lg font-semibold text-brand-deep">
              Vous ne cherchez pas seulement à &quot;moins stresser&quot;. Vous cherchez à <span className="highlight-gold">redevenir vous-même</span>. Voici comment je vous y accompagne.
            </p>
            <p className="text-base leading-7 text-brand-ink/80">
              Notre approche en hypnothérapie à Pessac n&apos;est pas sur les symptômes, mais sur <span className="highlight-gold">la cause du stress</span>.
              <br /><br />
              La cause de ce stress peut revêtir plusieurs formes, mais sa conséquence est un déséquilibre entre le système sympathique et parasympathique qui induit une réaction forte. C&apos;est utile et naturel. Lorsque le danger est réel (un tigre en face de vous par exemple), cela vous protège. Mais dans nos vies sur-stimulées, ou suite à un traumatisme, ce déséquilibre tend à ne pas revenir à la normale.
              <br /><br />
              Par ailleurs, nous n&apos;utilisons que des pratiques pour lesquelles il y a eu des études scientifiques et dont <span className="highlight-gold">l&apos;efficacité a été démontrée</span>. Pas d&apos;ésotérisme, uniquement des pratiques qui ont fait leurs preuves, et qui sont adaptées à votre situation.
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
        <section className="page-section flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-2xl font-semibold text-brand-deep">
            Vous méritez de ne plus subir, mais de vous retrouver.
          </h2>
          <p className="max-w-xl text-base leading-7 text-brand-ink/80">
            Une première séance pour faire le point, sans engagement. Vous verrez si cette approche peut vous aider à retrouver un rythme qui vous ressemble.
          </p>
          <BookingButton />
          <p className="text-xs leading-5 text-brand-ink/50">
            Cet accompagnement ne se substitue pas à un suivi médical ou psychologique si nécessaire.
          </p>
        </section>
      </Reveal>

      <StructuredData data={homeSchema} />
    </PageShell>
  );
}
