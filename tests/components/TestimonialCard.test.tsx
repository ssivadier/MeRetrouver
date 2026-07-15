import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TestimonialCard } from '@/components/testimonials/TestimonialCard';

describe('TestimonialCard', () => {
  const baseProps = {
    name: 'Claire M.',
    initials: 'CM',
    quote: 'Témoignage excellent.',
    rating: 5,
    photoAlt: '',
  };

  it('renders name, initials and quote', () => {
    render(<TestimonialCard {...baseProps} />);
    expect(screen.getByText('Claire M.')).toBeInTheDocument();
    expect(screen.getByText('CM')).toBeInTheDocument();
    expect(screen.getByText(/Témoignage excellent/)).toBeInTheDocument();
  });

  it('renders rating when provided', () => {
    render(<TestimonialCard {...baseProps} />);
    expect(screen.getByText(/Note :/)).toBeInTheDocument();
    expect(screen.getByText(/\/5/)).toBeInTheDocument();
  });

  it('does not render rating when 0', () => {
    render(<TestimonialCard {...baseProps} rating={0} />);
    expect(screen.queryByText(/Note/)).not.toBeInTheDocument();
  });

  it('uses initials prop directly (even if empty)', () => {
    const { container } = render(<TestimonialCard {...baseProps} initials="" />);
    const initialsBox = container.querySelector('.bg-brand-emerald\\/10');
    expect(initialsBox).toBeInTheDocument();
    expect(initialsBox?.textContent).toBe('');
  });

  it('renders photoAlt when provided', () => {
    render(<TestimonialCard {...baseProps} photoAlt="Photo consentie" />);
    expect(screen.getByText('Photo consentie')).toBeInTheDocument();
  });
});
