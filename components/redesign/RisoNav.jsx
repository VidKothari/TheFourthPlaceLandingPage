/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { INK } from './shared';

const links = [
  { label: 'The Feed', href: '#manifesto' },
  { label: 'The Map', href: '#tastemap' },
  { label: 'The Exhibition', href: '#thread' },
];

export default function RisoNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav
        className="mobile-padding"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: '4.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 1000,
          background: INK.paper,
          borderBottom: `2px solid ${INK.ink}`,
        }}
      >
        <div style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(1.15rem, 4vw, 1.5rem)',
          color: INK.ink,
          fontStyle: 'italic',
          fontWeight: 500,
        }}>
          The Fourth Place
        </div>

        <div className="mobile-hide" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: 'var(--sans)', fontSize: '0.8rem', fontWeight: 500,
                letterSpacing: '0.05em', color: INK.ink, textDecoration: 'none',
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="#waitlist"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: '2.6rem', padding: '0 1.5rem',
              background: INK.ink,
              color: INK.paper,
              border: `2px solid ${INK.ink}`,
              fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.8rem',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Join the waitlist
          </a>
        </div>

        <button
          className="desktop-hide"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open menu"
          style={{
            display: 'none',
            background: 'none', border: 'none', cursor: 'pointer',
            flexDirection: 'column', gap: '6px',
          }}
        >
          <div style={{ width: '1.5rem', height: '2px', background: INK.ink }} />
          <div style={{ width: '1.5rem', height: '2px', background: INK.ink }} />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', inset: 0, background: INK.paper, zIndex: 2000,
              display: 'flex', flexDirection: 'column', padding: '40px 24px', gap: '32px',
              borderLeft: `2px solid ${INK.ink}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <div style={{ fontSize: '1.4rem', fontStyle: 'italic', fontFamily: 'var(--serif)', color: INK.ink }}>The Fourth Place</div>
              <button onClick={() => setIsOpen(false)} aria-label="Close menu" style={{ background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: INK.ink }}>✕</button>
            </div>
            {links.map(({ label, href }) => (
              <a key={label} href={href} onClick={() => setIsOpen(false)} style={{ fontSize: '2rem', fontFamily: 'var(--serif)', color: INK.ink, textDecoration: 'none' }}>{label}</a>
            ))}
            <a
              href="#waitlist"
              onClick={() => setIsOpen(false)}
              style={{
                marginTop: 'auto', textAlign: 'center', padding: '1rem',
                background: INK.ink, color: INK.paper, textDecoration: 'none',
                fontFamily: 'var(--sans)', textTransform: 'uppercase', letterSpacing: '0.06em',
              }}
            >
              Join the waitlist
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-hide { display: flex !important; }
        }
      `}</style>
    </>
  );
}
