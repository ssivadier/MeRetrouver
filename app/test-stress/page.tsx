import { PageShell } from '@/components/layout/PageShell';
import { StressTest } from '@/components/stress-test/StressTest';
import { createBreadcrumbSchema } from '@/lib/breadcrumbs';
import { createPageMetadata } from '@/lib/seo';
import { StructuredData } from '@/components/seo/JsonLd';

export const metadata = createPageMetadata({
  title: 'Test de stress en ligne — Évaluez votre niveau',
  description:
    'Évaluez votre niveau de stress en 6 questions. Un outil gratuit pour prendre conscience de votre état et envisager un accompagnement à Pessac.',
  path: '/test-stress',
});

export default function TestStressPage() {
  return (
    <PageShell>
      <StressTest />
      <StructuredData data={createBreadcrumbSchema('/test-stress')} />
    </PageShell>
  );
}
