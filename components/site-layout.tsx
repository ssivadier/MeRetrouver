"use client";

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BookingButton } from '@/components/ui/BookingButton';
import { PageTransition } from '@/components/ui/PageTransition';
import { navLinks, siteConfig } from '@/content/site';

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        buttonRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, close]);

  useEffect(() => {
    if (open) {
      menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    }
  }, [open]);

  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/fond.png';
    img.onload = () => setBgLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-brand-paper text-brand-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-deep focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Aller au contenu principal
      </a>
      <div className={`bg-image ${bgLoaded ? 'bg-image-loaded' : ''}`} />
      <header className="sticky top-0 z-50 border-b border-brand-mist/80 bg-brand-paper/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-brand-mist bg-white shadow-soft">
              <img src="/Logo.png" alt="Me Retrouver" className="h-11 w-11 object-cover" />
            </div>
            <div>
              <p className="font-body text-[1.55rem] font-light uppercase tracking-[0.22em] leading-none text-brand-deep">{siteConfig.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-brand-emerald">{siteConfig.tagline}</p>
            </div>
          </Link>

          <button
            ref={buttonRef}
            className="rounded-full border border-brand-mist bg-white p-2 text-brand-deep md:hidden"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>

          <nav className="hidden items-center gap-2 text-sm font-medium text-brand-deep md:flex lg:gap-3" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="whitespace-nowrap rounded-lg px-2 py-2 transition hover:text-brand-emerald lg:px-2.5">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:inline-flex">
            <BookingButton />
          </div>
        </div>

        {open && (
          <div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-label="Menu de navigation"
            className="border-t border-brand-mist bg-white/95 px-4 py-4 md:hidden"
          >
            <nav className="flex flex-col gap-3 text-sm font-medium text-brand-deep" aria-label="Navigation mobile">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 transition hover:text-brand-emerald" onClick={close}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 inline-flex">
              <BookingButton onClick={close} />
            </div>
          </div>
        )}
      </header>

      <main id="main-content" className="relative z-10"><PageTransition>{children}</PageTransition></main>

      <footer className="relative z-10 border-t border-brand-mist bg-brand-deep/90 backdrop-blur-sm px-4 py-10 text-sm text-white/90 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-2">
            <p className="font-display text-2xl text-white">{siteConfig.name}</p>
            <p>
              Accompagnement professionnel autour de l&apos;hypnothérapie, du stress et de la gestion émotionnelle dans un cadre respectueux et rassurant.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold">Liens rapides</p>
              <ul className="space-y-2">
                <li><Link href="/contact" className="transition hover:text-brand-gold">Contact</Link></li>
                <li><Link href="/temoignages" className="transition hover:text-brand-gold">Témoignages</Link></li>
                <li><Link href="/tarifs" className="transition hover:text-brand-gold">Tarifs</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold">Mentions</p>
              <ul className="space-y-2">
                <li><Link href="/mentions-legales" className="transition hover:text-brand-gold">Mentions légales</Link></li>
                <li><Link href="/politique-confidentialite" className="transition hover:text-brand-gold">Politique de confidentialité</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-7">
          <strong className="font-semibold">Sécurité et santé :</strong> ce site a un but d&apos;information et de mise en relation. Il ne remplace pas un avis médical, un suivi médical ou psychothérapeutique adapté à votre situation.
        </div>
        <div className="mx-auto mt-6 max-w-7xl text-center">
          <a
            href="https://www.youtube.com/@meretrouver"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-white/40 transition hover:text-white/70"
            aria-label="YouTube"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </a>
        </div>
      </footer>
    </div>
  );
}
