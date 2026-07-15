import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StructuredData } from '@/components/seo/JsonLd';

describe('StructuredData', () => {
  it('renders a script tag with correct type and JSON content', () => {
    const data = { '@type': 'MedicalBusiness', name: 'Test' };
    const { container } = render(<StructuredData data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    expect(script?.textContent).toBe(JSON.stringify(data));
  });
});
