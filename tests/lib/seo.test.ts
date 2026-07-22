import { describe, it, expect } from 'vitest';
import { createPageMetadata } from '@/lib/seo';

describe('createPageMetadata', () => {
  it('returns correct title, description and canonical', () => {
    const meta = createPageMetadata({
      title: 'Contact',
      description: 'Page de contact.',
      path: '/contact',
    });

    expect(meta.title).toBe('Contact');
    expect(meta.description).toBe('Page de contact.');
    expect(meta.alternates?.canonical).toBe('https://meretrouver.fr/contact');
  });

  it('generates correct Open Graph data', () => {
    const meta = createPageMetadata({
      title: 'Tarifs',
      description: 'Nos tarifs.',
      path: '/tarifs',
    });

    expect(meta.openGraph).toEqual({
      title: 'Tarifs | Me Retrouver',
      description: 'Nos tarifs.',
      url: 'https://meretrouver.fr/tarifs',
      type: 'website',
      locale: 'fr_FR',
      siteName: 'Me Retrouver',
      images: [
        {
          url: 'https://meretrouver.fr/og-default.png',
          width: 1200,
          height: 630,
          alt: 'Me Retrouver',
        },
      ],
    });
  });
});
