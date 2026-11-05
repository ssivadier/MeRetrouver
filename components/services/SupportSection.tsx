import Link from 'next/link';
import { supportingMethods } from '@/content/services';

export function SupportSection() {
  return (
    <section className="page-section">
      <div className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-brand-deep">Ce qui soutient cette démarche</h2>
        <p className="text-base leading-7 text-brand-ink/80">
          Des pratiques dont l&apos;efficacité a été étudiée, présentées en toute transparence. L&apos;hypnose est la pratique
          centrale ; la cohérence cardiaque et les rythmes binauraux la complètent selon votre situation.
        </p>
      </div>
      <div className="mt-6 rounded-2xl border border-brand-mist bg-white/90 p-5">
        <div className="space-y-4">
          {supportingMethods.map((method) => (
            <div key={method.name} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-base font-semibold text-brand-deep">{method.name}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  method.evidence === 'preuve solide'
                    ? 'bg-brand-emerald/10 text-brand-emerald'
                    : 'bg-brand-gold/10 text-brand-gold'
                }`}>
                  {method.evidence}
                </span>
              </div>
              <p className="text-sm leading-6 text-brand-ink/80">{method.keyResult}</p>
              {method.studyLink && (
                <Link href={method.studyLink} className="text-xs font-medium text-brand-emerald underline underline-offset-2 transition hover:text-brand-deep">
                  Voir l&apos;étude →
                </Link>
              )}
            </div>
          ))}
        </div>
        <Link href="/methodes" className="mt-5 inline-block text-sm font-semibold text-brand-emerald underline underline-offset-2 transition hover:text-brand-deep">
          Voir les études détaillées →
        </Link>
        <p className="mt-5 text-xs italic leading-6 text-brand-ink/60">
          Cet accompagnement ne se substitue pas à un suivi médical ou psychologique si nécessaire.
        </p>
      </div>
    </section>
  );
}
