import type { MetadataRoute } from 'next';

const baseUrl = 'https://meretrouver.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/qui-suis-je',
    '/accompagnements',
    '/methodes',
    '/temoignages',
    '/tarifs',
    '/mentions-legales',
    '/politique-confidentialite',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
