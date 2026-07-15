"use client";

import * as Sentry from '@sentry/nextjs';
import NextErrorComponent from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="fr">
      <body>
        <NextErrorComponent statusCode={0} />
      </body>
    </html>
  );
}
