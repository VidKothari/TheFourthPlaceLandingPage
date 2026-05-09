/* eslint-disable react/no-unescaped-entities */
'use client';
import { motion } from 'framer-motion';

export default function PullQuote() {
  return (
    <section
      className="mobile-padding"
      style={{
        background: 'var(--bg-pure)',
        padding: 'clamp(80px, 14vw, 200px) 60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderBottom: '1px solid var(--border-crisp)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: '1200px' }}
      >
        <h2 style={{
          fontFamily: 'var(--serif)',
          fontWeight: 400,
          fontSize: 'clamp(2rem, 6vw, 5.5rem)',
          lineHeight: 1.15,
          color: 'var(--text-pure)',
          marginBottom: 'clamp(24px, 4vw, 40px)',
        }}>
          "Not everything, but the things that make sense.<br />
          Not everyone, but <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>the ones</em> that make sense."
        </h2>
        <div style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.8rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-soft)',
        }}>
          — The Fourth Place
        </div>
      </motion.div>
    </section>
  );
}
