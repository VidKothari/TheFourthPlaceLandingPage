/* eslint-disable react/no-unescaped-entities */
'use client';

import { motion } from 'framer-motion';
import SimpleTastemap from './SimpleTastemap';

export default function TasteMapPreview() {
  const stagger = (i) => ({
    initial: { opacity: 0, y: '1.5rem' },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-8%' },
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section id="tastemap" style={{
      background: 'var(--bg-night)',
      borderTop: '1px solid var(--border-crisp)',
      position: 'relative',
    }}>
      {/* Text header */}
      <div
        className="mobile-padding"
        style={{
          padding: 'clamp(4.5rem, 10vw, 7.5rem) clamp(1.25rem, 5vw, 3.75rem) 3rem',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <motion.span {...stagger(0)} style={{
          fontFamily: 'var(--sans)', fontWeight: 400, fontSize: '0.8rem',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', display: 'block',
        }}>
          III. The Darkened Gallery
        </motion.span>

        <motion.h2 {...stagger(1)} style={{
          fontFamily: 'var(--serif)', fontWeight: 400,
          fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05,
          color: 'var(--bg-pure)', marginBottom: '1.25rem',
        }}>
          Every collection becomes <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>a constellation.</em>
        </motion.h2>

        <motion.p {...stagger(2)} style={{
          fontFamily: 'var(--sans)', fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
          lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', fontWeight: 300,
          maxWidth: '35rem',
        }}>
          Every node is something that moved you. Every cluster is a part of
          your inner world. This is only a glimpse — yours will look nothing
          like it. That's the point.
        </motion.p>
      </div>

      {/* The simplified map */}
      <SimpleTastemap />

      {/* Bottom bar */}
      <div
        className="tastemap-bottom mobile-padding"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.25rem, 5vw, 3.75rem)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          gap: '1rem',
        }}
      >
        <div style={{
          fontFamily: 'var(--sans)', fontSize: '0.8rem', fontWeight: 400,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.6)',
        }}>
          A small taste — the real map is yours to explore
        </div>
        <div style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 'clamp(1rem, 2vw, 1.5rem)',
          color: 'var(--bg-pure)', textAlign: 'right',
        }}>
          Lay it over a friend's, and what you share glows gold.
        </div>
      </div>
    </section>
  );
}
