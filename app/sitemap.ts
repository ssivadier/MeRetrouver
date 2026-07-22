import type { MetadataRoute } from 'next';
import { siteConfig, sitemapRoutes } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.map((route) => ({
    url: `${siteConfig.baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
