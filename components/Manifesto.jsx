/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";

// Runs synchronously before paint on client, avoids isMobile flicker
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Manifesto() {
  const [isMobile, setIsMobile] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // On mobile: animate immediately (no scroll-triggered reveal).
  // On desktop: use whileInView for the scroll reveal.
  const textAnim = isMobile
    ? { animate: { opacity: 1, y: 0 }, initial: { opacity: 0, y: 20 } }
    : { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: false, margin: "-20%" } };
  const textTransition = { type: 'spring', stiffness: 300, damping: 22 };

  const imgAnim = isMobile
    ? { animate: { opacity: 1, scale: 1 }, initial: { opacity: 0, scale: 0.96 } }
    : { initial: { opacity: 0, scale: 0.92 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: false, margin: "-20%" } };
  const imgTransition = { type: 'spring', stiffness: 260, damping: 20, delay: isMobile ? 0 : 0.1 };

  return (
    <div id="manifesto" style={{ position: 'relative', width: '100%', zIndex: 20 }}>

      {/* The Feed */}
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-pure)',
          borderTop: '1px solid var(--border-crisp)',
          padding: 'clamp(3.75rem, 8vw, 5rem) 0',
        }}
      >
        <div
          className="mobile-stack mobile-padding"
          style={{
            maxWidth: '1100px',
            width: '100%',
            padding: '0 clamp(1.25rem, 5vw, 2.5rem)',
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(2.5rem, 7vw, 5rem)',
            justifyContent: 'space-between',
          }}
        >
          <motion.div
            {...textAnim}
            transition={textTransition}
            style={{ flex: 1 }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              marginBottom: '2rem',
              color: 'rgba(0,0,0,0.4)',
            }}>
              01. The Feed
            </p>
            <h2 style={{
              fontSize: 'clamp(1.9rem, 4vw, 3rem)',
              fontFamily: 'var(--serif)',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
            }}>
              The feed knows what you clicked. It has no idea <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>who you are.</em>
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              fontFamily: 'var(--sans)',
              fontWeight: 300,
              opacity: 0.6,
              lineHeight: 1.6,
            }}>
              You don't open it to find your people. You open it because it's there.<br />
              It was built to hold your attention — never to introduce you to anyone.<br />
              Meanwhile the truest parts of you sit in notes apps and dog-eared pages, with nowhere to live.
            </p>
          </motion.div>
          <motion.div
            {...imgAnim}
            transition={imgTransition}
            style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
          >
            <div style={{
              padding: 'clamp(0.75rem, 2vw, 1.25rem)',
              background: 'var(--bg-off)',
              border: '1px solid var(--border-crisp)',
              width: '100%',
              maxWidth: '28rem',
            }}>
              <img
                src="/assets/notSocial.webp"
                alt="Not Social"
                loading="eager"
                style={{ width: '100%', objectFit: 'cover' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
