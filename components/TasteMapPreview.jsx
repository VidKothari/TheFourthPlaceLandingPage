/* eslint-disable react/no-unescaped-entities */
'use client';

import { motion } from 'framer-motion';

export default function TasteMapPreview() {
  const stagger = (i) => ({
    initial: { opacity: 0, y: '1.5rem' },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-8%' },
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section id="tastemap" style={{
      background: '#f8f6f2',
      borderTop: '1px solid var(--border-crisp)',
      position: 'relative',
    }}>
      {/* Text header */}
      <div
        className="mobile-padding"
        style={{
          padding: 'clamp(4.5rem, 10vw, 7.5rem) clamp(1.25rem, 5vw, 3.75rem) 3rem',
        }}
      >
        <motion.span {...stagger(0)} style={{
          fontFamily: 'var(--sans)', fontWeight: 400, fontSize: '0.8rem',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--text-soft)', marginBottom: '2rem', display: 'block',
        }}>
          II. The Taste Map
        </motion.span>

        <motion.h2 {...stagger(1)} style={{
          fontFamily: 'var(--serif)', fontWeight: 400,
          fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.05,
          color: 'var(--text-pure)', marginBottom: '1.25rem',
        }}>
          Every collection becomes <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>a constellation.</em>
        </motion.h2>

        <motion.p {...stagger(2)} style={{
          fontFamily: 'var(--sans)', fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
          lineHeight: 1.7, color: 'var(--text-soft)', fontWeight: 300,
          maxWidth: '38rem',
        }}>
          This one is live — it belongs to two people, Alex and Jordan. Drag
          it around, click any poster, switch between them, and hit
          <em style={{ fontStyle: 'italic' }}> Combined</em> to see exactly
          what they share.
        </motion.p>
      </div>

      {/* The live map — no buttons to unlock, it just works */}
      <motion.div
        {...stagger(3)}
        style={{
          borderTop: '1px solid var(--border-crisp)',
          borderBottom: '1px solid var(--border-crisp)',
        }}
      >
        <iframe
          src="/tastemap-preview.html"
          title="A live taste map — two people's collections as a constellation of posters"
          loading="lazy"
          style={{
            width: '100%',
            height: 'min(88vh, 820px)',
            border: 'none',
            display: 'block',
            background: '#f8f6f2',
          }}
        />
      </motion.div>

      {/* Bottom bar */}
      <div
        className="tastemap-bottom mobile-padding"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.25rem, 5vw, 3.75rem)',
          gap: '1rem',
        }}
      >
        <div style={{
          fontFamily: 'var(--sans)', fontSize: '0.8rem', fontWeight: 400,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--text-soft)',
        }}>
          Drag to rotate · click any poster · hit Combined
        </div>
        <div style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 'clamp(1rem, 2vw, 1.5rem)',
          color: 'var(--text-pure)', textAlign: 'right',
        }}>
          What you share is the picture.
        </div>
      </div>
    </section>
  );
}
