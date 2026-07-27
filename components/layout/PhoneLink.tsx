'use client';

const PHONE_PARTS = ['+33', '6', '12', '34', '56', '78'];

export function PhoneLink() {
  const phone = PHONE_PARTS.join(' ');
  const phoneHref = PHONE_PARTS.join('');

  return (
    <div className="rounded-2xl border border-brand-mist bg-brand-paper/70 p-4 text-sm leading-7 text-brand-ink/80">
      <p className="font-semibold text-brand-deep">Téléphone</p>
      <p className="mt-1">
        <a href={`tel:${phoneHref}`} className="transition hover:text-brand-emerald">
          {phone}
        </a>
      </p>
    </div>
  );
}
