/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveRight } from 'lucide-react';

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      id="waitlist"
      className="mobile-padding"
      style={{
        position: 'relative',
        background: 'var(--bg-pure)',
        padding: 'clamp(80px, 14vw, 200px) clamp(20px, 5vw, 60px)',
        borderTop: '1px solid var(--border-crisp)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '800px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <div style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.8rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-soft)',
          marginBottom: '32px',
        }}>
          Access Request
        </div>

        <h2 style={{
          fontFamily: 'var(--serif)',
          fontWeight: 400,
          fontSize: 'clamp(2.2rem, 6vw, 5rem)',
          lineHeight: 1.1,
          color: 'var(--text-pure)',
          marginBottom: '20px',
        }}>
          Your inner world deserves a <em style={{ fontStyle: 'italic', color: 'var(--text-soft)' }}>home.</em>
        </h2>
        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
          lineHeight: 1.6,
          color: 'var(--text-soft)',
          fontWeight: 300,
          marginBottom: 'clamp(40px, 6vw, 64px)',
          maxWidth: '560px',
        }}>
          We are constructing this space slowly and deliberately, starting in Pune. Submit an access request and we will dispatch an invite when your city's grid goes live.
        </p>

        <div style={{ width: '100%', maxWidth: '400px', position: 'relative', marginBottom: 'clamp(40px, 5vw, 60px)' }}>
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
                className="group waitlist-form2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <label
                    htmlFor="waitlist-email"
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
                    Enter email
                  </label>
                  <input
                    id="waitlist-email"
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
                  className="waitlist-underline2"
                />
                <style jsx>{`
                  .waitlist-form2:focus-within .waitlist-underline2 {
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

        <div style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.8rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-soft)',
        }}>
          Sequence: Pune — Mumbai — Bengaluru
        </div>
      </motion.div>
    </section>
  );
}
