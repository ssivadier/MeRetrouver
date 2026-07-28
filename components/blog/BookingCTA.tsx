'use client';

import { BookingButton } from '@/components/ui/BookingButton';

export function BookingCTA() {
  return (
    <div className="my-6 rounded-2xl border border-brand-mist bg-brand-paper/70 p-6 text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">
        Envie d&apos;en parler ?
      </p>
      <BookingButton />
    </div>
  );
}
