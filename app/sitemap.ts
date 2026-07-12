import type { MetadataRoute } from 'next';

const baseUrl = 'https://meretrouver.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/qui-suis-je',
    '/accompagnements',
    '/methodes',
    '/preuves-scientifiques',
    '/temoignages',
    '/tarifs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
