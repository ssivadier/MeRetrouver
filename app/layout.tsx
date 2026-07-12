import './globals.css';
import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import Script from 'next/script';
import { SiteLayout } from '@/components/site-layout';

const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['500', '600', '700'],
});

const bodyFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_ID?.trim();

export const metadata: Metadata = {
  metadataBase: new URL('https://meretrouver.fr'),
  title: {
    default: 'Me Retrouver | Hypnothérapie & gestion du stress',
    template: '%s | Me Retrouver',
  },
  description: 'Site vitrine professionnel pour l’hypnothérapie, le stress, le burnout, les phobies et la gestion émotionnelle.',
  alternates: {
    canonical: 'https://meretrouver.fr',
  },
  openGraph: {
    title: 'Me Retrouver | Hypnothérapie & gestion du stress',
    description: 'Site vitrine professionnel pour l’hypnothérapie, le stress, le burnout, les phobies et la gestion émotionnelle.',
    url: 'https://meretrouver.fr',
    siteName: 'Me Retrouver',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen bg-brand-paper font-body text-brand-ink">
        {gaMeasurementId ? (
          <>
            <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        ) : null}
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
