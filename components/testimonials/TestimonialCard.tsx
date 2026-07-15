import type { Testimonial } from '@/content/testimonials';

type TestimonialCardProps = Testimonial;

export function TestimonialCard({
  name,
  initials,
  quote,
  rating,
  photoAlt,
}: TestimonialCardProps) {
  return (
    <article className="card-surface flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-emerald/10 text-sm font-semibold text-brand-emerald">
          {initials ?? name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-brand-deep">{name}</p>
          {rating ? <p className="text-sm text-brand-ink/70">Note : {rating}/5</p> : null}
        </div>
      </div>
      <p className="text-sm leading-7 text-brand-ink/80">“{quote}”</p>
      {photoAlt ? <p className="text-xs uppercase tracking-[0.3em] text-brand-ink/50">{photoAlt}</p> : null}
    </article>
  );
}
