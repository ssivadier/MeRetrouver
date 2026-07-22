import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page-section flex flex-col items-center gap-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">
        Page introuvable
      </p>
      <h1 className="font-display text-3xl font-semibold text-brand-deep sm:text-4xl">
        Oups, cette page n&apos;existe pas
      </h1>
      <p className="max-w-md text-base leading-7 text-brand-ink/80">
        La page que vous cherchez a peut-être été déplacée ou n&apos;existe plus.
      </p>
      <Link href="/" className="btn-cta-primary">
        Retour à l&apos;accueil
      </Link>
    </section>
  );
}
