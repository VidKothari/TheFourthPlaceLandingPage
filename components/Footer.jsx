/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Footer() {
  const [footnoteOpen, setFootnoteOpen] = useState(false);

  return (
    <footer
      className="mobile-padding"
      style={{
        background: 'var(--bg-warm)',
        padding: 'clamp(40px, 6vw, 72px) clamp(20px, 5vw, 60px) clamp(28px, 4vw, 40px)',
        borderTop: '1px solid var(--border-crisp)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* The IV — decorative to everyone except the curious. Click it. */}
      <button
        onClick={() => setFootnoteOpen(true)}
        aria-label="A footnote"
        style={{
          position: 'absolute',
          right: 'clamp(0.5rem, 4vw, 3rem)',
          bottom: '-0.18em',
          fontFamily: 'var(--serif)',
          fontWeight: 300,
          fontSize: 'clamp(7rem, 16vw, 14rem)',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(17,17,16,0.08)',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'default',
          userSelect: 'none',
          zIndex: 1,
        }}
      >
        IV
      </button>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
          color: 'var(--text-pure)',
          fontStyle: 'italic',
        }}>
          The Fourth Place
        </div>

        <div style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.75rem',
          fontWeight: 400,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-soft)',
          order: 3,
          width: '100%',
          textAlign: 'center',
        }}
          className="mobile-hide"
        >
          Not everyone. Just the ones that make sense.
        </div>

        <div style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.75rem',
          fontWeight: 400,
          letterSpacing: '0.1em',
          color: 'var(--text-soft)',
        }}>
          © 2026
        </div>
      </div>

      {/* The footnote — after Ray Oldenburg */}
      <AnimatePresence>
        {footnoteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setFootnoteOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 3000,
              background: 'rgba(248, 246, 242, 0.92)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              cursor: 'pointer',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                maxWidth: '26rem',
                background: 'var(--bg-pure)',
                border: '1px solid var(--border-crisp)',
                padding: 'clamp(2rem, 5vw, 3rem)',
                textAlign: 'left',
              }}
            >
              <p style={{
                fontFamily: 'var(--sans)',
                fontWeight: 400,
                fontSize: '0.62rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--text-soft)',
                opacity: 0.6,
                marginBottom: '1.5rem',
              }}>
                Footnote iv.
              </p>
              <p style={{
                fontFamily: 'var(--serif)',
                fontWeight: 400,
                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                lineHeight: 1.7,
                color: 'var(--text-pure)',
                marginBottom: '1.5rem',
              }}>
                The first place is home. The second is work. The third is the
                café — where you are surrounded by people, and still unmet.
                <em style={{ fontStyle: 'italic' }}> The fourth is the one you carry inside you.</em>
              </p>
              <p style={{
                fontFamily: 'var(--sans)',
                fontWeight: 300,
                fontSize: '0.8rem',
                color: 'var(--text-soft)',
                opacity: 0.7,
              }}>
                — after Ray Oldenburg, <em style={{ fontStyle: 'italic' }}>The Great Good Place</em>, 1989
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
