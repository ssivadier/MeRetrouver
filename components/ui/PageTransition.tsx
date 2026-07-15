"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useRef, type ReactNode } from 'react';

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.remove('page-enter-active');
    void el.offsetWidth;
    el.classList.add('page-enter-active');
  }, [pathname]);

  return (
    <div ref={ref} className="page-enter">
      {children}
    </div>
  );
}
