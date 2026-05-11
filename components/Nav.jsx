/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: '5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 1000,
          transition: 'background 0.8s, backdrop-filter 0.8s, border-color 0.8s',
          borderBottom: scrolled ? '1px solid var(--border-crisp)' : '1px solid transparent',
        }}
        className={`${scrolled ? 'glass-nav' : ''} mobile-padding`}
      >
        <div className="interactive serif" style={{
          fontSize: 'clamp(1.2rem, 4vw, 1.6rem)',
          color: scrolled ? 'var(--text-pure)' : 'rgba(255,255,255,0.92)',
          fontStyle: 'italic',
          fontWeight: 500,
          transition: 'color 0.6s',
        }}>
          The Fourth Place
        </div>

        {/* Desktop Links */}
        <div className="mobile-hide" style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          {['Philosophy', 'Exhibition', 'Taste Map'].map((label, i) => {
            const href = ['#philosophy', '#thread', '#tastemap'][i];
            const baseColor = scrolled ? 'var(--text-soft)' : 'rgba(255,255,255,0.65)';
            const hoverColor = scrolled ? 'var(--text-pure)' : 'rgba(255,255,255,1)';
            return (
              <a
                key={label}
                href={href}
                className="interactive"
                style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.05em', color: baseColor, transition: 'color 0.4s' }}
                onMouseEnter={(e) => { e.target.style.color = hoverColor; }}
                onMouseLeave={(e) => { e.target.style.color = baseColor; }}
              >
                {label}
              </a>
            );
          })}
          <a
            href="#waitlist"
            className="interactive"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: '2.75rem', padding: '0 1.75rem',
              background: scrolled ? 'var(--text-pure)' : 'rgba(255,255,255,0.12)',
              color: scrolled ? 'var(--bg-pure)' : 'rgba(255,255,255,0.92)',
              border: scrolled ? '1px solid var(--text-pure)' : '1px solid rgba(255,255,255,0.35)',
              fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '0.82rem',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              transition: 'background 0.5s, color 0.5s, border-color 0.5s',
              backdropFilter: scrolled ? 'none' : 'blur(8px)',
              WebkitBackdropFilter: scrolled ? 'none' : 'blur(8px)',
            }}
            onMouseEnter={(e) => {
              if (scrolled) { e.currentTarget.style.background = 'var(--bg-pure)'; e.currentTarget.style.color = 'var(--text-pure)'; }
              else { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; }
            }}
            onMouseLeave={(e) => {
              if (scrolled) { e.currentTarget.style.background = 'var(--text-pure)'; e.currentTarget.style.color = 'var(--bg-pure)'; }
              else { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }
            }}
          >
            Join Waitlist
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="interactive desktop-hide"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            background: 'none', border: 'none', cursor: 'pointer',
            flexDirection: 'column', gap: '6px'
          }}
        >
          <div style={{ width: '1.5rem', height: '1.5px', background: scrolled ? 'var(--text-pure)' : 'rgba(255,255,255,0.85)', transition: 'background 0.4s' }} />
          <div style={{ width: '1.5rem', height: '1.5px', background: scrolled ? 'var(--text-pure)' : 'rgba(255,255,255,0.85)', transition: 'background 0.4s' }} />
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', inset: 0, background: 'var(--bg-pure)', zIndex: 2000,
              display: 'flex', flexDirection: 'column', padding: '40px 24px', gap: '32px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <div className="serif italic" style={{ fontSize: '1.4rem' }}>The Fourth Place</div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', fontSize: '2rem' }}>✕</button>
            </div>
            <a href="#philosophy" onClick={() => setIsOpen(false)} style={{ fontSize: '2rem', fontFamily: 'var(--serif)' }}>Philosophy</a>
            <a href="#thread" onClick={() => setIsOpen(false)} style={{ fontSize: '2rem', fontFamily: 'var(--serif)' }}>Exhibition</a>
            <a href="#tastemap" onClick={() => setIsOpen(false)} style={{ fontSize: '2rem', fontFamily: 'var(--serif)' }}>Taste Map</a>
            <a href="#waitlist" onClick={() => setIsOpen(false)} style={{ marginTop: 'auto', textAlign: 'center' }} className="editorial-btn">Join Waitlist</a>
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
