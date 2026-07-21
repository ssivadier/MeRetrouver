export const siteConfig = {
  name: 'Me Retrouver',
  tagline: 'Hypnothérapie',
  baseUrl: 'https://meretrouver.fr',
  description:
    'Site vitrine professionnel pour l’hypnothérapie, le stress, le burnout, les phobies et la gestion émotionnelle.',
  phone: '+33 6 12 34 56 78',
  email: 'contact@meretrouver.fr',
  address: {
    streetAddress: 'À définir',
    addressLocality: 'Pessac',
    addressRegion: 'Nouvelle-Aquitaine',
    postalCode: '33600',
    addressCountry: 'FR',
  },
  areaServed: 'Pessac, Bordeaux et à distance',
  businessDescription:
    'Pratique d’hypnothérapie et d’accompagnement autour du stress, du burnout, des phobies et de la gestion émotionnelle.',
} as const;

export const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/qui-suis-je', label: 'Qui suis-je' },
  { href: '/accompagnements', label: 'Mes accompagnements' },
  { href: '/methodes', label: 'Pratiques' },
  { href: '/temoignages', label: 'Témoignages' },
  { href: '/test-stress', label: 'Test de stress' },
  { href: '/tarifs', label: 'Tarifs' },
] as const;

export const sitemapRoutes = [
  '',
  '/qui-suis-je',
  '/accompagnements',
  '/methodes',
  '/temoignages',
  '/test-stress',
  '/tarifs',
  '/mentions-legales',
  '/politique-confidentialite',
  '/contact',
] as const;

export function createBusinessSchema(options?: { includeLocalBusiness?: boolean; sameAs?: string[] }) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': options?.includeLocalBusiness ? ['LocalBusiness', 'MedicalBusiness'] : 'MedicalBusiness',
    name: siteConfig.name,
    url: siteConfig.baseUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    description: siteConfig.businessDescription,
    areaServed: {
      '@type': 'Place',
      name: siteConfig.areaServed,
    },
    address: {
      '@type': 'PostalAddress',
      ...siteConfig.address,
    },
  };

  if (options?.sameAs) {
    schema.sameAs = options.sameAs;
  }

  return schema;
}
