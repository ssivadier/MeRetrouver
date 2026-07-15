"use client";

import Link from 'next/link';
import { siteConfig } from '@/content/site';

const fallbackMailto = `mailto:${siteConfig.email}`;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function BookingButton({ className = '' }: { className?: string }) {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  const href = bookingUrl ? bookingUrl : fallbackMailto;
  const target = bookingUrl ? '_blank' : undefined;
  const rel = bookingUrl ? 'noopener noreferrer' : undefined;

  const handleClick = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const gaMeasurementId = process.env.NEXT_PUBLIC_GA_ID?.trim();
    if (!gaMeasurementId) {
      return;
    }

    window.gtag?.('event', 'take_rdv_click', {
      event_category: 'conversion',
      event_label: 'booking_button',
      value: 1,
      transport_type: 'beacon',
    });
  };

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      onClick={handleClick}
      className={`btn-cta-primary ${className}`.trim()}
    >
      {bookingUrl ? 'Prendre RDV' : 'Prendre RDV (mailto temporaire)'}
    </Link>
  );
}
