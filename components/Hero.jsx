/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import LivingText from './LivingText';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const lines = [
  { text: 'You are not the content you scroll.', italic: true },
  { text: 'Kill the feed.', italic: false },
];

export default function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    console.log("Waitlist email submitted:", email);
    setSubmitted(true);
  };

  return (
    <section
      className="mobile-padding"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#0a0a0f',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(5rem, 8vw, 7rem) clamp(1.25rem, 5vw, 3.75rem)',
        zIndex: 10,
        alignItems: 'center',
      }}
    >
      {/* Tastemap constellation background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <iframe
          src="/tastemap.html?bg=1"
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          tabIndex={-1}
          aria-hidden="true"
        />
        {/* Dark vignette — lets constellation glow through at edges, deep center for legibility */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(8,8,14,0.72) 0%, rgba(8,8,14,0.55) 55%, rgba(8,8,14,0.25) 100%)',
        }} />
      </div>

      <div style={{
        maxWidth: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 20,
      }}>

        {/* Headline */}
        <h1 style={{
          marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.05em',
        }}>
          {lines.map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22, delay: i * 0.13 }}
              style={{
                display: 'block',
                fontFamily: 'var(--serif)',
                fontWeight: 400,
                fontSize: 'clamp(2.6rem, 3.5vw, 6.5rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.08,
                fontStyle: line.italic ? 'italic' : 'normal',
                color: line.italic ? 'rgba(255,255,255,0.52)' : 'rgba(255,255,255,0.96)',
              }}
            >
              <LivingText text={line.text} />
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            lineHeight: 1.85,
            color: 'rgba(255,255,255,0.52)',
            fontWeight: 300,
            maxWidth: '35rem',
            marginBottom: 'clamp(2.5rem, 6vw, 3.75rem)',
          }}
        >
          The Fourth Place maps your inner world, finds the people whose inner world rhymes with yours — a few blocks away or a hemisphere apart — and brings you together in the physical one. Designed for depth, curated like a gallery.
        </motion.p>

        {/* Waitlist Form */}
        <div style={{ width: '100%', maxWidth: '25rem', position: 'relative', marginTop: '1rem' }}>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  width: '100%',
                  borderBottom: '1px solid rgba(255,255,255,0.18)',
                  paddingBottom: '0.5rem',
                  position: 'relative',
                }}
                className="group waitlist-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <label
                    htmlFor="email"
                    style={{
                      display: 'block',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(255,255,255,0.35)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Enter the waitlist
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      width: '100%',
                      background: 'transparent',
                      fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
                      outline: 'none',
                      border: 'none',
                      fontFamily: 'var(--serif)',
                      color: 'rgba(255,255,255,0.88)',
                    }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    paddingBottom: '0.25rem',
                    paddingLeft: '1rem',
                    opacity: 0.4,
                    transition: 'opacity 0.3s',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    minWidth: '2.75rem',
                    minHeight: '2.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.4'}
                >
                  <MoveRight strokeWidth={1} size={32} color="white" />
                </button>
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    height: '1px',
                    background: 'rgba(255,255,255,0.7)',
                    transform: 'scaleX(0)',
                    transition: 'transform 1s cubic-bezier(0.19,1,0.22,1)',
                    transformOrigin: 'left',
                  }}
                  className="waitlist-underline"
                />
                <style jsx>{`
                  .waitlist-form:focus-within .waitlist-underline {
                    transform: scaleX(1) !important;
                  }
                  #email::placeholder {
                    color: rgba(255,255,255,0.2);
                  }
                `}</style>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                style={{ textAlign: 'center', fontFamily: 'var(--serif)', fontSize: '1.25rem', color: 'rgba(255,255,255,0.88)' }}
                initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <motion.span
                  style={{ display: 'inline-block' }}
                  animate={{ y: [-5, -20, -50], opacity: [1, 0.8, 0], scale: [1, 1.2, 0.5] }}
                  transition={{ duration: 3, ease: "easeOut", type: "tween" }}
                >
                  🕊️
                </motion.span>
                <p style={{ marginTop: '1rem' }}>Your room awaits.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
}
