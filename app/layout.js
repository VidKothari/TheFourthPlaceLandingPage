import { Cormorant_Garamond, Inter } from 'next/font/google';
import Script from 'next/script';
import CustomCursor from '../components/CustomCursor';
import MobileDebugger from '../components/MobileDebugger';
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
        {/* Eruda mobile devtools — dev only, never ship to production */}
        {process.env.NODE_ENV !== 'production' && (
          <Script
            id="eruda-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                var s = document.createElement('script');
                s.src = 'https://cdn.jsdelivr.net/npm/eruda';
                s.onload = function() { eruda.init(); };
                document.head.appendChild(s);
              `
            }}
          />
        )}
        <Loader />
        <CustomCursor />
        {process.env.NODE_ENV !== 'production' && <MobileDebugger />}
        <ClientErrorBoundary>
          {children}
        </ClientErrorBoundary>
      </body>
    </html>
  );
}
