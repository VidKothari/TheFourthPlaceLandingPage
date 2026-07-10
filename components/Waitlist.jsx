/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveRight } from 'lucide-react';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [position, setPosition] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('failed');
      const data = await res.json().catch(() => ({}));
      if (data?.position) setPosition(data.position);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="waitlist"
      className="mobile-padding"
      style={{
        position: 'relative',
        background: 'var(--bg-warm)',
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
          fontSize: '0.75rem',
          fontWeight: 400,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'var(--text-soft)',
          marginBottom: '32px',
        }}>
          The Waitlist
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
          lineHeight: 1.7,
          color: 'var(--text-soft)',
          fontWeight: 300,
          marginBottom: 'clamp(40px, 6vw, 64px)',
          maxWidth: '560px',
        }}>
          We're opening slowly and deliberately — Pune first, then Mumbai,
          then Bengaluru. Leave your email, and we'll write to you when your
          city opens.
        </p>

        <div style={{ width: '100%', maxWidth: '400px', position: 'relative', marginBottom: 'clamp(40px, 5vw, 60px)' }}>
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                style={{ width: '100%' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <div
                  className="group waitlist-form2"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    width: '100%',
                    borderBottom: '1px solid rgba(17,17,16,0.25)',
                    paddingBottom: '8px',
                    position: 'relative',
                  }}
                >
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <label
                      htmlFor="waitlist-email"
                      style={{
                        display: 'block',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--sans)',
                        fontWeight: 400,
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                        color: 'var(--text-soft)',
                        opacity: 0.7,
                        marginBottom: '8px',
                      }}
                    >
                      Join the waitlist
                    </label>
                    <input
                      id="waitlist-email"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
                      placeholder="your@email.com"
                      disabled={status === 'sending'}
                      style={{
                        width: '100%',
                        background: 'transparent',
                        fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
                        outline: 'none',
                        border: 'none',
                        fontFamily: 'var(--serif)',
                        color: 'var(--text-pure)',
                        opacity: status === 'sending' ? 0.5 : 1,
                      }}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    aria-label="Submit email"
                    disabled={status === 'sending'}
                    style={{
                      paddingBottom: '4px',
                      paddingLeft: '16px',
                      opacity: status === 'sending' ? 0.25 : 0.5,
                      transition: 'opacity 0.3s',
                      cursor: status === 'sending' ? 'wait' : 'pointer',
                      background: 'none',
                      border: 'none',
                      minWidth: '44px',
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onMouseEnter={(e) => { if (status !== 'sending') e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={(e) => { if (status !== 'sending') e.currentTarget.style.opacity = '0.5'; }}
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
                      background: 'var(--text-pure)',
                      transform: 'scaleX(0)',
                      transition: 'transform 1s cubic-bezier(0.19,1,0.22,1)',
                      transformOrigin: 'left',
                    }}
                    className="waitlist-underline2"
                  />
                </div>

                <div aria-live="polite" style={{ minHeight: '1.6rem', marginTop: '0.75rem', textAlign: 'left' }}>
                  {status === 'error' && (
                    <span style={{
                      fontFamily: 'var(--sans)',
                      fontWeight: 300,
                      fontSize: '0.85rem',
                      color: '#8a3a2e',
                    }}>
                      That didn't go through. Try once more?
                    </span>
                  )}
                  {status === 'sending' && (
                    <span style={{
                      fontFamily: 'var(--serif)',
                      fontStyle: 'italic',
                      fontSize: '0.95rem',
                      color: 'var(--text-soft)',
                    }}>
                      One moment…
                    </span>
                  )}
                </div>

                <style jsx>{`
                  .waitlist-form2:focus-within .waitlist-underline2 {
                    transform: scaleX(1) !important;
                  }
                  input::placeholder {
                    color: rgba(17, 17, 16, 0.25);
                  }
                `}</style>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                style={{ textAlign: 'center' }}
                initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                <p style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  color: 'var(--text-pure)',
                  marginBottom: '0.75rem',
                }}>
                  You're in.
                </p>
                <p style={{
                  fontFamily: 'var(--sans)',
                  fontWeight: 300,
                  fontSize: '1rem',
                  color: 'var(--text-soft)',
                  lineHeight: 1.6,
                }}>
                  We'll write to you when your city opens.
                </p>
                {position && (
                  <p style={{
                    fontFamily: 'var(--sans)',
                    fontWeight: 400,
                    fontSize: '0.72rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--text-soft)',
                    opacity: 0.6,
                    marginTop: '1.5rem',
                  }}>
                    No. {position} on the list
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.75rem',
          fontWeight: 400,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--text-soft)',
          opacity: 0.7,
        }}>
          Pune — Mumbai — Bengaluru
        </div>
      </motion.div>
    </section>
  );
}
