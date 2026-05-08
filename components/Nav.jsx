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
          height: '80px',
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
          color: 'var(--text-pure)',
          fontStyle: 'italic',
          fontWeight: 500
        }}>
          The Fourth Place
        </div>
        
        {/* Desktop Links */}
        <div className="mobile-hide" style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <a href="#philosophy" className="interactive" style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.05em', color: 'var(--text-soft)', transition: 'color 0.4s' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-pure)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-soft)'}>Philosophy</a>
          <a href="#thread" className="interactive" style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.05em', color: 'var(--text-soft)', transition: 'color 0.4s' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-pure)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-soft)'}>Exhibition</a>
          <a href="#tastemap" className="interactive" style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.05em', color: 'var(--text-soft)', transition: 'color 0.4s' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-pure)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-soft)'}>Taste Map</a>
          <a href="#waitlist" className="interactive editorial-btn">
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
          <div style={{ width: '24px', height: '1.5px', background: 'var(--text-pure)' }} />
          <div style={{ width: '24px', height: '1.5px', background: 'var(--text-pure)' }} />
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
