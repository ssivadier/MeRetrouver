"use client";

import Link from 'next/link';

const fallbackMailto = 'mailto:contact@meretrouver.fr';

export function BookingButton({ className = '' }: { className?: string }) {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  const href = bookingUrl ? bookingUrl : fallbackMailto;
  const target = bookingUrl ? '_blank' : undefined;
  const rel = bookingUrl ? 'noopener noreferrer' : undefined;

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`btn-cta-primary ${className}`.trim()}
    >
      {bookingUrl ? 'Prendre RDV' : 'Prendre RDV (mailto temporaire)'}
    </Link>
  );
}
