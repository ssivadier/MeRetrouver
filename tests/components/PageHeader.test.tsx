import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PageHeader } from '@/components/layout/PageHeader';

describe('PageHeader', () => {
  it('renders eyebrow, title and description', () => {
    render(
      <PageHeader
        eyebrow="Mes méthodes"
        title="Hypnose"
        description="Une approche bienveillante."
      />
    );
    expect(screen.getByText('Mes méthodes')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hypnose');
    expect(screen.getByText('Une approche bienveillante.')).toBeInTheDocument();
  });

  it('renders as h2 when as prop is set', () => {
    render(<PageHeader eyebrow="Test" title="Titre" as="h2" />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Titre');
  });

  it('renders without description when not provided', () => {
    const { container } = render(<PageHeader eyebrow="Test" title="Titre" />);
    expect(container.querySelectorAll('p')).toHaveLength(1);
  });
});
