import { Cormorant_Garamond, Jost } from 'next/font/google';
import ClientErrorBoundary from '../components/ClientErrorBoundary';
import Loader from '../components/Loader';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
});

export const metadata = {
  metadataBase: new URL('https://thefourthplace.me'),
  title: 'The Fourth Place — a digital museum of yourself',
  description:
    'Find people whose minds look like yours. A room for the films, albums, and books that made you — and a way of finding the people whose rooms rhyme with yours.',
  openGraph: {
    title: 'The Fourth Place',
    description:
      'A digital museum of yourself. Find people whose minds look like yours.',
    siteName: 'The Fourth Place',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'The Fourth Place — find people whose minds look like yours' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Fourth Place',
    description:
      'A digital museum of yourself. Find people whose minds look like yours.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${jost.variable}`}>
        <Loader />
        <ClientErrorBoundary>
          {children}
        </ClientErrorBoundary>
      </body>
    </html>
  );
}
