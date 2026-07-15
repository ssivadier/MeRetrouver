import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BookingButton } from '@/components/ui/BookingButton';

describe('BookingButton', () => {
  it('renders with mailto fallback when no booking URL is set', () => {
    const { container } = render(<BookingButton />);
    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute('href', 'mailto:contact@meretrouver.fr');
    expect(links[0]).not.toHaveAttribute('target');
  });

  it('applies custom className', () => {
    const { container } = render(<BookingButton className="mt-4" />);
    const link = container.querySelector('a')!;
    expect(link.className).toContain('mt-4');
    expect(link.className).toContain('btn-cta-primary');
  });
});
