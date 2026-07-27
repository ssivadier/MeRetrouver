'use client';

import { useState } from 'react';

const EMAIL_PARTS = ['contact', '@', 'meretrouver', '.', 'fr'];

export function ContactForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const email = EMAIL_PARTS.join('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Prise de contact — ${name}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand-mist bg-brand-paper/70 p-4 text-sm leading-7 text-brand-ink/80">
        <p className="font-semibold text-brand-deep">E-mail</p>
        <p className="mt-1">
          Votre client mail s&apos;est ouvert avec votre message.{' '}
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-brand-emerald underline underline-offset-2 hover:text-brand-deep"
          >
            Envoyer un autre message
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-brand-mist bg-brand-paper/70 p-4 text-sm leading-7 text-brand-ink/80">
      <p className="font-semibold text-brand-deep">E-mail</p>
      <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Votre nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="rounded-lg border border-brand-mist bg-white px-3 py-2 text-sm text-brand-ink outline-none focus:border-brand-emerald"
        />
        <textarea
          placeholder="Votre message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={3}
          className="rounded-lg border border-brand-mist bg-white px-3 py-2 text-sm text-brand-ink outline-none focus:border-brand-emerald"
        />
        <button type="submit" className="btn-cta-primary self-start">
          Envoyer
        </button>
      </form>
    </div>
  );
}
