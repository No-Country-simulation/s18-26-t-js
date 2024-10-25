import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import ToasterContext from '@/context/ToasterContext';
import VisibilityProvider from '@/context/VisibilityContext';

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });

const inter = Inter({
  subsets: ['latin'],
});

const montserrat = localFont({
  src: './fonts/Montserrat-Black.ttf',
  variable: '--font-montserrat-black',
  weight: '900',
});

export const metadata: Metadata = {
  title: 'SaboresXpertos',
  description: 'Sabor y reseñas en un solo lugar: ¡tu guía gastronómica!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} ${montserrat.variable} antialiased`}>
        <ToasterContext />

        <Header />

        <VisibilityProvider>{children}</VisibilityProvider>

        <Footer />
      </body>
    </html>
  );
}
