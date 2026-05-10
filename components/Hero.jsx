/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import LivingText from './LivingText';

const lines = [
  { text: 'You are not the content you scroll.', italic: true },
  { text: 'Kill the feed.', italic: false },
];

export default function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
        background: 'var(--bg-pure)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 60px',
        zIndex: 10,
        alignItems: 'center',
      }}
    >
      <div style={{
        maxWidth: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 20,
      }}>

        {/* Three-line headline */}
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
                color: line.italic ? 'var(--text-soft)' : 'var(--text-pure)',
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
            fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
            lineHeight: 1.8,
            color: 'var(--text-soft)',
            fontWeight: 300,
            maxWidth: '560px',
            marginBottom: 'clamp(40px, 6vw, 60px)',
          }}
        >
          The Fourth Place maps your inner world, connects you with the people nearby who resonate, and brings you together in the physical one. Designed for depth, curated like a gallery.
        </motion.p>

        {/* Waitlist Form */}
        <div style={{ width: '100%', maxWidth: '400px', position: 'relative', marginTop: '1rem' }}>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  width: '100%',
                  borderBottom: '1px solid rgba(0,0,0,0.2)',
                  paddingBottom: '8px',
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
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      opacity: 0.5,
                      marginBottom: '8px',
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
                    }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    paddingBottom: '4px',
                    paddingLeft: '16px',
                    opacity: 0.5,
                    transition: 'opacity 0.3s',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    minWidth: '44px',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
                >
                  <MoveRight strokeWidth={1} size={32} />
                </button>
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    height: '1px',
                    background: 'black',
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
                  input::placeholder {
                    color: rgba(0,0,0,0.2);
                  }
                `}</style>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                style={{ textAlign: 'center', fontFamily: 'var(--serif)', fontSize: '1.25rem' }}
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
                <p style={{ marginTop: '16px' }}>Your room awaits.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
}
