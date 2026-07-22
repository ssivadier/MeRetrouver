import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';

type PageMetadataOptions = {
  title?: string;
  description: string;
  path: string;
};

export function createPageMetadata({ title, description, path }: PageMetadataOptions): Metadata {
  const url = `${siteConfig.baseUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description,
      url,
      type: 'website',
      locale: 'fr_FR',
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.baseUrl}/og-default.png`,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
  };
}
