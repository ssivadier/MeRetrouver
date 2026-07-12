import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Me Retrouver',
  description: 'Site vitrine professionnel pour l’hypnothérapie et la gestion du stress.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
