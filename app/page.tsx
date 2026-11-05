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
              Vous voulez à nouveau vivre pleinement?
            </p>
            <p className="text-base leading-7 text-brand-ink/80">
              Vous n'êtes pas seul(e) à vous sentir stréssé(e). <a href="https://fondation-ramsaysante.com/observatoire-stress" target="_blank" rel="noopener noreferrer" className="font-medium text-brand-emerald underline underline-offset-2 transition hover:text-brand-deep">59% des Français sont en état de stress en 2025</a>. Un chiffre en hausse constante.
              <br /><br />
              Ca peut être dû à un <span className="highlight-gold">épuisement qui dure</span> et vous vide, à une <span className="highlight-gold">peur qui vous bloque</span> et vous fait renoncer, ou à des <span className="highlight-gold">souvenirs qui reviennent</span> sans prévenir... 
              <br /><br />
              Vous voulez redevenir comme avant, <span className="highlight-gold">vous retrouver</span>, et reprendre du plaisir à être avec vos enfants, votre conjoint(e) et vos amis. Mais si vous ne traitez pas la cause, avec les bons outils, vous risquez de traîner cette souffrance pendant des années au lieu de profiter de l&apos;instant présent.
            </p>
          </div>

          <div className="space-y-4">
            <p className="font-display text-2xl font-semibold text-brand-deep">
              Pourquoi me faire confiance?
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {homeOutcomes.map((item, i) => (                
              <article key={item.title} className={`card-surface flex flex-col gap-3 border-t-2 ${cardAccents[i]}`}>
                <h3 className="font-display text-xl font-semibold text-brand-deep">{item.title}</h3>
                <p className="text-base leading-7 text-brand-ink/80">{item.description}</p>
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
              En quoi puis-je vous aider ?
            </p>
            <p className="text-base leading-7 text-brand-ink/80">
              La cause de votre stress peut revêtir plusieurs formes, mais sa conséquence est un déséquilibre entre le système sympathique et parasympathique qui induit une réaction forte. C&apos;est utile et naturel lorsque le danger est réel (un tigre en face de vous par exemple), cela vous protège. Mais dans nos vies sur-stimulées, ou suite à un traumatisme, ce déséquilibre tend à ne pas revenir à la normale.
              <br /><br />
              Mon approche en hypnothérapie vous aide à rééquilibrer naturellement votre système nerveux et vise à vous aider à identifier les ressources dont vous disposez déjà, mais dont vous n'avez pas conscience, pour pouvoir vous remettre en action.
            </p>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">
              Quelques craintes courantes concernant l'hypnose
            </p>
            <ul className="list-inside list-disc space-y-2 text-base leading-7 text-brand-ink/80">
              <li>Vous ne <span className="highlight-gold">perdez pas le contrôle</span>, vous restez conscient(e) à chaque étape. C'est d'ailleurs essentiel puisque votre rôle dans l'hypnose thérapeutique sera actif. C'est vous qui chercherez en vous-même les ressources cachées dont vous disposez. </li>
              <li>Vous n'êtes <span className="highlight-gold">pas endormi(e)</span>, vous êtes dans un état de conscience modifié, très focalisé en vous, comme lorsque vous êtes plongé(e) dans un livre et que vous n'entendez pas qu'on vous appelle.</li>
              <li>Vous n'êtes <span className="highlight-gold">pas manipulé(e)</span>, vous restez maître de vos décisions. Je vous inviterai, par mes paroles, par l'histoire que je raconte, mais vous serez toujours libre d'accepter ou non chaque suggestion que je ferai.</li>
            </ul>
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
