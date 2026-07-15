import * as Sentry from '@sentry/nextjs';

export function register() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    enabled: process.env.NODE_ENV === 'production',
    ignoreErrors: ['ResizeObserver loop', 'Non-Error promise rejection'],
  });
}

export const onRequestError = Sentry.captureRequestError;
