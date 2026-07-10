/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
'use client';

import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import LivingText from './LivingText';

const exhibits = [
  {
    num: 'i',
    label: 'Film',
    text: 'The one that broke something open, that you still can’t explain to anyone.',
  },
  {
    num: 'ii',
    label: 'Album',
    text: 'The one you only play at 2am, when you need to feel something real.',
  },
  {
    num: 'iii',
    label: 'Book',
    text: 'The dog-eared one you keep trying to give everyone you love.',
  },
];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
  return (
    <section
      className="mobile-padding"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        background: 'var(--bg-warm)',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(7rem, 12vw, 9rem) clamp(1.25rem, 5vw, 3.75rem) clamp(3rem, 6vw, 5rem)',
        borderBottom: '1px solid var(--border-crisp)',
        overflow: 'hidden',
      }}
    >
      <div
        className="hero-grid"
        style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '7fr 4fr',
          gap: 'clamp(3rem, 8vw, 8rem)',
          alignItems: 'center',
        }}
      >
        {/* Left — the statement */}
        <div>
          <motion.p
            {...reveal(0.1)}
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 400,
              fontSize: '0.72rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--text-soft)',
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            A digital museum of yourself
          </motion.p>

          <h1
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(2.8rem, 6.5vw, 6rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: 'var(--text-pure)',
              marginBottom: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            }}
          >
            <motion.span {...reveal(0.25)} style={{ display: 'block' }}>
              Find people whose minds
            </motion.span>
            <motion.span
              {...reveal(0.4)}
              style={{ display: 'block', fontStyle: 'italic', color: 'var(--text-soft)' }}
            >
              <LivingText text="look like yours." fonts={["font-serif", "font-playfair", "font-libre"]} />
            </motion.span>
          </h1>

          <motion.p
            {...reveal(0.6)}
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 300,
              fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
              lineHeight: 1.8,
              color: 'var(--text-soft)',
              maxWidth: '34rem',
              marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
            }}
          >
            The Fourth Place is a room for the films, albums, books, and games
            that made you — and a way of finding the people whose rooms rhyme
            with yours. Pune first. Then Mumbai. Then Bengaluru.
          </motion.p>

          <motion.div
            {...reveal(0.75)}
            style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}
          >
            <a href="#waitlist" className="editorial-btn interactive">
              Join the waitlist
            </a>
            <a
              href="#manifesto"
              className="interactive"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontFamily: 'var(--sans)',
                fontWeight: 400,
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-soft)',
                borderBottom: '1px solid var(--border-crisp)',
                paddingBottom: '0.35rem',
              }}
            >
              Walk through <MoveRight strokeWidth={1.5} size={15} />
            </a>
          </motion.div>
        </div>

        {/* Right — museum wall labels */}
        <div
          className="hero-labels"
          style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border-crisp)', border: '1px solid var(--border-crisp)' }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: 'var(--bg-warm)', overflow: 'hidden', height: 'clamp(180px, 22vh, 240px)' }}
          >
            <img
              src="/assets/editorial/records.webp"
              alt="A crate of worn record sleeves, mid-flip"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', filter: 'contrast(0.96)' }}
            />
          </motion.div>
          {exhibits.map((ex, i) => (
            <motion.div
              key={ex.num}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'var(--bg-warm)',
                padding: 'clamp(1.25rem, 2vw, 1.75rem) clamp(1.25rem, 2.2vw, 2rem)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '0.75rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontWeight: 400,
                    fontSize: '0.62rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--text-soft)',
                    opacity: 0.7,
                  }}
                >
                  Exhibit {ex.num}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--serif)',
                    fontStyle: 'italic',
                    fontSize: '0.95rem',
                    color: 'var(--text-soft)',
                  }}
                >
                  {ex.label}
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--serif)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
                  lineHeight: 1.5,
                  color: 'var(--text-pure)',
                }}
              >
                {ex.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
        @media (max-width: 768px) {
          .hero-labels {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
