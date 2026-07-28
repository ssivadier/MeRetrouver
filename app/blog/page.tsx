import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { Reveal } from '@/components/ui/Reveal';
import { createPageMetadata } from '@/lib/seo';
import { getAllPosts } from '@/lib/blog';

export const metadata = createPageMetadata({
  title: 'Blog — Hypnothérapie, stress, burnout',
  description:
    'Articles et conseils sur le stress, le burnout, les phobies et l\u2019hypnothérapie. Ressources pour mieux comprendre et agir.',
  path: '/blog',
});

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <PageShell>
      <Reveal>
        <section className="page-section flex flex-col gap-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">
              Blog
            </p>
            <h1 className="font-display text-3xl font-semibold text-brand-deep sm:text-4xl">
              Articles et ressources
            </h1>
            <p className="max-w-2xl text-base leading-7 text-brand-ink/80">
              Réflexions, conseils et informations sur le stress, le burnout et l&apos;accompagnement en hypnothérapie.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-base leading-7 text-brand-ink/80">
              Le blog arrive bientôt. Revenez prochainement !
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {featured && (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="card-surface group flex flex-col gap-3 border-t-2 border-brand-emerald transition hover:border-brand-gold"
                >
                  <div className="flex items-center gap-3 text-xs text-brand-ink/50">
                    <time>{new Date(featured.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                    <span>·</span>
                    <span>{featured.readingTime}</span>
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-brand-deep transition group-hover:text-brand-emerald">
                    {featured.title}
                  </h2>
                  <p className="text-sm leading-7 text-brand-ink/80">
                    {featured.description}
                  </p>
                  <span className="text-sm font-semibold text-brand-emerald transition group-hover:text-brand-deep">
                    Lire la suite →
                  </span>
                </Link>
              )}

              {rest.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2">
                  {rest.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="card-surface group flex flex-col gap-3 border-t-2 border-brand-emerald transition hover:border-brand-gold"
                    >
                      <div className="flex items-center gap-3 text-xs text-brand-ink/50">
                        <time>{new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                        <span>·</span>
                        <span>{post.readingTime}</span>
                      </div>
                      <h2 className="font-display text-xl font-semibold text-brand-deep transition group-hover:text-brand-emerald">
                        {post.title}
                      </h2>
                      <p className="text-sm leading-7 text-brand-ink/80">
                        {post.description}
                      </p>
                      <span className="text-sm font-semibold text-brand-emerald transition group-hover:text-brand-deep">
                        Lire la suite →
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </Reveal>
    </PageShell>
  );
}
