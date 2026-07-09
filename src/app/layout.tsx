import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HealthCloud',
  description: 'Aplicación de salud con Next.js, TypeScript y Supabase',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
