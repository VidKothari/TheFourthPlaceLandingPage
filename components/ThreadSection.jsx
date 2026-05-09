'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import MobileThread from './MobileThread';

// Only load TheThread on demand — keeps it out of the mobile JS bundle
const TheThread = dynamic(() => import('./TheThread'), { ssr: false, loading: () => null });

export default function ThreadSection({ defaultMobile = false }) {
  const [isMobile, setIsMobile] = useState(defaultMobile);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile ? <MobileThread /> : <TheThread />;
}
