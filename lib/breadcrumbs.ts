import { siteConfig, navLinks } from '@/content/site';

const baseUrl = siteConfig.baseUrl as string;

export function createBreadcrumbSchema(path: string) {
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Accueil',
      item: baseUrl,
    },
  ];

  if (path !== '/') {
    const matched = navLinks.find((link) => link.href === path);
    if (matched) {
      itemListElement.push({
        '@type': 'ListItem',
        position: 2,
        name: matched.label,
        item: `${baseUrl}${path}`,
      });
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}
