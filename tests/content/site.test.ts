import { describe, it, expect } from 'vitest';
import { createBusinessSchema, siteConfig } from '@/content/site';

describe('createBusinessSchema', () => {
  it('returns MedicalBusiness schema by default', () => {
    const schema = createBusinessSchema();
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('MedicalBusiness');
    expect(schema.name).toBe(siteConfig.name);
    expect(schema.telephone).toBe(siteConfig.phone);
    expect(schema.email).toBe(siteConfig.email);
  });

  it('includes LocalBusiness when option is set', () => {
    const schema = createBusinessSchema({ includeLocalBusiness: true });
    expect(schema['@type']).toEqual(['LocalBusiness', 'MedicalBusiness']);
  });

  it('includes sameAs when provided', () => {
    const schema = createBusinessSchema({ sameAs: ['https://facebook.com/test'] });
    expect(schema.sameAs).toEqual(['https://facebook.com/test']);
  });

  it('does not include sameAs when not provided', () => {
    const schema = createBusinessSchema();
    expect(schema.sameAs).toBeUndefined();
  });
});
