import { Cormorant_Garamond, Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import CustomCursor from '../components/CustomCursor';
import ClientErrorBoundary from '../components/ClientErrorBoundary';
import Loader from '../components/Loader';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'The Fourth Place',
  description: 'Not everything, but the things that make sense. Not everyone, but the ones that make sense.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable}`}>
        <Loader />
        <CustomCursor />
        <ClientErrorBoundary>
          {children}
        </ClientErrorBoundary>
        <SpeedInsights />
      </body>
    </html>
  );
}
