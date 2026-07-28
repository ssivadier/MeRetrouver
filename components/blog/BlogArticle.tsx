import Link from 'next/link';
import { BookingButton } from '@/components/ui/BookingButton';

export function BlogArticle({ post, children }: { post: { title: string; date: string; description: string; readingTime: string }; children: React.ReactNode }) {
  return (
    <article className="page-section flex flex-col gap-8">
      <header className="space-y-3">
        <Link href="/blog" className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald transition hover:text-brand-deep">
          ← Retour au blog
        </Link>
        <div className="flex items-center gap-3 text-xs text-brand-ink/50">
          <time>{new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="font-display text-3xl font-semibold text-brand-deep sm:text-4xl">
          {post.title}
        </h1>
        <p className="text-base leading-7 text-brand-ink/80">
          {post.description}
        </p>
      </header>

      <div className="prose prose-brand max-w-none text-base leading-7 text-brand-ink/80">
        {children}
      </div>

      <section className="page-section flex flex-col items-center gap-4 text-center">
        <p className="text-base leading-7 text-brand-ink/80">
          Vous vous reconnaissez dans cet article ? Un accompagnement peut vous aider.
        </p>
        <BookingButton />
      </section>
    </article>
  );
}
