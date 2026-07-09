import type { Metadata } from 'next';
import { DM_Sans, Instrument_Serif } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument',
});

export const metadata: Metadata = {
  title: 'HealthCloud — Gestión de servicios de salud',
  description: 'Plataforma que conecta organizaciones médicas, especialistas y pacientes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${instrument.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
